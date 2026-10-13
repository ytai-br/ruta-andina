import Icon from './Icon.jsx'

export default function PageBanner({ variant, title, image, alt }) {
  const booking = variant === 'booking'
  return (
    <section className={`relative w-full overflow-hidden bg-stone-900 ${booking ? 'h-72 sm:h-96 md:h-[420px]' : 'h-[380px] sm:h-[480px] lg:h-[540px]'}`}>
      <img src={image} alt={alt} fetchPriority="high" className={`w-full h-full object-cover object-center ${booking ? 'scale-105 brightness-[0.92] contrast-[1.05]' : ''}`} />
      <div className={`absolute inset-0 ${booking ? 'bg-linear-to-t from-black/80 via-black/20 to-transparent' : 'bg-linear-to-r from-black/25 via-black/25 to-black/60'}`} />
      <div className={`absolute right-6 sm:right-16 md:right-24 text-right flex flex-col items-end ${booking ? 'bottom-6 sm:bottom-12' : 'top-1/2 -translate-y-1/2'}`}>
        {booking && <span className="text-andino-red bg-white/90 p-2 rounded-xl mb-1 shadow-lg"><Icon name="calendar-check" className="text-2xl sm:text-3xl" /></span>}
        <h1 className="font-rustic text-white text-5xl sm:text-7xl md:text-8xl tracking-wide leading-none drop-shadow-lg">{title}</h1>
        <div className={`h-2 w-32 sm:w-44 rounded-full mt-1 ${booking ? 'bg-andino-red' : 'bg-brand-red rotate-[-1deg]'}`} />
      </div>
      {!booking && <div aria-hidden="true" className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">{[0, 1, 2, 3].map((dot) => <span key={dot} className={`w-2.5 h-2.5 rounded-full ${dot === 0 ? 'bg-white' : 'bg-white/60'}`} />)}</div>}
    </section>
  )
}
