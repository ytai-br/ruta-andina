import { experiences, adviceOption } from '../../data/experiences.js'
import Icon from '../Icon.jsx'

function ExperienceChoice({ experience, value, onChange }) {
  return <label className="adventure-card relative cursor-pointer block select-none group">
    <input className="sr-only" type="radio" name="experiencia" value={experience.id} checked={value === experience.id} onChange={onChange} aria-label={experience.name} />
    <div className="card-border-indicator bg-white/95 border-2 border-stone-200/90 rounded-2xl p-4 sm:p-5 flex flex-col items-center text-center transition-all hover:border-andino-red/50 hover:shadow-md h-full">
      <span className="card-check-badge absolute top-3 left-3 w-5 h-5 rounded-full border-2 border-stone-300 flex items-center justify-center" />
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-stone-100 shadow-md mb-3 group-hover:scale-105 transition-transform"><img src={experience.bookingImage} alt="" loading="lazy" width="112" height="112" className="w-full h-full object-cover" /></div>
      <h3 className="font-rustic text-xl text-andino-darkRed tracking-wide leading-tight max-w-36">{experience.name}</h3>
      <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 mt-1"><Icon name={experience.icon} className="text-andino-red" />{experience.category}</div>
    </div>
  </label>
}

export default function ExperienceSelector({ value, onChange, error }) {
  return <section>
    <h2 id="experience-title" className="font-rustic text-3xl sm:text-4xl text-andino-darkRed tracking-wide text-center w-full">¿QUÉ AVENTURA QUIERES VIVIR?</h2>
    <p className="text-xs sm:text-sm font-medium text-stone-600 text-center mb-6 sm:mb-8">Selecciona la experiencia que te interesa.</p>
    <fieldset aria-labelledby="experience-title" aria-describedby={error ? 'error-experiencia' : undefined}>
      <legend className="sr-only">Selecciona una experiencia</legend>
    <div className="space-y-4 sm:space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">{experiences.slice(0, 3).map((experience) => <ExperienceChoice key={experience.id} experience={experience} value={value} onChange={onChange} />)}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">{experiences.slice(3).map((experience) => <ExperienceChoice key={experience.id} experience={experience} value={value} onChange={onChange} />)}</div>
      <div className="max-w-xl mx-auto pt-2"><label className="adventure-card relative cursor-pointer flex items-center gap-3 bg-white/90 border border-stone-200 rounded-2xl p-3.5 sm:px-6 shadow-xs">
        <input type="radio" className="sr-only" name="experiencia" value={adviceOption.id} checked={value === adviceOption.id} onChange={onChange} aria-label={adviceOption.name} />
        <span className="card-check-badge w-5 h-5 rounded-full border-2 border-stone-300 shrink-0 flex items-center justify-center" />
        <span className="w-7 h-7 rounded-full bg-red-100 text-andino-red flex items-center justify-center shrink-0" aria-hidden="true">?</span>
        <span><span className="block font-bold text-xs sm:text-sm text-andino-darkRed">{adviceOption.name}</span><span className="text-xs text-stone-600">Quiero que el equipo de Ruta Andina me recomiende la mejor opción.</span></span>
      </label></div>
    </div>
    {error && <p id="error-experiencia" className="text-sm text-andino-darkRed mt-2">{error}</p>}
    </fieldset>
  </section>
}
