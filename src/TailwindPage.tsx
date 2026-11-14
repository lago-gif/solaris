import type { ReactNode } from 'react'
import {
  IconCalendarEvent,
  IconDental,
  IconEye,
  IconHeartbeat,
  IconMessageChatbot,
  IconMicrophone,
  IconPill,
  IconStethoscope,
} from '@tabler/icons-react'

// Valores por defecto de Tailwind CSS v4.
// No son tokens de solaris-ds: sirven de referencia para crear los nuestros.

const colors = [
  'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan',
  'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
  'slate', 'gray', 'zinc', 'neutral', 'stone', 'mauve', 'olive', 'mist', 'taupe',
] as const

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

// Tailwind v4 calcula el espaciado como múltiplos de 0.25rem (4px).
const spacing = [
  { name: '0.5', className: 'w-0.5' },
  { name: '1', className: 'w-1' },
  { name: '1.5', className: 'w-1.5' },
  { name: '2', className: 'w-2' },
  { name: '3', className: 'w-3' },
  { name: '4', className: 'w-4' },
  { name: '5', className: 'w-5' },
  { name: '6', className: 'w-6' },
  { name: '8', className: 'w-8' },
  { name: '10', className: 'w-10' },
  { name: '12', className: 'w-12' },
  { name: '16', className: 'w-16' },
  { name: '20', className: 'w-20' },
  { name: '24', className: 'w-24' },
  { name: '32', className: 'w-32' },
  { name: '40', className: 'w-40' },
  { name: '48', className: 'w-48' },
  { name: '64', className: 'w-64' },
  { name: '80', className: 'w-80' },
  { name: '96', className: 'w-96' },
]

const radii = [
  { name: 'rounded-none', value: '0', className: 'rounded-none' },
  { name: 'rounded-xs', value: '0.125rem · 2px', className: 'rounded-xs' },
  { name: 'rounded-sm', value: '0.25rem · 4px', className: 'rounded-sm' },
  { name: 'rounded-md', value: '0.375rem · 6px', className: 'rounded-md' },
  { name: 'rounded-lg', value: '0.5rem · 8px', className: 'rounded-lg' },
  { name: 'rounded-xl', value: '0.75rem · 12px', className: 'rounded-xl' },
  { name: 'rounded-2xl', value: '1rem · 16px', className: 'rounded-2xl' },
  { name: 'rounded-3xl', value: '1.5rem · 24px', className: 'rounded-3xl' },
  { name: 'rounded-4xl', value: '2rem · 32px', className: 'rounded-4xl' },
  { name: 'rounded-full', value: 'círculo / píldora', className: 'rounded-full' },
]

const textSizes = [
  { name: 'text-xs', value: '0.75rem · 12px', className: 'text-xs' },
  { name: 'text-sm', value: '0.875rem · 14px', className: 'text-sm' },
  { name: 'text-base', value: '1rem · 16px', className: 'text-base' },
  { name: 'text-lg', value: '1.125rem · 18px', className: 'text-lg' },
  { name: 'text-xl', value: '1.25rem · 20px', className: 'text-xl' },
  { name: 'text-2xl', value: '1.5rem · 24px', className: 'text-2xl' },
  { name: 'text-3xl', value: '1.875rem · 30px', className: 'text-3xl' },
  { name: 'text-4xl', value: '2.25rem · 36px', className: 'text-4xl' },
  { name: 'text-5xl', value: '3rem · 48px', className: 'text-5xl' },
  { name: 'text-6xl', value: '3.75rem · 60px', className: 'text-6xl' },
  { name: 'text-7xl', value: '4.5rem · 72px', className: 'text-7xl' },
  { name: 'text-8xl', value: '6rem · 96px', className: 'text-8xl' },
  { name: 'text-9xl', value: '8rem · 128px', className: 'text-9xl' },
]

const icons = [
  { name: 'IconPill', Icon: IconPill },
  { name: 'IconHeartbeat', Icon: IconHeartbeat },
  { name: 'IconStethoscope', Icon: IconStethoscope },
  { name: 'IconDental', Icon: IconDental },
  { name: 'IconEye', Icon: IconEye },
  { name: 'IconCalendarEvent', Icon: IconCalendarEvent },
  { name: 'IconMicrophone', Icon: IconMicrophone },
  { name: 'IconMessageChatbot', Icon: IconMessageChatbot },
]

function Section({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      {children}
    </section>
  )
}

export default function TailwindPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-16 px-6 py-12 text-gray-900">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold">Tailwind</h1>
        <p className="text-gray-600">
          Valores que trae Tailwind CSS v4 por defecto. <strong>No son los tokens de solaris-ds</strong>: son la
          referencia de partida para crear los nuestros.
        </p>
      </header>

      <Section title="Color" description="Paleta por defecto: una fila por color, de 50 (más claro) a 950 (más oscuro).">
        <div className="overflow-x-auto">
          <table className="border-separate border-spacing-1">
            <thead>
              <tr>
                <th scope="col" className="sr-only">Color</th>
                {shades.map((shade) => (
                  <th key={shade} scope="col" className="text-xs font-medium text-gray-600">
                    {shade}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {colors.map((color) => (
                <tr key={color}>
                  <th scope="row" className="pr-3 text-left text-sm font-medium">
                    {color}
                  </th>
                  {shades.map((shade) => (
                    <td key={shade}>
                      <div
                        className={`h-10 w-14 rounded-md bg-${color}-${shade}`}
                        title={`${color}-${shade}`}
                        role="img"
                        aria-label={`${color}-${shade}`}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section
        title="Espaciado"
        description="Cada paso vale 0.25rem (4px). Se usa en márgenes, rellenos, huecos y tamaños: p-4, gap-2, w-8…"
      >
        <ul className="space-y-2">
          {spacing.map(({ name, className }) => (
            <li key={name} className="flex items-center gap-4">
              <code className="w-12 text-sm">{name}</code>
              <span className="w-28 text-sm text-gray-600">
                {Number(name) * 0.25}rem · {Number(name) * 4}px
              </span>
              <div className={`h-4 rounded-xs bg-sky-500 ${className}`} />
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Radios" description="Redondeo de esquinas.">
        <ul className="flex flex-wrap gap-6">
          {radii.map(({ name, value, className }) => (
            <li key={name} className="flex w-32 flex-col items-center gap-2 text-center">
              <div className={`h-20 w-20 border-2 border-sky-600 bg-sky-100 ${className}`} />
              <code className="text-sm">{name}</code>
              <span className="text-xs text-gray-600">{value}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Tamaños de texto" description="Escala tipográfica. Cada tamaño incluye también su altura de línea.">
        <ul className="space-y-4">
          {textSizes.map(({ name, value, className }) => (
            <li key={name} className="flex items-baseline gap-6">
              <div className="w-36 shrink-0">
                <code className="block text-sm">{name}</code>
                <span className="text-xs text-gray-600">{value}</span>
              </div>
              <p className={`truncate ${className}`}>Próxima cita: dentista</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Iconos" description="Ejemplos de Tabler Icons (@tabler/icons-react) relacionados con salud.">
        <ul className="grid grid-cols-4 gap-4 md:grid-cols-8">
          {icons.map(({ name, Icon }) => (
            <li key={name} className="flex flex-col items-center gap-2 text-center">
              <Icon size={32} stroke={1.75} aria-hidden="true" />
              <code className="text-xs break-all">{name}</code>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  )
}
