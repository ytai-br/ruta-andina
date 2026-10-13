import { experiences } from '../data/experiences.js'
import RouteCard from '../components/RouteCard.jsx'
import DepartureCalendar from '../components/DepartureCalendar.jsx'
import HomeHero from '../components/sections/HomeHero.jsx'
import ReadySection from '../components/sections/ReadySection.jsx'
import GearSection from '../components/sections/GearSection.jsx'
import RoutesMap from '../components/sections/RoutesMap.jsx'
import HomeValues from '../components/sections/HomeValues.jsx'

export default function HomePage() {
  return <>
    <HomeHero />
    <section id="catalogo" tabIndex={-1} aria-labelledby="catalogo-title" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        <div className="lg:col-span-5 pt-4">
          <div className="inline-flex items-center gap-2 text-andino-wine uppercase tracking-widest text-xs font-bold mb-2"><span className="w-8 h-0.5 bg-andino-wine" />Aventuras Guiadas</div>
          <h2 id="catalogo-title" className="font-title text-5xl sm:text-6xl font-bold tracking-tight text-andino-wine uppercase">CATÁLOGO</h2>
          <p className="text-neutral-700 mt-3 text-sm sm:text-base leading-relaxed max-w-md">Sigue las rutas ancestrales marcadas en nuestro mapa andino. Diseñadas para retar tus sentidos con seguridad profesional certificada.</p>
        </div>
        <DepartureCalendar />
      </div>
      <div className="relative">
        <svg aria-hidden="true" className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none" fill="none" preserveAspectRatio="none" viewBox="0 0 1150 900"><path d="M 180 180 C 280 80, 480 80, 580 180 C 680 280, 880 120, 970 180 C 1030 220, 1050 380, 950 480 C 850 580, 750 480, 680 560 C 600 650, 480 620, 380 640" opacity="0.6" stroke="#98262C" strokeDasharray="7 7" strokeWidth="2.5" /></svg>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative mb-14">{experiences.slice(0, 3).map((experience) => <RouteCard key={experience.id} experience={experience} />)}</div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 relative">{experiences.slice(3).map((experience) => <RouteCard key={experience.id} experience={experience} />)}</div>
      </div>
      <p className="text-xs text-stone-600 text-center mt-6">Tarifas referenciales del catálogo, sujetas a confirmación al consultar.</p>
    </section>
    <ReadySection /><GearSection /><RoutesMap /><HomeValues />
  </>
}
