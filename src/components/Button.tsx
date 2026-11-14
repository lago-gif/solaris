import type { ButtonHTMLAttributes } from 'react'
import type { Icon } from '@tabler/icons-react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
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

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-900',
  secondary: 'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 active:bg-gray-100',
  ghost: 'bg-transparent text-blue-700 hover:bg-blue-50 active:bg-blue-100',
  danger: 'bg-red-700 text-white hover:bg-red-800 active:bg-red-900',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 gap-1.5 px-3 text-sm',
  md: 'h-10 gap-2 px-4 text-base',
  lg: 'h-12 gap-2 px-6 text-lg',
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
  const icon = IconComponent ? <IconComponent size={iconSizes[size]} stroke={2} aria-hidden="true" /> : null

  return (
    <button
      type={type}
      className={[
        'inline-flex items-center justify-center rounded-lg font-medium transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600',
        'disabled:cursor-not-allowed disabled:opacity-50',
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
