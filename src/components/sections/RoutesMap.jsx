// Adaptado del diseño original de Stitch; ver docs/BITACORA-IA.md.
import { useState } from 'react'
export default function RoutesMap() {
  const [zoom, setZoom] = useState(1)
  return (
    <section aria-label="Mapa de rutas" role="region" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" data-purpose="routes-map" id="mapa">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-andino-wine text-white rounded-2xl shadow-md">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" strokeLinecap="round" strokeLinejoin="round">

            </path>
          </svg>
        </div>
        <div>
          <h2 className="font-title text-4xl sm:text-5xl font-bold tracking-tight text-andino-wine uppercase leading-none">
            {"MAPA"}
          </h2>
          <p className="text-xs text-neutral-600 tracking-wide uppercase font-semibold mt-1">
            {"Ubicación ilustrativa de nuestras expediciones"}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-4 bg-[#FFFDF9] border border-[#E8DEC8] rounded-3xl p-6 flex flex-col justify-between shadow-xs">
          <div>
            <h3 className="font-title text-xl font-bold uppercase text-andino-charcoal mb-4 border-b border-stone-200 pb-2">
              {" Leyenda de Puntos "}
            </h3>
            <ul className="space-y-4 text-xs">
              <li className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-red-600 shrink-0 shadow-xs border-2 border-white ring-1 ring-red-600/40">

                </span>
                <div>
                  <span className="font-bold text-neutral-800 block">
                    {"Ruta de trekking"}
                  </span>
                  <span className="text-neutral-500 text-[11px]">
                    {"Caminatas de altura y senderos incas"}
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-blue-600 shrink-0 shadow-xs border-2 border-white ring-1 ring-blue-600/40">

                </span>
                <div>
                  <span className="font-bold text-neutral-800 block">
                    {"Ruta de ciclismo"}
                  </span>
                  <span className="text-neutral-500 text-[11px]">
                    {"Descensos técnicos de alta adrenalina"}
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-amber-500 shrink-0 shadow-xs border-2 border-white ring-1 ring-amber-500/40">

                </span>
                <div>
                  <span className="font-bold text-neutral-800 block">
                    {"Destinos turísticos"}
                  </span>
                  <span className="text-neutral-500 text-[11px]">
                    {"Patrimonio cultural, lagos e islas"}
                  </span>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-stone-900 shrink-0 shadow-xs border-2 border-white ring-1 ring-stone-900/40">

                </span>
                <div>
                  <span className="font-bold text-neutral-800 block">
                    {"Nuestra sede central"}
                  </span>
                  <span className="text-neutral-500 text-[11px]">
                    {"Cochabamba, Bolivia"}
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div className="mt-8 pt-4 border-t border-stone-200/80">
            <div className="bg-amber-50 rounded-2xl p-4 text-xs text-neutral-700 space-y-1">
              <p className="font-semibold text-andino-wine">
                {"¿Requieres transporte privado?"}
              </p>
              <p className="text-[11px] text-neutral-600">
                {"Coordinamos traslados desde aeropuertos de La Paz (LPB) y Cochabamba (CBB)."}
              </p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-8 bg-[#E9E4D4] rounded-3xl border border-[#D5C9B3] overflow-hidden relative min-h-[380px] shadow-inner flex flex-col justify-between p-4" data-purpose="interactive-map-canvas">
          <div className="flex items-center justify-between z-10">
            <span className="text-xs bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full font-semibold shadow-xs text-neutral-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500">

              </span>
              {" Mapa Topográfico Andino "}
            </span>
            <div className="flex flex-col gap-1 bg-white rounded-xl shadow-md border border-stone-200 p-1">
              <button onClick={() => setZoom((value) => Math.min(1.6, value + 0.2))} aria-label="Acercar mapa" type="button" className="w-7 h-7 flex items-center justify-center font-bold text-neutral-700 hover:bg-stone-100 rounded">
                {"+"}
              </button>
              <button onClick={() => setZoom((value) => Math.max(1, value - 0.2))} aria-label="Alejar mapa" type="button" className="w-7 h-7 flex items-center justify-center font-bold text-neutral-700 hover:bg-stone-100 rounded">
                {"-"}
              </button>
            </div>
          </div>
          <div style={{ transform: `scale(${zoom})` }} className="relative w-full h-72 sm:h-80 my-2 map-drawing origin-center transition-transform">
            <svg className="w-full h-full opacity-35" preserveAspectRatio="none" viewBox="0 0 800 400" aria-hidden="true" focusable="false">
              <path d="M0 100 Q 200 40, 400 90 T 800 60 L 800 400 L 0 400 Z" fill="#D7CDBC">

              </path>
              <path d="M0 220 Q 300 160, 500 240 T 800 180 L 800 400 L 0 400 Z" fill="#C9BDA6">

              </path>
              <path d="M50 150 C 250 100, 450 120, 750 80" fill="none" stroke="#B8AA91" strokeWidth="2">

              </path>
              <path d="M30 270 C 280 210, 520 260, 780 200" fill="none" stroke="#B8AA91" strokeWidth="2">

              </path>
            </svg>
            <a href="#route-death-road" className="absolute top-[30%] left-[30%] transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
              <div className="flex items-center gap-1.5 bg-white/95 px-2.5 py-1 rounded-full shadow-md border border-blue-400 group-hover:scale-110 transition">
                <span className="w-3 h-3 rounded-full bg-blue-600">

                </span>
                <span className="text-[11px] font-bold text-neutral-800">
                  {"Camino de la Muerte"}
                </span>
              </div>
            </a>
            <a href="#route-el-choro" className="absolute top-[44%] left-[42%] transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
              <div className="flex items-center gap-1.5 bg-white/95 px-2.5 py-1 rounded-full shadow-md border border-red-400 group-hover:scale-110 transition">
                <span className="w-3 h-3 rounded-full bg-red-600">

                </span>
                <span className="text-[11px] font-bold text-neutral-800">
                  {"Camino del Choro"}
                </span>
              </div>
            </a>
            <a href="#route-isla-del-sol" className="absolute top-[14%] left-[20%] transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
              <div className="flex items-center gap-1.5 bg-white/95 px-2.5 py-1 rounded-full shadow-md border border-amber-400 group-hover:scale-110 transition">
                <span className="w-3 h-3 rounded-full bg-amber-500">

                </span>
                <span className="text-[11px] font-bold text-neutral-800">
                  {"Isla del Sol (Titicaca)"}
                </span>
              </div>
            </a>
            <a href="#route-pico-tunari" className="absolute top-[70%] left-[62%] transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
              <div className="flex items-center gap-1.5 bg-white/95 px-2.5 py-1 rounded-full shadow-md border border-red-400 group-hover:scale-110 transition">
                <span className="w-3 h-3 rounded-full bg-red-600">

                </span>
                <span className="text-[11px] font-bold text-neutral-800">
                  {"Pico Tunari"}
                </span>
              </div>
            </a>
            <a href="#route-vacas" className="absolute top-[84%] left-[78%] transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
              <div className="flex items-center gap-1.5 bg-white/95 px-2.5 py-1 rounded-full shadow-md border border-red-400 group-hover:scale-110 transition">
                <span className="w-3 h-3 rounded-full bg-red-600">

                </span>
                <span className="text-[11px] font-bold text-neutral-800">
                  {"20 Lagunas de Vacas"}
                </span>
              </div>
            </a>
            <div className="absolute top-[58%] left-[54%] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="flex items-center gap-1.5 bg-stone-900 text-white px-2.5 py-1 rounded-full shadow-lg border border-amber-400">
                <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z">

                  </path>
                </svg>
                <span className="text-[11px] font-bold">
                  {"Cochabamba (Sede)"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-neutral-600 bg-white/80 backdrop-blur-sm p-2 rounded-xl">
            <span className="text-[11px]">
              {"Coordenadas: 17°23'S 66°09'W • Altiplano "}
              {"&"}
              {" Valles Bolivianos"}
            </span>
            <a className="font-bold text-andino-wine hover:underline" href="https://www.google.com/maps/search/?api=1&amp;query=Cochabamba%2C+Bolivia" rel="noopener noreferrer" target="_blank">
              {" Ver en Google Maps ↗ "}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
