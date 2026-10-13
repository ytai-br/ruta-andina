# Bitácora de integración asistida por IA

Fecha de inicio: 12 de octubre de 2026, zona America/La_Paz.

## Autoría y alcance

El usuario aportó tres exportaciones originales de Google Stitch (HTML y capturas). Codex genera la conversión a JSX, componentes, datos extraídos, configuración, validaciones, servicio desacoplado, pruebas y documentación de esta integración. La autoría de los diseños de referencia corresponde al material aportado; no se presenta el código asistido como escrito manualmente.

La bitácora describe archivos y verificaciones reproducibles. El código completo generado se conserva en esos archivos, no duplicado en este documento.

## Registro de decisiones

1. Revisados los tres HTML, sus estilos embebidos, scripts y las tres capturas. Las páginas usan distintas fuentes y colores: se mantendrán por página.
2. Proyecto existente: React 19, Vite 8, Oxlint y StrictMode. No es un repositorio Git; se trabaja directamente en la carpeta indicada, sin ramas ni commits.
3. El menú original no tiene navegación SPA. Algunos botones de carrusel/mapa son decorativos, hay enlaces `#`, un PDF inexistente, fechas de octubre de 2024 y números de WhatsApp distintos de ejemplo. Las copias React corregirán esos comportamientos.
4. Decisión: migrar a Tailwind 4 con adaptación visual. Se probó instalar Tailwind 3 por fidelidad, pero `npm audit` informó 7 vulnerabilidades transitivas (5 altas y 2 moderadas) relacionadas con braces/postcss-selector-parser. Se elige el plugin oficial actual de Vite; se comprobará nuevamente al finalizar.
5. No se solicita ni se usa una cuenta de Supabase. Se prepara únicamente un contrato de servicio explícitamente no conectado, sin credenciales ni escritura de datos personales.
6. Se ejecutará el plan en esta sesión; las pruebas de comportamiento cubren las partes interactivas. La documentación y los componentes estáticos derivados no requieren pruebas unitarias que dupliquen el HTML.

## Incidencias registradas al iniciar

- Al iniciar estaban pendientes compilación, lint, pruebas de validación y navegador, auditoría final y comparación SHA-256. Resultados de cierre abajo.
- Incidencias del entorno: `npm` está bloqueado por la política de PowerShell; se usa `npm.cmd`. Python no está disponible; las herramientas de extracción usan Node.js.
- Font Awesome informa que su script opcional de atribución no fue autorizado por npm. No se habilitó; se utiliza su CSS y fuentes distribuidas en el paquete, que se verificarán en navegador.

## Cierre de la continuación — 12 de octubre de 2026

Se retomó el proyecto existente tras la interrupción de la conversación. La implementación React ya estaba presente; se revisaron los tres HTML y sus estilos, el enrutamiento, los componentes compartidos, las validaciones, el servicio y las pruebas. No se regeneraron componentes ni se ejecutaron los scripts de conversión, para conservar las correcciones existentes.

### Registro del código asistido por IA

Este registro identifica el código de la integración completa, incluida la sesión anterior. Los archivos conservan el código fuente revisable; las agrupaciones siguientes no implican que todos se hayan modificado nuevamente en esta continuación.

