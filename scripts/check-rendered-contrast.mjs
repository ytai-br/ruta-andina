// Supplement Axe for photographs/gradients using rendered background pixels.
// Samples glyph interiors using before/after screenshots. Not a WCAG certification.
import { chromium } from '@playwright/test'
import { mkdirSync, writeFileSync } from 'node:fs'

const browser = await chromium.launch({ channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge' })
const reports = []
try {
  for (const width of [375, 1440]) {
    for (const route of ['/', '/nosotros', '/reservas']) {
      const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' })
      await page.goto(`http://127.0.0.1:4175${route}`)
      await page.evaluate(async () => {
        await document.fonts.ready
        await Promise.all([...document.images].map(async (image) => { image.loading = 'eager'; await image.decode() }))
      })
      for (let slide = 0; slide < (route === '/' ? 4 : 1); slide++) {
        if (slide) {
          await page.getByRole('button', { name: `Ver paisaje ${slide + 1}` }).click()
          await page.locator('[data-purpose="hero-carousel"] img').evaluate((image) => image.decode())
        }
        await page.evaluate(() => window.scrollTo(0, 0))
        const samples = await page.evaluate(() => {
          const samples = []
          const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
          const colorCanvas = document.createElement('canvas').getContext('2d')
          while (walker.nextNode()) {
            const node = walker.currentNode
            const parent = node.parentElement
            if (!node.textContent.trim() || parent.closest('script,style,svg,option,[aria-hidden="true"],.sr-only')) continue
            const style = getComputedStyle(parent)
            const range = document.createRange()
            range.selectNodeContents(node)
            const rects = [...range.getClientRects()].filter((rect) => rect.width > 2 && rect.height > 2 && rect.x >= 0 && rect.y >= 0)
            if (!rects.length) continue
            colorCanvas.clearRect(0, 0, 1, 1)
            colorCanvas.fillStyle = style.color
            colorCanvas.fillRect(0, 0, 1, 1)
            samples.push({ text: node.textContent.trim(), color: [...colorCanvas.getImageData(0, 0, 1, 1).data].slice(0, 3),
              minimum: parseFloat(style.fontSize) >= 24 || (parseFloat(style.fontSize) >= 18.667 && Number(style.fontWeight) >= 700) ? 3 : 4.5,
              rects: rects.map(({ x, y, width, height }) => ({ x, y, width, height })) })
          }
          return samples
        })
        const original = (await page.screenshot({ fullPage: true })).toString('base64')
        const hideText = await page.addStyleTag({ content: '* { -webkit-text-fill-color: transparent !important; text-shadow: none !important; caret-color: transparent !important; }' })
        const png = (await page.screenshot({ fullPage: true })).toString('base64')
        await hideText.evaluate((element) => element.remove())
        const results = await page.evaluate(async ({ png, original, samples }) => {
          const image = new Image()
          image.src = `data:image/png;base64,${png}`
          await image.decode()
          const canvas = document.createElement('canvas')
          canvas.width = image.width; canvas.height = image.height
          const context = canvas.getContext('2d', { willReadFrequently: true })
          context.drawImage(image, 0, 0)
          const pixels = context.getImageData(0, 0, image.width, image.height).data
          const originalImage = new Image()
          originalImage.src = `data:image/png;base64,${original}`
          await originalImage.decode()
          context.drawImage(originalImage, 0, 0)
          const originalPixels = context.getImageData(0, 0, image.width, image.height).data
          const luminance = (rgb) => rgb.map((value) => value / 255).map((v) => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4).reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0)
          return samples.map(({ rects, ...sample }) => {
            let ratio = 21
            let sampledPixels = 0
            const foreground = luminance(sample.color)
            for (const rect of rects) {
              for (let y = Math.ceil(rect.y); y < Math.min(image.height, rect.y + rect.height); y += 2) {
                for (let x = Math.ceil(rect.x); x < Math.min(image.width, rect.x + rect.width); x += 2) {
                  const offset = (y * image.width + x) * 4
                  // Only glyph interiors: ignore neighboring icons, decorations and antialiasing.
                  if (!sample.color.every((value, i) => Math.abs(originalPixels[offset + i] - value) < 20)) continue
                  if (sample.color.every((_, i) => Math.abs(originalPixels[offset + i] - pixels[offset + i]) < 20)) continue
                  sampledPixels++
                  const background = luminance([pixels[offset], pixels[offset + 1], pixels[offset + 2]])
                  ratio = Math.min(ratio, (Math.max(foreground, background) + 0.05) / (Math.min(foreground, background) + 0.05))
                }
              }
            }
            return { ...sample, sampledPixels, ratio: sampledPixels ? Number(ratio.toFixed(2)) : null, passes: sampledPixels ? ratio >= sample.minimum : null }
          })
        }, { png, original, samples })
        reports.push({ route, width, slide: slide + 1, samples: results })
        console.log(JSON.stringify({ route, width, slide: slide + 1, belowThreshold: results.filter((item) => item.passes === false) }))
      }
      await page.close()
    }
  }
  mkdirSync('docs/verificaciones/dia3', { recursive: true })
  writeFileSync('docs/verificaciones/dia3/contraste-renderizado.json', JSON.stringify(reports, null, 2) + '\n')
  if (reports.some((report) => report.samples.some((sample) => sample.passes === false))) process.exitCode = 1
} finally { await browser.close() }
