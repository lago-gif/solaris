import type { ReactNode } from 'react'
import { IconAlertCircle, IconCircleCheck, IconHeartbeat, IconPill } from '@tabler/icons-react'
import { classFor } from '../../../scripts/token-names.mjs'
import { TokenList, TokenRow } from '../primitivos/Muestras'
import { css, label, sansStack } from '../primitivos/tokens'
import type { Dimension } from '../primitivos/tokens'
import {
  aliasPath,
  colorOf,
  component,
  displayName,
  flattenTyped,
  resolveDeep,
  contrast,
  dimensionOf,
  flatten,
  hexOf,
  resolve,
  semantic,
  semanticToken,
  shadowOf,
} from './tokens'
import type { SemanticToken, ShadowValue } from './tokens'
import { cssColor } from '../primitivos/tokens'
import type { ColorValue } from '../primitivos/tokens'

// Muestras visuales de la página Fundamentos/Semánticos.
// Cada fila enseña el token, su nombre, el primitivo al que apunta y su valor real.

type Node = { [key: string]: unknown }
const group = (path: string) => path.split('.').reduce<Node>((n, k) => n[k] as Node, semantic)

/** Columna derecha: nombre del token semantic, alias al primitivo y valor resuelto. */
function SemanticInfo({
  name,
  alias,
  value,
  extra,
  cls,
}: {
  name: string
  alias: string
  value: string
  extra?: string
  cls?: string
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <code className="text-sm font-semibold text-gray-900">{name}</code>
      <span className="font-mono text-xs text-gray-700">→ {alias}</span>
      <span className="font-mono text-xs text-gray-600">{value}</span>
      {cls && (
        <span className="text-xs text-gray-600">
          Tailwind: <code className="font-mono font-semibold text-gray-900">{cls}</code>
        </span>
      )}
      {extra && <span className="text-xs text-gray-600">{extra}</span>}
    </div>
  )
}

function Description({ token }: { token: SemanticToken }) {
  return token.$description ? <p className="m-0 mt-2 text-sm text-gray-600">{token.$description}</p> : null
}

/* ---------- Color ---------- */

const pageBg = semanticToken('color.background.neutral')

/** Fondo sobre el que se lee cada color de texto o icono. */
function backgroundFor(name: string) {
  if (name.endsWith('brand.inverted')) return semanticToken('color.background.brand')
  if (name.endsWith('danger.inverted')) return semanticToken('color.background.danger')
  return pageBg
}

function backgroundNameFor(name: string) {
  if (name.endsWith('brand.inverted')) return 'color.background.brand'
  if (name.endsWith('danger.inverted')) return 'color.background.danger'
  return 'color.background.neutral'
}

function ratio(a: SemanticToken, b: SemanticToken) {
  return contrast(hexOf(a), hexOf(b)).toFixed(2).replace('.', ',')
}

export function BackgroundColors() {
  return (
    <TokenList>
      {flatten(group('color.background'), 'color.background').map(([name, token]) => (
        <TokenRow
          key={name}
          info={
            <SemanticInfo
              name={name}
              alias={aliasPath(token.$value as string)}
              value={hexOf(token)}
              cls={classFor(`semantic.${name}`, 'color')}
            />
          }
        >
          <div className="h-16 rounded-lg border border-gray-200" style={{ background: colorOf(token) }} />
          <Description token={token} />
        </TokenRow>
      ))}
    </TokenList>
  )
}

function ForegroundRows({ prefix, render }: { prefix: string; render: (color: string) => ReactNode }) {
  return (
    <TokenList>
      {flatten(group(prefix), prefix).map(([name, token]) => {
        const bg = backgroundFor(name)
        return (
          <TokenRow
            key={name}
            info={
              <SemanticInfo
                name={name}
                alias={aliasPath(token.$value as string)}
                value={hexOf(token)}
                extra={`Sobre ${backgroundNameFor(name)}: contraste ${ratio(token, bg)}:1`}
                cls={classFor(`semantic.${name}`, 'color')}
              />
            }
          >
            <div className="flex items-center gap-3 rounded-lg px-4 py-3" style={{ background: colorOf(bg) }}>
              {render(colorOf(token))}
            </div>
            <Description token={token} />
          </TokenRow>
        )
      })}
    </TokenList>
  )
}

export function TextColors() {
  return (
    <ForegroundRows
      prefix="color.text"
      render={(color) => (
        <p className="m-0 text-base" style={{ color, fontFamily: sansStack }}>
          Tu próxima revisión de la vista es el 12 de marzo.
        </p>
      )}
    />
  )
}

export function IconColors() {
  return (
    <ForegroundRows
      prefix="color.icon"
      render={(color) => (
        <span className="flex gap-3" style={{ color }} aria-hidden="true">
          <IconPill size={24} stroke={1.75} />
          <IconHeartbeat size={24} stroke={1.75} />
          <IconCircleCheck size={24} stroke={1.75} />
          <IconAlertCircle size={24} stroke={1.75} />
        </span>
      )}
    />
  )
}

