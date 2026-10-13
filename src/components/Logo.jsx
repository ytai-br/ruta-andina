import { Link } from 'react-router'

export default function Logo({ footer = false }) {
  return (
    <Link to="/" aria-label="Ruta Andina — Inicio" className={`site-logo flex flex-col items-center text-center shrink-0 ${footer ? 'text-white' : 'text-[var(--brand-color)]'}`}>
      <svg aria-hidden="true" viewBox="0 0 24 24" className="w-7 h-7 mb-0.5" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" strokeLinecap="round" />
      </svg>
      <span className="brand-heading text-2xl sm:text-3xl leading-none tracking-wide">RUTA ANDINA</span>
      <span className={`text-[8px] sm:text-[10px] tracking-[0.2em] font-semibold mt-1 ${footer ? 'text-stone-200' : 'text-[#5C4D44]'}`}>TREKKING • CICLISMO • TURISMO</span>
    </Link>
  )
}