| Archivos | Código generado o adaptado con IA y propósito |
| --- | --- |
| `src/App.jsx`, `src/main.jsx` | Organización de layout y rutas, BrowserRouter, navegación SPA, foco, metadatos y página desconocida. Conservación de StrictMode. |
| `src/pages/HomePage.jsx`, `AboutPage.jsx`, `ReservationsPage.jsx` | Composición JSX de Inicio, Nosotros y Reservas; estado controlado y envío del formulario al servicio desacoplado. |
| `src/components/Header.jsx`, `Footer.jsx`, `Logo.jsx`, `Icon.jsx`, `PageBanner.jsx` | Elementos comunes, menú hamburguesa con Escape y atributos accesibles, identidad visual y banners. |
| `src/components/RouteCard.jsx`, `DepartureCalendar.jsx` | Catálogo reutilizable y calendario de referencia enlazado a las rutas. |
| `src/components/sections/HomeHero.jsx`, `ReadySection.jsx`, `GearSection.jsx`, `RoutesMap.jsx`, `HomeValues.jsx` | Secciones de Inicio derivadas de Stitch, carrusel controlado y mapa con enlaces al catálogo. |
| `src/components/sections/AboutIntro.jsx`, `SafetySection.jsx`, `CommunitiesSection.jsx`, `CommitmentSection.jsx` | Secciones de Nosotros convertidas a JSX, con SVG, imágenes y clases del diseño. |
| `src/components/booking/FormField.jsx`, `ExperienceSelector.jsx`, `PaymentMethods.jsx`, `BookingSummary.jsx` | Campos etiquetados, errores asociados, selección de experiencia, preferencia de pago y resumen reactivo. |
| `src/data/experiences.js`, `bookingOptions.js` | Datos compartidos del catálogo y opciones del formulario. |
| `src/lib/reservation.js`, `src/services/reservationService.js` | Validación, normalización de datos y contrato pendiente de conectar con Supabase. Ningún guardado simulado. |
| `src/index.css`, `src/App.css`, `tailwind.config.js` | Fuentes locales, tokens originales, temas por página, responsive, foco visible y movimiento reducido. |
| `vite.config.js`, `package.json`, `package-lock.json`, `index.html`, `.gitignore` | Integración de Tailwind con Vite conservando React; dependencias, comandos, metadatos y exclusión de artefactos. |
| `public/ruta-andina.svg`, `public/images/`, `docs/stitch-assets.json` | Favicon y copias de imágenes originales con procedencia registrada. No se atribuyen las fotografías a la IA de esta continuación. |
| `scripts/inspect-stitch.mjs`, `convert-stitch.mjs`, `download-stitch-assets.mjs` | Herramientas usadas durante la migración inicial; no se deben ejecutar para iniciar la aplicación. |
| `scripts/verify-originals.mjs`, `verify-production.mjs`, `capture-preview.mjs` | Integridad SHA-256, comprobación del build en navegador y capturas de escritorio/móvil. |
| `tests/unit/reservation.test.js`, `service.test.js`, `tests/browser/app.spec.js`, `playwright.config.js` | Pruebas de validación, servicio, interacción, rutas, responsive, recursos y accesibilidad automática. |

### Archivos modificados en esta continuación

- `README.md`: reemplazada la descripción de plantilla por instrucciones del proyecto real, estructura, comprobaciones, contrato del servicio y requisitos del hosting SPA.
- `package.json`: añadido `verify:production` para hacer accesible la comprobación existente mediante npm.
- `docs/PLAN-INTEGRACION.md`: completado el último paso tras verificar integridad y documentación.
- `docs/BITACORA-IA.md`: registro de autoría, alcance, resultados y límites de esta continuación.
- `docs/verificaciones/browser-report.json` y `production-report.json`: informes regenerados por las pruebas. Playwright también actualiza sus artefactos locales en `playwright-report/` y `test-results/`.
- `docs/verificaciones/cierre.json`: resumen de resultados de esta continuación.

No se modificaron los originales ni las configuraciones de React durante esta continuación. No se cambiaron las dependencias instaladas. La carpeta no es un repositorio Git; no se puede aportar un diff histórico fiable de la sesión anterior.

### Verificaciones ejecutadas de nuevo

| Comando / verificación | Resultado observado |
| --- | --- |
| `npm.cmd run build` | Correcto: 120 módulos transformados y build en `dist/`, sin errores. |
| `npm.cmd run lint` | Correcto: código de salida 0, sin diagnósticos. |
| `npm.cmd test` | 9 pruebas unitarias aprobadas, 0 fallidas. |
| `npm.cmd run test:e2e` | 11 pruebas aprobadas, 0 fallidas, usando Microsoft Edge. Informe JSON y HTML generado. |
| `node scripts/verify-production.mjs` | Las tres rutas responden HTTP 200, renderizan React con un H1, sin errores JS ni desbordamiento a 375 px. |
| `npm.cmd run verify:originals` | Los 6 originales coinciden con los hashes SHA-256 registrados antes de la conversión; no hay archivos añadidos ni eliminados. |
| `npm.cmd audit --json` | Tras permitir acceso al registro npm: 0 vulnerabilidades reportadas. |

