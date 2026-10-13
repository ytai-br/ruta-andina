// Adaptado del diseño original de Stitch; ver docs/BITACORA-IA.md.
import { publicAsset } from '../../lib/publicAsset.js'

export default function CommunitiesSection() {

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-brand-beigeBg border-t border-[#ECE2D5]" data-purpose="communities-section">
      <div className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-between">
        <svg className="w-96 h-96 -ml-20 text-brand-red stroke-current fill-none" strokeWidth="1.5" aria-hidden="true" focusable="false">
          <path d="M0 300 L 120 120 L 180 200 L 260 80 L 380 300">

          </path>
        </svg>
        <svg className="w-96 h-96 -mr-20 text-brand-red stroke-current fill-none" strokeWidth="1.5" aria-hidden="true" focusable="false">
          <path d="M0 300 L 150 70 L 220 190 L 320 110 L 450 300">

          </path>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center gap-4 mb-10">
          <svg className="w-10 h-10 text-brand-red fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z">

            </path>
          </svg>
          <h2 className="font-rustic text-3xl sm:text-4xl lg:text-5xl text-brand-red tracking-wide uppercase leading-tight">
            {" AVENTURAS CON RESPETO POR NUESTRAS COMUNIDADES "}
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          <div className="lg:col-span-6">
            <p className="text-base sm:text-lg text-[#403630] leading-relaxed mb-6 font-normal">
              {" En Ruta Andina promovemos el turismo responsable, el respeto por las costumbres, los territorios y las personas que habitan cerca de nuestros destinos. Trabajamos en coordinación con las comunidades locales y gestionamos los permisos cuando corresponde, valorando su conocimiento y su forma de vida. "}
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E7DDCE]">
              <img alt="Turista interactuando con personas y tradiciones andinas" className="w-full h-[280px] sm:h-[340px] object-cover hover:scale-105 transition-transform duration-500 ease-out" src={publicAsset('images/nosotros-03.jpg')} loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#ECE2D5]/70">
          <div className="flex items-center gap-4 bg-brand-lightCard/90 border border-[#ECE2D5] rounded-xl p-4 sm:p-5 shadow-xs" data-purpose="community-value-card">
            <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 shadow-xs">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z">

                </path>
              </svg>
            </div>
            <div>
              <h3 className="font-rustic text-xl sm:text-2xl text-brand-red tracking-wide uppercase">
                {"Coordinación y permisos"}
              </h3>
              <p className="text-xs sm:text-sm text-[#4E433D]">
                {" Gestionamos los permisos comunitarios cuando corresponde. "}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-brand-lightCard/90 border border-[#ECE2D5] rounded-xl p-4 sm:p-5 shadow-xs" data-purpose="community-value-card">
            <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 shadow-xs">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3 6 0 12-4 12-12zm-3 2c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z">

                </path>
              </svg>
            </div>
            <div>
              <h3 className="font-rustic text-xl sm:text-2xl text-brand-red tracking-wide uppercase">
                {"Protección del entorno"}
              </h3>
              <p className="text-xs sm:text-sm text-[#4E433D]">
                {" Fomentamos el cuidado de los ecosistemas naturales y culturales. "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
