import type { ReactNode } from 'react'
import { IconAlertCircle, IconCircleCheck, IconHeartbeat, IconPill } from '@tabler/icons-react'
import { classFor } from '../../../scripts/token-names.mjs'
import { Name, TokenTable } from '../TokenTable'
import type { TokenTableRow } from '../TokenTable'
import { css, cssColor, label, px, sansStack } from '../primitivos/tokens'
import type { ColorValue, Dimension } from '../primitivos/tokens'
import {
  aliasPath,
  colorOf,
  component,
  contrast,
  dimensionOf,
  displayName,
  flatten,
  flattenTyped,
  hexOf,
  resolve,
  resolveDeep,
  semantic,
  semanticToken,
  shadowOf,
} from './tokens'
import type { SemanticToken, ShadowValue } from './tokens'

// Muestras de la página Fundamentos/Semánticos: una tabla por grupo, un token por fila.
// Columnas: Muestra · Token · Apunta a · Valor · Clase Tailwind (· Contraste) · Para qué sirve.

type Node = { [key: string]: unknown }
const group = (path: string) => path.split('.').reduce<Node>((n, k) => n[k] as Node, semantic)
const alias = (token: SemanticToken) => aliasPath(token.$value as string).replace(/^primitive\./, '')
/** Clase principal del token. En los grosores de borde, la de contorno (outline-width-…) se explica en el texto de la página. */
const Cls = ({ children }: { children: string }) => <span className="font-semibold text-gray-900">{children.split(' · ')[0]}</span>

/* ---------- Color ---------- */

const pageBg = semanticToken('color.background.neutral')

/** Fondo sobre el que se lee cada color de texto o icono. */
function backgroundFor(name: string) {
  if (name.endsWith('brand.inverted')) return ['color.background.brand', semanticToken('color.background.brand')] as const
  if (name.endsWith('danger.inverted')) return ['color.background.danger', semanticToken('color.background.danger')] as const
  return ['color.background.neutral', pageBg] as const
}

function ratio(a: SemanticToken, b: SemanticToken) {
  return `${contrast(hexOf(a), hexOf(b)).toFixed(2).replace('.', ',')}:1`
}

const colorColumns = ['Token', 'Apunta a', 'Valor', 'Clase Tailwind']

export function BackgroundColors() {
  return (
    <TokenTable
      columns={colorColumns}
      rows={flatten(group('color.background'), 'color.background').map(([name, token]) => ({
        key: name,
        sample: <div className="h-8 w-32 rounded-md border border-gray-200" style={{ background: colorOf(token) }} />,
        cells: [<Name>{name}</Name>, alias(token), hexOf(token), <Cls>{classFor(`semantic.${name}`, 'color')}</Cls>],
        description: token.$description,
      }))}
    />
  )
}

function foregroundRows(prefix: string, render: (color: string) => ReactNode): TokenTableRow[] {
  return flatten(group(prefix), prefix).map(([name, token]) => {
    const [, bg] = backgroundFor(name)
    return {
      key: name,
      sample: (
        <div className="flex w-32 items-center rounded-md px-3 py-2" style={{ background: colorOf(bg) }}>
          {render(colorOf(token))}
        </div>
      ),
      cells: [
        <Name>{name}</Name>,
        alias(token),
        hexOf(token),
        <Cls>{classFor(`semantic.${name}`, 'color')}</Cls>,
        ratio(token, bg),
      ],
      description: token.$description,
    }
  })
}

export function TextColors() {
  return (
    <TokenTable
      columns={[...colorColumns, 'Contraste con su fondo']}
      rows={foregroundRows('color.text', (color) => (
        <span className="text-sm" style={{ color, fontFamily: sansStack }}>
          Mi medicación
        </span>
      ))}
    />
  )
}

export function IconColors() {
  return (
    <TokenTable
      columns={[...colorColumns, 'Contraste con su fondo']}
      rows={foregroundRows('color.icon', (color) => (
        <span className="flex gap-2" style={{ color }} aria-hidden="true">
          <IconPill size={20} stroke={1.75} />
          <IconHeartbeat size={20} stroke={1.75} />
          <IconCircleCheck size={20} stroke={1.75} />
          <IconAlertCircle size={20} stroke={1.75} />
        </span>
      ))}
    />
  )
}