Las pruebas de navegador verifican navegación sin recarga y volver atrás, acceso directo, metadatos, menú móvil y Escape, selección desde catálogo, errores y foco del formulario, resumen, solicitud válida sin envío ni almacenamiento, carrusel, mapa, imágenes, rutas desconocidas y variantes con barra final o mayúsculas. Las tres páginas se comprueban a 320, 375, 768 y 1440 px sin desbordamiento horizontal. Axe analiza las tres páginas a 1440 px con reglas WCAG 2 A/AA y 2.1 AA: ninguna infracción detectada en esos estados. Esto no equivale a una certificación completa ni a pruebas en todos los navegadores.

Las capturas `inicio-*.png`, `nosotros-*.png` y `reservas-*.png` y `visual-report.json` proceden de la sesión anterior. En esta continuación se inspeccionó además la captura de Reservas de escritorio; no se realizó una nueva comparación automática de píxeles ni se regeneraron las capturas. El informe visual registra algunas imágenes/SVG decorativos que exceden su caja geométrica y están recortados por sus contenedores; las pruebas del ancho real del documento pasan.

### Errores e incidencias de la continuación

- No se encontraron errores bloqueantes de compilación, lint, validación o funcionamiento en las pruebas ejecutadas.
- `git status` no está disponible porque esta carpeta no contiene un repositorio Git; no afecta a la aplicación.
- El primer `npm audit` falló por acceso de red y al directorio de logs del entorno restringido. Se repitió con autorización fuera del sandbox y terminó correctamente.
- Playwright emitió una advertencia de entorno sobre `NO_COLOR` y `FORCE_COLOR`; no causó fallos de pruebas.
- Un primer intento de actualizar documentación con un parche que eliminaba y añadía el mismo archivo fue rechazado sin aplicar cambios. Se corrigió el método y se escribieron los documentos correctamente.

### Límites funcionales declarados

Supabase sigue pendiente por diseño: no hay credenciales, persistencia ni envío a WhatsApp. Las preferencias de pago no efectúan cobros. Las fechas y tarifas del catálogo son referenciales y los enlaces sociales están pendientes de configurar. La fidelidad visual admite los ajustes de accesibilidad, navegación y textos necesarios para describir correctamente estas funciones. Para publicar se requiere fallback SPA a `index.html`; el SEO por ruta se actualiza en cliente, sin prerenderizado.

## Día 3 — Accesibilidad básica y SEO (12 de octubre de 2026)

Solicitud: revisar Inicio, Nosotros y Reservas; corregir solo los problemas necesarios sin alterar identidad visual ni distribución. Se conservaron las fotografías, fuentes, paleta, tamaños y estructura de las páginas. No se escribió en `stitch-original` ni se cambiaron las dependencias o configuración de React.

### Hallazgos y código modificado con IA

