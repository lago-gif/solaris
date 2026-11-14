import type { HTMLAttributes, ReactNode } from 'react'
import type { Icon } from '@tabler/icons-react'

export type CardProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  /** Título de la tarjeta, por ejemplo "Ibuprofeno 600 mg". */
  title?: string
  /** Texto corto bajo el título, por ejemplo "1 comprimido cada 8 horas". */
  description?: string
  /** Icono de Tabler opcional junto al título. */
  icon?: Icon
  /** Zona inferior opcional, normalmente para botones. */
  footer?: ReactNode
  /** Contenido principal de la tarjeta. */
  children?: ReactNode
}

export function Card({ title, description, icon: IconComponent, footer, children, className = '', ...rest }: CardProps) {
  const hasHeader = Boolean(title || description || IconComponent)

  return (
    <article
      className={`flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 text-gray-900 shadow-sm ${className}`}
      {...rest}
    >
      {hasHeader && (
        <header className="flex items-start gap-3">
          {IconComponent && (
            <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
              <IconComponent size={22} stroke={1.75} aria-hidden="true" />
            </span>
          )}
          <div className="flex flex-col gap-0.5">
            {title && <h3 className="text-lg font-semibold">{title}</h3>}
            {description && <p className="text-sm text-gray-600">{description}</p>}
          </div>
        </header>
      )}

      {children && <div className="text-base">{children}</div>}

      {footer && <footer className="flex flex-wrap gap-2 border-t border-gray-100 pt-4">{footer}</footer>}
    </article>
  )
}
