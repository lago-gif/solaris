import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { IconLoader2 } from '@tabler/icons-react'
import type { Icon } from '@tabler/icons-react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

type ButtonBaseProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'aria-label' | 'aria-labelledby'> & {
  /** Estilo del botón. Por defecto, `primary`. */
  variant?: ButtonVariant
  /** Tamaño del botón. Por defecto, `md`. */
  size?: ButtonSize
  /** Icono de Tabler opcional delante del texto, por ejemplo `IconPlus`. */
  iconStart?: Icon
  /** Icono de Tabler opcional detrás del texto, por ejemplo `IconArrowRight`. */
  iconEnd?: Icon
  /**
   * Si es `true`, la acción está en marcha: el icono de delante pasa a ser un indicador de carga,
   * el botón no responde a los clics y el lector de pantalla lo anuncia como ocupado.
   * Sigue recibiendo el foco, para que quien navega con teclado no se pierda.
   */
  isLoading?: boolean
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
  ghost: 'bg-button-background-transparent text-button-text-brand hover:bg-button-background-brand-subtle-hover',
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

const iconSizeClasses: Record<ButtonSize, string> = {
  sm: 'size-button-icon-size-sm',
  md: 'size-button-icon-size-md',
  lg: 'size-button-icon-size-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  iconStart,
  iconEnd,
  isLoading = false,
  fullWidth = false,
  type = 'button',
  className = '',
  onClick,
  children,
  ...rest
}: ButtonProps) {
  const iconClassName = `shrink-0 stroke-button-icon-stroke ${iconSizeClasses[size]} ${iconClasses[variant]} group-disabled:text-button-icon-disabled`
  const renderIcon = (IconComponent: Icon | undefined, extra = '') =>
    IconComponent ? <IconComponent aria-hidden="true" className={`${iconClassName} ${extra}`} /> : null

  // Mientras carga, el clic no hace nada (tampoco envía el formulario), pero el botón conserva el foco.
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (isLoading) {
      event.preventDefault()
      return
    }
    onClick?.(event)
  }

  return (
    <button
      type={type}
      aria-busy={isLoading || undefined}
      aria-disabled={isLoading || undefined}
      onClick={handleClick}
      className={[
        'group inline-flex items-center justify-center rounded-button-radius font-button-font-weight transition-colors',
        // Anillo de foco doble: color por dentro y claro por fuera (docs/accesibilidad.md, regla 2).
        'focus-visible:focus-ring-button',
        'disabled:cursor-not-allowed disabled:bg-button-background-disabled disabled:text-button-text-disabled',
        'aria-busy:cursor-wait',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...rest}
    >
      {isLoading ? renderIcon(IconLoader2, 'motion-safe:animate-spin') : renderIcon(iconStart)}
      {children}
      {renderIcon(iconEnd)}
    </button>
  )
}
