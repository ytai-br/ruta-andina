import { readFileSync, readdirSync } from 'node:fs'
import { createHash } from 'node:crypto'
import assert from 'node:assert/strict'

const baseline = JSON.parse(readFileSync('docs/stitch-original.sha256.json', 'utf8'))
const files = readdirSync('stitch-original', { recursive: true, withFileTypes: true })
  .filter((entry) => entry.isFile())
  .map((entry) => `${entry.parentPath}/${entry.name}`.replaceAll('\\', '/'))
assert.deepEqual(files.sort(), Object.keys(baseline).sort(), 'Se añadieron o eliminaron archivos originales')
for (const [file, expected] of Object.entries(baseline)) {
  assert.equal(createHash('sha256').update(readFileSync(file)).digest('hex'), expected, `Original modificado: ${file}`)
}
console.log(`${files.length} originales intactos (SHA-256).`)
