import type { CSSProperties, ReactNode } from 'react'
import { Unstyled } from '@storybook/addon-docs/blocks'
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

// Muestras visuales de la página Fundamentos/Primitivos.
// Cada token se pinta en una fila: a la izquierda cómo se ve y a la derecha
// su nombre completo, su valor y su equivalente en Tailwind.
// Los estilos de las muestras se calculan a partir del valor de cada token,
// por eso usan `style` en lugar de clases de Tailwind.
// <Unstyled> evita que los estilos de documentación de Storybook se impongan
// a las clases de Tailwind dentro de las muestras.

const sampleText = 'Tienes dos recetas activas. Recuerda tomar la medicación de la mañana después del desayuno.'
const shortText = 'Tu próxima revisión de la vista es el 12 de marzo.'

/** Columna derecha de cada fila: nombre del token, valor y equivalente en Tailwind. */
function TokenInfo({ name, value, tailwind }: { name: string; value: string; tailwind: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <code className="text-sm font-semibold text-gray-900">{name}</code>
      <span className="font-mono text-xs text-gray-700">{value}</span>
      <span className="text-xs text-gray-600">Tailwind: {tailwind}</span>
    </div>
  )
}

/** Fila de un token: muestra a la izquierda, información a la derecha. */
export function TokenRow({ children, info }: { children: ReactNode; info: ReactNode }) {
  return (
    <li className="flex flex-col gap-3 border-b border-gray-200 py-4 sm:flex-row sm:items-center sm:gap-8">
      <div className="min-w-0 flex-1">{children}</div>
      <div className="sm:w-64 sm:shrink-0">{info}</div>
    </li>
  )
}

export function TokenList({ children }: { children: ReactNode }) {
  return (
    <Unstyled>
      <ul className="m-0 list-none border-t border-gray-200 p-0 font-sans">{children}</ul>
    </Unstyled>
  )
}

function dimensions(group: keyof typeof tokens) {
  return entries(tokens[group] as unknown as Group<Dimension>)
}

/* ---------- Color ---------- */

export function ColorScale({ scale }: { scale: 'gray' | 'red' | 'orange' | 'green' | 'brand' }) {
  const group = (tokens.color as unknown as Record<string, Group<ColorValue>>)[scale]
  return (
    <Unstyled>
    <ul className="m-0 grid list-none grid-cols-2 gap-x-4 gap-y-6 p-0 font-sans sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
      {entries(group).map(([step, token]) => (
        <li key={step} className="flex flex-col gap-2">
          <div
            className="h-16 rounded-lg border border-gray-200"
            style={{ background: cssColor(token.$value) }}
            title={token.$description}
          />
          <div className="flex flex-col gap-0.5">
            <code className="text-sm font-semibold text-gray-900">
              color.{scale}.{step}
            </code>
            <span className="font-mono text-xs text-gray-700">{token.$value.hex}</span>
            <span className="font-mono text-xs break-all text-gray-600">{cssColor(token.$value)}</span>
            <span className="text-xs text-gray-600">Tailwind: {tailwindEquivalent('color', step, scale)}</span>
            {token.$description && <span className="text-xs font-semibold text-gray-900">{token.$description}</span>}
          </div>
        </li>
      ))}
    </ul>
    </Unstyled>
  )
}

/* ---------- Espaciado, breakpoints ---------- */

export function SpacingScale() {
  return (
    <TokenList>
      {dimensions('spacing').map(([step, token]) => (
        <TokenRow
          key={step}
          info={<TokenInfo name={`spacing.${step}`} value={label(token.$value)} tailwind={tailwindEquivalent('spacing', step)} />}
        >
          <div className="h-6 rounded-xs" style={{ width: css(token.$value), background: accent }} />
        </TokenRow>
      ))}
    </TokenList>
  )
}

export function Breakpoints() {
  const list = dimensions('breakpoint')
  const max = Math.max(...list.map(([, t]) => px(t.$value)))
  return (
    <TokenList>
      {list.map(([step, token]) => (
        <TokenRow
          key={step}
          info={<TokenInfo name={`breakpoint.${step}`} value={label(token.$value)} tailwind={tailwindEquivalent('breakpoint', step)} />}
        >
          <div
            className="h-8 border-r-4 border-solid"
            style={{ width: `${(px(token.$value) / max) * 100}%`, background: accentSoft, borderColor: accent }}
          />
        </TokenRow>
      ))}
    </TokenList>
  )
}

/* ---------- Radios y bordes ---------- */

export function RadiusScale() {
  return (
    <TokenList>
      {dimensions('radius').map(([step, token]) => (
        <TokenRow
          key={step}
          info={<TokenInfo name={`radius.${step}`} value={label(token.$value)} tailwind={tailwindEquivalent('radius', step)} />}
        >
          <div className="flex items-center gap-6">
            <div
              className="size-20 border-2 border-solid"
              style={{ borderRadius: css(token.$value), background: accentSoft, borderColor: accent }}
            />
            <div
              className="h-12 w-48 border-2 border-solid"
              style={{ borderRadius: css(token.$value), background: accentSoft, borderColor: accent }}
            />
          </div>
        </TokenRow>
      ))}
    </TokenList>
  )
}

