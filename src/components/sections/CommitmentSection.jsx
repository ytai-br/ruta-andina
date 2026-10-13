// Adaptado del diseño original de Stitch; ver docs/BITACORA-IA.md.
import { publicAsset } from '../../lib/publicAsset.js'

export default function CommitmentSection() {

  return (
    <section className="py-16 sm:py-24 bg-[#FAF5EE] border-t border-[#ECE2D5]" data-purpose="commitment-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="font-rustic text-4xl sm:text-5xl lg:text-6xl text-brand-red tracking-wider uppercase">
            {" NUESTRO COMPROMISO "}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          <article className="bg-white rounded-2xl overflow-hidden border border-[#E9DFD2] shadow-xs hover:shadow-lg transition-all flex flex-col group" data-purpose="commitment-card">
            <div className="h-56 sm:h-64 overflow-hidden relative">
              <img alt="Montañista con mochila recorriendo la cumbre de los Andes" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={publicAsset('images/nosotros-04.jpg')} loading="lazy" decoding="async" />
            </div>
            <div className="p-6 flex items-start gap-4 flex-1 bg-[#FFFDFB]">
              <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z">

                  </path>
                </svg>
              </div>
              <div>
                <h3 className="font-rustic text-2xl text-brand-red tracking-wide uppercase leading-tight mb-2">
                  {" Seguridad y responsabilidad "}
                </h3>
                <p className="text-sm text-[#594E47] leading-relaxed">
                  {" Promovemos experiencias planificadas y una adecuada preparación. "}
                </p>
              </div>
            </div>
          </article>
          <article className="bg-white rounded-2xl overflow-hidden border border-[#E9DFD2] shadow-xs hover:shadow-lg transition-all flex flex-col group" data-purpose="commitment-card">
            <div className="h-56 sm:h-64 overflow-hidden relative">
              <img alt="Laguna andina de aguas turquesas rodeada de montañas nevadas" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={publicAsset('images/nosotros-05.jpg')} loading="lazy" decoding="async" />
            </div>
            <div className="p-6 flex items-start gap-4 flex-1 bg-[#FFFDFB]">
              <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3 6 0 12-4 12-12zm-3 2c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z">

                  </path>
                </svg>
              </div>
              <div>
                <h3 className="font-rustic text-2xl text-brand-red tracking-wide uppercase leading-tight mb-2">
                  {" Turismo responsable "}
                </h3>
                <p className="text-sm text-[#594E47] leading-relaxed">
                  {" Fomentamos el cuidado de la naturaleza y el respeto por las comunidades. "}
                </p>
              </div>
            </div>
          </article>
          <article className="bg-white rounded-2xl overflow-hidden border border-[#E9DFD2] shadow-xs hover:shadow-lg transition-all flex flex-col group" data-purpose="commitment-card">
            <div className="h-56 sm:h-64 overflow-hidden relative">
              <img alt="Ciclista de montaña en ruta con vista a los Andes" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={publicAsset('images/nosotros-06.jpg')} loading="lazy" decoding="async" />
            </div>
            <div className="p-6 flex items-start gap-4 flex-1 bg-[#FFFDFB]">
              <div className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm8 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z">

                  </path>
                </svg>
              </div>
              <div>
                <h3 className="font-rustic text-2xl text-brand-red tracking-wide uppercase leading-tight mb-2">
                  {" Experiencias auténticas "}
                </h3>
                <p className="text-sm text-[#594E47] leading-relaxed">
                  {" Buscamos conectar a los viajeros con la diversidad natural y cultural de Bolivia. "}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
