import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: false,
  workers: 1,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  reporter: [['list'], ['html', { open: 'never' }], ['json', { outputFile: 'docs/verificaciones/browser-report.json' }]],
  use: {
    baseURL: 'http://127.0.0.1:4177',
    channel: process.env.PLAYWRIGHT_CHANNEL || 'msedge',
    viewport: { width: 1440, height: 1000 },
    timezoneId: 'America/La_Paz',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 4177 --strictPort',
    url: 'http://127.0.0.1:4177',
    // Las pruebas no deben contactar ni escribir accidentalmente en el Supabase real.
    env: {
      VITE_SUPABASE_URL: '',
      VITE_SUPABASE_PUBLISHABLE_KEY: '',
      VITE_WHATSAPP_BUSINESS_NUMBER: '',
    },
    // Nunca reutilizar el Vite del usuario: podría llevar las credenciales reales.
    reuseExistingServer: false,
  },
})
