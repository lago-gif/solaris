import type { HTMLAttributes, ReactNode } from 'react'
import { IconAlertCircle, IconAlertTriangle, IconBell, IconCircleCheck, IconInfoCircle, IconX } from '@tabler/icons-react'
import type { Icon } from '@tabler/icons-react'
// Directo al archivo (no a '@/components'): este archivo está dentro de ese índice y se crearía un bucle.
import { Button } from '@/components/Button'

type ToastVariant = 'neutral' | 'info' | 'success' | 'warning' | 'danger'

export type ToastProps = Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'children'> & {
  /** Significado del aviso. Por defecto, `neutral`. */
  variant?: ToastVariant
  /** Primera línea en negrita, por ejemplo "Nota guardada". */
  title?: string
  /** Mensaje del aviso. Siempre necesario: el color y el icono nunca van solos. */
  children: ReactNode
  /** Si se pasa, aparece un botón para cerrar el aviso. */
  onClose?: () => void
}

// Cada clase es un token de componente (tokens/tokens.json → component.toast).
const variantClasses: Record<ToastVariant, string> = {
  neutral: 'bg-toast-background-neutral',
  info: 'bg-toast-background-info',
  success: 'bg-toast-background-success',
  warning: 'bg-toast-background-warning',
  danger: 'bg-toast-background-danger',
}

const iconClasses: Record<ToastVariant, string> = {
  neutral: 'text-toast-icon-neutral',
  info: 'text-toast-icon-info',
  success: 'text-toast-icon-success',
  warning: 'text-toast-icon-warning',
  danger: 'text-toast-icon-danger',
}

// Cada significado tiene su icono, para que el color nunca vaya solo (docs/accesibilidad.md, regla 1).
const icons: Record<ToastVariant, Icon> = {
  neutral: IconBell,
  info: IconInfoCircle,
  success: IconCircleCheck,
  warning: IconAlertTriangle,
  danger: IconAlertCircle,
}

export function Toast({ variant = 'neutral', title, children, onClose, className = '', ...rest }: ToastProps) {
  const VariantIcon = icons[variant]

  return (
    <div
      // danger interrumpe al lector de pantalla; el resto espera a que termine lo que está leyendo.
      role={variant === 'danger' ? 'alert' : 'status'}
      className={[
        'flex items-start gap-toast-gap rounded-toast-radius border-width-toast-border-width border-toast-border p-toast-padding shadow-toast-elevation',
        'text-toast-font-size leading-toast-line-height text-toast-text',
        variantClasses[variant],
        className,
      ].join(' ')}
      {...rest}
    >
      <VariantIcon
        aria-hidden="true"
        className={`shrink-0 size-toast-icon-size stroke-toast-icon-stroke ${iconClasses[variant]}`}
      />
      <div className="flex flex-1 flex-col gap-toast-text-gap">
        {title && <p className="font-toast-title-font-weight">{title}</p>}
        <div>{children}</div>
      </div>
      {onClose && <Button variant="ghost" size="sm" iconStart={IconX} aria-label="Cerrar aviso" onClick={onClose} />}
    </div>
  )
}
