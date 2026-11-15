import tokens from '../../../tokens/tokens.json'

// Lectura de tokens/tokens.json (formato DTCG) para la página Fundamentos/Primitivos:
// tipos de los valores y utilidades para ordenarlos y convertirlos a CSS.

export { tokens }

export type Dimension = { value: number; unit: 'px' | 'rem' }
export type ColorValue = { colorSpace: string; components: number[]; alpha?: number; hex: string }
export type Token<T> = { $value: T; $description?: string }
export type Group<T> = Record<string, Token<T> | string>

// Ordena los pasos por su valor numérico (0, 050, 100…). JavaScript pone primero
// las claves que parecen números enteros, así que "050" quedaría al final.
function order(key: string) {
  const n = Number(key)
  return Number.isNaN(n) ? Infinity : n
}

export function entries<T>(group: Group<T>): [string, Token<T>][] {
  return (Object.entries(group).filter(([key]) => !key.startsWith('$')) as [string, Token<T>][]).sort(
    ([a], [b]) => order(a) - order(b),
  )
}

export function css(d: Dimension) {
  return `${d.value}${d.unit}`
}

export function px(d: Dimension) {
  return d.unit === 'rem' ? d.value * 16 : d.value
}

export function label(d: Dimension) {
  return d.unit === 'rem' ? `${d.value}rem · ${px(d)}px` : `${d.value}px`
}

export function cssColor(c: ColorValue) {
  const [a, b, h] = c.components
  const alpha = c.alpha !== undefined ? ` / ${c.alpha}` : ''
  if (c.colorSpace === 'oklch') return `oklch(${a} ${b} ${h}${alpha})`
  return `rgb(${a * 255} ${b * 255} ${h * 255}${alpha})`
}

/** Convierte una lista de familias tipográficas en el valor CSS de font-family. */
export function fontStack(families: string[]) {
  return families.map((f) => (f.includes(' ') ? `'${f}'` : f)).join(', ')
}

export const sansStack = fontStack(tokens['font-family'].sans.$value as string[])
