import type { ReactNode } from 'react'
import { Unstyled } from '@storybook/addon-docs/blocks'
import { classFor } from '../../../scripts/token-names.mjs'
import { css, cssColor, label } from '../primitivos/tokens'
import type { ColorValue, Dimension } from '../primitivos/tokens'
import { aliasPath, resolve } from '../semanticos/tokens'
import allTokens from '../../../tokens/tokens.json'

// Piezas visuales de la página "Cómo funciona solaris-ds".

type Node = { [key: string]: unknown }

/** Token por su ruta completa (component.button.background.brand), resolviendo "$root". */
function tokenAt(path: string) {
  let n: unknown = allTokens
  for (const k of path.split('.')) n = (n as Node)[k]
  const node = n as Node
  return (node.$value !== undefined ? node : node.$root) as { $value: unknown; $type?: string }
}

const short = (path: string) => aliasPath(path).replace(/^(primitive|semantic|component)\./, '').replace(/\.\$root$/, '')

function Step({ level, name, children, last }: { level: string; name: string; children?: ReactNode; last?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex min-w-48 flex-col gap-1 rounded-lg border border-gray-300 bg-white px-4 py-3">
        <span className="text-xs font-semibold tracking-wide text-gray-600 uppercase">{level}</span>
        <code className="font-mono text-sm font-semibold text-gray-900">{name}</code>
        {children}
      </div>
      {!last && (
        <span className="text-2xl text-gray-500" aria-hidden="true">
          →
        </span>
      )}
    </div>
  )
}

/**
 * Recorre la cadena de un token de componente hasta su valor real:
 * component → semantic → primitive → valor → clase de Tailwind.
 */
export function TokenChain({ path, type }: { path: string; type: 'color' | 'dimension' }) {
  const componentToken = tokenAt(`component.${path}`)
  const semanticPath = aliasPath(componentToken.$value as string)
  const semanticToken = tokenAt(semanticPath)
  const primitivePath = aliasPath(semanticToken.$value as string)
  const value = resolve<ColorValue | Dimension>(semanticToken.$value as string)
  const isColor = type === 'color'
  const shown = isColor ? (value as ColorValue).hex : label(value as Dimension)

  return (
    <Unstyled>
      <div className="my-4 flex flex-wrap items-center gap-y-3 font-sans">
        <Step level="1 · component" name={path} />
        <Step level="2 · semantic" name={short(semanticPath)} />
        <Step level="3 · primitive" name={short(primitivePath)} />
        <Step level="Valor real" name={shown}>
          {isColor ? (
            <div className="h-6 rounded-md border border-gray-200" style={{ background: cssColor(value as ColorValue) }} />
          ) : (
            <div className="h-3 rounded-xs bg-gray-900" style={{ width: css(value as Dimension) }} />
          )}
        </Step>
        <Step level="En código" name={classFor(`component.${path}`, type).split(' · ')[0]} last />
      </div>
    </Unstyled>
  )
}

/** Tabla sencilla de dos o tres columnas para la página. */
export function SimpleTable({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <Unstyled>
      <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse text-left font-sans text-sm">
        <thead>
          <tr className="border-b-2 border-gray-300">
            {head.map((h) => (
              <th key={h} scope="col" className="py-2 pr-6 text-xs font-semibold text-gray-600">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((cells, i) => (
            <tr key={i} className="border-b border-gray-200 align-top">
              {cells.map((c, j) => (
                <td key={j} className={`py-3 pr-6 ${j === 0 ? 'font-semibold whitespace-nowrap text-gray-900' : 'text-gray-700'}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </Unstyled>
  )
}

export const C = ({ children }: { children: ReactNode }) => <code className="font-mono text-xs text-gray-900">{children}</code>
