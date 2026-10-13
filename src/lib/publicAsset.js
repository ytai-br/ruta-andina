// Resuelve recursos de /public respetando el base path de Vite en GitHub Pages.
export function publicAsset(path) {
  const baseUrl = import.meta.env?.BASE_URL || '/'
  return `${baseUrl}${path.replace(/^\/+/, '')}`
}