| Archivo | Problema y corrección |
| --- | --- |
| `src/App.jsx` | El foco automático inicial en `main` hacía que el primer Tab saltara el enlace de salto y la cabecera. Se añadió `useRef` para distinguir la carga inicial de una navegación SPA; se mantiene el foco en el contenido tras cambiar de página. |
| `src/pages/HomePage.jsx` | El destino `#catalogo` no recibía foco. Se añadió `tabIndex={-1}` y `aria-labelledby` asociado al H2 existente. No añade una parada extra al recorrido normal con Tab. |
| `src/components/booking/ExperienceSelector.jsx` | El título del grupo de experiencias solo era `legend`; sus tarjetas H3 quedaban bajo el H2 de datos personales. Se incorporó un H2 dentro del legend, conservando su estilo heredado y la etiqueta del grupo. |
| `src/components/DepartureCalendar.jsx`, `Footer.jsx` | Axe señalaba como pendientes de revisión dos `aria-label` sobre contenedores genéricos. Se añadió `role="group"` para que sus nombres tengan semántica accesible. |
| `src/components/sections/HomeHero.jsx` | Contraste insuficiente sobre algunas de las cuatro fotografías, especialmente el texto amarillo, párrafo y botón Conócenos. Se ajustó únicamente la capa oscura existente a negro con opacidad 60 %. |
| `src/components/sections/ReadySection.jsx` | El texto amarillo y el párrafo perdían contraste en móvil. Se reforzó el degradado oscuro existente, conservando la fotografía y su distribución. |
| `src/components/PageBanner.jsx` | El H1 Nosotros necesitaba más contraste en zonas claras de la foto. Se reforzó su degradado existente; el banner de Reservas conserva su tratamiento. |
| `tests/browser/day3.spec.js` | Diez pruebas nuevas: semántica y accesibilidad por página, salto con teclado, menú con Enter/Espacio/Escape, catálogo, formulario y metadatos SPA. Incluye comprobación del indicador de foco de los controles recorridos. |
| `scripts/check-rendered-contrast.mjs` | Comprobación complementaria de contraste sobre capturas reales para fotos/degradados que Axe no resuelve. Conserva resultados, informa casos sin muestra y falla si detecta una muestra bajo el umbral. |
| `docs/verificaciones/dia3/` | Informes Axe, inventarios de encabezados/alternativas, seis capturas y mediciones de contraste antes/después. |
| `docs/DIA-3-ACCESIBILIDAD-SEO.md`, `docs/BITACORA-IA.md` | Resumen de cumplimiento, reproducción de pruebas, cambios y límites. |

Las etiquetas de los campos, `required`, `aria-invalid`, mensajes vinculados con `aria-describedby`, textos alternativos informativos e iconos decorativos ya estaban implementados y no requirieron cambios. Las cinco miniaturas del selector conservan `alt=""`: acompañan el nombre de la experiencia en el mismo control y repetirlo añadiría ruido. El documento ya tenía `lang="es"` y títulos/descripciones únicos actualizados con React Router; tampoco fue necesario modificar esos textos.

### Verificación y evidencia

- Se reprodujeron cuatro fallos de pruebas de teclado antes del arreglo: salto al contenido en las tres rutas y foco del catálogo. Una quinta prueba inicial falló por leer el título antes de terminar el efecto de React; se corrigió la sincronización de la prueba, sin cambiar el SEO de la aplicación.
- Axe se ejecutó a 375 y 1440 px en las tres páginas, además de menú abierto y formulario con errores. Los informes conservan tanto `violations` como `incomplete`; no se confunde una comprobación incompleta con un resultado aprobado.
- El contraste suplementario usa capturas con y sin texto y muestras del interior de los glifos, evitando confundir iconos o subrayados cercanos con el fondo del texto. Recorre las tres páginas a 375/1440 px y las cuatro fotos de Inicio: 12 escenarios. No sustituye una auditoría completa de WCAG. Los caracteres demasiado finos sin muestra válida se registran con `passes: null`; no se declaran aprobados por este método.
- Se revisaron las combinaciones de texto oscuro sobre fondos crema/blancos y de texto blanco sobre botones vino/rojos, junto con las etiquetas, alternativas y jerarquía del código. Las fotografías exigieron la comprobación suplementaria descrita.
- Mediciones finales mínimas observadas: «DE BOLIVIA» 6,24:1 (umbral 3:1 por tamaño), «Conócenos» 4,72:1 (4,5:1), «NOSOTROS» 3,98:1 (3:1), «Acepta el desafío» 5,69:1 (4,5:1). En las muestras evaluadas no quedaron valores por debajo de sus umbrales. Son mediciones de estos escenarios, no garantía para cualquier ancho/foto futura.
- Se regeneraron seis capturas de página completa y se inspeccionó la captura de Nosotros de escritorio. No se realizó comparación automática de píxeles con Stitch.
- Teclado real mediante Playwright: Tab, Enter, Espacio, Escape y flechas; abrir/cerrar/navegar con el menú, seguir el salto y catálogo, enviar formulario vacío, recibir foco y descripción del error, cambiar experiencia, preferencia de pago y checkbox. Los controles comprobados muestran indicador de foco.
- SEO: un H1 por ruta, niveles consecutivos H2/H3 (y H4 subordinados en equipamiento), textos no vacíos; título y descripción distintos y coherentes con Open Graph después de navegar sin recarga. Inventarios en `*-semantica.json`.

