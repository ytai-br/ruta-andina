import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { mkdirSync, writeFileSync } from 'node:fs'

const output = 'docs/verificaciones/dia3'
mkdirSync(output, { recursive: true })

async function tabTo(page, target) {
  for (let index = 0; index < 90; index++) {
    await page.keyboard.press('Tab')
    if (await target.evaluate((element) => element === document.activeElement)) {
      const visibleFocus = await target.evaluate((element) => {
        const style = getComputedStyle(element.closest('.adventure-card') || element)
        return style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0
      })
      expect(visibleFocus, 'El control debe mostrar un indicador de foco').toBe(true)
      return
    }
  }
  throw new Error('El control no es alcanzable con Tab')
}

async function audit(page, name) {
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice']).analyze()
  const simplify = ({ id, description, nodes }) => ({ id, description, nodes: nodes.map(({ target, failureSummary, any }) => ({ target, failureSummary, checks: any })) })
  writeFileSync(`${output}/${name}.json`, JSON.stringify({
    url: page.url(), viewport: page.viewportSize(),
    violations: result.violations.map(simplify), incomplete: result.incomplete.map(simplify),
    passedRules: result.passes.map(({ id }) => id),
  }, null, 2) + '\n')
  expect(result.violations.map(simplify)).toEqual([])
}

for (const [name, route] of [['inicio', '/'], ['nosotros', '/nosotros'], ['reservas', '/reservas']]) {
  test(`Día 3: SEO, imágenes y contraste móvil/escritorio — ${name}`, async ({ page }) => {
    await page.goto(route)
    await page.evaluate(async () => {
      await document.fonts.ready
      await Promise.all([...document.images].map(async (image) => { image.loading = 'eager'; await image.decode() }))
    })
    const inventory = await page.evaluate(() => ({
      title: document.title,
      description: document.querySelector('meta[name="description"]')?.content,
      lang: document.documentElement.lang,
      headings: [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((heading) => ({ level: Number(heading.tagName[1]), text: heading.textContent.trim() })),
      images: [...document.images].map((image) => ({ src: image.getAttribute('src'), alt: image.getAttribute('alt') })),
    }))
    writeFileSync(`${output}/${name}-semantica.json`, JSON.stringify(inventory, null, 2) + '\n')
    expect(inventory.title).toContain('Ruta Andina')
    expect(inventory.description.length).toBeGreaterThan(60)
    expect(inventory.description).toMatch(/trekking/i)
    expect(inventory.description).toMatch(/ciclismo/i)
    expect(inventory.description).toMatch(/turismo/i)
    expect(inventory.description).toMatch(/Bolivia/i)
    expect(inventory.lang).toBe('es')
    expect(inventory.headings.filter(({ level }) => level === 1)).toHaveLength(1)
    expect(inventory.headings[0].level).toBe(1)
    inventory.headings.forEach((heading, index) => {
      expect(heading.text).not.toBe('')
      if (index) expect(heading.level).toBeLessThanOrEqual(inventory.headings[index - 1].level + 1)
    })
    inventory.images.forEach(({ src, alt }) => {
      expect(alt, src).not.toBeNull()
      // Only the booking thumbnails repeat the adjacent, named radio label.
      if (!src.match(/\/reservas-0[2-6]\.jpg$/)) expect(alt.trim().length, src).toBeGreaterThan(10)
    })
    for (const width of [375, 1440]) {
      await page.setViewportSize({ width, height: 1000 })
      await audit(page, `${name}-${width}`)
      await page.screenshot({ path: `${output}/${name}-${width}.png`, fullPage: true })
    }
  })

  test(`Día 3: salto al contenido con teclado — ${name}`, async ({ page }) => {
    await page.goto(route)
    await page.getByRole('heading', { level: 1 }).waitFor()
    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(page.locator('main')).toBeFocused()
  })
}

test('Día 3: menú móvil operable solo con teclado', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  const toggle = page.getByRole('button', { name: 'Abrir menú' })
  await tabTo(page, toggle)
  await page.keyboard.press('Enter')
  await tabTo(page, page.getByRole('navigation', { name: 'Menú móvil' }).getByRole('link', { name: 'Nosotros' }))
  await audit(page, 'menu-abierto')
  await page.keyboard.press('Escape')
  await expect(toggle).toBeFocused()
  await page.keyboard.press('Space')
  await tabTo(page, page.getByRole('navigation', { name: 'Menú móvil' }).getByRole('link', { name: 'Nosotros' }))
  await page.keyboard.press('Enter')
  await expect(page).toHaveURL('/nosotros')
  await expect(page.locator('main')).toBeFocused()
})

test('Día 3: catálogo recibe foco al seguir su enlace con teclado', async ({ page }) => {
  await page.goto('/')
  await tabTo(page, page.getByRole('link', { name: 'Ver Catálogo de Rutas' }))
  await page.keyboard.press('Enter')
  await expect(page.locator('#catalogo')).toBeFocused()
})

test('Día 3: etiquetas, errores y controles del formulario con teclado', async ({ page }) => {
  await page.goto('/reservas')
  await expect(page.getByRole('heading', { name: '¿QUÉ AVENTURA QUIERES VIVIR?', level: 2 })).toBeVisible()
  const controls = page.locator('input,select,textarea')
  for (const control of await controls.all()) await expect(control).toHaveAccessibleName(/\S/)
  await tabTo(page, page.getByRole('button', { name: 'Validar solicitud' }))
  await page.keyboard.press('Enter')
  await expect(page.getByLabel('Nombre completo')).toBeFocused()
  await expect(page.getByLabel('Nombre completo')).toHaveAccessibleDescription(/Escribe tu nombre/)
  await audit(page, 'reservas-errores')
  await page.keyboard.type('Ana Perez')
  await page.keyboard.press('Tab')
  await expect(page.getByLabel('País de procedencia')).toBeFocused()
  await tabTo(page, page.getByRole('radio', { name: 'El Camino de la Muerte', exact: true }))
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('radio', { name: 'El Camino del Choro', exact: true })).toBeChecked()
  await expect(page.getByRole('radio', { name: 'El Camino del Choro', exact: true })).toBeFocused()
  await tabTo(page, page.getByRole('button', { name: 'Consultar pago nacional' }))
  await page.keyboard.press('Space')
  await expect(page.getByRole('button', { name: 'Consultar pago nacional' })).toHaveAttribute('aria-pressed', 'true')
  await tabTo(page, page.getByLabel(/He revisado mis datos/))
  await page.keyboard.press('Space')
  await expect(page.getByLabel(/He revisado mis datos/)).toBeChecked()
})

test('Día 3: títulos y descripciones distintos tras navegación SPA', async ({ page }) => {
  const titles = new Set()
  const descriptions = new Set()
  await page.goto('/')
  for (const route of ['/', '/nosotros', '/reservas']) {
    if (route !== '/') await page.locator(`header a[href="${route}"]`).first().click()
    await expect(page).toHaveURL(route)
    await expect(page).toHaveTitle(route === '/' ? /Trekking/ : route === '/nosotros' ? 'Nosotros | Ruta Andina' : 'Reservas | Ruta Andina')
    const title = await page.title()
    const description = await page.locator('meta[name="description"]').getAttribute('content')
    expect(description).toMatch(/trekking/i)
    expect(description).toMatch(/ciclismo/i)
    expect(description).toMatch(/turismo/i)
    expect(description).toMatch(/Bolivia/i)
    titles.add(title)
    descriptions.add(description)
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', title)
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute('content', description)
  }
  expect(titles.size).toBe(3)
  expect(descriptions.size).toBe(3)
})
