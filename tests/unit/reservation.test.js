import { test } from 'node:test'
import assert from 'node:assert/strict'
import { validateReservation } from '../../src/lib/reservation.js'

const valid = { nombre: 'María Pérez', pais: 'Bolivia', ciudad: 'La Paz', whatsapp: '+591 71234567', personas: '2', fecha: '2026-10-20', experiencia: 'pico-tunari', pago: 'A coordinar', observaciones: '', confirmacion: true }
const validate = (changes = {}) => validateReservation({ ...valid, ...changes }, '2026-10-12')

test('acepta datos válidos, hoy y grupo de cinco o más', () => {
  assert.deepEqual(validate(), {})
  assert.deepEqual(validate({ fecha: '2026-10-12', personas: '5+' }), {})
})
test('rechaza campos obligatorios vacíos y espacios', () => {
  const errors = validate({ nombre: '  ', pais: '', ciudad: '', whatsapp: '', fecha: '', confirmacion: false })
  for (const key of ['nombre', 'pais', 'ciudad', 'whatsapp', 'fecha', 'confirmacion']) assert.ok(errors[key], key)
})
test('rechaza teléfonos incompletos, letras y signos fuera de posición', () => {
  for (const whatsapp of ['123', 'abcdefghi', '591++71234567', '+000000000', '+591 712345678901234']) assert.ok(validate({ whatsapp }).whatsapp, whatsapp)
  assert.deepEqual(validate({ whatsapp: '+54 (11) 1234-5678' }), {})
})
test('rechaza fechas pasadas, imposibles y formatos incorrectos', () => {
  for (const fecha of ['2026-10-11', '2027-02-29', '2026-02-31', '20/10/2026', 'invalid', '2026-13-01']) assert.ok(validate({ fecha }).fecha, fecha)
  assert.deepEqual(validate({ fecha: '2028-02-29' }), {})
})
test('rechaza participantes y selecciones manipuladas', () => {
  for (const personas of ['0', '-1', '1.5', 'abc', '999']) assert.ok(validate({ personas }).personas)
  assert.ok(validate({ experiencia: 'ruta-falsa' }).experiencia)
  assert.ok(validate({ pais: 'pais-invalido' }).pais)
  assert.ok(validate({ pago: 'tarjeta-secreta' }).pago)
})
test('limita texto libre y exige consentimiento booleano', () => {
  assert.ok(validate({ observaciones: 'x'.repeat(1001) }).observaciones)
  assert.ok(validate({ nombre: 'x'.repeat(121) }).nombre)
  assert.ok(validate({ confirmacion: 'true' }).confirmacion)
})
