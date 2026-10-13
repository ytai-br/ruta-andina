# Ruta Andina — React y Vite

Integración de los tres diseños de Google Stitch para el proyecto de grado: Inicio (`/`), Nosotros (`/nosotros`) y Reservas (`/reservas`), con navegación SPA. Los originales en `stitch-original/` se conservan intactos.

## Ejecutar

Requiere Node.js compatible con Vite 8 y Microsoft Edge para las pruebas de navegador configuradas en este equipo.

```powershell
npm.cmd ci            # Solo para instalar desde package-lock.json
npm.cmd run dev       # Abrir la dirección que muestra Vite
```

En PowerShell se usa `npm.cmd` para evitar el bloqueo de `npm.ps1`. Detén el servidor con `Ctrl+C`.

## Arquitectura

- `src/main.jsx`: entrada, StrictMode y BrowserRouter.
- `src/App.jsx`: organizador de páginas, layout, ruta desconocida, foco y metadatos.
- `src/pages/`: HomePage, AboutPage y ReservationsPage.
- `src/components/`: cabecera con menú móvil, logotipo, pie, tarjetas, calendario y banner reutilizables.
- `src/components/sections/`: secciones derivadas de Inicio y Nosotros.
- `src/components/booking/`: campos, selector de experiencia, pago preferido y resumen.
- `src/data/`: catálogo y opciones del formulario.
- `src/lib/reservation.js`: validaciones, fecha de Bolivia y transformación del payload.
- `src/lib/supabase.js`, `src/services/reservationService.js`: cliente público y registro de solicitudes en Supabase, sin permisos de lectura.
- `src/index.css`, `src/App.css`, `tailwind.config.js`: fuentes locales, estilos y temas por página. Tailwind 4 se compila mediante `@tailwindcss/vite`, sin CDN.
- `public/images/`: copias locales de las imágenes; procedencia en `docs/stitch-assets.json`.
- `tests/`: pruebas unitarias y de navegador.

## Reservas y Supabase

El formulario valida nombre, país, ciudad, teléfono internacional, participantes, fecha real desde hoy en Bolivia, experiencia, preferencia de pago, observaciones y confirmación. El resumen se actualiza mientras se escribe.

El servicio vuelve a validar y envía las columnas permitidas a `public.inquiries`. No envía correo ni estado; la base asigna el estado `new`. No utiliza `.select()`, así que la interfaz no necesita permiso para leer solicitudes. El mensaje de éxito solo dice que se registró una solicitud pendiente; no confirma disponibilidad ni una reserva. WhatsApp se abre únicamente después de que Supabase responde sin error, y el cliente debe enviar manualmente el mensaje preparado. Los botones de pago seleccionan una preferencia; no cobran.

1. Copia `.env.example` a `.env.local`.
2. En Supabase, abre el proyecto **RutaAndina** y copia su **Project URL** y **Publishable key** desde **Connect** (o **Settings → API Keys**). Colócalos en `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY`.
3. Coloca el número de WhatsApp de Ruta Andina en `VITE_WHATSAPP_BUSINESS_NUMBER`, en formato internacional y solo dígitos, por ejemplo `59171234567` (usa el número real del negocio).
4. Reinicia Vite después de crear o editar `.env.local`.

La clave publicable está diseñada para el cliente web y no reemplaza RLS. Nunca coloques una `sb_secret_...`, `service_role` u otra clave secreta en variables `VITE_*`. `.env.local` está ignorado por Git; `.env.example` solo contiene valores de ejemplo. El esquema y los permisos deben verificarse en el SQL Editor con las consultas de `docs/SUPABASE-VERIFICACION.sql`. Mientras falten credenciales, el formulario informa que no está configurado y no afirma que haya guardado nada.

## Comprobaciones

```powershell
npm.cmd run build
npm.cmd run lint
npm.cmd test
npm.cmd run test:e2e
npm.cmd run verify:originals
npm.cmd run verify:production  # Requiere build previo
npm.cmd audit
```

Playwright inicia una instancia aislada de Vite en el puerto 4177 con las variables de Supabase vacías y sin reutilizar servidores existentes, para impedir escrituras accidentales en la base real. Usa Edge; para otro canal instalado, configura `PLAYWRIGHT_CHANNEL`. La comprobación de producción sirve `dist/` temporalmente en 4176. Los informes y capturas están en `docs/verificaciones/`; `playwright-report/index.html` contiene el informe navegable más reciente.

Para regenerar capturas, inicia `npm.cmd run dev -- --host 127.0.0.1 --port 4175 --strictPort` y ejecuta `node scripts/capture-preview.mjs` en otra terminal. Los scripts de conversión y descarga documentan la migración inicial: no es necesario ejecutarlos para desarrollar y pueden sobrescribir las copias React. El script de inspección inicial protege el manifiesto de hashes y falla si ya existe.

## Alcance y publicación

La interfaz conserva imágenes, paletas, tipografías y composición de los diseños, con adaptaciones para navegación, teclado y pantallas pequeñas. Calendario y tarifas son referencias del diseño; las redes sociales aún no tienen destinos configurados. Las seis capturas existentes permiten revisar las páginas en escritorio y móvil; no constituyen una comparación automática píxel a píxel.

El hosting debe redirigir rutas SPA a `index.html` para abrir `/nosotros` y `/reservas` directamente. El SEO básico incluye idioma, título, descripción y Open Graph; los cambios por ruta ocurren en el cliente. No se ha implementado prerenderizado ni configurado un dominio de producción.

### GitHub Pages

El workflow `.github/workflows/deploy-pages.yml` construye y publica el sitio al hacer push a `main`. Configura GitHub Pages con **GitHub Actions** como source. El build detecta automáticamente el nombre del repositorio para usar el subpath correcto; `dist/404.html` conserva las rutas de React Router al abrir `/nosotros` o `/reservas` directamente.

- Repositorio: https://github.com/ytai-br/ruta-andina
- Sitio publicado: https://ytai-br.github.io/ruta-andina/

En el repositorio, agrega estas variables en **Settings → Secrets and variables → Actions → Variables** para que reservas y WhatsApp funcionen en el sitio publicado:

- `VITE_SUPABASE_URL`: Project URL de RutaAndina.
- `VITE_SUPABASE_PUBLISHABLE_KEY`: clave publicable `sb_publishable_...` del mismo proyecto. Nunca agregues `secret` ni `service_role`.
- `VITE_WHATSAPP_BUSINESS_NUMBER`: número comercial en formato internacional, solo dígitos.

El bundle del navegador es público; la clave publishable está diseñada para usarse en el cliente y depende de RLS. No subas `.env.local`; Git lo excluye. El archivo `.env.example` contiene solo marcadores de ejemplo.

Consulta [la bitácora de IA](docs/BITACORA-IA.md) para autoría, archivos y resultados, y [el plan completado](docs/PLAN-INTEGRACION.md).
