import type { CSSProperties } from 'react'
import { Name, TokenTable } from '../TokenTable'
import {
  accent,
  accentLight,
  accentSoft,
  css,
  cssColor,
  entries,
  fontStack,
  label,
  px,
  sansStack,
  tailwindEquivalent,
  tokens,
} from './tokens'
import type { ColorValue, Dimension, Group } from './tokens'

// Muestras de la página Fundamentos/Primitivos: una tabla por grupo, un token por fila.
// Columnas: Muestra · Token · Valor · Equivalente en Tailwind.
// Los estilos de las muestras se calculan a partir del valor de cada token,
// por eso usan `style` en lugar de clases de Tailwind.

const sampleText = 'Recuerda tomar la medicación de la mañana después del desayuno.'
const columns = ['Token', 'Valor', 'Equivalente en Tailwind']

function dimensions(group: keyof typeof tokens) {
  return entries(tokens[group] as unknown as Group<Dimension>)
}

/* ---------- Color ---------- */

export function ColorScale({ scale }: { scale: 'gray' | 'red' | 'orange' | 'green' | 'brand' }) {
  const group = (tokens.color as unknown as Record<string, Group<ColorValue>>)[scale]
  return (
    <TokenTable
      columns={['Token', 'Hex', 'oklch', 'Equivalente en Tailwind']}
      rows={entries(group).map(([step, token]) => ({
        key: step,
        sample: <div className="h-8 w-32 rounded-md border border-gray-200" style={{ background: cssColor(token.$value) }} />,
        cells: [<Name>color.{scale}.{step}</Name>, token.$value.hex, cssColor(token.$value), tailwindEquivalent('color', step, scale)],
        description: token.$description,
      }))}
    />
  )
}

/* ---------- Espaciado y breakpoints ---------- */

export function SpacingScale() {
  return (
    <TokenTable
      columns={columns}
      rows={dimensions('spacing').map(([step, token]) => ({
        key: step,
        sample: <div className="h-4 rounded-xs" style={{ width: css(token.$value), background: accent }} />,
        cells: [<Name>spacing.{step}</Name>, label(token.$value), tailwindEquivalent('spacing', step)],
      }))}
    />
  )
}

export function Breakpoints() {
  const list = dimensions('breakpoint')
  const max = Math.max(...list.map(([, t]) => px(t.$value)))
  return (
    <TokenTable
      columns={columns}
      rows={list.map(([step, token]) => ({
        key: step,
        sample: (
          <div
            className="h-4 border-r-4 border-solid"
            style={{ width: `${(px(token.$value) / max) * 100}%`, background: accentSoft, borderColor: accent }}
          />
        ),
        cells: [<Name>breakpoint.{step}</Name>, label(token.$value), tailwindEquivalent('breakpoint', step)],
      }))}
    />
  )
}

/* ---------- Radios y bordes ---------- */

export function RadiusScale() {
  return (
    <TokenTable
      columns={columns}
      rows={dimensions('radius').map(([step, token]) => ({
        key: step,
        sample: (
          <div
            className="h-10 w-32 border-2 border-solid"
            style={{ borderRadius: css(token.$value), background: accentSoft, borderColor: accent }}
          />
        ),
        cells: [<Name>radius.{step}</Name>, label(token.$value), tailwindEquivalent('radius', step)],
      }))}
    />
  )
}

export function BorderWidths() {
  return (
    <TokenTable
      columns={columns}
      rows={dimensions('border-width').map(([step, token]) => ({
        key: step,
        sample: (
          <div
            className="h-10 w-32 rounded-md border-solid"
            style={{ borderWidth: css(token.$value), borderColor: accent, background: accentSoft }}
          />
        ),
        cells: [<Name>border-width.{step}</Name>, label(token.$value), tailwindEquivalent('border-width', step)],
      }))}
    />
  )
}

/* ---------- Tipografía ---------- */

export function FontFamilies() {
  return (
    <TokenTable
      columns={['Token', 'Fuente', 'Respaldo', 'Equivalente en Tailwind']}
      rows={entries(tokens['font-family'] as unknown as Group<string[]>).map(([step, token]) => ({
        key: step,
        sample: (
          <span className="text-lg text-gray-900" style={{ fontFamily: fontStack(token.$value) }}>
            Ibuprofeno 600 mg
          </span>
        ),
        cells: [
          <Name>font-family.{step}</Name>,
          token.$value[0],
          `${token.$value.slice(1, 4).join(', ')}…`,
          tailwindEquivalent('font-family', step),
        ],
        description: token.$description,
      }))}
    />
  )
}

