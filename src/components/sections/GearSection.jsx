// Adaptado del diseño original de Stitch; ver docs/BITACORA-IA.md.
import { Link } from 'react-router'
import { publicAsset } from '../../lib/publicAsset.js'
export default function GearSection() {

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" data-purpose="gear-preparation" id="equipamiento">
      <div className="bg-[#FFFDF9] border border-[#E8DEC8] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs uppercase tracking-widest text-andino-wine font-bold block">
              {"Antes de partir"}
            </span>
            <h2 className="font-title text-4xl sm:text-5xl font-bold tracking-tight text-andino-wine uppercase leading-none">
              {" PREPARACIÓN "}
            </h2>
            <h3 className="font-title text-xl text-neutral-800 uppercase tracking-wide">
              {" EQUIPAMIENTO ESENCIAL "}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              {" La cordillera andina presenta microclimas extremos con cambios repentinos de temperatura y altitud. Contar con el equipo adecuado garantiza tu disfrute y total seguridad. "}
            </p>
            <div className="pt-2">
              <Link to="/reservas?experiencia=asesoramiento" className="inline-flex items-center gap-2 text-xs font-bold text-andino-wine hover:text-andino-wineDark uppercase tracking-wider border-b border-andino-wine pb-0.5">
                <span>
                  {"Consultar equipamiento para mi ruta"}
                </span>
                <span>
                  {"→"}
                </span>
              </Link>
            </div>
          </div>
          <div className="lg:col-span-4 flex justify-center py-4">
            <div className="relative w-64 h-80 sm:w-72 sm:h-96">
              <img alt="Mochila técnica roja de alta montaña para expedición andina" className="w-full h-full object-contain filter drop-shadow-2xl" src={publicAsset('images/inicio-08.jpg')} loading="lazy" decoding="async" />
              <div className="absolute -bottom-2 inset-x-8 h-4 bg-black/20 rounded-full blur-md">

              </div>
            </div>
          </div>
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-amber-50/50 border border-amber-200/60 hover:bg-amber-50 transition">
              <div className="p-2.5 rounded-xl bg-andino-wine text-white shrink-0 shadow-xs">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" strokeLinecap="round" strokeLinejoin="round">

                  </path>
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-title text-sm font-bold uppercase text-andino-charcoal">
                  {"Ropa técnica"}
                </h4>
                <p className="text-[11px] text-neutral-600">
                  {"Sistema 3 capas adecuado al clima de alta montaña."}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-amber-50/50 border border-amber-200/60 hover:bg-amber-50 transition">
              <div className="p-2.5 rounded-xl bg-andino-wine text-white shrink-0 shadow-xs">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" strokeLinecap="round" strokeLinejoin="round">

                  </path>
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-title text-sm font-bold uppercase text-andino-charcoal">
                  {"Calzado de trekking"}
                </h4>
                <p className="text-[11px] text-neutral-600">
                  {"Botas con agarre, caña media y soporte impermeable."}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-amber-50/50 border border-amber-200/60 hover:bg-amber-50 transition">
              <div className="p-2.5 rounded-xl bg-andino-wine text-white shrink-0 shadow-xs">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeLinecap="round" strokeLinejoin="round">

                  </path>
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-title text-sm font-bold uppercase text-andino-charcoal">
                  {"Hidratación"}
                </h4>
                <p className="text-[11px] text-neutral-600">
                  {"Mínimo 2 litros de agua y electrolitos rehidratantes."}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-amber-50/50 border border-amber-200/60 hover:bg-amber-50 transition">
              <div className="p-2.5 rounded-xl bg-andino-wine text-white shrink-0 shadow-xs">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" strokeLinecap="round" strokeLinejoin="round">

                  </path>
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-title text-sm font-bold uppercase text-andino-charcoal">
                  {"Protección solar"}
                </h4>
                <p className="text-[11px] text-neutral-600">
                  {"Bloqueador UV 50+, lentes de sol categoría 3 o 4 y gorra."}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-amber-50/50 border border-amber-200/60 hover:bg-amber-50 transition">
              <div className="p-2.5 rounded-xl bg-andino-wine text-white shrink-0 shadow-xs">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round">

                  </path>
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="font-title text-sm font-bold uppercase text-andino-charcoal">
                  {"Equipo de seguridad"}
                </h4>
                <p className="text-[11px] text-neutral-600">
                  {"Botiquín personal, linterna frontal y silbato de montaña."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
