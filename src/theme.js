// ─── PALETTE ───────────────────────────────────────────────────────────────
// Cambia cualquier valor aquí y se propaga a toda la tienda.
// ───────────────────────────────────────────────────────────────────────────

export const theme = {
  colors: {
    // Brand
    primary:     '#4C1216',   // borgoña oscuro — color principal
    accent:      '#7A1C22',   // variación más clara del principal — hover, badges
    accentHover: '#921F27',   // hover del acento

    // Surfaces
    background:  '#FFFFFF',   // blanco puro — color secundario
    surface:     '#FDF5F5',   // blanco con toque rosado muy suave
    surfaceHover:'#F7EAEA',   // hover de cards

    // Text
    text:        '#4C1216',   // cuerpo en color principal
    textMuted:   '#7A4448',   // variación intermedia del principal
    textLight:   '#C49698',   // tono pastel del principal

    // UI
    border:      '#F0D8D9',   // borde rosado muy suave
    success:     '#4A7A5A',   // disponible
    error:       '#8B1A1A',   // error — variante oscura del principal
  },

  fonts: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  spacing: {
    xs: '0.25rem', sm: '0.5rem', md: '1rem',
    lg: '1.5rem', xl: '2rem', '2xl': '3rem', '3xl': '4rem',
  },

  radius: {
    sm: '4px', md: '8px', lg: '16px', full: '9999px',
  },

  transition: {
    fast: '180ms ease',
    base: '300ms ease',
    slow: '500ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
}

export function applyTheme(customColors = {}) {
  const merged = { ...theme.colors, ...customColors }
  const root = document.documentElement

  Object.entries(merged).forEach(([key, value]) => {
    root.style.setProperty(`--color-${toKebab(key)}`, value)
  })

  root.style.setProperty('--font-sans', theme.fonts.sans)

  Object.entries(theme.radius).forEach(([key, value]) => {
    root.style.setProperty(`--radius-${key}`, value)
  })

  Object.entries(theme.transition).forEach(([key, value]) => {
    root.style.setProperty(`--transition-${key}`, value)
  })
}

function toKebab(str) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}
