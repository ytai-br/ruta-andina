import { useRef, useState } from 'react'
import { NavLink } from 'react-router'
import Icon from './Icon.jsx'
import Logo from './Logo.jsx'

export default function Header() {
  const [open, setOpen] = useState(false)
  const toggle = useRef(null)
  function handleKeyDown(event) {
    if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus() }
  }
  return (
    <header className="site-header sticky top-0 z-50 border-b shadow-xs backdrop-blur-md" onKeyDown={handleKeyDown}>
      <nav aria-label="Principal" className="header-inner max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        <NavLink to="/nosotros" className={({ isActive }) => `hidden md:flex items-center gap-2.5 text-[var(--brand-color)] group ${isActive ? 'underline underline-offset-8' : ''}`}>
          <span className="p-2 rounded-full bg-red-100/60"><Icon name="users" /></span>
          <span className="brand-heading text-lg tracking-wider uppercase">Nosotros</span>
        </NavLink>
        <button ref={toggle} type="button" aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)} className="md:hidden w-11 h-11 shrink-0 text-[var(--brand-color)] rounded-lg border border-current flex items-center justify-center">
          <Icon name={open ? 'xmark' : 'bars'} className="text-xl" />
        </button>
        <Logo />
        <NavLink to="/reservas" className="reservation-nav inline-flex items-center justify-center gap-2 bg-[var(--brand-color)] hover:brightness-90 text-white px-3 sm:px-6 py-2.5 shadow-sm brand-heading text-base tracking-wider uppercase">
          <Icon name="calendar-days" /><span className="hidden sm:inline">Reservas</span><span className="sr-only sm:hidden">Reservas</span><span className="hidden sm:inline" aria-hidden="true">→</span>
        </NavLink>
      </nav>
      {open && <nav id="mobile-menu" aria-label="Menú móvil" className="md:hidden border-t border-stone-200 bg-[#FBF6EE] px-4 py-3 flex flex-col gap-1">
        {[['/', 'Inicio'], ['/nosotros', 'Nosotros'], ['/reservas', 'Reservas']].map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setOpen(false)} className={({ isActive }) => `rounded-lg px-4 py-3 font-semibold ${isActive ? 'bg-[#98262C] text-white' : 'text-[#641419] hover:bg-[#F2E8DA]'}`}>{label}</NavLink>)}
      </nav>}
    </header>
  )
}
