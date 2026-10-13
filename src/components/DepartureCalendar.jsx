import Icon from './Icon.jsx'

const departures = [
  ['18 OCT', 'Camino de la Muerte (Ciclismo)', 'death-road'],
  ['25 OCT', 'Pico Tunari (Trekking)', 'pico-tunari'],
  ['08 NOV', 'Camino del Choro (Trekking)', 'el-choro'],
  ['15 NOV', 'Isla del Sol (Trekking)', 'isla-del-sol'],
]

export default function DepartureCalendar() {
  return (
    <div className="lg:col-span-7 bg-[#FFFDF9] border border-[#E4D8C5] rounded-3xl p-5 sm:p-6 shadow-md">
      <div className="flex flex-col md:flex-row gap-6 justify-between">
        <div className="flex-1 min-w-0 space-y-3">
          <h3 className="flex items-center gap-2 text-andino-wine font-title text-xl font-bold border-b border-stone-200 pb-2"><Icon name="calendar-days" />PRÓXIMAS SALIDAS</h3>
          <ul className="space-y-2.5 text-xs sm:text-sm">
            {departures.map(([date, label, id]) => <li key={id}><a href={`#route-${id}`} className="flex items-center justify-between gap-2 p-2 rounded-lg hover:bg-amber-50/60"><span className="font-title font-bold text-andino-wine px-2 py-0.5 bg-red-100 rounded shrink-0">{date}</span><span className="font-medium text-neutral-800">{label}</span><span className="text-[10px] text-stone-700 font-semibold bg-stone-100 px-2 py-0.5 rounded-full shrink-0">Consultar</span></a></li>)}
          </ul>
        </div>
        <div className="w-full md:w-56 shrink-0 bg-white p-3.5 rounded-2xl border border-stone-200 shadow-inner">
          <p className="font-title text-xs font-bold text-andino-wine mb-2 tracking-wider">OCTUBRE 2024 <span className="text-stone-600">· REFERENCIA</span></p>
          <div aria-hidden="true" className="grid grid-cols-7 gap-1 text-center text-[10px] text-neutral-600 font-semibold mb-1">{['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => <span key={index}>{day}</span>)}</div>
          <div role="group" aria-label="Calendario de referencia de octubre de 2024" className="grid grid-cols-7 gap-1 text-center text-xs">
            <span className="text-neutral-500 py-1">30</span>
            {Array.from({ length: 31 }, (_, index) => index + 1).map((day) => [18, 25].includes(day) ? <a key={day} href={`#route-${day === 18 ? 'death-road' : 'pico-tunari'}`} aria-label={`Ver ruta del ${day} de octubre de referencia`} className="py-1 rounded-full bg-andino-wine text-white font-bold">{day}</a> : <span key={day} className="py-1">{day}</span>)}
          </div>
        </div>
      </div>
      <p className="text-[11px] text-stone-600 mt-4 border-t border-stone-200 pt-3">Fechas del diseño original; no representan salidas confirmadas. Consulta disponibilidad.</p>
    </div>
  )
}
