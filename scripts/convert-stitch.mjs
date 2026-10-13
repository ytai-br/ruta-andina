// One-time migration helper. Reads Stitch exports; writes only src/.
// Do not rerun after editing generated components without reviewing the changes.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { parseHTML } from 'linkedom'

const pages = {
  home: 'stitch_landing_page_ruta_andina',
  about: 'stitch_Nosotros page_ruta_andina',
  booking: 'stitch_reservas_page_ruta_andina',
}
const documents = Object.fromEntries(Object.entries(pages).map(([key, folder]) => [key, parseHTML(readFileSync(`stitch-original/${folder}/code.html`, 'utf8')).document]))
const assets = JSON.parse(readFileSync('docs/stitch-assets.json', 'utf8'))
const localImage = (url) => assets.find((asset) => asset.source === url && asset.downloaded)?.local || url
const text = (node) => node?.textContent.replace(/\s+/g, ' ').trim() || ''
const attrNames = { class: 'className', for: 'htmlFor', viewbox: 'viewBox', preserveaspectratio: 'preserveAspectRatio', tabindex: 'tabIndex', 'stroke-width': 'strokeWidth', 'stroke-linecap': 'strokeLinecap', 'stroke-linejoin': 'strokeLinejoin', 'stroke-dasharray': 'strokeDasharray', 'fill-rule': 'fillRule', 'clip-rule': 'clipRule' }
const escape = (value) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('{', '&#123;').replaceAll('}', '&#125;')
function jsx(node, indent = 4) {
  const pad = ' '.repeat(indent)
  if (node.nodeType === 3) {
    const value = node.textContent.replace(/\s+/g, ' ')
    return value.trim() ? `${pad}{${JSON.stringify(value)}}` : ''
  }
  if (node.nodeType !== 1 || ['script', 'style'].includes(node.localName)) return ''
  if (node.localName === 'jsx-code') return pad + node.getAttribute('code')
  let tag = node.getAttribute('jsx-tag') || node.localName
  const attributes = []
  for (const attr of node.attributes) {
    if (attr.name === 'jsx-tag' || attr.name.startsWith('on')) continue
    if (attr.name.startsWith('jsx-')) { attributes.push(`${attr.name.slice(4)}={${attr.value}}`); continue }
    let value = attr.name === 'src' ? localImage(attr.value) : attr.value
    if (attr.name === 'class') value = value.replace(/\bshadow-sm\b/g, 'shadow-xs').replace(/(?<![\w-])shadow(?=\s|$)/g, 'shadow-sm')
    if (attr.name === 'style') {
      const rules = Object.fromEntries(value.split(';').filter((part) => part.includes(':')).map((part) => { const index = part.indexOf(':'); return [part.slice(0, index).trim().replace(/-([a-z])/g, (_, c) => c.toUpperCase()), part.slice(index + 1).trim()] }))
      attributes.push(`style={${JSON.stringify(rules)}}`)
    } else attributes.push(`${attrNames[attr.name] || attr.name}="${escape(value)}"`)
  }
  if (tag === 'svg') attributes.push('aria-hidden="true"', 'focusable="false"')
  if (tag === 'img') attributes.push('loading="lazy"', 'decoding="async"')
  const open = `<${tag}${attributes.length ? ' ' + attributes.join(' ') : ''}`
  if (['img', 'input', 'br', 'hr'].includes(tag)) return pad + open + ' />'
  return `${pad}${open}>\n${[...node.childNodes].map((child) => jsx(child, indent + 2)).filter(Boolean).join('\n')}\n${pad}</${tag}>`
}
function write(path, content) { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, content + '\n') }
function replaceWithCode(node, code) { const replacement = node.ownerDocument.createElement('jsx-code'); replacement.setAttribute('code', code); node.replaceWith(replacement) }
function component(name, node, imports = '', setup = '') {
  write(`src/components/sections/${name}.jsx`, `// Adaptado del diseño original de Stitch; ver docs/BITACORA-IA.md.\n${imports}\nexport default function ${name}() {\n${setup}\n  return (\n${jsx(node)}\n  )\n}`)
}

// Shared data for catalogue, map and booking; each page retains its own photographs.
const experienceRadios = [...documents.booking.querySelectorAll('input[name="experiencia"]')].slice(0, 5)
const experienceIcons = ['person-biking', 'person-hiking', 'landmark-dome', 'mountain', 'water']
const experiences = [...documents.home.querySelectorAll('article[id^="route-"]')].map((article, index) => {
  const details = [...article.querySelector('div.grid').children].map((detail) => text(detail.querySelector('span')))
  const radio = experienceRadios[index]
  return {
    id: article.id.replace('route-', ''), name: radio.value,
    image: localImage(article.querySelector('img').src), imageAlt: article.querySelector('img').alt,
    bookingImage: localImage(radio.parentElement.querySelector('img').src),
    category: text(radio.parentElement.querySelector('h3 + div span')), icon: experienceIcons[index],
    location: text(article.querySelector('h3 + p')), description: text(article.querySelector('p.text-xs.text-neutral-600')),
    duration: details[0], altitude: details[1], difficulty: details[2].replace('Dificultad: ', ''), departure: details[3].replace('Salida: ', ''),
    price: text(article.querySelector('.font-title.text-2xl.block')).replace('Bs. ', ''),
  }
})
write('src/data/experiences.js', `// Datos y fotografías extraídos de los HTML aportados, no disponibilidad en tiempo real.\nexport const experiences = ${JSON.stringify(experiences, null, 2)}\n\nexport const adviceOption = { id: 'asesoramiento', name: 'Necesito asesoramiento para elegir mi ruta' }`)