export function BorderColors() {
  return (
    <TokenList>
      {flatten(group('color.border'), 'color.border').map(([name, token]) => {
        const isFocus = name.endsWith('focus')
        const focusWidth = css(dimensionOf(semanticToken('border-width.focus')))
        return (
          <TokenRow
            key={name}
            info={
              <SemanticInfo
                name={name}
                alias={aliasPath(token.$value as string)}
                value={hexOf(token)}
                extra={`Sobre color.background.neutral: contraste ${ratio(token, pageBg)}:1`}
                cls={classFor(`semantic.${name}`, 'color')}
              />
            }
          >
            <div className="rounded-lg p-4" style={{ background: colorOf(pageBg) }}>
              <div
                className="flex h-12 items-center rounded-lg px-4 text-sm text-gray-600"
                style={
                  isFocus
                    ? { outline: `${focusWidth} solid ${colorOf(token)}`, outlineOffset: '2px', background: 'white', border: `1px solid ${colorOf(semanticToken('color.border.neutral.strong'))}` }
                    : { border: `1px solid ${colorOf(token)}`, background: 'white' }
                }
              >
                {isFocus ? 'Campo con el foco del teclado' : 'Campo o tarjeta'}
              </div>
            </div>
            <Description token={token} />
          </TokenRow>
        )
      })}
    </TokenList>
  )
}

/* ---------- Tipografía ---------- */

const typographyExamples: Record<string, string> = {
  display: '3 de 4 revisiones',
  heading: 'Mi medicación',
  title: 'Ibuprofeno 600 mg',
  body: 'Tienes dos recetas activas. Recuerda tomar la medicación de la mañana después del desayuno.',
  label: 'Fecha de la cita',
  caption: 'Actualizado hoy a las 10:30',
}

export function TypographyStyles() {
  const styles = Object.entries(group('typography')).filter(([k]) => !k.startsWith('$')) as [string, Node][]
  return (
    <TokenList>
      {styles.map(([name, style]) => {
        const size = style['font-size'] as SemanticToken
        const lineHeight = style['line-height'] as SemanticToken
        const weight = style['font-weight'] as SemanticToken
        return (
          <TokenRow
            key={name}
            info={
              <div className="flex flex-col gap-1">
                <code className="text-sm font-semibold text-gray-900">typography.{name}</code>
                <span className="text-xs text-gray-600">
                  Tailwind: <code className="font-mono font-semibold text-gray-900">{classFor(`semantic.typography.${name}.font-size`, 'dimension')}</code>{' '}
                  (tamaño, interlineado y peso a la vez)
                </span>
                {[
                  ['font-size', size, label(dimensionOf(size))],
                  ['line-height', lineHeight, label(dimensionOf(lineHeight))],
                  ['font-weight', weight, String(resolve<number>(weight.$value as string))],
                ].map(([prop, token, value]) => (
                  <span key={prop as string} className="font-mono text-xs text-gray-700">
                    {prop as string} → {aliasPath((token as SemanticToken).$value as string)} · {value as string}
                  </span>
                ))}
              </div>
            }
          >
            <p
              className="m-0 text-gray-900"
              style={{
                fontFamily: sansStack,
                fontSize: css(dimensionOf(size)),
                lineHeight: css(dimensionOf(lineHeight)),
                fontWeight: resolve<number>(weight.$value as string),
              }}
            >
              {typographyExamples[name] ?? name}
            </p>
            <p className="m-0 mt-2 text-sm text-gray-600">{(style.$description as string) ?? ''}</p>
          </TokenRow>
        )
      })}
    </TokenList>
  )
}

/* ---------- Espaciado, radio, borde ---------- */

function DimensionRows({ prefix, sample }: { prefix: string; sample: (d: Dimension) => ReactNode }) {
  return (
    <TokenList>
      {flatten(group(prefix), prefix).map(([name, token]) => {
        const d = dimensionOf(token)
        return (
          <TokenRow
            key={name}
            info={
              <SemanticInfo
                name={name}
                alias={aliasPath(token.$value as string)}
                value={label(d)}
                cls={classFor(`semantic.${name}`, 'dimension')}
              />
            }
          >
            {sample(d)}
            <Description token={token} />
          </TokenRow>
        )
      })}
    </TokenList>
  )
}

const brand = () => colorOf(semanticToken('color.background.brand'))
const brandSoft = () => colorOf(semanticToken('color.background.neutral.subtle'))

export function SpaceScale() {
  return <DimensionRows prefix="space" sample={(d) => <div className="h-6 rounded-xs" style={{ width: css(d), background: brand() }} />} />
}

export function RadiusScale() {
  return (
    <DimensionRows
      prefix="radius"
      sample={(d) => (
        <div className="flex items-center gap-6">
          <div className="size-16 border-2 border-solid" style={{ borderRadius: css(d), borderColor: brand(), background: brandSoft() }} />
          <div className="h-12 w-48 border-2 border-solid" style={{ borderRadius: css(d), borderColor: brand(), background: brandSoft() }} />
        </div>
      )}
    />
  )
}

