// Adaptado del diseño original de Stitch; ver docs/BITACORA-IA.md.
import { Link } from 'react-router'
import { publicAsset } from '../../lib/publicAsset.js'
export default function ReadySection() {

  return (
    <section className="relative bg-stone-900 text-white overflow-hidden my-12" data-purpose="are-you-ready-cta">
      <div className="absolute inset-0 z-0">
        <img alt="Excursionista con mochila contemplando la inmensidad de los Andes" className="w-full h-full object-cover object-center filter brightness-90 contrast-105" src={publicAsset('images/inicio-07.jpg')} loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/60 to-black/40">

        </div>
        <div className="absolute inset-0 bg-andino-wine/20 mix-blend-multiply">

        </div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-amber-300 uppercase tracking-widest text-xs font-bold mb-3">
            <span className="w-6 h-0.5 bg-amber-300">

            </span>
            {" Acepta el desafío "}
          </div>
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <h2 className="font-title text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white uppercase drop-shadow-md">
              {" ¿ESTÁS LISTO? "}
            </h2>
            <svg className="w-16 h-16 sm:w-20 sm:h-20 text-amber-400 shrink-0 animate-spin" fill="none" stroke="currentColor" strokeWidth="4" style={{"animationDuration":"25s"}} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
              <path d="M50 10 A40 40 0 0 1 90 50 A40 40 0 0 1 50 90 A40 40 0 0 1 10 50 A40 40 0 0 1 50 10 Z" strokeDasharray="8 6">

              </path>
              <path d="M50 25 A25 25 0 0 1 75 50 A25 25 0 0 1 50 75 A25 25 0 0 1 25 50 A25 25 0 0 1 50 25 Z">

              </path>
              <circle cx="50" cy="50" fill="currentColor" r="10">

              </circle>
            </svg>
          </div>
          <p className="text-neutral-200 text-sm sm:text-base leading-relaxed drop-shadow">
            {" La cordillera te espera. Prepárate con guías locales expertos, equipo de primera categoría y rutas diseñadas con pasión por la aventura boliviana. "}
          </p>
        </div>
        <div className="shrink-0">
          <Link to="/reservas" className="bg-amber-400 hover:bg-amber-500 text-andino-charcoal px-8 py-4 rounded-full font-title text-lg tracking-wider uppercase shadow-2xl transition transform hover:scale-105 active:scale-95 flex items-center gap-3">
            <span>
              {"UNIRME AHORA"}
            </span>
            <span className="text-xl">
              {"➔"}
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
