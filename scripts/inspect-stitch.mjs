import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs'
import { createHash } from 'node:crypto'
import { parseHTML } from 'linkedom'

const files = readdirSync('stitch-original', { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => `${entry.parentPath}/${entry.name}`.replaceAll('\\', '/'))
mkdirSync('docs', { recursive: true })
const hashes = Object.fromEntries(files.map((file) => [file, createHash('sha256').update(readFileSync(file)).digest('hex')]))
// This baseline is deliberately never overwritten during later verification.
writeFileSync('docs/stitch-original.sha256.json', JSON.stringify(hashes, null, 2) + '\n', { flag: 'wx' })
for (const file of files.filter((file) => file.endsWith('code.html'))) {
  const { document } = parseHTML(readFileSync(file, 'utf8'))
  console.log(file, { images: document.querySelectorAll('img').length, sections: [...document.querySelectorAll('section')].map((section) => section.getAttribute('data-purpose') || section.id || section.querySelector('h2')?.textContent.trim()) })
}
