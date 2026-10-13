import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildWhatsAppUrl, prepareReservation } from '../../src/services/reservationService.js'
import { todayInBolivia } from '../../src/lib/reservation.js'

const validValues = { nombre: ' María Pérez ', pais: 'Bolivia', ciudad: ' La Paz ', whatsapp: '+591 (71) 234-567', personas: '5+', fecha: '2099-12-31', experiencia: 'isla-del-sol', pago: 'A coordinar', observaciones: ' Vegetariana ', confirmacion: true }

test('registra solo las columnas permitidas y no solicita email ni establece estado', async () => {
  let inserted
  const client = { from(table) { assert.equal(table, 'inquiries'); return { async insert(payload) { inserted = payload; return { error: null } } } } }
  const result = await prepareReservation(validValues, client)
  assert.equal(result.status, 'saved')
  assert.match(result.message, /pendiente de confirmación/)
  assert.deepEqual(inserted, { name: 'María Pérez', country: 'Bolivia', city: 'La Paz', whatsapp: '+59171234567', experience_id: 'isla-del-sol', requested_date: '2099-12-31', participants: '5+', preferred_payment: 'A coordinar', message: 'Vegetariana' })
  assert.equal('email' in inserted, false)
  assert.equal('status' in inserted, false)
})

test('envía observaciones vacías como cadena vacía y nunca como NULL', async () => {
  let inserted
  const client = { from(table) { assert.equal(table, 'inquiries'); return { async insert(payload) { inserted = payload; return { error: null } } } } }
  const result = await prepareReservation({ ...validValues, observaciones: '   ' }, client)
  assert.equal(result.status, 'saved')
  assert.equal(inserted.message, '')
  assert.notEqual(inserted.message, null)
})

test('no afirma que guardó si no hay configuración o falla el insert', async () => {
  assert.equal((await prepareReservation(validValues, null)).status, 'not-configured')
  const client = { from: () => ({ insert: async () => ({ error: { code: '42501', message: 'private customer details must not be displayed' } }) }) }
  const result = await prepareReservation(validValues, client)
  assert.equal(result.status, 'error')
  assert.deepEqual(result.diagnostic, { code: '42501', category: 'rls_or_privileges' })
  assert.equal(JSON.stringify(result).includes('private customer details'), false)
  const rejectedKeyClient = { from: () => ({ insert: async () => ({ error: { status: 401, message: 'private auth response' } }) }) }
  const rejectedKey = await prepareReservation(validValues, rejectedKeyClient)
  assert.deepEqual(rejectedKey.diagnostic, { code: '401', category: 'api_key_or_authentication' })
  assert.equal(JSON.stringify(rejectedKey).includes('private auth response'), false)
})

test('clasifica fallos de red sin propagar detalles técnicos', async () => {
  const client = { from: () => ({ insert: async () => { throw new TypeError('private URL or request data') } }) }
  const result = await prepareReservation(validValues, client)
  assert.deepEqual(result.diagnostic, { code: 'NETWORK', category: 'network_or_cors' })
  assert.equal(JSON.stringify(result).includes('private URL or request data'), false)
})

test('el servicio vuelve a validar antes de preparar el payload', async () => {
  const result = await prepareReservation({})
  assert.equal(result.status, 'invalid')
  assert.ok(result.errors.nombre)
})

test('prepara un enlace con mensaje URL-encoded para WhatsApp', () => {
  const url = buildWhatsAppUrl(validValues, '+591 70000000')
  assert.match(url, /^https:\/\/wa\.me\/59170000000\?text=/)
  const message = new URL(url).searchParams.get('text')
  assert.match(message, /Solicitud de reserva — Ruta Andina \(pendiente de confirmación\)/)
  assert.match(message, /Participantes: 5 o más/)
  assert.match(message, /Observaciones: Vegetariana/)
  assert.equal(buildWhatsAppUrl(validValues, ''), '')
})
test('la fecha mínima usa Bolivia incluso después de medianoche UTC', () => {
  assert.equal(todayInBolivia(new Date('2026-10-13T02:30:00Z')), '2026-10-12')
  assert.equal(todayInBolivia(new Date('2026-10-13T04:00:00Z')), '2026-10-13')
})