### Resultados finales

- `npm.cmd run build`: correcto, 120 módulos; `dist/` actualizado.
- `npm.cmd run lint`: sin diagnósticos.
- `npm.cmd test`: 9 pruebas unitarias aprobadas.
- `npm.cmd run test:e2e`: 21 pruebas de navegador (11 existentes + 10 de Día 3).
- `node scripts/check-rendered-contrast.mjs`: 12 escenarios, sin muestras evaluadas bajo el umbral.
- `npm.cmd run verify:originals`: 6 originales intactos por SHA-256.
- `npm.cmd run verify:production`: las 3 rutas con HTTP 200, un H1, sin errores JavaScript ni desbordamiento móvil.

Incidencias de entorno: el puerto 4175 ya tenía el servidor del proyecto, por lo que se reutilizó; no se detuvo el proceso existente. Persistió la advertencia de variables `NO_COLOR`/`FORCE_COLOR` de Playwright, sin impacto funcional. Un parche inicial no coincidió con la marca BOM de un archivo; se adaptó la escritura sin perder contenido.

### Pendientes y límites

La revisión básica solicitada queda cubierta en los escenarios indicados. Queda fuera de esta comprobación una auditoría exhaustiva con NVDA/VoiceOver, otros motores de navegador y todos los tamaños, zoom y estados posibles. Axe mantiene comprobaciones de contraste incompletas sobre fondos complejos; la medición complementaria también explicita las muestras que no pudo evaluar. No se afirma certificación WCAG completa.

El SEO por ruta sigue siendo de cliente. Prerenderizado/SSR, canonical y sitemap con el dominio definitivo pueden abordarse al publicar y no formaron parte del Día 3 solicitado. Supabase, recepción de reservas y perfiles sociales reales siguen pendientes del alcance anterior; el formulario continúa sin enviar ni guardar datos.

## Revisión de seguimiento — solicitud repetida

Se volvió a comprobar el alcance solicitado. No hubo problemas confirmados con las etiquetas del formulario ni con el texto `alt`; se conservaron descripciones y miniaturas redundantes con `alt=""`. El registro de contraste volvió a ejecutarse tras revisar esos requisitos: 12 combinaciones de página/ancho/diapositiva, sin muestras evaluadas bajo el umbral. También comprobé que el foco de controles interactivos tiene un indicador visible.

Esta pasada detectó y corrigió una estructura HTML del ajuste previo: el H2 de experiencias se movió fuera del `legend`. Ahora el título visible H2 identifica el fieldset mediante `aria-labelledby`; el `legend` conserva su nombre de grupo y queda visualmente oculto. De esta forma se mantiene la misma presentación con semántica HTML correcta. Repetí las 10 pruebas de Día 3 tras la corrección y pasaron. También repetí build, lint, 9 pruebas unitarias, verificación de originales y tres rutas de producción. La suite completa de 21 pruebas de navegador también se repitió; ver el informe actualizado.

## Revisión SEO — solicitud posterior (12 de octubre de 2026)

Se revisaron las rutas `/`, `/nosotros` y `/reservas` en carga directa y navegación SPA. Las tres ya tenían título propio, una etiqueta H1 y niveles H2/H3 organizados. La descripción de Inicio ya mencionaba la oferta; las descripciones de Nosotros y Reservas no explicitaban todos los servicios. Se actualizaron las tres para nombrar trekking, ciclismo, turismo y Bolivia, manteniendo textos diferentes por ruta. La descripción inicial de `index.html` se sincronizó con la de Inicio. El efecto existente de React Router sigue actualizando `<title>`, `meta description` y Open Graph al cambiar de página; no hubo cambios visuales.

