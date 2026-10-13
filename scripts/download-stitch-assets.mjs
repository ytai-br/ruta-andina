import { readFileSync, readdirSync, mkdirSync, writeFileSync, existsSync } from 'node:fs'
import { parseHTML } from 'linkedom'

mkdirSync('public/images', { recursive: true })
const manifest = []
for (const folder of readdirSync('stitch-original')) {
  const file = `stitch-original/${folder}/code.html`
  const { document } = parseHTML(readFileSync(file, 'utf8'))
  const prefix = folder.includes('landing') ? 'inicio' : folder.includes('Nosotros') ? 'nosotros' : 'reservas'
  for (const [index, img] of [...document.querySelectorAll('img')].entries()) {
    manifest.push({ page: prefix, source: img.getAttribute('src'), alt: img.getAttribute('alt'), local: `/images/${prefix}-${String(index + 1).padStart(2, '0')}.webp` })
  }
}
// Downloads are copies; the original HTML and PNG files are never changed.
for (let offset = 0; offset < manifest.length; offset += 4) {
  await Promise.all(manifest.slice(offset, offset + 4).map(async (item) => {
    try {
      const response = await fetch(item.source, { signal: AbortSignal.timeout(30_000) })
      if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error(`HTTP ${response.status}`)
      const type = response.headers.get('content-type')
      item.local = item.local.replace('.webp', type.includes('png') ? '.png' : type.includes('jpeg') ? '.jpg' : '.webp')
      if (!existsSync(`public${item.local}`)) writeFileSync(`public${item.local}`, Buffer.from(await response.arrayBuffer()))
      item.downloaded = true
      console.log(`OK ${item.local}`)
    } catch (error) {
      item.downloaded = false
      item.error = error.message
      console.log(`PENDIENTE ${item.local}: ${error.message}`)
    }
  }))
}
writeFileSync('docs/stitch-assets.json', JSON.stringify(manifest, null, 2) + '\n')
console.log(`${manifest.filter((item) => item.downloaded).length}/${manifest.length} imágenes guardadas localmente.`)
