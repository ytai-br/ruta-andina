export default function Icon({ name, className = '', brand = false }) {
  return <i aria-hidden="true" className={`${brand ? 'fa-brands' : 'fa-solid'} fa-${name} ${className}`} />
}
