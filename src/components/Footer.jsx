import Logo from './Logo.jsx'
import Icon from './Icon.jsx'

const currentYear = new Intl.DateTimeFormat('es-BO', { timeZone: 'America/La_Paz', year: 'numeric' }).format(new Date())

export default function Footer({ variant }) {
  const home = variant === 'home'
  return (
    <footer className={`site-footer relative text-white overflow-hidden ${home ? 'pt-16 pb-6' : variant === 'about' ? 'pt-16 pb-12' : 'pt-10 pb-8 border-t-4 border-andino-red'}`}>
      {variant !== 'booking' && <svg aria-hidden="true" className="absolute top-0 w-full h-10" fill={home ? '#F8F3EA' : '#FAF5EE'} preserveAspectRatio="none" viewBox="0 0 1200 120"><path d="M0,0 L150,90 L300,10 L450,80 L600,0 L750,90 L900,10 L1050,70 L1200,0 L1200,0 L0,0 Z" /></svg>}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-8 items-center ${home ? 'flex-col' : 'flex-col md:flex-row md:justify-between'}`}>
        <Logo footer />
        <div className={`flex items-center gap-6 ${home ? 'flex-col' : 'flex-col sm:flex-row'}`}>
          <div role="group" className="flex items-center gap-4" aria-label="Redes sociales pendientes de configurar">
            {[['instagram', 'Instagram'], ['facebook-f', 'Facebook'], ['youtube', 'YouTube'], ['whatsapp', 'WhatsApp']].map(([icon, name]) => <span key={icon} role="img" aria-label={`${name}: enlace pendiente`} title={`${name}: enlace pendiente de configurar`} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><Icon name={icon} brand /></span>)}
          </div>
          {!home && <span className="text-xs text-stone-200">Creación por <strong>YTA</strong></span>}
        </div>
        {home && <p className="text-xs text-center text-stone-200">Operador de Turismo Receptivo y Aventura Autorizado · Cochabamba / La Paz<br />Descubre la esencia de Bolivia</p>}
      </div>
      {variant !== 'about' && <div className="max-w-7xl mx-auto px-4 mt-8 pt-4 border-t border-white/20 text-[11px] text-stone-200 flex flex-wrap justify-center gap-4"><span>© {currentYear} Ruta Andina. Todos los derechos reservados.</span>{home && <span>Creación por YTA</span>}</div>}
    </footer>
  )
}
