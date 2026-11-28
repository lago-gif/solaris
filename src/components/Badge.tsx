import type { HTMLAttributes, ReactNode } from 'react'
import type { Icon } from '@tabler/icons-react'

type BadgeVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger'
type BadgeSize = 'sm' | 'md'

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  /** Significado de la etiqueta. Por defecto, `neutral`. */
  variant?: BadgeVariant
  /** Tamaño de la etiqueta. Por defecto, `md`. */
  size?: BadgeSize
  /** Icono de Tabler opcional delante del texto. */
  iconStart?: Icon
  /** Texto de la etiqueta. Siempre necesario: el color nunca va solo. */
  children: ReactNode
}

// Cada clase es un token de componente (tokens/tokens.json → component.badge).
const variantClasses: Record<BadgeVariant, string> = {
  neutral: 'bg-badge-background-neutral text-badge-text-neutral',
  info: 'bg-badge-background-info text-badge-text-info',
  success: 'bg-badge-background-success text-badge-text-success',
  warning: 'bg-badge-background-warning text-badge-text-warning',
  danger: 'bg-badge-background-danger text-badge-text-danger',
}

const iconClasses: Record<BadgeVariant, string> = {
  neutral: 'text-badge-icon-neutral',
  info: 'text-badge-icon-info',
  success: 'text-badge-icon-success',
  warning: 'text-badge-icon-warning',
  danger: 'text-badge-icon-danger',
}

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-badge-padding-x-sm py-badge-padding-y-sm text-badge-font-size-sm',
  md: 'px-badge-padding-x-md py-badge-padding-y-md text-badge-font-size-md',
}

export function Badge({ variant = 'neutral', size = 'md', iconStart: IconStart, children, className = '', ...rest }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-badge-gap rounded-badge-radius border-width-badge-border-width border-badge-border font-badge-font-weight',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
      {...rest}
    >
      {IconStart && (
        <IconStart aria-hidden="true" className={`shrink-0 size-badge-icon-size stroke-badge-icon-stroke ${iconClasses[variant]}`} />
      )}
      {children}
    </span>
  )
}