`tests/browser/day3.spec.js` ahora afirma las palabras clave en cada descripción, títulos/descripciones diferentes, coherencia con Open Graph, un H1 por página y jerarquía consecutiva de encabezados. Las comprobaciones cubren la carga directa y la navegación SPA. La primera ejecución tras editar encontró una navegación de contexto interrumpida mientras Vite aplicaba el cambio; la suite completa se volvió a ejecutar con el servidor estable. Resultado final: 21 pruebas de navegador aprobadas. Build, lint y las 9 pruebas unitarias también se ejecutaron correctamente. Detalles del SEO y su alcance en `docs/DIA-3-ACCESIBILIDAD-SEO.md`.

## Integración de solicitudes con Supabase (13 de octubre de 2026)

El usuario confirmó que ejecutó la migración SQL sobre `public.inquiries`. No se usó acceso a su cuenta ni se afirmaron resultados de consultas remotas; se añadió un archivo de consultas de solo lectura para comprobar columnas, RLS, políticas y privilegios efectivos incluidos los heredados por `PUBLIC`.

### Código generado o adaptado con IA

- `src/lib/supabase.js`: crea el cliente solo si existen `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY`; usa exclusivamente clave publicable.
- `src/lib/reservation.js`: adapta el payload a las columnas reales `name`, `country`, `city`, `whatsapp`, `experience_id`, `requested_date`, `participants`, `preferred_payment` y `message`.
- `src/services/reservationService.js`: vuelve a validar y hace `insert` en `inquiries` sin `.select()`. No incluye `email` ni `status`; no afirma éxito si falta configuración o el backend devuelve error.
- `src/pages/ReservationsPage.jsx` y `src/components/booking/BookingSummary.jsx`: estados de envío, error y registro; WhatsApp se prepara/abre solo tras el éxito del insert, con enlace accesible de respaldo si el navegador bloquea la ventana. El mensaje aclara que es una solicitud pendiente de confirmación y la persona debe enviarlo manualmente.
- `.env.example`: plantilla para URL, clave publicable y número comercial de WhatsApp; no contiene credenciales reales. `.gitignore` ya excluye `.env*` excepto `.env.example`.
- `tests/unit/service.test.js`, `tests/browser/app.spec.js`: pruebas de payload permitido, ausencia de email/estado, respuesta de guardado/error y enlace WhatsApp.
- `README.md`: instrucciones para poner las variables en `.env.local` y reiniciar Vite.
- `docs/SUPABASE-VERIFICACION.sql`: consultas de solo lectura para comprobar el resultado en el SQL Editor.

### Datos que faltan para probar la conexión real

El propietario debe copiar la **Project URL** y **Publishable key** desde Supabase (Connect o Settings → API Keys), añadirlas al `.env.local` local y proporcionar el número de WhatsApp comercial internacional, solo dígitos. No pedir ni introducir la clave `secret` o `service_role`. Sin esos valores no se envía ninguna solicitud real y no se abre WhatsApp.

### Verificaciones de esta integración

La instalación de `@supabase/supabase-js` se ejecutó con aprobación de acceso a npm; npm reportó cero vulnerabilidades en los 98 paquetes auditados. Resultados locales: `npm.cmd run build` correcto (164 módulos), `npm.cmd run lint` sin diagnósticos, `npm.cmd test` con 11 aprobadas, `npm.cmd run verify:production` con las tres rutas correctas y `npm.cmd run verify:originals` con los seis originales intactos por SHA-256. En `npm.cmd run test:e2e`, 18 de 21 pruebas pasaron. La prueba SEO/contraste de Inicio agotó 30 segundos esperando recursos; después el servidor local de Vite dejó de responder y provocó `ERR_CONNECTION_REFUSED` en dos pruebas posteriores. Las 11 pruebas de `app.spec.js` pasaron; el fallo de contraste no mostró una infracción Axe, sino un timeout. No se declara aprobada la suite completa.

