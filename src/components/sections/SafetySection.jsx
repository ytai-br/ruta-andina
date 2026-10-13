// Adaptado del diseño original de Stitch; ver docs/BITACORA-IA.md.

export default function SafetySection() {

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden bg-brand-beigeBg border-t border-[#ECE2D5]" data-purpose="security-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-brand-red flex items-center justify-center text-white shrink-0 shadow-xs">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M19 10.5h-5.5V5c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v5.5H5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h5.5V19c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-5.5H19c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5z">

                </path>
              </svg>
            </div>
            <h2 className="font-rustic text-3xl sm:text-4xl lg:text-5xl text-brand-red tracking-wide uppercase">
              {" TU SEGURIDAD ES NUESTRA PRIORIDAD "}
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-4 text-brand-red/80 select-none">
            <svg className="w-8 h-8 fill-brand-red" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L6 8.3V13h2V9.6l1.8-.7z">

              </path>
            </svg>
            <svg className="w-36 h-8 stroke-brand-red fill-none" strokeDasharray="3 3" strokeWidth="2" aria-hidden="true" focusable="false">
              <path d="M2 15 C 20 28, 40 2, 70 14 C 95 24, 115 10, 140 12">

              </path>
            </svg>
            <svg className="w-20 h-10 stroke-[#BFAEA2] fill-none" strokeWidth="1.5" aria-hidden="true" focusable="false">
              <path d="M2 28 L 14 8 L 22 18 L 32 4 L 46 28">

              </path>
              <circle cx="48" cy="8" r="4" stroke="#98262C">

              </circle>
            </svg>
          </div>
        </div>
        <p className="max-w-4xl text-base sm:text-lg text-[#4A403A] leading-relaxed mb-12">
          {" El trekking y el ciclismo de montaña son actividades que requieren preparación, responsabilidad y respeto por los riesgos naturales. En Ruta Andina planificamos cada experiencia priorizando la seguridad de nuestros visitantes. "}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          <div className="bg-brand-lightCard border border-[#E9DFD2] rounded-xl p-5 text-center flex flex-col items-center hover:border-brand-red/50 hover:shadow-md transition-all" data-purpose="safety-pillar">
            <div className="w-12 h-12 flex items-center justify-center text-brand-red mb-3">
              <svg className="w-8 h-8 fill-brand-red" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M14 6l-3.8 5L8 9.5 2 18h20L14 6zm-1.8 7l1.8-2.3L17.6 16H6.4l2.6-3.7 1.8 1.4 1.4-1.7zM18 2h2v4h-2V2z">

                </path>
              </svg>
            </div>
            <h3 className="font-rustic text-xl text-brand-red tracking-wide uppercase mb-2">
              {"Evaluación de rutas"}
            </h3>
            <p className="text-xs sm:text-sm text-[#594F48] leading-relaxed">
              {" Analizamos la dificultad y las condiciones de cada ruta. "}
            </p>
          </div>
          <div className="bg-brand-lightCard border border-[#E9DFD2] rounded-xl p-5 text-center flex flex-col items-center hover:border-brand-red/50 hover:shadow-md transition-all" data-purpose="safety-pillar">
            <div className="w-12 h-12 flex items-center justify-center text-brand-red mb-3">
              <svg className="w-8 h-8 fill-brand-red" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M2 18v-2h2v-2c0-.55.45-1 1-1h1V9c0-1.1.9-2 2-2h3c.55 0 1 .45 1 1v2h2c.55 0 1 .45 1 1v3h2c.55 0 1 .45 1 1v1h2c1.1 0 2 .9 2 2v2H2zm4-4h2v-2H6v2zm4 0h2v-2h-2v2zm-4 4h14v-1h-2v-1h-3v-2H8v2H6v2z">

                </path>
              </svg>
            </div>
            <h3 className="font-rustic text-xl text-brand-red tracking-wide uppercase mb-2">
              {"Preparación adecuada"}
            </h3>
            <p className="text-xs sm:text-sm text-[#594F48] leading-relaxed">
              {" Brindamos recomendaciones de preparación física y equipamiento. "}
            </p>
          </div>
          <div className="bg-brand-lightCard border border-[#E9DFD2] rounded-xl p-5 text-center flex flex-col items-center hover:border-brand-red/50 hover:shadow-md transition-all" data-purpose="safety-pillar">
            <div className="w-12 h-12 flex items-center justify-center text-brand-red mb-3">
              <svg className="w-8 h-8 fill-brand-red" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M8.5 7h7c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5h-7C7.67 21 7 20.33 7 19.5v-11C7 7.67 7.67 7 8.5 7zM11 2h2v4h-2V2zm-1 9v2h4v-2h-4zm0 4v2h4v-2h-4z">

                </path>
              </svg>
            </div>
            <h3 className="font-rustic text-xl text-brand-red tracking-wide uppercase mb-2">
              {"Comunicación"}
            </h3>
            <p className="text-xs sm:text-sm text-[#594F48] leading-relaxed">
              {" Mantenemos coordinación durante todas las excursiones. "}
            </p>
          </div>
          <div className="bg-brand-lightCard border border-[#E9DFD2] rounded-xl p-5 text-center flex flex-col items-center hover:border-brand-red/50 hover:shadow-md transition-all" data-purpose="safety-pillar">
            <div className="w-12 h-12 flex items-center justify-center text-brand-red mb-3">
              <svg className="w-8 h-8 fill-brand-red" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2zm-1 9h-2v2H9v-2H7v-2h2v-2h2v2h2v2z">

                </path>
              </svg>
            </div>
            <h3 className="font-rustic text-xl text-brand-red tracking-wide uppercase mb-2">
              {"Protocolos de emergencia"}
            </h3>
            <p className="text-xs sm:text-sm text-[#594F48] leading-relaxed">
              {" Contamos con un plan de respuesta ante accidentes y emergencias. "}
            </p>
          </div>
          <div className="bg-brand-lightCard border border-[#E9DFD2] rounded-xl p-5 text-center flex flex-col items-center hover:border-brand-red/50 hover:shadow-md transition-all" data-purpose="safety-pillar">
            <div className="w-12 h-12 flex items-center justify-center text-brand-red mb-3">
              <svg className="w-8 h-8 fill-brand-red" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM10 17l-3.5-3.5 1.41-1.41L10 14.17l5.09-5.09L16.5 10.5 10 17z">

                </path>
              </svg>
            </div>
            <h3 className="font-rustic text-xl text-brand-red tracking-wide uppercase mb-2">
              {"Planificación"}
            </h3>
            <p className="text-xs sm:text-sm text-[#594F48] leading-relaxed">
              {" Evaluamos las condiciones climáticas y planificamos cada salida de forma responsable. "}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