export function BorderColors() {
  const focusWidth = css(dimensionOf(semanticToken('border-width.focus')))
  const strong = colorOf(semanticToken('color.border.neutral.strong'))
  return (
    <TokenTable
      columns={[...colorColumns, 'Contraste con su fondo']}
      rows={flatten(group('color.border'), 'color.border').map(([name, token]) => {
        const isFocus = name.endsWith('focus')
        return {
          key: name,
          sample: (
            <div
              className="h-8 w-32 rounded-md"
              style={
                isFocus
                  ? { outline: `${focusWidth} solid ${colorOf(token)}`, outlineOffset: '2px', border: `1px solid ${strong}`, background: 'white' }
                  : { border: `1px solid ${colorOf(token)}`, background: 'white' }
              }
            />
          ),
          cells: [
            <Name>{name}</Name>,
            alias(token),
            hexOf(token),
            <Cls>{classFor(`semantic.${name}`, 'color')}</Cls>,
            ratio(token, pageBg),
          ],
          description: token.$description,
        }
      })}
    />
  )
}

/* ---------- Tipografía ---------- */

const typographyExamples: Record<string, string> = {
  display: '3/4',
  heading: 'Citas',
  title: 'Ibuprofeno',
  body: 'Dos recetas',
  label: 'Fecha de la cita',
  caption: 'Hoy, 10:30',
}

export function TypographyStyles() {
  const styles = Object.entries(group('typography')).filter(([k]) => !k.startsWith('$')) as [string, Node][]
  return (
    <TokenTable
      columns={['Estilo', 'Clase Tailwind', 'Tamaño (font-size.…)', 'Interlineado (line-height.…)', 'Peso (font-weight.…)']}
      rows={styles.map(([name, style]) => {
        const size = style['font-size'] as SemanticToken
        const lineHeight = style['line-height'] as SemanticToken
        const weight = style['font-weight'] as SemanticToken
        const fw = resolve<number>(weight.$value as string)
        return {
          key: name,
          sample: (
            <span
              className="block w-32 truncate text-gray-900"
              style={{ fontFamily: sansStack, fontSize: css(dimensionOf(size)), lineHeight: css(dimensionOf(lineHeight)), fontWeight: fw }}
            >
              {typographyExamples[name] ?? name}
            </span>
          ),
          cells: [
            <Name>typography.{name}</Name>,
            <Cls>{classFor(`semantic.typography.${name}.font-size`, 'dimension')}</Cls>,
            `${alias(size).replace('font-size.', '')} · ${px(dimensionOf(size))}px`,
            `${alias(lineHeight).replace('line-height.', '')} · ${px(dimensionOf(lineHeight))}px`,
            `${alias(weight).replace('font-weight.', '')}`,
          ],
          description: style.$description as string,
        }
      })}
    />
  )
}

/* ---------- Espaciado, radio, borde ---------- */

const brand = () => colorOf(semanticToken('color.background.brand'))
const brandSoft = () => colorOf(semanticToken('color.background.neutral.subtle'))

function dimensionRows(prefix: string, sample: (d: Dimension) => ReactNode): TokenTableRow[] {
  return flatten(group(prefix), prefix).map(([name, token]) => {
    const d = dimensionOf(token)
    return {
      key: name,
      sample: sample(d),
      cells: [<Name>{name}</Name>, alias(token), label(d), <Cls>{classFor(`semantic.${name}`, 'dimension')}</Cls>],
      description: token.$description,
    }
  })
}

export function SpaceScale() {
  return (
    <TokenTable
      columns={colorColumns}
      rows={dimensionRows('space', (d) => <div className="h-4 rounded-xs" style={{ width: css(d), background: brand() }} />)}
    />
  )
}

export function RadiusScale() {
  return (
    <TokenTable
      columns={colorColumns}
      rows={dimensionRows('radius', (d) => (
        <div className="h-10 w-32 border-2 border-solid" style={{ borderRadius: css(d), borderColor: brand(), background: brandSoft() }} />
      ))}
    />
  )
}

export function BorderWidths() {
  return (
    <TokenTable
      columns={colorColumns}
      rows={dimensionRows('border-width', (d) => (
        <div className="h-10 w-32 rounded-md border-solid bg-white" style={{ borderWidth: css(d), borderColor: brand() }} />
      ))}
    />
  )
}

