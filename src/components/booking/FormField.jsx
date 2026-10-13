import Icon from '../Icon.jsx'

export default function FormField({ name, label, icon, error, value, onChange, onBlur, options, required = true, type = 'text', ...inputProps }) {
  const common = {
    id: `input-${name}`, name, value, onChange, onBlur, required,
    'aria-invalid': Boolean(error), 'aria-describedby': error ? `error-${name}` : undefined,
    className: 'w-full min-w-0 text-sm bg-stone-50/70 border border-stone-300 rounded-xl px-3 py-2.5 text-stone-800 placeholder-stone-500 focus:ring-2 focus:ring-andino-red/30 focus:border-andino-red transition-all',
    ...inputProps,
  }
  return <div className="min-w-0">
    <label htmlFor={common.id} className="text-xs font-bold text-stone-700 mb-1.5 flex items-center gap-1.5"><Icon name={icon} className="text-andino-red" /><span>{label}{required && <span className="text-andino-red" aria-hidden="true"> *</span>}</span></label>
    {options ? <select {...common}>{options.map(({ value: optionValue, label: optionLabel, disabled }) => <option key={optionValue} value={optionValue} disabled={disabled}>{optionLabel}</option>)}</select> : type === 'textarea' ? <textarea {...common} rows={4} /> : <input {...common} type={type} />}
    {error && <p id={`error-${name}`} className="text-xs text-andino-darkRed font-semibold mt-2">{error}</p>}
  </div>
}
