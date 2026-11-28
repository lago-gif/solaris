import { useEffect, useId, useRef } from 'react'
import type { DialogHTMLAttributes, KeyboardEvent, ReactNode } from 'react'
import { IconX } from '@tabler/icons-react'
// Directo al archivo (no a '@/components'): este archivo está dentro de ese índice y se crearía un bucle.
import { Button } from '@/components/Button'

export type DialogProps = Omit<DialogHTMLAttributes<HTMLDialogElement>, 'title' | 'open' | 'onClose' | 'children'> & {
  /** Si está abierto. Al pasar a `true` se abre como ventana modal; al pasar a `false`, se cierra. */
  open: boolean
  /**
   * Se llama al cerrarse por cualquier vía: la tecla Esc, el botón de cerrar o `open` a `false`.
   * La pantalla debe poner `open` a `false`.
   */
  onClose: () => void
  /** Título del diálogo, por ejemplo "¿Borrar esta nota?". Es también su nombre accesible. */
  title: string
  /** Texto corto bajo el título, por ejemplo "No se puede deshacer". */
  description?: string
  /** Contenido del diálogo. */
  children?: ReactNode
  /** Botones del pie: primero el de cancelar y después la acción. */
  footer?: ReactNode
}

/**
 * Ventana modal sobre el `<dialog>` nativo (`showModal`): el navegador lleva el foco dentro,
 * deja el resto de la pantalla sin poder usarse, cierra con Esc y devuelve el foco al cerrar.
 */
export function Dialog({ open, onClose, title, description, children, footer, className = '', ...rest }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const titleId = useId()
  const descriptionId = useId()

  // La prop open manda: abre o cierra el <dialog> nativo cuando cambia.
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // Esc cierra también si la tecla no la manda el teclado real (lectores de pantalla, pruebas).
  // Se cierra con close() nativo, así el navegador sigue devolviendo el foco.
  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key !== 'Escape') return
    event.preventDefault()
    ref.current?.close()
  }

  // Cada clase es un token de componente (tokens/tokens.json → component.dialog).
  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      className={[
        'm-auto w-dialog-width rounded-dialog-radius bg-dialog-background p-dialog-padding text-dialog-body-text shadow-dialog-elevation',
        'backdrop:bg-dialog-background-overlay',
        className,
      ].join(' ')}
      {...rest}
    >
      {/* El <dialog> cerrado se oculta solo; el reparto va en este div para no pisar ese "oculto". */}
      <div className="flex flex-col gap-dialog-gap">
        <header className="flex items-start justify-between gap-dialog-header-gap">
          <div className="flex flex-col gap-dialog-header-text-gap">
            <h2
              id={titleId}
              className="text-dialog-title-font-size leading-dialog-title-line-height font-dialog-title-font-weight text-dialog-title-text"
            >
              {title}
            </h2>
            {description && (
              <p id={descriptionId} className="text-dialog-description-font-size text-dialog-description-text">
                {description}
              </p>
            )}
          </div>
          <Button variant="ghost" size="sm" iconStart={IconX} aria-label="Cerrar" onClick={onClose} />
        </header>

        {children && <div className="text-dialog-body-font-size">{children}</div>}

        {footer && <footer className="flex flex-wrap justify-end gap-dialog-footer-gap">{footer}</footer>}
      </div>
    </dialog>
  )
}
