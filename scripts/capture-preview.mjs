import { chromium } from '@playwright/test'
import { mkdirSync, writeFileSync } from 'node:fs'

mkdirSync('docs/verificaciones', { recursive: true })
const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge' })
const results = []
try {
  for (const [name, route] of [['inicio', '/'], ['nosotros', '/nosotros'], ['reservas', '/reservas']]) {
    for (const [device, width] of [['desktop', 1440], ['mobile', 375]]) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' })
      await page.goto(`http://127.0.0.1:4175${route}`)
      await page.evaluate(() => document.fonts.ready)
      await page.evaluate(async () => {
        for (const image of document.images) { image.loading = 'eager'; await image.decode().catch(() => {}) }
        window.scrollTo(0, 0)
      })
      const path = `docs/verificaciones/${name}-${device}.png`
      await page.screenshot({ path, fullPage: true })
      const report = await page.evaluate(() => ({
        title: document.title, width: innerWidth, documentWidth: document.documentElement.scrollWidth,
        font: getComputedStyle(document.querySelector('.site')).fontFamily,
        background: getComputedStyle(document.querySelector('.site')).backgroundColor,
        brokenImages: [...document.images].filter((image) => !image.complete || !image.naturalWidth).map((image) => image.src),
        overflow: [...document.querySelectorAll('main *')].filter((el) => { const rect = el.getBoundingClientRect(); return rect.width > 0 && (rect.right > innerWidth + 1 || rect.left < -1) }).slice(0, 12).map((el) => ({ tag: el.tagName, className: el.getAttribute('class') })),
      }))
      results.push({ route, device, screenshot: path, ...report })
      console.log(JSON.stringify({ route, device, ...report }))
      await page.close()
    }
  }
  writeFileSync('docs/verificaciones/visual-report.json', JSON.stringify(results, null, 2) + '\n')
} finally { await browser.close() }
