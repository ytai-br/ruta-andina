import { preview } from 'vite'
import { chromium } from '@playwright/test'
import { writeFileSync } from 'node:fs'
import assert from 'node:assert/strict'

const server = await preview({ preview: { host: '127.0.0.1', port: 4176, strictPort: true, open: false } })
let browser
try {
  browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge' })
  const results = []
  for (const route of ['/', '/nosotros', '/reservas']) {
    const page = await browser.newPage({ viewport: { width: 375, height: 812 } })
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    const response = await page.goto(`http://127.0.0.1:4176${route}`)
    await page.locator('h1').waitFor()
    await page.evaluate(() => document.fonts.ready)
    assert.equal(response.status(), 200)
    assert.deepEqual(errors, [])
    assert.equal(await page.locator('h1').count(), 1)
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true)
    results.push({ route, status: response.status(), title: await page.title(), heading: await page.locator('h1').textContent(), jsErrors: errors })
    await page.close()
  }
  writeFileSync('docs/verificaciones/production-report.json', JSON.stringify(results, null, 2) + '\n')
  console.log('Producción: 3 rutas con HTTP 200, React renderizado, un H1 y sin errores JS/desbordamiento móvil.')
} finally {
  await browser?.close()
  await new Promise((resolve, reject) => server.httpServer.close((error) => error ? reject(error) : resolve()))
}
