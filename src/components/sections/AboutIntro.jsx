// Adaptado del diseño original de Stitch; ver docs/BITACORA-IA.md.
import { publicAsset } from '../../lib/publicAsset.js'

export default function AboutIntro() {

  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" data-purpose="about-section">
      <div className="mb-10 text-center sm:text-left">
        <h2 className="font-rustic text-4xl sm:text-5xl text-brand-red tracking-wide uppercase inline-block">
          {" ¿QUIÉNES SOMOS? "}
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7">
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#E9E0D2] group">
            <img alt="Montañistas contemplando la cordillera andina y lagunas" className="w-full h-[320px] sm:h-[400px] object-cover group-hover:scale-105 transition-transform duration-500 ease-out" src={publicAsset('images/nosotros-02.jpg')} loading="lazy" decoding="async" />
          </div>
        </div>
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-brand-creamCard/80 border border-[#ECE2D5] rounded-2xl p-6 sm:p-7 flex items-start gap-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:border-brand-red/40 transition-all" data-purpose="mission-card">
            <div className="w-14 h-14 rounded-full bg-brand-creamCard border border-brand-red/30 flex items-center justify-center shrink-0 shadow-xs">
              <svg className="w-7 h-7 text-brand-red" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <circle cx="12" cy="12" r="9">

                </circle>
                <circle cx="12" cy="12" r="5">

                </circle>
                <circle cx="12" cy="12" fill="currentColor" r="1.5">

                </circle>
              </svg>
            </div>
            <div>
              <h3 className="font-rustic text-2xl sm:text-3xl text-brand-red tracking-wide uppercase mb-1">
                {"MISIÓN"}
              </h3>
              <p className="text-sm sm:text-base text-[#4A403A] leading-relaxed">
                {" Ofrecer experiencias de aventura responsables, organizadas y memorables. "}
              </p>
            </div>
          </div>
          <div className="bg-brand-creamCard/80 border border-[#ECE2D5] rounded-2xl p-6 sm:p-7 flex items-start gap-5 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:border-brand-red/40 transition-all" data-purpose="vision-card">
            <div className="w-14 h-14 rounded-full bg-brand-creamCard border border-brand-red/30 flex items-center justify-center shrink-0 shadow-xs">
              <svg className="w-7 h-7 text-brand-red" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M12 6.5a2 2 0 100-4 2 2 0 000 4zm7 2.5a4 4 0 00-4 4v7h2.5a1.5 1.5 0 001.5-1.5V9zm-14 0a4 4 0 014 4v7H6.5A1.5 1.5 0 015 18.5V9z">

                </path>
                <path d="M10 13a2 2 0 114 0v4h-4v-4z">

                </path>
              </svg>
            </div>
            <div>
              <h3 className="font-rustic text-2xl sm:text-3xl text-brand-red tracking-wide uppercase mb-1">
                {"VISIÓN"}
              </h3>
              <p className="text-sm sm:text-base text-[#4A403A] leading-relaxed">
                {" Ser un referente del turismo de aventura sostenible en Bolivia. "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
