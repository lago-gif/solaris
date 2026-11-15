// Reglas de nombres compartidas por scripts/build-tokens.mjs y Storybook.
// Convierten la ruta de un token de tokens/tokens.json en:
//   - su variable CSS (--semantic-color-background-brand)
//   - su variable de tema de Tailwind (--color-background-brand)
//   - la clase de Tailwind que se usa en los componentes (bg-background-brand)

/** "semantic.color.background.brand.$root" → ["semantic", "color", "background", "brand"] */
export function segments(path) {
  return path.split('.').filter((s) => s !== '$root')
}

/** Variable CSS de cualquier token: --primitive-color-gray-50, --component-button-radius… */
export function cssVar(path) {
  return `--${segments(path).join('-')}`
}

/** Nombre del token sin el nivel: "button-background-brand", "space-md". */
function tokenName(path) {
  const [, ...rest] = segments(path)
  // En los semánticos de color, "color" no aporta nada a la clase: bg-background-brand.
  if (segments(path)[0] === 'semantic' && rest[0] === 'color') rest.shift()
  return rest.join('-')
}

/** Utilidad de Tailwind para un color, según la parte que pinta. */
function colorUtility(name) {
  if (/(^|-)background(-|$)/.test(name)) return 'bg'
  if (/(^|-)border(-|$)/.test(name)) return /focus/.test(name) ? 'outline' : 'border'
  return 'text' // text, icon, required…
}

/**
 * Cómo se convierte un token semantic o component en Tailwind.
 * Devuelve { theme: [[variable, valor]], utility: [nombre, css] | null, classes: [clases] }.
 * Los tokens de tipografía semántica se agrupan aparte (ver typographyStyle).
 */
export function tailwindFor(path, type) {
  const layer = segments(path)[0]
  if (layer === 'primitive') return null
  const name = tokenName(path)
  const ref = `var(${cssVar(path)})`

  if (layer === 'semantic' && name.startsWith('typography-')) return null // se agrupa por estilo

  if (type === 'color') {
    return { theme: [[`--color-${name}`, ref]], utility: null, classes: [`${colorUtility(name)}-${name}`] }
  }
  if (type === 'shadow') return { theme: [[`--shadow-${name}`, ref]], utility: null, classes: [`shadow-${name}`] }
  if (type === 'fontWeight') return { theme: [[`--font-weight-${name}`, ref]], utility: null, classes: [`font-${name}`] }

  // dimension
  if (/(^|-)border-width(-|$)/.test(name)) {
    const cls = name.startsWith('border-width') ? name : `border-width-${name}`
    const outline = cls.replace(/^border-width/, 'outline-width')
    return {
      theme: [],
      utility: [
        [cls, `border-style: solid; border-width: ${ref};`],
        [cls.replace(/^border-width/, 'border-t-width'), `border-top-style: solid; border-top-width: ${ref};`],
        [outline, `outline-style: solid; outline-width: ${ref};`],
      ],
      classes: [cls, outline],
    }
  }
  if (/focus-offset$/.test(name)) {
    return { theme: [], utility: [[`outline-offset-${name}`, `outline-offset: ${ref};`]], classes: [`outline-offset-${name}`] }
  }
  if (/(^|-)radius(-|$)/.test(name)) return { theme: [[`--radius-${name}`, ref]], utility: null, classes: [`rounded-${name}`] }
  if (/font-size/.test(name)) return { theme: [[`--text-${name}`, ref]], utility: null, classes: [`text-${name}`] }
  if (/line-height/.test(name)) return { theme: [[`--leading-${name}`, ref]], utility: null, classes: [`leading-${name}`] }

  // Espaciado: entra en --spacing-*, así sirve para p-, px-, py-, m-, gap-, left-…
  const prefix = /padding-x/.test(name)
    ? 'px'
    : /padding-y/.test(name)
      ? 'py'
      : /padding-top/.test(name)
        ? 'pt'
        : /padding/.test(name)
          ? 'p'
          : /gap/.test(name)
            ? 'gap'
            : 'p'
  return { theme: [[`--spacing-${name}`, ref]], utility: null, classes: [`${prefix}-${name}`] }
}

/** Estilo de texto semántico (typography.heading) → una sola clase: text-heading. */
export function typographyStyle(style) {
  const base = `--semantic-typography-${style}`
  return {
    theme: [
      [`--text-${style}`, `var(${base}-font-size)`],
      [`--text-${style}--line-height`, `var(${base}-line-height)`],
      [`--text-${style}--font-weight`, `var(${base}-font-weight)`],
    ],
    classes: [`text-${style}`],
  }
}

/** Clase principal de un token, para enseñarla en Storybook y en docs/tokens.md. */
export function classFor(path, type) {
  const s = segments(path)
  if (s[0] === 'semantic' && s[1] === 'typography') return `text-${s[2]}`
  return tailwindFor(path, type)?.classes.join(' · ') ?? ''
}
