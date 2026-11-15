import type { ReactNode } from 'react'
import { Unstyled } from '@storybook/addon-docs/blocks'

// Tabla común de las páginas Fundamentos/Primitivos y Fundamentos/Semánticos.
// Una fila por token y una columna por dato, para leer cada token de izquierda a derecha.
// Todas las columnas van en una sola línea salvo la última ("Para qué sirve"), que es una frase.
// <Unstyled> evita que los estilos de documentación de Storybook pisen a Tailwind.

export type TokenTableRow = { key: string; sample: ReactNode; cells: ReactNode[]; description?: string }

export function TokenTable({ columns, rows }: { columns: string[]; rows: TokenTableRow[] }) {
  const hasDescription = rows.some((r) => r.description)
  return (
    <Unstyled>
      <div className="my-6 overflow-x-auto font-sans">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th scope="col" className="w-36 py-2 pr-4 text-xs font-semibold text-gray-600">
                Muestra
              </th>
              {columns.map((c) => (
                <th key={c} scope="col" className="py-2 pr-4 text-xs font-semibold whitespace-nowrap text-gray-600">
                  {c}
                </th>
              ))}
              {hasDescription && (
                <th scope="col" className="py-2 text-xs font-semibold text-gray-600">
                  Para qué sirve
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.key} className="border-b border-gray-200 align-middle">
                <td className="w-36 py-3 pr-4">{row.sample}</td>
                {row.cells.map((cell, i) => (
                  <td key={i} className="py-3 pr-4 font-mono text-xs whitespace-nowrap text-gray-800">
                    {cell}
                  </td>
                ))}
                {hasDescription && (
                  <td className="min-w-48 py-3 text-xs text-gray-600">{row.description}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Unstyled>
  )
}

/** Nombre del token, destacado. */
export function Name({ children }: { children: ReactNode }) {
  return <span className="font-semibold text-gray-900">{children}</span>
}
