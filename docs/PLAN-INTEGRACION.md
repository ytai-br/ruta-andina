# Plan de integración de Stitch — 12 de octubre de 2026

## Objetivo y restricciones

Convertir los tres diseños proporcionados en una SPA React/Vite, conservando la composición, imágenes, colores y fuentes particulares de cada página. No escribir ni eliminar archivos dentro de `stitch-original`. Conservar React, StrictMode, el plugin React de Vite y la configuración de Oxlint.

## Decisiones

- Rutas `/`, `/nosotros` y `/reservas`, con React Router y página de ruta desconocida.
- `App.jsx` organiza el layout, cabecera, pie y rutas. Páginas en `src/pages`, componentes compartidos y secciones en `src/components`, datos en `src/data`.
- Tailwind 4 instalado mediante su plugin oficial de Vite. Conservar los tokens originales en `tailwind.config.js` y adaptar las utilidades. Se descartó Tailwind 3 tras detectar vulnerabilidades en sus dependencias; véase la bitácora.
- Tipografías locales por página: Montserrat/Oswald, Inter/Bebas Neue, Plus Jakarta Sans/Bebas Neue. Conservar los SVG y fotografías originales, descargando copias a `public/images` cuando estén accesibles.
- Menú móvil accesible: botón con estado expandido, cierre por selección, Escape y cambio de ruta. Navegación sin recargar, enlace de salto, foco al contenido, títulos y descripciones por página.
- Formulario controlado con campos, experiencia, pago preferido y resumen. Validar campos obligatorios, teléfono internacional, fecha presente/futura real, número de participantes y consentimiento. Los datos permanecen en memoria; un servicio separado devuelve explícitamente estado de integración pendiente. No hay éxito simulado, WhatsApp automático ni almacenamiento.
- Las fechas históricas y la disponibilidad de la maqueta deben identificarse como referencias sin disponibilidad confirmada. Los enlaces sociales sin destino no deben fingir funcionamiento.

## Ejecución y comprobaciones

1. [x] Registrar hashes SHA-256 de todos los originales y revisar HTML, estilos y capturas.
2. [x] Instalar dependencias y añadir configuración Tailwind/Vite conservando React.
3. [x] Escribir y ejecutar pruebas que fallen para validación y navegación/formulario.
4. [x] Convertir el contenido a JSX, extraer componentes reutilizables y conectar las tres rutas.
5. [x] Implementar las interacciones y la separación del servicio de reservas.
6. [x] Verificar compilación, lint, validadores, navegador real en escritorio/móvil, enlaces, teclado y accesibilidad.
7. [x] Comparar capturas con los originales; corregir problemas encontrados.
8. [x] Comprobar los hashes y actualizar README y bitácora con archivos, resultados y límites reales.

## Casos de revisión

- 320 px de ancho, textos largos y zoom: sin desplazamiento horizontal ni botones recortados.
- Abrir directamente `/reservas` y volver atrás: rutas válidas y selección de experiencia coherente.
- Fechas imposibles/pasadas, teléfono inválido, campos vacíos y consentimiento desmarcado: impedir continuar con mensajes asociados.
- Datos válidos: aviso de que no se envió ni guardó nada; conservar los campos.
- Fuentes/imágenes y enlaces externos: verificar recursos; no inventar disponibilidad, números de contacto ni perfiles.
