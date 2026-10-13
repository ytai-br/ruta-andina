import { experiences, adviceOption } from '../../data/experiences.js'
import { formatBookingDate } from '../../lib/reservation.js'
import Icon from '../Icon.jsx'
import FormField from './FormField.jsx'

export default function BookingSummary({ values, errors, onChange, onBlur, submitting, status, statusType, diagnostic, whatsappUrl }) {
  const selected = [...experiences, adviceOption].find((experience) => experience.id === values.experiencia)
  const columns = [
    [['nombre', 'Nombre', values.nombre, 'user'], ['pais', 'País', values.pais, 'earth-americas'], ['ciudad', 'Ciudad', values.ciudad, 'location-dot'], ['whatsapp', 'WhatsApp', values.whatsapp, 'phone']],
    [['experiencia', 'Experiencia', selected?.name, 'person-hiking'], ['fecha', 'Fecha', formatBookingDate(values.fecha), 'calendar'], ['personas', 'Participantes', values.personas === '5+' ? '5+ personas' : values.personas, 'user-group'], ['pago', 'Método de pago', values.pago, 'credit-card']],
  ]
  return <section aria-labelledby="summary-title">
    <h2 id="summary-title" className="font-rustic text-3xl sm:text-4xl text-andino-darkRed tracking-wide flex items-center gap-2.5"><Icon name="clipboard-check" className="text-2xl text-andino-red" />VERIFICA TU RESERVA</h2>
    <p className="text-xs sm:text-sm font-medium text-stone-600 mt-1 mb-5">Revisa que toda la información sea correcta antes de validar tu solicitud.</p>
    <div className="bg-white/95 border border-andino-border/90 rounded-2xl p-5 sm:p-8 shadow-xs space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-stone-200">
        {columns.map((column, index) => <dl key={index} className={`space-y-3 min-w-0 ${index ? 'pt-4 md:pt-0 md:pl-6' : ''}`}>{column.map(([key, label, value, icon]) => <div key={key} className="flex items-start gap-2 text-xs sm:text-sm min-w-0"><Icon name={icon} className="text-andino-red w-4 mt-0.5 shrink-0" /><dt className="font-bold text-stone-700">{label}:</dt><dd id={`summary-${key}`} className="text-stone-900 font-semibold min-w-0 wrap-anywhere">{value?.trim() || '—'}</dd></div>)}</dl>)}
        <div className="pt-4 md:pt-0 md:pl-6"><FormField name="observaciones" label="Observaciones / Solicitudes especiales" icon="comment-dots" type="textarea" required={false} maxLength={1000} placeholder="¿Tienes alguna preferencia de horario, restricción alimentaria o consulta?" value={values.observaciones} error={errors.observaciones} onChange={onChange} onBlur={onBlur} /></div>
      </div>
      <div className="pt-4 border-t border-stone-200">
        <label className="flex items-start justify-center gap-2.5 cursor-pointer text-xs sm:text-sm text-stone-700">
          <input id="input-confirmacion" name="confirmacion" type="checkbox" checked={values.confirmacion} onChange={onChange} required aria-invalid={Boolean(errors.confirmacion)} aria-describedby={errors.confirmacion ? 'error-confirmacion' : undefined} className="rounded border-stone-300 text-andino-red focus:ring-andino-red mt-0.5 w-4 h-4 shrink-0" />
          <span>He revisado mis datos y entiendo que mi reserva está sujeta a confirmación de disponibilidad.</span>
        </label>
        {errors.confirmacion && <p id="error-confirmacion" className="text-xs text-andino-darkRed font-semibold mt-2 text-center">{errors.confirmacion}</p>}
      </div>
      <div className="flex flex-col items-center gap-3 pt-2">
        <button type="submit" disabled={submitting || statusType === 'success'} className={`w-full sm:w-auto sm:min-w-[420px] text-white py-3.5 px-5 sm:px-8 rounded-xl flex items-center justify-center gap-3 shadow-lg disabled:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 ${statusType === 'success' ? 'bg-green-700 hover:bg-green-800 focus-visible:outline-green-700' : 'bg-andino-red hover:bg-andino-darkRed focus-visible:outline-andino-red'}`}><Icon name={statusType === 'success' ? 'circle-check' : 'clipboard-check'} className="text-xl" /><span className="font-rustic text-lg sm:text-xl tracking-wider">{submitting ? 'Guardando solicitud…' : statusType === 'success' ? 'Solicitud enviada' : 'Validar solicitud'}</span>{statusType !== 'success' && <Icon name="arrow-right" />}</button>
        <p className="text-xs text-stone-600 text-center">Al validar, primero registraremos tu solicitud. La disponibilidad debe confirmarse; no se confirma una reserva ni se envía un mensaje de WhatsApp sin tu acción.</p>
        <p role="status" aria-live="polite" className={`text-sm font-semibold text-center ${statusType === 'success' ? 'text-green-800' : 'text-andino-darkRed'}`}>{status}</p>
        {statusType === 'error' && diagnostic && <p role="note" className="text-xs text-stone-600 text-center" data-testid="safe-supabase-diagnostic">Diagnóstico temporal: {diagnostic.code} ({diagnostic.category}). No se muestran mensajes técnicos ni datos del formulario.</p>}
        {whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="inline-flex rounded-xl border border-green-700 px-4 py-2 text-sm font-bold text-green-800 underline focus-visible:outline-2 focus-visible:outline-offset-2">Revisar y enviar en WhatsApp</a>}
      </div>
    </div>
  </section>
}