export function FontSizes() {
  return (
    <TokenTable
      columns={columns}
      rows={dimensions('font-size').map(([step, token]) => ({
        key: step,
        sample: (
          <span
            className="block truncate text-gray-900"
            style={{ fontSize: css(token.$value), fontFamily: sansStack, lineHeight: 1.2, maxWidth: '12rem' }}
          >
            Mi medicación
          </span>
        ),
        cells: [<Name>font-size.{step}</Name>, label(token.$value), tailwindEquivalent('font-size', step)],
      }))}
    />
  )
}

export function FontWeights() {
  return (
    <TokenTable
      columns={columns}
      rows={entries(tokens['font-weight'] as unknown as Group<number>).map(([step, token]) => ({
        key: step,
        sample: (
          <span className="text-lg text-gray-900" style={{ fontWeight: token.$value, fontFamily: sansStack }}>
            Ibuprofeno 600 mg
          </span>
        ),
        cells: [<Name>font-weight.{step}</Name>, String(token.$value), tailwindEquivalent('font-weight', step)],
      }))}
    />
  )
}

export function LineHeights() {
  return (
    <TokenTable
      columns={columns}
      rows={dimensions('line-height').map(([step, token]) => {
        const style: CSSProperties = {
          lineHeight: css(token.$value),
          fontFamily: sansStack,
          // Franja de color en cada línea para ver la altura que ocupa.
          backgroundImage: `linear-gradient(${accentLight}, ${accentLight})`,
          backgroundSize: `100% ${css(token.$value)}`,
          backgroundRepeat: 'no-repeat',
        }
        return {
          key: step,
          sample: (
            <p className="m-0 w-32 text-sm text-gray-900" style={style}>
              {sampleText}
            </p>
          ),
          cells: [<Name>line-height.{step}</Name>, label(token.$value), tailwindEquivalent('line-height', step)],
        }
      })}
    />
  )
}

/* ---------- Sombra ---------- */

type ShadowGroups = { offset: Group<Dimension>; blur: Group<Dimension>; color: Group<ColorValue> }
const shadow = tokens.shadow as unknown as ShadowGroups
const pick = <T,>(group: Group<T>, step: string) => entries(group).find(([s]) => s === step)![1].$value
const midOffset = pick(shadow.offset, '200')
const midBlur = pick(shadow.blur, '400')
const midColor = pick(shadow.color, '10')

function boxShadow(y: Dimension, b: Dimension, c: ColorValue) {
  return `0 ${css(y)} ${css(b)} 0 ${cssColor(c)}`
}

function ShadowCard({ shadowValue }: { shadowValue: string }) {
  return (
    <div
      className="flex h-12 w-32 items-center justify-center rounded-md bg-white text-xs text-gray-600"
      style={{ boxShadow: shadowValue }}
    >
      Tarjeta
    </div>
  )
}

const ownPiece = 'Pieza propia (Tailwind las usa ya combinadas)'

export function ShadowOffsets() {
  return (
    <TokenTable
      columns={columns}
      rows={entries(shadow.offset).map(([step, token]) => ({
        key: step,
        sample: <ShadowCard shadowValue={boxShadow(token.$value, midBlur, midColor)} />,
        cells: [<Name>shadow.offset.{step}</Name>, label(token.$value), ownPiece],
      }))}
    />
  )
}

export function ShadowBlurs() {
  return (
    <TokenTable
      columns={columns}
      rows={entries(shadow.blur).map(([step, token]) => ({
        key: step,
        sample: <ShadowCard shadowValue={boxShadow(midOffset, token.$value, midColor)} />,
        cells: [<Name>shadow.blur.{step}</Name>, label(token.$value), ownPiece],
      }))}
    />
  )
}

export function ShadowColors() {
  return (
    <TokenTable
      columns={columns}
      rows={entries(shadow.color).map(([step, token]) => ({
        key: step,
        sample: <ShadowCard shadowValue={boxShadow(midOffset, midBlur, token.$value)} />,
        cells: [
          <Name>shadow.color.{step}</Name>,
          `negro al ${Math.round((token.$value.alpha ?? 1) * 100)} %`,
          'Mismas opacidades que las sombras de Tailwind',
        ],
      }))}
    />
  )
}
