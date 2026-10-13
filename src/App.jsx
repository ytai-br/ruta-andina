import { useEffect, useRef } from 'react'
import { Routes, Route, Link, useLocation, matchRoutes } from 'react-router'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ReservationsPage from './pages/ReservationsPage.jsx'
import './App.css'

const pageInfo = {
  '/': { variant: 'home', title: 'Ruta Andina — Trekking, ciclismo y turismo en Bolivia', description: 'Explora experiencias de trekking, ciclismo y turismo responsable en Bolivia con Ruta Andina. Conoce el catálogo y prepara tu reserva.' },
  '/nosotros': { variant: 'about', title: 'Nosotros | Ruta Andina', description: 'Conoce Ruta Andina y nuestras experiencias de trekking, ciclismo y turismo responsable en Bolivia, con seguridad y respeto por las comunidades y la naturaleza.' },
  '/reservas': { variant: 'booking', title: 'Reservas | Ruta Andina', description: 'Solicita tu reserva para experiencias de trekking, ciclismo y turismo en Bolivia con Ruta Andina. Elige una ruta; la disponibilidad debe confirmarse.' },
}
const notFound = { variant: 'home', title: 'Página no encontrada | Ruta Andina', description: 'Esta página no existe. Vuelve al catálogo de aventuras de Ruta Andina.' }
const metadataRoutes = Object.keys(pageInfo).map((path) => ({ path }))

export default function App() {
  const { pathname, search, hash } = useLocation()
  const previousPath = useRef(pathname)
  const matchedPath = matchRoutes(metadataRoutes, pathname)?.[0]?.route.path
  const info = pageInfo[matchedPath] || notFound
  useEffect(() => {
    document.title = info.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', info.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', info.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', info.description)
    document.querySelector('meta[name="robots"]')?.setAttribute('content', info === notFound ? 'noindex, follow' : 'index, follow')
    const frame = requestAnimationFrame(() => {
      const navigated = previousPath.current !== pathname
      previousPath.current = pathname
      let target
      try { target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null } catch { /* A malformed fragment should not break navigation. */ }
      if (target) { target.scrollIntoView(); target.focus({ preventScroll: true }) }
      else {
        window.scrollTo(0, 0)
        // Keep the skip link first on initial load; focus main on SPA navigation.
        if (navigated) document.getElementById('contenido')?.focus({ preventScroll: true })
      }
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash, info])

  return (
    <div className={`site site-${info.variant} font-sans antialiased min-h-screen flex flex-col`}>
      <a href="#contenido" className="skip-link">Saltar al contenido</a>
      <Header key={pathname} />
      <main id="contenido" tabIndex={-1} className="flex-1 outline-none">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nosotros" element={<AboutPage />} />
          <Route path="/reservas" element={<ReservationsPage key={search} />} />
          <Route path="*" element={<section className="max-w-4xl mx-auto px-6 py-24 text-center"><h1 className="font-title text-4xl text-andino-wine">Página no encontrada</h1><p className="my-6">La ruta que buscas no existe.</p><Link to="/" className="inline-block bg-andino-wine text-white rounded-full px-6 py-3">Volver al inicio</Link></section>} />
        </Routes>
      </main>
      <Footer variant={info.variant} />
    </div>
  )
}

