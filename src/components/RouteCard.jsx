import { Link } from 'react-router'
import Icon from './Icon.jsx'

export default function RouteCard({ experience }) {
  return (
    <article id={`route-${experience.id}`} tabIndex={-1} className="route-card-bg border border-[#E8DEC8] rounded-3xl p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div>
        <div className="relative w-44 h-44 mx-auto mb-6">
          <img src={experience.image} alt={experience.imageAlt} loading="lazy" width="176" height="176" className="w-full h-full rounded-full object-cover route-circle-photo group-hover:scale-105 transition-transform duration-500" />
          <span className="absolute -bottom-2 -left-2 bg-andino-wine text-white p-3 rounded-full shadow-lg border-2 border-white"><Icon name={experience.icon} className="w-5 h-5 text-center" /></span>
          <span className="absolute -top-3 -right-2 text-andino-wine"><Icon name="location-dot" className="text-3xl" /></span>
        </div>
        <div className="text-center mb-4">
          <h3 className="font-title text-2xl font-bold uppercase text-andino-charcoal group-hover:text-andino-wine transition-colors">{experience.name}</h3>
          <p className="text-xs uppercase tracking-wider text-neutral-600 font-semibold flex items-center justify-center gap-1 mt-1"><Icon name="location-dot" className="text-andino-wine" />{experience.location}</p>
        </div>
        <p className="text-xs text-neutral-600 leading-relaxed text-center mb-6">{experience.description}</p>
        <dl className="grid grid-cols-2 gap-2 text-xs border-y border-stone-200/80 py-3 mb-6 bg-stone-50/50 rounded-xl px-3">
          {[['clock', 'Duración', experience.duration], ['mountain', 'Altitud', experience.altitude], ['chart-simple', 'Dificultad', experience.difficulty], ['sun', 'Salida', experience.departure]].map(([icon, label, value]) => <div key={label} className="flex items-center gap-2 text-neutral-700"><Icon name={icon} className="text-andino-wine" /><dt className="sr-only">{label}</dt><dd>{label === 'Dificultad' ? 'Dificultad: ' : label === 'Salida' ? 'Salida: ' : ''}{value}</dd></div>)}
        </dl>
      </div>
      <div className="flex items-center justify-between gap-2 pt-2">
        <div><span className="font-title text-2xl font-bold text-andino-wine block leading-none">Bs. {experience.price}</span><span className="text-[10px] text-neutral-600 uppercase tracking-wider">Por persona</span></div>
        <Link to={`/reservas?experiencia=${experience.id}`} aria-label={`Reservar ${experience.name}`} className="px-5 py-2.5 rounded-full bg-andino-wine hover:bg-andino-wineDark text-white font-title text-xs tracking-wider uppercase flex items-center gap-1.5 shadow-sm">Reservar <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  )
}