export function BorderWidths() {
  return (
    <TokenList>
      {dimensions('border-width').map(([step, token]) => (
        <TokenRow
          key={step}
          info={<TokenInfo name={`border-width.${step}`} value={label(token.$value)} tailwind={tailwindEquivalent('border-width', step)} />}
        >
          <div
            className="h-12 w-full rounded-lg border-solid"
            style={{ borderWidth: css(token.$value), borderColor: accent, background: accentSoft }}
          />
        </TokenRow>
      ))}
    </TokenList>
  )
}

/* ---------- Tipografía ---------- */

export function FontFamilies() {
  return (
    <TokenList>
      {entries(tokens['font-family'] as unknown as Group<string[]>).map(([step, token]) => (
        <TokenRow
          key={step}
          info={<TokenInfo name={`font-family.${step}`} value={token.$value[0]} tailwind={tailwindEquivalent('font-family', step)} />}
        >
          <p className="m-0 text-2xl text-gray-900" style={{ fontFamily: fontStack(token.$value) }}>
            {shortText}
          </p>
          <p className="m-0 mt-1 text-xs text-gray-600">Respaldo si no carga: {token.$value.slice(1).join(', ')}</p>
        </TokenRow>
      ))}
    </TokenList>
  )
}

export function FontSizes() {
  return (
    <TokenList>
      {dimensions('font-size').map(([step, token]) => (
        <TokenRow
          key={step}
          info={<TokenInfo name={`font-size.${step}`} value={label(token.$value)} tailwind={tailwindEquivalent('font-size', step)} />}
        >
          <p className="m-0 text-gray-900" style={{ fontSize: css(token.$value), fontFamily: sansStack, lineHeight: 1.25 }}>
            {shortText}
          </p>
        </TokenRow>
      ))}
    </TokenList>
  )
}

export function FontWeights() {
  return (
    <TokenList>
      {entries(tokens['font-weight'] as unknown as Group<number>).map(([step, token]) => (
        <TokenRow
          key={step}
          info={<TokenInfo name={`font-weight.${step}`} value={String(token.$value)} tailwind={tailwindEquivalent('font-weight', step)} />}
        >
          <p className="m-0 text-xl text-gray-900" style={{ fontWeight: token.$value, fontFamily: sansStack }}>
            {shortText}
          </p>
        </TokenRow>
      ))}
    </TokenList>
  )
}

export function LineHeights() {
  return (
    <TokenList>
      {dimensions('line-height').map(([step, token]) => {
        const style: CSSProperties = {
          lineHeight: css(token.$value),
          fontFamily: sansStack,
          // Franja de color en la primera línea para ver la altura que ocupa cada línea.
          backgroundImage: `linear-gradient(${accentLight}, ${accentLight})`,
          backgroundSize: `100% ${css(token.$value)}`,
          backgroundRepeat: 'no-repeat',
        }
        return (
          <TokenRow
            key={step}
            info={<TokenInfo name={`line-height.${step}`} value={label(token.$value)} tailwind={tailwindEquivalent('line-height', step)} />}
          >
            <p className="m-0 max-w-xl text-base text-gray-900" style={style}>
              {sampleText}
            </p>
          </TokenRow>
        )
      })}
    </TokenList>
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
    <div className="flex h-20 w-48 items-center justify-center rounded-lg bg-white text-sm text-gray-600" style={{ boxShadow: shadowValue }}>
      Tarjeta
    </div>
  )
}

export function ShadowOffsets() {
  return (
    <TokenList>
      {entries(shadow.offset).map(([step, token]) => (
        <TokenRow key={step} info={<TokenInfo name={`shadow.offset.${step}`} value={label(token.$value)} tailwind={tailwindEquivalent('shadow', step)} />}>
          <ShadowCard shadowValue={boxShadow(token.$value, midBlur, midColor)} />
        </TokenRow>
      ))}
    </TokenList>
  )
}

export function ShadowBlurs() {
  return (
    <TokenList>
      {entries(shadow.blur).map(([step, token]) => (
        <TokenRow key={step} info={<TokenInfo name={`shadow.blur.${step}`} value={label(token.$value)} tailwind={tailwindEquivalent('shadow', step)} />}>
          <ShadowCard shadowValue={boxShadow(midOffset, token.$value, midColor)} />
        </TokenRow>
      ))}
    </TokenList>
  )
}

export function ShadowColors() {
  return (
    <TokenList>
      {entries(shadow.color).map(([step, token]) => (
        <TokenRow
          key={step}
          info={
            <TokenInfo
              name={`shadow.color.${step}`}
              value={`negro al ${Math.round((token.$value.alpha ?? 1) * 100)} %`}
              tailwind="Las sombras de Tailwind usan estas mismas opacidades"
            />
          }
        >
          <ShadowCard shadowValue={boxShadow(midOffset, midBlur, token.$value)} />
        </TokenRow>
      ))}
    </TokenList>
  )
}
