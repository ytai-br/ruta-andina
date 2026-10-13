import { formatBookingDate, toReservationPayload, validateReservation } from '../lib/reservation.js'
import { getSupabaseClient } from '../lib/supabase.js'
import { adviceOption, experiences } from '../data/experiences.js'

// Diagnóstico temporal: solo expone códigos/clasificaciones estándar.
// Nunca se muestra ni registra error.message, details, hint o el payload.
function safeSupabaseDiagnostic(error) {
  const candidate = typeof error?.code === 'string' ? error.code : ''
  const knownCodes = ['42501', '23502', '23514', '22P02', '22007', '42P01', '42703', 'PGRST204', 'PGRST205', 'PGRST301', 'PGRST303']
  const httpStatus = typeof error?.status === 'number' ? String(error.status) : ''
  const isNetworkFailure = error?.name === 'TypeError'
    || (typeof error?.message === 'string' && /^(TypeError: Failed to fetch|Failed to fetch|NetworkError|Load failed|fetch failed)$/i.test(error.message.trim()))
  const code = knownCodes.includes(candidate)
    ? candidate
    : knownCodes.includes(httpStatus) ? httpStatus
    : httpStatus === '401' || httpStatus === '403' ? httpStatus
    : isNetworkFailure ? 'NETWORK' : 'UNKNOWN'

  let category = 'unknown_supabase_error'
  if (code === '42501') category = 'rls_or_privileges'
  else if (['23502', '23514', '22P02', '22007'].includes(code)) category = 'payload_or_constraint'
  else if (['42P01', '42703', 'PGRST204', 'PGRST205'].includes(code)) category = 'table_or_schema_mismatch'
  else if (['401', '403', 'PGRST301', 'PGRST303'].includes(code)) category = 'api_key_or_authentication'
  else if (code === 'NETWORK') category = 'network_or_cors'

  return { code, category }
}

export async function prepareReservation(values, clientOverride) {
  const errors = validateReservation(values)
  if (Object.keys(errors).length) return { status: 'invalid', errors }

  const client = clientOverride === undefined ? await getSupabaseClient() : clientOverride
  if (!client) {
    return {
      status: 'not-configured',
      message: 'Falta configurar Supabase. La solicitud no se envió ni se guardó.',
    }
  }

  try {
    const payload = toReservationPayload(values)
    const { error } = await client.from('inquiries').insert(payload)

    if (error) {
      return {
        status: 'error',
        message: 'No se pudo registrar la solicitud. No se abrió WhatsApp; revisa la conexión e inténtalo nuevamente.',
        diagnostic: safeSupabaseDiagnostic(error),
      }
    }

    return {
      status: 'saved',
      message: 'Solicitud registrada. Está pendiente de confirmación de disponibilidad; todavía no es una reserva confirmada.',
    }
  } catch (error) {
    return {
      status: 'error',
      message: 'No se pudo registrar la solicitud. No se abrió WhatsApp; revisa la conexión e inténtalo nuevamente.',
      diagnostic: safeSupabaseDiagnostic(error),
    }
  }
}

export function buildWhatsAppUrl(values, destination = import.meta.env?.VITE_WHATSAPP_BUSINESS_NUMBER) {
  const number = destination?.replace(/\D/g, '')
  if (!number || number.length < 8 || number.length > 15) return ''

  const selectedExperience = [...experiences, adviceOption].find(({ id }) => id === values.experiencia)
  const lines = [
    'Solicitud de reserva — Ruta Andina (pendiente de confirmación)',
    `Nombre: ${values.nombre.trim()}`,
    `País: ${values.pais}`,
    `Ciudad: ${values.ciudad.trim()}`,
    `WhatsApp del cliente: ${values.whatsapp.trim()}`,
    `Experiencia: ${selectedExperience?.name ?? values.experiencia}`,
    `Fecha deseada: ${formatBookingDate(values.fecha)}`,
    `Participantes: ${values.personas === '5+' ? '5 o más' : values.personas}`,
    `Método de pago preferido: ${values.pago}`,
  ]
  if (values.observaciones.trim()) lines.push(`Observaciones: ${values.observaciones.trim()}`)

  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join('\n'))}`
}
