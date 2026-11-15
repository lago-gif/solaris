import type { CSSProperties, ReactNode } from 'react'
import { css, cssColor, entries, fontStack, label, px, sansStack, tokens } from './tokens'
import type { ColorValue, Dimension, Group, Token } from './tokens'

// Muestras visuales de la página Fundamentos/Primitivos.
// Los estilos de las muestras se calculan a partir del valor de cada token,
// por eso usan `style` en lugar de clases de Tailwind.

function Name({ children }: { children: ReactNode }) {
  return <code className="text-sm font-medium text-gray-900">{children}</code>
}

function Value({ children }: { children: ReactNode }) {
  return <span className="text-xs text-gray-600">{children}</span>
}

function Rows({ children }: { children: ReactNode }) {
  return <ul className="not-prose m-0 flex list-none flex-col gap-3 p-0">{children}</ul>
}


export function ColorScales() {
  const groups = entries(tokens.color as unknown as Group<Group<ColorValue>>) as unknown as [string, Group<ColorValue>][]
  return (
    <div className="not-prose flex flex-col gap-6">
      {groups.map(([name, scale]) => (
        <section key={name}>
          <h3 className="mb-2 text-base font-semibold text-gray-900">color.{name}</h3>
          <ul className="m-0 grid list-none grid-cols-2 gap-x-3 gap-y-4 p-0 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-11">
            {entries(scale).map(([step, token]) => (
              <li key={step} className="flex flex-col gap-1">
                <div
                  className="h-12 rounded-md border border-gray-200"
                  style={{ background: cssColor(token.$value) }}
                  title={token.$description}
                />
                <Name>{step}</Name>
                <Value>{token.$value.hex}</Value>
                <span className="text-xs break-all text-gray-600">{cssColor(token.$value)}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

function Bars({ group, bar }: { group: Group<Dimension>; bar?: (d: Dimension) => CSSProperties }) {
  return (
    <Rows>
      {entries(group).map(([name, token]) => (
        <li key={name} className="flex items-center gap-4">
          <span className="w-16 shrink-0">
            <Name>{name}</Name>
          </span>
          <span className="w-36 shrink-0">
            <Value>{label(token.$value)}</Value>
          </span>
          <div className="h-4 rounded-xs bg-teal-600" style={bar ? bar(token.$value) : { width: css(token.$value) }} />
        </li>
      ))}
    </Rows>
  )
}

export function SpacingScale() {
  return <Bars group={tokens.spacing as unknown as Group<Dimension>} />
}

export function Breakpoints() {
  // Barras a escala (1/4) para que quepan en la página.
  return (
    <Bars
      group={tokens.breakpoint as unknown as Group<Dimension>}
      bar={(d) => ({ width: `${px(d) / 4}px` })}
    />
  )
}

export function RadiusScale() {
  return (
    <ul className="not-prose m-0 flex list-none flex-wrap gap-6 p-0">
      {entries(tokens.radius as unknown as Group<Dimension>).map(([name, token]) => (
        <li key={name} className="flex w-24 flex-col items-center gap-2 text-center">
          <div className="size-20 border-2 border-teal-700 bg-teal-50" style={{ borderRadius: css(token.$value) }} />
          <Name>{name}</Name>
          <Value>{label(token.$value)}</Value>
        </li>
      ))}
    </ul>
  )
}

export function BorderWidths() {
  return (
    <ul className="not-prose m-0 flex list-none flex-wrap gap-6 p-0">
      {entries(tokens['border-width'] as unknown as Group<Dimension>).map(([name, token]) => (
        <li key={name} className="flex w-24 flex-col items-center gap-2 text-center">
          <div
            className="size-20 rounded-md border-solid border-gray-900 bg-white"
            style={{ borderWidth: css(token.$value) }}
          />
          <Name>{name}</Name>
          <Value>{label(token.$value)}</Value>
        </li>
      ))}
    </ul>
  )
}

export function FontFamilies() {
  return (
    <Rows>
      {entries(tokens['font-family'] as unknown as Group<string[]>).map(([name, token]) => (
        <li key={name} className="flex flex-col gap-1">
          <Name>{name}</Name>
          <p className="m-0 text-2xl text-gray-900" style={{ fontFamily: fontStack(token.$value) }}>
            Próxima cita: dentista, martes 18 a las 10:30
          </p>
          <Value>{token.$value.join(', ')}</Value>
        </li>
      ))}
    </Rows>
  )
}

export function FontSizes() {
  return (
    <Rows>
      {entries(tokens['font-size'] as unknown as Group<Dimension>).map(([name, token]) => (
        <li key={name} className="flex items-baseline gap-4">
          <span className="w-40 shrink-0">
            <Name>{name}</Name> <Value>{label(token.$value)}</Value>
          </span>
          <span className="truncate text-gray-900" style={{ fontSize: css(token.$value), fontFamily: sansStack, lineHeight: 1.2 }}>
            Próxima cita: dentista
          </span>
        </li>
      ))}
    </Rows>
  )
}

export function FontWeights() {
  return (
    <Rows>
      {entries(tokens['font-weight'] as unknown as Group<number>).map(([name, token]) => (
        <li key={name} className="flex items-baseline gap-4">
          <span className="w-40 shrink-0">
            <Name>{name}</Name>
          </span>
          <span className="text-xl text-gray-900" style={{ fontWeight: token.$value, fontFamily: sansStack }}>
            Ibuprofeno 600 mg
          </span>
        </li>
      ))}
    </Rows>
  )
}

export function LineHeights() {
  return (
    <ul className="not-prose m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
      {entries(tokens['line-height'] as unknown as Group<Dimension>).map(([name, token]) => (
        <li key={name} className="flex flex-col gap-1">
          <span>
            <Name>{name}</Name> <Value>{label(token.$value)}</Value>
          </span>
          <p
            className="m-0 bg-teal-50 text-base text-gray-900"
            style={{ lineHeight: css(token.$value), fontFamily: sansStack }}
          >
            1 comprimido cada 8 horas durante 5 días, después de las comidas.
          </p>
        </li>
      ))}
    </ul>
  )
}

function ShadowGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h3 className="mb-3 text-base font-semibold text-gray-900">{title}</h3>
      <ul className="m-0 flex list-none flex-wrap gap-8 p-0">{children}</ul>
    </section>
  )
}

function ShadowSample({ name, value, shadow }: { name: string; value: string; shadow: string }) {
  return (
    <li className="flex w-24 flex-col items-center gap-2 text-center">
      <div className="size-20 rounded-lg bg-white" style={{ boxShadow: shadow }} />
      <Name>{name}</Name>
      <Value>{value}</Value>
    </li>
  )
}

export function ShadowPieces() {
  const { offset, blur, color } = tokens.shadow as unknown as {
    offset: Group<Dimension>
    blur: Group<Dimension>
    color: Group<ColorValue>
  }
  const sample = (y: Dimension, b: Dimension, c: ColorValue) => `0 ${css(y)} ${css(b)} 0 ${cssColor(c)}`
  const midColor = (color['10'] as Token<ColorValue>).$value
  const midBlur = (blur['400'] as Token<Dimension>).$value
  const midOffset = (offset['200'] as Token<Dimension>).$value

  return (
    <div className="not-prose flex flex-col gap-8">
      <p className="m-0 text-sm text-gray-600">
        Las sombras se guardan por piezas. Cada muestra cambia una pieza y deja las otras en un valor medio
        (offset 200, blur 400, color 10).
      </p>
      <ShadowGroup title="shadow.offset (desplazamiento vertical)">
        {entries(offset).map(([n, t]) => (
          <ShadowSample key={n} name={n} value={label(t.$value)} shadow={sample(t.$value, midBlur, midColor)} />
        ))}
      </ShadowGroup>
      <ShadowGroup title="shadow.blur (difuminado)">
        {entries(blur).map(([n, t]) => (
          <ShadowSample key={n} name={n} value={label(t.$value)} shadow={sample(midOffset, t.$value, midColor)} />
        ))}
      </ShadowGroup>
      <ShadowGroup title="shadow.color (negro con transparencia)">
        {entries(color).map(([n, t]) => (
          <ShadowSample key={n} name={n} value={`${Math.round((t.$value.alpha ?? 1) * 100)} %`} shadow={sample(midOffset, midBlur, t.$value)} />
        ))}
      </ShadowGroup>
    </div>
  )
}
