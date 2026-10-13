import Icon from '../Icon.jsx'

const methods = [
  { value: 'QR Bancario (Bolivia)', title: 'PAGO POR QR BANCARIO', icon: 'qrcode', audience: '🇧🇴 Para visitantes en Bolivia.', description: 'Realiza tu pago mediante QR de una entidad bancaria nacional, una vez confirmada tu reserva.', button: 'Consultar pago nacional' },
  { value: 'Pago Internacional', title: 'PAGO INTERNACIONAL', icon: 'credit-card', audience: '🌐 Para visitantes del extranjero.', description: 'Consulta las opciones de pago disponibles directamente con nuestro equipo.', button: 'Consultar pago internacional' },
]

export default function PaymentMethods({ value, onSelect }) {
  return <section aria-labelledby="payment-title">
    <h2 id="payment-title" className="font-rustic text-3xl sm:text-4xl text-andino-darkRed tracking-wide flex items-center gap-2.5"><Icon name="credit-card" className="text-2xl text-andino-red" />MÉTODOS DE PAGO</h2>
    <p className="text-xs sm:text-sm font-medium text-stone-600 mt-1 mb-5">Los pagos se coordinan directamente con Ruta Andina después de verificar la disponibilidad de la experiencia.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">{methods.map((method) => <div key={method.value} className="bg-white/90 border border-andino-border/80 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <div><div className="flex items-start gap-4 mb-3"><Icon name={method.icon} className="text-andino-red text-4xl sm:text-5xl shrink-0 p-1" /><div><h3 className="font-rustic text-xl sm:text-2xl text-andino-darkRed tracking-wider leading-none">{method.title}</h3><p className="text-xs font-semibold text-stone-700 mt-1">{method.audience}</p></div></div><p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-5">{method.description}</p></div>
      <button type="button" onClick={() => onSelect(method.value)} aria-pressed={value === method.value} className="w-full bg-andino-red hover:bg-andino-darkRed text-white py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm"><span>{method.button}</span><Icon name={value === method.value ? 'check' : 'arrow-right'} /></button>
    </div>)}</div>
  </section>
}
