import allTokens from '../../../tokens/tokens.json'

// Lectura de tokens/tokens.json (formato DTCG) para la página Fundamentos/Primitivos:
// tipos de los valores y utilidades para ordenarlos y convertirlos a CSS.

/** Capa primitive de tokens.json. */
export const tokens = allTokens.primitive

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

/** Clases de Tailwind equivalentes a cada token, para entender de dónde sale. */
const radiusTw: Record<string, string> = {
  '0': 'rounded-none',
  '050': 'rounded-xs',
  '100': 'rounded-sm',
  '150': 'rounded-md',
  '200': 'rounded-lg',
  '300': 'rounded-xl',
  '400': 'rounded-2xl',
  '600': 'rounded-3xl',
  full: 'rounded-full',
}
const weightTw: Record<string, string> = { '400': 'font-normal', '500': 'font-medium', '600': 'font-semibold', '700': 'font-bold' }
const breakpointTw: Record<string, string> = { '100': 'sm:', '200': 'md:', '300': 'lg:', '400': 'xl:', '500': '2xl:' }

export function tailwindEquivalent(group: string, step: string, scale?: string): string {
  const n = Number(step) / 100
  switch (group) {
    case 'color':
      return scale === 'brand' ? 'Propio de solaris (no existe en Tailwind)' : `bg-${scale}-${step} · text-${scale}-${step}`
    case 'spacing':
      return `p-${n} · m-${n} · gap-${n}`
    case 'radius':
      return radiusTw[step] ?? '—'
    case 'border-width':
      return step === '1' ? 'border' : `border-${step}`
    case 'font-family':
      return step === 'sans' ? 'font-sans (con la fuente de marca delante)' : 'font-mono'
    case 'font-size':
      return `text-${step}`
    case 'font-weight':
      return weightTw[step] ?? '—'
    case 'line-height':
      return `leading-${n}`
    case 'breakpoint':
      return `prefijo ${breakpointTw[step] ?? '—'}`
    default:
      return 'Pieza propia de solaris (Tailwind las usa ya combinadas)'
  }
}

/** Colores de la marca usados para pintar las muestras de la página. */
const brand = tokens.color.brand as unknown as Record<string, Token<ColorValue>>
export const accent = cssColor(brand['700'].$value)
export const accentSoft = cssColor(brand['50'].$value)
export const accentLight = cssColor(brand['100'].$value)