/* ---------- Elevación ---------- */

export function Elevations() {
  return (
    <TokenTable
      columns={['Token', 'offsetY →', 'blur →', 'color →', 'Clase Tailwind']}
      rows={flatten(group('elevation'), 'elevation').map(([name, token]) => {
        const v = token.$value as ShadowValue
        const piece = (k: keyof ShadowValue) => aliasPath(v[k]).replace(/^primitive\./, '')
        return {
          key: name,
          sample: (
            <div
              className="flex h-12 w-32 items-center justify-center rounded-md bg-white text-xs text-gray-600"
              style={{ boxShadow: shadowOf(token) }}
            >
              Tarjeta
            </div>
          ),
          cells: [<Name>{name}</Name>, piece('offsetY'), piece('blur'), piece('color'), <Cls>{classFor(`semantic.${name}`, 'shadow')}</Cls>],
          description: token.$description,
        }
      })}
    />
  )
}

/* ---------- Tokens de componente ---------- */

type ShadowParts = { color: ColorValue; offsetX: Dimension; offsetY: Dimension; blur: Dimension; spread: Dimension }
const shadowCss = (v: ShadowParts) => `${css(v.offsetX)} ${css(v.offsetY)} ${css(v.blur)} ${css(v.spread)} ${cssColor(v.color)}`

/** Muestra visual y valor real de un token de componente, según su tipo y su nombre. */
function componentSample(name: string, type: string, value: unknown): [ReactNode, string] {
  if (type === 'color') {
    const c = value as ColorValue
    return [<div className="h-8 w-32 rounded-md border border-gray-200" style={{ background: cssColor(c) }} />, c.hex]
  }
  if (type === 'fontWeight') {
    return [<span className="text-base text-gray-900" style={{ fontWeight: value as number, fontFamily: sansStack }}>Añadir cita</span>, String(value)]
  }
  if (type === 'shadow') {
    const v = value as ShadowParts
    return [
      <div className="flex h-12 w-32 items-center justify-center rounded-md bg-white text-xs text-gray-600" style={{ boxShadow: shadowCss(v) }}>
        Tarjeta
      </div>,
      `${css(v.offsetY)} · ${css(v.blur)} · ${Math.round((v.color.alpha ?? 1) * 100)} %`,
    ]
  }
  const d = value as Dimension
  if (name.includes('radius')) {
    return [<div className="h-10 w-32 border-2 border-solid" style={{ borderRadius: css(d), borderColor: brand(), background: brandSoft() }} />, label(d)]
  }
  if (name.includes('border-width')) {
    return [<div className="h-10 w-32 rounded-md border-solid bg-white" style={{ borderWidth: css(d), borderColor: brand() }} />, label(d)]
  }
  if (name.includes('font-size')) {
    return [<span className="text-gray-900" style={{ fontSize: css(d), fontFamily: sansStack, lineHeight: 1.2 }}>Añadir cita</span>, label(d)]
  }
  if (name.includes('line-height')) {
    return [
      <span className="block w-32 text-xs text-gray-900" style={{ lineHeight: css(d), fontFamily: sansStack, background: brandSoft() }}>
        Toma la medicación de la mañana.
      </span>,
      label(d),
    ]
  }
  return [<div className="h-4 rounded-xs" style={{ width: css(d), minWidth: '2px', background: brand() }} />, label(d)]
}

export function ComponentTokens({ name }: { name: 'button' | 'input' | 'card' | 'badge' }) {
  const g = (component as Node)[name] as Node
  return (
    <TokenTable
      columns={['Token', 'Apunta a', 'Valor', 'Clase Tailwind']}
      rows={flattenTyped(g, name).map(([tokenName, token]) => {
        const [sample, value] = componentSample(tokenName, token.$type, resolveDeep(token.$value))
        return {
          key: tokenName,
          sample,
          cells: [
            <Name>{tokenName}</Name>,
            displayName(token.$value as string),
            value,
            <Cls>{classFor(`component.${tokenName}`, token.$type)}</Cls>,
          ],
          description: token.$description,
        }
      })}
    />
  )
}
