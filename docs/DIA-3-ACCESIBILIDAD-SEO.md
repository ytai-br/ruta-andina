# Día 3 — Accesibilidad básica y SEO

## Cumplimiento

| Requisito | Resultado |
| --- | --- |
| Contraste | Ajustados solo los fondos oscuros sobre fotos de Inicio y Nosotros. Axe más mediciones de píxeles; sin fallos en las muestras evaluadas. |
| Formularios | Nombres accesibles, labels, campos obligatorios y errores asociados verificados. Grupo de experiencias con legend y H2. |
| Imágenes | Alternativas descriptivas en imágenes informativas; miniaturas redundantes con alternativa vacía. SVG/iconos decorativos ocultos a tecnologías de asistencia. |
| Teclado | Salto al contenido y catálogo corregidos. Menú, formulario, radios y pago preferido operables con teclado; indicador de foco comprobado. |
| SEO | Título y descripción propios en cada página, Open Graph coherente, idioma español, un H1 y estructura de encabezados ordenada. |
| Conservación | Misma paleta, fuentes, fotos y distribución. Los seis archivos originales siguen intactos por SHA-256. |

## Pruebas reproducibles

```powershell
npm.cmd run lint
npm.cmd test
npm.cmd run test:e2e
npm.cmd run build
npm.cmd run verify:production
npm.cmd run verify:originals
```

Para repetir la medición suplementaria, con Vite en `127.0.0.1:4175`:

```powershell
node scripts/check-rendered-contrast.mjs
```

Pruebas de navegador con Microsoft Edge: 21 casos. Unitarias: 9. El contraste de fotos incluye 12 escenarios (375/1440 px, tres páginas y cuatro diapositivas en Inicio). Las pruebas responsive existentes también comprueban 320 y 768 px.

Las capturas y los informes están en [verificaciones/dia3](verificaciones/dia3/). `contraste-antes.json` conserva el estado previo y `contraste-renderizado.json` el final. Los archivos `*-semantica.json` registran títulos, descripciones, encabezados e imágenes. El informe completo de navegador está en `verificaciones/browser-report.json` y `../playwright-report/index.html`.

## Pendientes y alcance

No hay bloqueantes conocidos en el alcance básico probado. Para una auditoría integral quedan pruebas con lectores de pantalla, otros navegadores y revisión de todos los estados/anchos. Axe no resuelve todos los fondos; sus casos `incomplete` se conservan. La comprobación suplementaria no evalúa controles nativos mediante píxeles y deja como `null` los textos sin muestra válida, sin presentarlos como aprobados.

El SEO se actualiza en cliente. El dominio, canonical/sitemap y posible prerenderizado quedan para publicación. Supabase y envío real de reservas permanecen pendientes por diseño.

Detalle de autoría, archivos y correcciones: [BITACORA-IA.md](BITACORA-IA.md), sección Día 3.

### Seguimiento

En una segunda revisión se detectó que un H2 se había colocado dentro de `legend`, ubicación no válida para ese contenido. Se reestructuró sin cambio visual: encabezado visible H2 vinculado al `fieldset` con `aria-labelledby`, y `legend` descriptivo oculto visualmente. Las 10 pruebas específicas de Día 3, el build, lint, 9 pruebas unitarias, hash de originales y verificación de producción pasaron de nuevo. La ejecución completa de navegador se repitió y su resultado queda registrado en `docs/verificaciones/browser-report.json`.

## Verificación SEO — 12 de octubre de 2026

Las tres rutas ofrecen títulos y descripciones únicos, con los términos de trekking, ciclismo, turismo y Bolivia. El título y la descripción de Inicio en `index.html` sirven de valores iniciales y coinciden con los metadatos de Inicio en React. React Router actualiza título, descripción y Open Graph al navegar sin recargar. Un H1 por página; H2/H3 y H4 subordinados en orden, comprobados en navegador. No se detectaron problemas; las descripciones de Nosotros y Reservas se precisaron para incluir los servicios.

Verificación final: build y lint correctos, 9 pruebas unitarias y 21 de navegador aprobadas. La suite comprueba valores en carga directa y después de navegación SPA. Más detalle y registro de cambios en [BITACORA-IA.md](BITACORA-IA.md).