const hero = documents.home.querySelector('[data-purpose="hero-carousel"]')
hero.setAttribute('role', 'region'); hero.setAttribute('aria-label', 'Paisajes de Bolivia')
hero.querySelector('img').removeAttribute('src'); hero.querySelector('img').removeAttribute('alt')
hero.querySelector('img').setAttribute('jsx-src', 'slides[slide].src'); hero.querySelector('img').setAttribute('jsx-alt', 'slides[slide].alt')
hero.querySelectorAll('button').forEach((button, index) => { button.setAttribute('type', 'button'); button.setAttribute('jsx-onClick', `() => setSlide((current) => (current + ${index ? 1 : 'slides.length - 1'}) % slides.length)`) })
const aboutLink = hero.querySelector('[href="#nosotros"]'); aboutLink.setAttribute('jsx-tag', 'Link'); aboutLink.removeAttribute('href'); aboutLink.setAttribute('to', '/nosotros')
replaceWithCode(hero.lastElementChild.lastElementChild, `<div className="flex items-center gap-2.5 mt-10">{slides.map((item, index) => <button key={item.src} type="button" aria-label={\`Ver paisaje \${index + 1}\`} aria-pressed={slide === index} onClick={() => setSlide(index)} className="flex h-8 min-w-8 items-center justify-center"><span className={slide === index ? 'w-8 h-2 rounded-full bg-white' : 'w-2.5 h-2.5 rounded-full bg-white/50'} /></button>)}</div>`)
component('HomeHero', hero, `import { useState } from 'react'\nimport { Link } from 'react-router'\nconst slides = ${JSON.stringify(assets.filter((asset) => ['inicio-01', 'nosotros-01', 'nosotros-02', 'reservas-01'].some((name) => asset.local.includes(name))).map((asset) => ({ src: asset.local, alt: asset.alt })), null, 2)}`, '  const [slide, setSlide] = useState(0)')

const cta = documents.home.querySelector('[data-purpose="are-you-ready-cta"]')
const ctaButton = cta.querySelector('button'); ctaButton.setAttribute('jsx-tag', 'Link'); ctaButton.setAttribute('to', '/reservas')
component('ReadySection', cta, "import { Link } from 'react-router'")

const gear = documents.home.querySelector('[data-purpose="gear-preparation"]')
const gearLink = gear.querySelector('a'); gearLink.setAttribute('jsx-tag', 'Link'); gearLink.removeAttribute('href'); gearLink.setAttribute('to', '/reservas?experiencia=asesoramiento'); gearLink.querySelector('span').textContent = 'Consultar equipamiento para mi ruta'
component('GearSection', gear, "import { Link } from 'react-router'")
const values = documents.home.querySelector('[data-purpose="about-us"]')
values.id = 'valores'
for (const heading of values.querySelectorAll('h4')) heading.setAttribute('jsx-tag', 'h2')
component('HomeValues', values)

for (const [name, selector] of [['AboutIntro', 'about-section'], ['SafetySection', 'security-section'], ['CommunitiesSection', 'communities-section'], ['CommitmentSection', 'commitment-section']]) {
  const section = documents.about.querySelector(`[data-purpose="${selector}"]`)
  for (const heading of section.querySelectorAll('h4')) heading.setAttribute('jsx-tag', 'h3')
  component(name, section)
}

// The illustrated map retains the SVG/coordinates; only its behavior is replaced.
const map = documents.home.querySelector('[data-purpose="routes-map"]')
map.setAttribute('role', 'region'); map.setAttribute('aria-label', 'Mapa de rutas')
map.querySelector('h2 + p').textContent = 'Ubicación ilustrativa de nuestras expediciones'
for (const marker of map.querySelectorAll('[onclick]')) {
  const id = marker.getAttribute('onclick').match(/'([^']+)'/)[1]
  marker.setAttribute('jsx-tag', 'a'); marker.setAttribute('href', `#route-${id}`)
}
map.querySelectorAll('button').forEach((button, index) => { button.setAttribute('type', 'button'); button.setAttribute('aria-label', index ? 'Alejar mapa' : 'Acercar mapa'); button.setAttribute('jsx-onClick', `() => setZoom((value) => Math.${index ? 'max(1, value - 0.2)' : 'min(1.6, value + 0.2)'})`) })
const canvas = map.querySelector('[data-purpose="interactive-map-canvas"] > div.relative')
canvas.setAttribute('class', canvas.className + ' map-drawing origin-center transition-transform')
canvas.setAttribute('jsx-style', '{ transform: `scale(${zoom})` }')
map.querySelector('a[target]').setAttribute('href', 'https://www.google.com/maps/search/?api=1&query=Cochabamba%2C+Bolivia')
component('RoutesMap', map, "import { useState } from 'react'", '  const [zoom, setZoom] = useState(1)')
console.log('Datos y 9 secciones JSX extraídos. Originales conservados.')
