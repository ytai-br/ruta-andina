import forms from '@tailwindcss/forms'

// Original Stitch tokens. Each page selects its own body font via --font-body.
export default {
  theme: {
    extend: {
      colors: {
        andino: {
          wine: '#98262C', wineDark: '#641419', wineHover: '#7e1e24',
          sand: '#FBF6EE', sandDark: '#F2E8DA', charcoal: '#24201E', gold: '#D97706', accent: '#B91C1C',
          red: '#B91C1C', darkRed: '#8B1E22', deepRed: '#5E1215', cream: '#FDFBF7',
          cardCream: '#FFFFFF', border: '#E8DCCF', textDark: '#2B231D', muted: '#7A6E65',
        },
        brand: {
          red: '#98262C', redHover: '#7f1f24', wineDark: '#541216', wineFooter: '#5c1318',
          beigeBg: '#FBF7F0', creamCard: '#F5EFE6', lightCard: '#FAF4EC', earthDark: '#26211E', lineGray: '#E5DCD0',
        },
      },
      fontFamily: {
        sans: ['var(--font-body)', 'sans-serif'],
        title: ['Oswald Variable', 'sans-serif'],
        bebas: ['Bebas Neue', 'sans-serif'],
        display: ['Bebas Neue', 'sans-serif'],
        marker: ['Permanent Marker', 'cursive'],
      },
    },
  },
  plugins: [forms],
}
