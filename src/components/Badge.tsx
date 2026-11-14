import type { HTMLAttributes, ReactNode } from 'react'
import type { Icon } from '@tabler/icons-react'

type BadgeTone = 'neutral' | 'info' | 'success' | 'warning' | 'danger'
type BadgeSize = 'sm' | 'md'

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  /** Significado de la etiqueta. Por defecto, `neutral`. */
  tone?: BadgeTone
  /** Tamaño de la etiqueta. Por defecto, `md`. */
  size?: BadgeSize
  /** Icono de Tabler opcional a la izquierda del texto. */
  icon?: Icon
  /** Texto de la etiqueta. Siempre necesario: el color nunca va solo. */
  children: ReactNode
}

const toneClasses: Record<BadgeTone, string> = {
  neutral: 'bg-gray-100 text-gray-800 ring-gray-300',
  info: 'bg-blue-50 text-blue-800 ring-blue-200',
  success: 'bg-green-50 text-green-800 ring-green-200',
  warning: 'bg-amber-50 text-amber-800 ring-amber-200',
  danger: 'bg-red-50 text-red-800 ring-red-200',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'gap-1 px-2 py-0.5 text-xs',
  md: 'gap-1.5 px-2.5 py-1 text-sm',
}

export function Badge({ tone = 'neutral', size = 'md', icon: IconComponent, children, className = '', ...rest }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-none font-medium ring-1 ring-inset',
        toneClasses[tone],
        sizeClasses[size],
        className,
      ].join(' ')}
      {...rest}
    >
      {IconComponent && <IconComponent size={size === 'sm' ? 14 : 16} stroke={2} aria-hidden="true" />}
      {children}
    </span>
  )
}
