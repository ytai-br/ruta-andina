import { experiences, adviceOption } from '../data/experiences.js'
import { countries, participantOptions, paymentOptions } from '../data/bookingOptions.js'

export function todayInBolivia(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/La_Paz', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(date)
  const part = (type) => parts.find((entry) => entry.type === type).value
  return `${part('year')}-${part('month')}-${part('day')}`
}

export function validateReservation(values, today = todayInBolivia()) {
  const errors = {}
  const name = values.nombre?.trim() || ''
  const city = values.ciudad?.trim() || ''
  if (name.length < 2 || name.length > 120) errors.nombre = 'Escribe tu nombre completo (entre 2 y 120 caracteres).'
  if (!countries.includes(values.pais)) errors.pais = 'Selecciona tu país de procedencia.'
  if (city.length < 2 || city.length > 100) errors.ciudad = 'Escribe tu ciudad (entre 2 y 100 caracteres).'
  const phone = values.whatsapp?.trim() || ''
  if (!/^\+[\d ()-]+$/.test(phone) || !/^\+[1-9]\d{7,14}$/.test(phone.replace(/[ ()-]/g, ''))) {
    errors.whatsapp = 'Incluye el código de país y entre 8 y 15 dígitos. Ejemplo: +591 71234567.'
  }
  if (!participantOptions.includes(values.personas)) errors.personas = 'Selecciona la cantidad de personas.'
  const date = values.fecha || ''
  const parsed = new Date(`${date}T12:00:00Z`)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || !Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date || date < today) {
    errors.fecha = 'Elige una fecha válida desde hoy (hora de Bolivia).'
  }
  if (![...experiences, adviceOption].some((experience) => experience.id === values.experiencia)) errors.experiencia = 'Selecciona una experiencia válida.'
  if (!paymentOptions.includes(values.pago)) errors.pago = 'Selecciona un método de pago válido.'
  if ((values.observaciones || '').length > 1000) errors.observaciones = 'Las observaciones no deben superar 1000 caracteres.'
  if (values.confirmacion !== true) errors.confirmacion = 'Confirma que revisaste tus datos antes de continuar.'
  return errors
}

export function formatBookingDate(value) {
  if (!value) return '—'
  const [year, month, day] = value.split('-')
  return `${day}/${month}/${year}`
}

export function toReservationPayload(values) {
  return {
    name: values.nombre.trim(),
    country: values.pais,
    city: values.ciudad.trim(),
    whatsapp: values.whatsapp.replace(/[ ()-]/g, ''),
    experience_id: values.experiencia,
    requested_date: values.fecha,
    participants: values.personas,
    preferred_payment: values.pago,
    // La columna permanece NOT NULL; el CHECK de Supabase aceptará '' como opcional.
    message: values.observaciones.trim(),
  }
}