La verificación directa del esquema/permisos y una inserción real requieren que el usuario ejecute `docs/SUPABASE-VERIFICACION.sql` y configure las variables; no se dispone de acceso al proyecto Supabase ni se presentan consultas remotas como realizadas. Para la prueba real se deben usar datos de prueba y confirmar que la solicitud queda pendiente, no como reserva confirmada.

## Diagnóstico seguro de inserción Supabase (13 de octubre de 2026)

El usuario informó un fallo al enviar una solicitud desde el formulario. Se revisó `.env.local` emitiendo únicamente indicadores booleanos: las tres variables existen, sus formatos son válidos y no conservan los marcadores de la plantilla. Ningún valor fue impreso. El código consume esos nombres `VITE_*` mediante `import.meta.env`; el archivo permanece ignorado por Git.

Se contrastó el payload con el formulario y la política de inserción acordada: envía `name`, `country`, `city`, `whatsapp` E.164 normalizado, `experience_id` de catálogo, fecha ISO, participantes (`1`–`5+`), método de pago permitido y observaciones vacías o de hasta 1000 caracteres. Omite email y status. No se encontró discrepancia en el código revisado; la condición y permisos efectivos de la base real todavía requieren consulta de solo lectura en Supabase.

`src/services/reservationService.js` ya no descarta silenciosamente el error: devuelve un código permitido y una categoría (RLS/permisos, esquema, autenticación, validación o red), sin mostrar `message`, `details`, `hint`, claves ni datos del formulario. `BookingSummary.jsx` presenta ese diagnóstico temporal. `src/lib/supabase.js` carga `@supabase/supabase-js` al enviar, no en el bundle inicial; el build ahora genera un chunk separado de ~214 kB y el principal de ~343 kB.

Para impedir escrituras accidentales durante pruebas, `playwright.config.js` inicia Vite aislado en el puerto 4177, no reutiliza servidores y pasa las variables Supabase vacías; `tests/browser/app.spec.js` además bloquea `/rest/v1/*` en el flujo del formulario válido. README actualizado con este aislamiento.

Verificaciones tras los cambios: build correcto, lint sin diagnósticos, 12 pruebas unitarias aprobadas, producción con tres rutas correctas y seis originales intactos por SHA-256. La prueba de navegador dirigida al formulario informó `ok`, pero el proceso Playwright se quedó abierto durante su cierre y se interrumpió; no se cuenta como una ejecución completa exitosa. En una ejecución anterior de la suite completa, 18 de 21 pasaron; una auditoría visual agotó tiempo y el servidor Vite dejó de responder para dos pruebas. Ninguna prueba usó la base real ni creó filas.

Diagnóstico remoto adicional de solo lectura: el endpoint de salud de Auth respondió HTTP 200; la raíz REST `/rest/v1/` respondió HTTP 401 al enviar el encabezado `apikey` (confirmado localmente presente). La respuesta no se guardó ni mostró. La URL responde, pero el API de datos rechaza la autenticación antes de ejecutar SQL o evaluar RLS. Esto apunta a que el Publishable key no pertenece a esa URL, no está activo/aceptado por ese proyecto, o a una configuración de API keys del proyecto; la comprobación no permite distinguir cuál. No se ejecutó ningún INSERT, SELECT de filas ni cambio de esquema/RLS.

La corrección inmediata que requiere el usuario es copiar **Project URL y Publishable key juntos desde el mismo proyecto** (Connect o Settings → API Keys), sustituir ambos valores en `.env.local` y reiniciar Vite. No poner la clave en `Authorization` manualmente ni usar una clave `secret`/`service_role` en React. Después, si el API raíz ya no devuelve 401 pero el formulario falla, el diagnóstico temporal mostrará el código de RLS/esquema/red; `docs/SUPABASE-VERIFICACION.sql` permite comprobar permisos sin modificarlos.
## Observaciones opcionales en reservas (13 de octubre de 2026)

