import type { ButtonHTMLAttributes, ReactNode } from 'react'
import type { Icon } from '@tabler/icons-react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonBaseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'aria-label' | 'aria-labelledby'> & {
  /** Estilo del botón. Por defecto, `primary`. */
  variant?: ButtonVariant
  /** Tamaño del botón. Por defecto, `md`. */
  size?: ButtonSize
  /** Icono de Tabler opcional, por ejemplo `IconPlus`. */
  icon?: Icon
  /** Lado en el que aparece el icono. Por defecto, `left`. */
  iconPosition?: 'left' | 'right'
  /** Si es `true`, el botón ocupa todo el ancho disponible. */
  fullWidth?: boolean
}

/**
 * Nombre accesible (docs/accesibilidad.md, regla 3): todo botón tiene un nombre que lee el lector de pantalla.
 * - Con texto: el texto es su nombre.
 * - Solo con icono: `aria-label` es obligatorio (o `aria-labelledby`, si el nombre está en otro elemento).
 * Si falta, TypeScript da error: un botón sin nombre no compila.
 */
type ButtonName =
  | { /** Texto del botón: es también su nombre accesible. */ children: ReactNode; 'aria-label'?: string; 'aria-labelledby'?: string }
  | { /** Botón de solo icono: describe la acción, por ejemplo "Borrar nota". */ 'aria-label': string; children?: never; 'aria-labelledby'?: never }
  | { 'aria-labelledby': string; children?: never; 'aria-label'?: never }

export type ButtonProps = ButtonBaseProps & ButtonName

// Cada clase es un token de componente (tokens/tokens.json → component.button).
const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-button-background-brand text-button-text-brand-inverted hover:bg-button-background-brand-hover',
  secondary:
    'border-width-button-border-width border-button-border-neutral bg-button-background-neutral text-button-text-neutral hover:bg-button-background-neutral-hover',
  ghost: 'bg-transparent text-button-text-brand hover:bg-button-background-brand-subtle-hover',
  danger: 'bg-button-background-danger text-button-text-danger-inverted hover:bg-button-background-danger-hover',
}

const iconClasses: Record<ButtonVariant, string> = {
  primary: 'text-button-icon-brand-inverted',
  secondary: 'text-button-icon-neutral',
  ghost: 'text-button-icon-brand',
  danger: 'text-button-icon-danger-inverted',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'gap-button-gap-sm px-button-padding-x-sm py-button-padding-y-sm text-button-font-size-sm leading-button-line-height-sm',
  md: 'gap-button-gap-md px-button-padding-x-md py-button-padding-y-md text-button-font-size-md leading-button-line-height-md',
  lg: 'gap-button-gap-md px-button-padding-x-lg py-button-padding-y-lg text-button-font-size-lg leading-button-line-height-lg',
}

const iconSizes: Record<ButtonSize, number> = { sm: 16, md: 20, lg: 24 }

export function Button({
  variant = 'primary',
  size = 'md',
  icon: IconComponent,
  iconPosition = 'left',
  fullWidth = false,
  type = 'button',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const icon = IconComponent ? (
    <IconComponent
      size={iconSizes[size]}
      stroke={2}
      aria-hidden="true"
      className={`${iconClasses[variant]} group-disabled:text-button-icon-disabled`}
    />
  ) : null

  return (
    <button
      type={type}
      className={[
        'group inline-flex items-center justify-center rounded-button-radius font-button-font-weight transition-colors',
        // Anillo de foco doble: color por dentro y claro por fuera (docs/accesibilidad.md, regla 2).
        'focus-visible:focus-ring-button',
        'disabled:cursor-not-allowed disabled:bg-button-background-disabled disabled:text-button-text-disabled',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </button>
  )
}