export function BorderWidths() {
  return (
    <DimensionRows
      prefix="border-width"
      sample={(d) => (
        <div className="h-12 w-full rounded-lg border-solid bg-white" style={{ borderWidth: css(d), borderColor: brand() }} />
      )}
    />
  )
}

/* ---------- Elevación ---------- */

export function Elevations() {
  return (
    <TokenList>
      {flatten(group('elevation'), 'elevation').map(([name, token]) => {
        const v = token.$value as ShadowValue
        return (
          <TokenRow
            key={name}
            info={
              <div className="flex flex-col gap-1">
                <code className="text-sm font-semibold text-gray-900">{name}</code>
                <span className="text-xs text-gray-600">
                  Tailwind: <code className="font-mono font-semibold text-gray-900">{classFor(`semantic.${name}`, 'shadow')}</code>
                </span>
                {(['offsetY', 'blur', 'color'] as const).map((piece) => (
                  <span key={piece} className="font-mono text-xs text-gray-700">
                    {piece} → {aliasPath(v[piece])}
                  </span>
                ))}
                <span className="font-mono text-xs text-gray-600">{shadowOf(token)}</span>
              </div>
            }
          >
            <div className="rounded-lg p-6" style={{ background: colorOf(pageBg) }}>
              <div className="flex h-20 w-56 items-center justify-center rounded-lg bg-white text-sm text-gray-600" style={{ boxShadow: shadowOf(token) }}>
                Tarjeta
              </div>
            </div>
            <Description token={token} />
          </TokenRow>
        )
      })}
    </TokenList>
  )
}

/* ---------- Tokens de componente ---------- */

function shadowCss(v: { color: ColorValue; offsetX: Dimension; offsetY: Dimension; blur: Dimension; spread: Dimension }) {
  return `${css(v.offsetX)} ${css(v.offsetY)} ${css(v.blur)} ${css(v.spread)} ${cssColor(v.color)}`
}

/** Muestra visual según el tipo de token y texto con su valor real. */
function componentSample(name: string, type: string, value: unknown): [ReactNode, string] {
  if (type === 'color') {
    const c = value as ColorValue
    return [<div className="h-10 w-full rounded-lg border border-gray-200" style={{ background: cssColor(c) }} />, c.hex]
  }
  if (type === 'dimension' && name.includes('radius')) {
    const d = value as Dimension
    return [<div className="h-12 w-40 border-2 border-solid" style={{ borderRadius: css(d), borderColor: brand(), background: brandSoft() }} />, label(d)]
  }
  if (type === 'dimension' && name.includes('font-size')) {
    const d = value as Dimension
    return [<span className="text-gray-900" style={{ fontSize: css(d), fontFamily: sansStack, lineHeight: 1.25 }}>Añadir cita</span>, label(d)]
  }
  if (type === 'dimension' && name.includes('line-height')) {
    const d = value as Dimension
    return [
      <span className="block max-w-xs text-sm text-gray-900" style={{ lineHeight: css(d), fontFamily: sansStack, background: brandSoft() }}>
        Recuerda tomar la medicación de la mañana.
      </span>,
      label(d),
    ]
  }
  if (type === 'dimension' && name.includes('border-width')) {
    const d = value as Dimension
    return [<div className="h-12 w-40 rounded-lg border-solid bg-white" style={{ borderWidth: css(d), borderColor: brand() }} />, label(d)]
  }
  if (type === 'dimension') {
    const d = value as Dimension
    return [<div className="h-4 rounded-xs" style={{ width: css(d), minWidth: '2px', background: brand() }} />, label(d)]
  }
  if (type === 'fontWeight') {
    return [<span className="text-lg text-gray-900" style={{ fontWeight: value as number, fontFamily: sansStack }}>Añadir cita</span>, String(value)]
  }
  if (type === 'shadow') {
    const v = value as Parameters<typeof shadowCss>[0]
    return [
      <div className="flex h-14 w-40 items-center justify-center rounded-lg bg-white text-xs text-gray-600" style={{ boxShadow: shadowCss(v) }}>
        Tarjeta
      </div>,
      shadowCss(v),
    ]
  }
  return [null, '']
}

export function ComponentTokens({ name }: { name: 'button' | 'input' | 'card' | 'badge' }) {
  const group = (component as Node)[name] as Node
  return (
    <TokenList>
      {flattenTyped(group, name).map(([tokenName, token]) => {
        const [sample, value] = componentSample(tokenName, token.$type, resolveDeep(token.$value))
        return (
          <TokenRow
            key={tokenName}
            info={
              <SemanticInfo
                name={tokenName}
                alias={displayName(token.$value as string)}
                value={value}
                cls={classFor(`component.${tokenName}`, token.$type)}
              />
            }
          >
            {sample}
            <Description token={token} />
          </TokenRow>
        )
      })}
    </TokenList>
  )
}
