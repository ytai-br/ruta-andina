import { useState } from 'react'
import { useSearchParams } from 'react-router'
import Swal from 'sweetalert2'
import PageBanner from '../components/PageBanner.jsx'
import FormField from '../components/booking/FormField.jsx'
import ExperienceSelector from '../components/booking/ExperienceSelector.jsx'
import PaymentMethods from '../components/booking/PaymentMethods.jsx'
import BookingSummary from '../components/booking/BookingSummary.jsx'
import { countries, participantOptions } from '../data/bookingOptions.js'
import { experiences, adviceOption } from '../data/experiences.js'
import { todayInBolivia, validateReservation } from '../lib/reservation.js'
import { publicAsset } from '../lib/publicAsset.js'
import { buildWhatsAppUrl, prepareReservation } from '../services/reservationService.js'

export default function ReservationsPage() {
  const [params] = useSearchParams()
  const [values, setValues] = useState(() => ({ nombre: '', pais: '', ciudad: '', whatsapp: '', personas: '1', fecha: '', experiencia: [...experiences, adviceOption].some((experience) => experience.id === params.get('experiencia')) ? params.get('experiencia') : experiences[0].id, pago: 'A coordinar', observaciones: '', confirmacion: false }))
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('')
  const [statusType, setStatusType] = useState('')
  const [diagnostic, setDiagnostic] = useState(null)
  const [whatsappUrl, setWhatsappUrl] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function changeValue(name, value) {
    const next = { ...values, [name]: value }
    setValues(next)
    setStatus('')
    setStatusType('')
    setDiagnostic(null)
    setWhatsappUrl('')
    if (errors[name]) setErrors((current) => ({ ...current, [name]: validateReservation(next)[name] }))
  }
  function handleChange(event) {
    changeValue(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)
  }
  function handleBlur(event) {
    const { name } = event.target
    setErrors((current) => ({ ...current, [name]: validateReservation(values)[name] }))
  }
  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const validation = validateReservation(values)
    setErrors(validation)
    setStatus('')
    setStatusType('')
    setDiagnostic(null)
    if (Object.keys(validation).length) {
      const firstInvalidField = Object.keys(validation)[0]
      const fieldLabels = {
        nombre: 'Nombre completo', pais: 'País', ciudad: 'Ciudad', whatsapp: 'WhatsApp',
        personas: 'Cantidad de personas', fecha: 'Fecha deseada', experiencia: 'Experiencia',
        pago: 'Método de pago', observaciones: 'Observaciones', confirmacion: 'Confirmación',
      }
      const missingFields = Object.keys(validation).map((name) => `${fieldLabels[name] || name}: ${validation[name]}`)
      await Swal.fire({
        icon: 'warning',
        title: 'Revisa tu solicitud',
        text: missingFields.join('\n'),
        confirmButtonText: 'Entendido',
        customClass: { popup: 'ruta-swal-popup', title: 'ruta-swal-title', htmlContainer: 'ruta-swal-content', confirmButton: 'ruta-swal-confirm' },
        buttonsStyling: false,
      })
      form.elements.namedItem(firstInvalidField)?.focus?.()
      return
    }
    setSubmitting(true)
    try {
      const result = await prepareReservation(values)
      if (result.status === 'invalid') {
        setErrors(result.errors)
        return
      }
      if (result.status !== 'saved') {
        setStatusType('error')
        setDiagnostic(result.diagnostic ?? null)
        setStatus(result.message)
        return
      }

      const url = buildWhatsAppUrl(values)
      setWhatsappUrl(url)
      setStatusType('success')
      setDiagnostic(null)
      const successText = url
        ? 'Guardamos tu solicitud. Continuaremos por WhatsApp para que revises y envíes el mensaje. La disponibilidad aún debe confirmarse; esta solicitud no es una reserva confirmada.'
        : 'Guardamos tu solicitud, pero falta configurar el número de WhatsApp de Ruta Andina. La disponibilidad aún debe confirmarse.'
      setStatus(successText)
      const popupResult = await Swal.fire({
        icon: 'success',
        title: '¡Solicitud enviada!',
        text: successText,
        confirmButtonText: url ? 'Continuar a WhatsApp' : 'Cerrar',
        showConfirmButton: true,
        customClass: { popup: 'ruta-swal-popup ruta-swal-success', title: 'ruta-swal-title', htmlContainer: 'ruta-swal-content', confirmButton: 'ruta-swal-confirm ruta-swal-confirm-success' },
        buttonsStyling: false,
        allowOutsideClick: false,
      })
      if (popupResult.isConfirmed && url) {
        window.open(url, '_blank', 'noopener,noreferrer')
      }
    } catch {
      setStatusType('error')
      setDiagnostic({ code: 'UNKNOWN', category: 'unknown_supabase_error' })
      setStatus('No se pudo registrar la solicitud. No se abrió WhatsApp; vuelve a intentarlo.')
    } finally { setSubmitting(false) }
  }
  const field = (name) => ({ name, value: values[name], error: errors[name], onChange: handleChange, onBlur: handleBlur })

  return <>
    <PageBanner variant="booking" title="RESERVA" image={publicAsset('images/reservas-01.jpg')} alt="Excursionistas con mochilas frente a laguna y cordillera andina" />
    <form noValidate onSubmit={handleSubmit} aria-label="Solicitud de reserva" className="max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full space-y-12">
      <section id="formulario-reserva" aria-labelledby="booking-title">
        <h2 id="booking-title" className="font-rustic text-3xl sm:text-4xl text-andino-darkRed tracking-wide">PLANIFICA TU AVENTURA</h2>
        <p className="text-xs sm:text-sm font-medium text-stone-600 mt-1 mb-6">Completa tus datos y revisa tu solicitud. Los campos con * son obligatorios.</p>
        {Object.values(errors).some(Boolean) && <div role="alert" className="rounded-xl border border-red-300 bg-red-50 text-andino-darkRed p-4 mb-4 text-sm">Revisa los campos marcados antes de continuar.</div>}
        <div className="bg-white/90 border border-andino-border/80 rounded-2xl p-5 sm:p-7 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          <FormField {...field('nombre')} label="Nombre completo" icon="user" placeholder="Tu nombre completo" autoComplete="name" maxLength={120} />
          <FormField {...field('pais')} label="País de procedencia" icon="earth-americas" autoComplete="country-name" options={[{ value: '', label: 'Selecciona tu país', disabled: true }, ...countries.map((country) => ({ value: country, label: country }))]} />
          <FormField {...field('ciudad')} label="Ciudad" icon="location-dot" placeholder="Tu ciudad" autoComplete="address-level2" maxLength={100} />
          <FormField {...field('whatsapp')} label="Número de WhatsApp" icon="phone" type="tel" placeholder="+591 71234567" autoComplete="tel" maxLength={30} />
          <FormField {...field('personas')} label="Cantidad de personas" icon="user-group" options={participantOptions.map((count) => ({ value: count, label: count === '5+' ? '5+ personas' : count }))} />
          <FormField {...field('fecha')} label="Fecha deseada" icon="calendar" type="date" min={todayInBolivia()} />
        </div>
      </section>
      <ExperienceSelector value={values.experiencia} onChange={handleChange} error={errors.experiencia} />
      <PaymentMethods value={values.pago} onSelect={(value) => changeValue('pago', value)} />
      <BookingSummary values={values} errors={errors} onChange={handleChange} onBlur={handleBlur} status={status} statusType={statusType} diagnostic={diagnostic} whatsappUrl={whatsappUrl} submitting={submitting} />
    </form>
  </>
}
