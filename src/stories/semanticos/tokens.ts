import allTokens from '../../../tokens/tokens.json'
import { css, cssColor } from '../primitivos/tokens'
import type { ColorValue, Dimension } from '../primitivos/tokens'

// Lectura de la capa semantic de tokens/tokens.json para la página Fundamentos/Semánticos.
// Cada token semantic es un alias ({primitive.…}) y aquí se resuelve a su valor real.

type Node = { [key: string]: unknown }
export type SemanticToken = { $value: unknown; $description?: string; $type?: string }
export type ShadowValue = { color: string; offsetX: string; offsetY: string; blur: string; spread: string }

export const semantic = allTokens.semantic as unknown as Node

/** Quita las llaves de un alias: "{primitive.color.gray.50}" → "primitive.color.gray.50". */
export function aliasPath(alias: string) {
  return alias.replace(/^\{|\}$/g, '')
}

/** Busca un token por su ruta completa en tokens.json y devuelve su valor. */
export function resolve<T>(alias: string): T {
  let node: unknown = allTokens
  for (const key of aliasPath(alias).split('.')) node = (node as Node)[key]
  return (node as { $value: T }).$value
}

/** Devuelve el token de una ruta dentro de la capa semantic, por ejemplo "color.text.danger". */
export function semanticToken(path: string): SemanticToken {
  let node: unknown = semantic
  for (const key of path.split('.')) node = (node as Node)[key]
  const n = node as Node
  return (n.$value !== undefined ? n : n.$root) as SemanticToken
}

/**
 * Lista todos los tokens de un grupo, en el orden del archivo, con su nombre legible.
 * El token principal de un grupo se guarda en "$root" (DTCG) y se muestra con el nombre del grupo.
 */
export function flatten(group: Node, prefix: string): [string, SemanticToken][] {
  const out: [string, SemanticToken][] = []
  for (const [key, value] of Object.entries(group)) {
    if (key === '$root') out.push([prefix, value as SemanticToken])
    else if (key.startsWith('$')) continue
    else if ((value as Node).$value !== undefined) out.push([`${prefix}.${key}`, value as SemanticToken])
    else out.push(...flatten(value as Node, `${prefix}.${key}`))
  }
  return out
}

export function colorOf(token: SemanticToken) {
  return cssColor(resolve<ColorValue>(token.$value as string))
}

export function hexOf(token: SemanticToken) {
  return resolve<ColorValue>(token.$value as string).hex
}

export function dimensionOf(token: SemanticToken) {
  return resolve<Dimension>(token.$value as string)
}

export function shadowOf(token: SemanticToken) {
  const v = token.$value as ShadowValue
  return `${css(resolve<Dimension>(v.offsetX))} ${css(resolve<Dimension>(v.offsetY))} ${css(resolve<Dimension>(v.blur))} ${css(resolve<Dimension>(v.spread))} ${cssColor(resolve<ColorValue>(v.color))}`
}

/** Contraste WCAG entre dos colores hex, por ejemplo 4.73. */
export function contrast(a: string, b: string) {
  const lum = (hex: string) => {
    const [r, g, bl] = [1, 3, 5].map((i) => {
      const c = parseInt(hex.slice(i, i + 2), 16) / 255
      return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * bl
  }
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}

/* ---------- Capa component ---------- */

export const component = (allTokens as unknown as { component: Node }).component

/** Nombre legible de una ruta: quita el nivel y "$root". */
export function displayName(path: string) {
  return aliasPath(path).replace(/^(primitive|semantic|component)\./, '').replace(/\.\$root$/, '')
}

/** Sigue la cadena de alias hasta el valor real (component → semantic → primitive). */
export function resolveDeep(value: unknown): unknown {
  if (typeof value === 'string' && value.startsWith('{')) return resolveDeep(resolve(value))
  if (value && typeof value === 'object' && !Array.isArray(value) && !('colorSpace' in value) && !('unit' in value)) {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, resolveDeep(v)]))
  }
  return value
}

export type TypedToken = SemanticToken & { $type: string }

/** Lista los tokens de un componente con su nombre legible y su $type (heredado del grupo si hace falta). */
export function flattenTyped(group: Node, prefix: string, inherited?: string): [string, TypedToken][] {
  const type = (group.$type as string | undefined) ?? inherited
  const out: [string, TypedToken][] = []
  for (const [key, value] of Object.entries(group)) {
    if (key.startsWith('$') && key !== '$root') continue
    const v = value as Node
    const name = key === '$root' ? prefix : `${prefix}.${key}`
    if (v.$value !== undefined) out.push([name, { ...(v as SemanticToken), $type: (v.$type as string) ?? type ?? '' }])
    else out.push(...flattenTyped(v, name, type))
  }
  return out
}
