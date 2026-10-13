// Adaptado del diseño original de Stitch; ver docs/BITACORA-IA.md.

export default function HomeValues() {

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" data-purpose="about-us" id="valores">
      <div className="border-t border-[#E4D8C5] pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-andino-wine mb-4 mx-auto md:mx-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round">

                </path>
              </svg>
            </div>
            <h2 className="font-title text-xl font-bold uppercase text-andino-wine">
              {"Guías Certificados"}
            </h2>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {" Instructores con certificación WFR (Socorrismo en Zonas Agrestes) y amplio conocimiento botánico, geológico e histórico andino. "}
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-andino-wine mb-4 mx-auto md:mx-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round">

                </path>
              </svg>
            </div>
            <h2 className="font-title text-xl font-bold uppercase text-andino-wine">
              {"Turismo Sostenible"}
            </h2>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {" Trabajamos mano a mano con comunidades locales de los Yungas y del lago, fomentando economía circular y política de basura cero. "}
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center text-andino-wine mb-4 mx-auto md:mx-0">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round">

                </path>
              </svg>
            </div>
            <h2 className="font-title text-xl font-bold uppercase text-andino-wine">
              {"Pasión Boliviana"}
            </h2>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {" Más de 8 años trazando senderos únicos, conectando viajeros del mundo con los rincones más sobrecogedores del corazón de Sudamérica. "}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
