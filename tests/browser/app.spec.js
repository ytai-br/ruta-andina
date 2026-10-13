import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('navegación SPA, ruta directa, metadatos y volver atrás', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('EXPLORA')
  await page.evaluate(() => { window.__spaMarker = 'preserved' })
  await page.getByRole('navigation', { name: 'Principal' }).getByRole('link', { name: 'Nosotros', exact: true }).click()
  await expect(page).toHaveURL('/nosotros')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('NOSOTROS')
  expect(await page.evaluate(() => window.__spaMarker)).toBe('preserved')
  await expect(page).toHaveTitle(/Nosotros/)
  await page.goBack()
  await expect(page).toHaveURL('/')
  await page.goto('/reservas')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('RESERVA')
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /reserva/i)
})

test('menú móvil: teclado, Escape, navegación y cierre', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  const toggle = page.getByRole('button', { name: 'Abrir menú' })
  await toggle.click()
  await expect(page.getByRole('button', { name: 'Cerrar menú' })).toHaveAttribute('aria-expanded', 'true')
  await page.keyboard.press('Escape')
  await expect(toggle).toBeFocused()
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await toggle.click()
  await page.getByRole('navigation', { name: 'Menú móvil' }).getByRole('link', { name: 'Reservas' }).click()
  await expect(page).toHaveURL('/reservas')
  await expect(page.getByRole('navigation', { name: 'Menú móvil' })).toBeHidden()
  await expect(page.locator('main')).toBeFocused()
})

test('catálogo selecciona la experiencia del formulario', async ({ page }) => {
  await page.goto('/')
  await page.locator('#route-pico-tunari').getByRole('link', { name: /reservar/i }).click()
  await expect(page).toHaveURL(/\/reservas\?experiencia=pico-tunari/)
  await expect(page.getByRole('radio', { name: 'Pico Tunari', exact: true })).toBeChecked()
  await expect(page.locator('#summary-experiencia')).toHaveText('Pico Tunari')
})

test('formulario inválido muestra errores y enfoca el primer campo', async ({ page }) => {
  await page.goto('/reservas')
  await page.getByRole('button', { name: 'Validar solicitud' }).click()
  const popup = page.getByRole('dialog')
  await expect(popup).toBeVisible()
  await expect(popup).toContainText('Revisa tu solicitud')
  await expect(popup).toContainText('Nombre completo')
  await popup.getByRole('button', { name: 'Entendido' }).click()
  await expect(page.getByLabel('Nombre completo', { exact: false })).toBeFocused()
  await expect(page.locator('#error-nombre')).toBeVisible()
  await expect(page.locator('#error-fecha')).toBeVisible()
  await expect(page.locator('#error-confirmacion')).toBeVisible()
  await expect(page.getByLabel('Número de WhatsApp', { exact: false })).toHaveAttribute('aria-invalid', 'true')
})

test('resumen reactivo y solicitud válida sin envío ni persistencia', async ({ page }) => {
  // Safety net: never let browser tests write to the user's Supabase project.
  await page.route('**/rest/v1/**', (route) => route.abort())
  await page.goto('/reservas')
  const writes = []
  page.on('request', (request) => { if (request.method() !== 'GET') writes.push(request.url()) })
  await page.getByLabel('Nombre completo', { exact: false }).fill('María Pérez')
  await page.getByLabel('País de procedencia', { exact: false }).selectOption('Bolivia')
  await page.getByLabel('Ciudad', { exact: false }).fill('Cochabamba')
  await page.getByLabel('Número de WhatsApp', { exact: false }).fill('+591 71234567')
  await page.getByLabel('Cantidad de personas', { exact: false }).selectOption('5+')
  await page.getByLabel('Fecha deseada', { exact: false }).fill('2099-12-31')
  const islandRadio = page.getByRole('radio', { name: 'Isla del Sol', exact: true })
  await page.locator('label').filter({ has: islandRadio }).click()
  await expect(islandRadio).toBeChecked()
  await page.getByRole('button', { name: 'Consultar pago internacional' }).click()
  await expect(page.locator('#summary-nombre')).toHaveText('María Pérez')
  await expect(page.locator('#summary-pago')).toHaveText('Pago Internacional')
  await expect(page.locator('#summary-personas')).toHaveText('5+ personas')
  await page.getByLabel(/He revisado mis datos/).check()
  await page.getByRole('button', { name: 'Validar solicitud' }).click()
  await expect(page.getByRole('status')).toContainText('Falta configurar Supabase')
  expect(writes).toEqual([])
  expect(await page.evaluate(() => Object.keys(localStorage))).toEqual([])
  await page.reload()
  await expect(page.getByLabel('Nombre completo', { exact: false })).toHaveValue('')
})

test('carrusel cambia de fotografía y mapa enlaza al catálogo', async ({ page }) => {
  await page.goto('/')
  const hero = page.getByRole('region', { name: 'Paisajes de Bolivia' })
  const previous = await hero.locator('img').getAttribute('src')
  await hero.getByRole('button', { name: 'Siguiente' }).click()
  await expect(hero.locator('img')).not.toHaveAttribute('src', previous)
  await page.getByRole('region', { name: 'Mapa de rutas' }).getByRole('link', { name: 'Pico Tunari' }).click()
  await expect(page).toHaveURL(/#route-pico-tunari/)
})

for (const route of ['/', '/nosotros', '/reservas']) {
  test(`responsive, recursos y accesibilidad: ${route}`, async ({ page }) => {
    const errors = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto(route)
    await page.evaluate(() => document.fonts.ready)
    for (const width of [320, 375, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 })
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    }
    await page.locator('footer').scrollIntoViewIfNeeded()
    await page.locator('main').scrollIntoViewIfNeeded()
    await expect.poll(() => page.locator('img').evaluateAll((images) => images.every((image) => image.complete && image.naturalWidth > 0))).toBe(true)
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
    expect(results.violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) }))).toEqual([])
    expect(errors).toEqual([])
  })
}

test('ruta desconocida ofrece volver al inicio', async ({ page }) => {
  await page.goto('/no-existe')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Página no encontrada')
  await page.getByRole('link', { name: 'Volver al inicio' }).click()
  await expect(page).toHaveURL('/')
})

test('rutas con barra final y mayúsculas conservan tema y SEO', async ({ page }) => {
  for (const route of ['/reservas/', '/RESERVAS']) {
    await page.goto(route)
    await expect(page).toHaveTitle('Reservas | Ruta Andina')
    await expect(page.locator('.site-booking')).toBeVisible()
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow')
  }
})
