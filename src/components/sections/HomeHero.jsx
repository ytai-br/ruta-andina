// Adaptado del diseño original de Stitch; ver docs/BITACORA-IA.md.
import { useState } from 'react'
import { Link } from 'react-router'
import { publicAsset } from '../../lib/publicAsset.js'
const slides = [
  {
    "src": publicAsset('images/inicio-01.jpg'),
    "alt": "Paisaje de la Cordillera de los Andes bolivianos con senderistas y laguna"
  },
  {
    "src": publicAsset('images/nosotros-01.jpg'),
    "alt": "Montañistas recorriendo senderos en la cordillera de los Andes con vista a lagunas de montaña"
  },
  {
    "src": publicAsset('images/nosotros-02.jpg'),
    "alt": "Montañistas contemplando la cordillera andina y lagunas"
  },
  {
    "src": publicAsset('images/reservas-01.jpg'),
    "alt": "Excursionistas con mochilas frente a laguna y cordillera andina"
  }
]
export default function HomeHero() {
  const [slide, setSlide] = useState(0)
  return (
    <section aria-label="Paisajes de Bolivia" role="region" className="relative bg-stone-900 text-white overflow-hidden py-12 lg:py-20" data-purpose="hero-carousel">
      <div className="absolute inset-0 z-0">
        <img alt={slides[slide].alt} src={slides[slide].src} className="w-full h-full object-cover object-center scale-105 filter brightness-[0.78] contrast-105" fetchPriority="high" decoding="async" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8F3EA] via-transparent to-black/60">

        </div>
        <div className="absolute inset-0 bg-black/60">

        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="w-full flex items-center justify-between mb-8 sm:mb-12 pointer-events-none">
          <button onClick={() => setSlide((current) => (current + slides.length - 1) % slides.length)} type="button" aria-label="Anterior" className="pointer-events-auto p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white border border-white/30 transition transform hover:scale-110">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round">

              </path>
            </svg>
          </button>
          <div className="pointer-events-auto px-4 py-1.5 rounded-full bg-andino-wine/90 backdrop-blur-sm border border-red-300/40 text-xs uppercase tracking-widest font-semibold flex items-center gap-2 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse">

            </span>
            {" Experiencias Auténticas en Bolivia "}
          </div>
          <button onClick={() => setSlide((current) => (current + 1) % slides.length)} type="button" aria-label="Siguiente" className="pointer-events-auto p-3 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white border border-white/30 transition transform hover:scale-110">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round">

              </path>
            </svg>
          </button>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="font-title text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight uppercase drop-shadow-lg leading-tight">
            {" EXPLORA LA ESENCIA "}
            <span className="text-amber-300">
              {"DE BOLIVIA"}
            </span>
          </h1>
          <p className="text-base sm:text-xl text-neutral-100 font-normal max-w-2xl mx-auto drop-shadow-md leading-relaxed">
            {" Rutas auténticas, paisajes inolvidables y experiencias que te conectan con la naturaleza milenaria y la cultura andina. "}
          </p>
          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <a className="px-8 py-3.5 rounded-full bg-andino-wine hover:bg-andino-wineDark text-white font-title text-lg tracking-wider uppercase transition shadow-xl transform hover:-translate-y-1" href="#catalogo">
              {" Ver Catálogo de Rutas "}
            </a>
            <Link to="/nosotros" className="px-8 py-3.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white border border-white/40 font-title text-lg tracking-wider uppercase transition shadow-lg">
              {" Conócenos "}
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-2.5 mt-10">{slides.map((item, index) => <button key={item.src} type="button" aria-label={`Ver paisaje ${index + 1}`} aria-pressed={slide === index} onClick={() => setSlide(index)} className="flex h-8 min-w-8 items-center justify-center"><span className={slide === index ? 'w-8 h-2 rounded-full bg-white' : 'w-2.5 h-2.5 rounded-full bg-white/50'} /></button>)}</div>
      </div>
    </section>
  )
}