El usuario compartió la definición real de `inquiries_message_length`: exige de 10 a 1500 caracteres tras `btrim(message)`. Se modificó el payload para que el campo vacío se envíe como cadena vacía `''`, nunca `NULL`, y se añadió una prueba unitaria para ese comportamiento.

Se preparó `docs/SUPABASE-MENSAJE-OPCIONAL.sql`: valida que la restricción existente coincida con la definición reportada; si difiere, aborta la transacción. La sustituye por un CHECK que permite `''` y mantiene el rango previo de 10 a 1500 para texto no vacío. Además reafirma `NOT NULL`. El cambio no elimina ni actualiza filas. El usuario debe ejecutar el SQL en Supabase Dashboard > SQL Editor y comprobar que `message` continúe con `is_nullable = NO`.
## Avisos emergentes de validación en reservas (13 de octubre de 2026)

Al intentar enviar el formulario con campos inválidos, la página ahora muestra un popup nativo con la lista de campos y sus mensajes de validación, conserva los errores accesibles junto a cada campo y enfoca el primero que requiere corrección. Se actualizó la prueba de navegador para confirmar el contenido del popup. No se modificaron la distribución ni las reglas de validación.
## Popups temáticos para validación y confirmación (13 de octubre de 2026)

Se instaló SweetAlert2 y se sustituyó el `alert()` del navegador por un popup que enumera los errores de validación. Después de una inserción exitosa confirmada por Supabase, se muestra un popup verde que indica que la solicitud fue guardada y permite continuar a WhatsApp manualmente. Si falla el insert, no se abre WhatsApp ni se presenta un falso mensaje de éxito. Los estilos del popup usan la paleta crema/rojo/verde y las familias Montserrat y Oswald del proyecto. La prueba de navegador del popup de validación se actualizó. Lint, 13 pruebas unitarias y compilación pasaron.
## Sincronización de identificadores de experiencia en Supabase (13 de octubre de 2026)

El usuario reportó un error `23514` en `inquiries_experience_known` al enviar `el-choro`. Se comprobó que React usa `death-road`, `el-choro`, `isla-del-sol`, `pico-tunari`, `vacas` y `asesoramiento`; el formulario está enviando un ID real del catálogo. Se preparó `docs/SUPABASE-EXPERIENCIAS.sql` para alinear el CHECK con estos IDs. La nueva restricción se crea `NOT VALID` para preservar filas históricas, mientras que PostgreSQL valida las nuevas inserciones/actualizaciones. El script aborta si no encuentra la restricción esperada o esta no referencia `experience_id`. También muestra la política INSERT posterior, pues esa regla puede ser el siguiente control a sincronizar. No se accedió ni modificó la base remota. Pendiente ejecutar y verificar desde Supabase SQL Editor.
## Preparación para publicar en GitHub Pages (13 de octubre de 2026)

Se agregó el workflow `.github/workflows/deploy-pages.yml` para construir y desplegar en GitHub Pages al publicar en `main`, con variables de entorno de GitHub Actions. Vite toma automáticamente el subpath según `GITHUB_REPOSITORY`; React Router usa `BASE_URL`, y los recursos públicos se resuelven con `publicAsset()`. El workflow copia `index.html` como `404.html` para el fallback SPA. `.env.local` ya está cubierto por `.gitignore` y no se agrega al repositorio.

El usuario indicó crear un repositorio público `ruta-andina`. Se inicializó Git en `main`, se prepararon los archivos y se confirmó que `.env.local` queda ignorado; el escaneo de archivos compartibles no encontró patrones de clave secreta de Supabase, tokens GitHub ni claves privadas. No hay remoto ni commit publicado todavía: `gh auth status` indica que el token guardado para `ytai-br` es inválido. Pendiente reautenticar con `gh auth login -h github.com`, crear `ytai-br/ruta-andina`, configurar las variables de Actions, hacer push y confirmar el despliegue de Pages.
