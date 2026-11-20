import type { HTMLAttributes, ReactNode } from 'react'
import type { Icon } from '@tabler/icons-react'

export type CardProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
  /** Título de la tarjeta, por ejemplo "Ibuprofeno 600 mg". */
  title?: string
  /**
   * Nivel del encabezado del título: 2 para h2, 3 para h3… Por defecto, 3.
   * Elige el que siga el orden de la pantalla (docs/accesibilidad.md, regla 4):
   * si la tarjeta va bajo un h2, su título es h3. No cambia el aspecto, solo cómo lo lee un lector de pantalla.
   */
  headingLevel?: 2 | 3 | 4 | 5 | 6
  /** Texto corto bajo el título, por ejemplo "1 comprimido cada 8 horas". */
  description?: string
  /** Icono de Tabler opcional junto al título. */
  icon?: Icon
  /** Zona inferior opcional, normalmente para botones. */
  footer?: ReactNode
  /** Contenido principal de la tarjeta. */
  children?: ReactNode
}

export function Card({
  title,
  headingLevel = 3,
  description,
  icon: IconComponent,
  footer,
  children,
  className = '',
  ...rest
}: CardProps) {
  const hasHeader = Boolean(title || description || IconComponent)
  const Heading = `h${headingLevel}` as const

  // Cada clase es un token de componente (tokens/tokens.json → component.card).
  return (
    <article
      className={`flex flex-col gap-card-gap rounded-card-radius border-width-card-border-width border-card-border bg-card-background p-card-padding text-card-body-text shadow-card-elevation ${className}`}
      {...rest}
    >
      {hasHeader && (
        <header className="flex items-start gap-card-header-gap">
          {IconComponent && (
            <span className="flex shrink-0 items-center justify-center rounded-card-icon-radius bg-card-icon-background p-card-icon-padding text-card-icon">
              <IconComponent size={24} stroke={1.75} aria-hidden="true" />
            </span>
          )}
          <div className="flex flex-col gap-card-header-text-gap">
            {title && (
              <Heading className="text-card-title-font-size leading-card-title-line-height font-card-title-font-weight text-card-title-text">
                {title}
              </Heading>
            )}
            {description && <p className="text-card-description-font-size text-card-description-text">{description}</p>}
          </div>
        </header>
      )}

      {children && <div className="text-card-body-font-size">{children}</div>}

      {footer && (
        <footer className="flex flex-wrap gap-card-footer-gap border-t-width-card-border-width border-card-border pt-card-footer-padding-top">
          {footer}
        </footer>
      )}
    </article>
  )
}
