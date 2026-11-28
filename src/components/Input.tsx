import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import { IconAlertCircle } from '@tabler/icons-react'
import type { Icon } from '@tabler/icons-react'

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  /** Texto que describe el campo. Obligatorio, para que se entienda y lo lean los lectores de pantalla. */
  label: string
  /** Ayuda opcional bajo el campo, por ejemplo "Como aparece en tu tarjeta sanitaria". */
  hint?: string
  /** Si es `true`, el valor no es válido: el borde cambia y el lector de pantalla lo anuncia. */
  invalid?: boolean
  /** Texto que explica el error, con icono. Si existe, el campo se marca también como `invalid`. */
  errorMessage?: string
  /** Icono de Tabler opcional dentro del campo, delante del texto. */
  iconStart?: Icon
}

export function Input({
  label,
  hint,
  invalid = false,
  errorMessage,
  iconStart: IconStart,
  id,
  required,
  className = '',
  ...rest
}: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const hintId = `${inputId}-hint`
  const errorId = `${inputId}-error`
  const isInvalid = invalid || Boolean(errorMessage)
  const describedBy = [hint ? hintId : null, errorMessage ? errorId : null].filter(Boolean).join(' ') || undefined

  // Cada clase es un token de componente (tokens/tokens.json → component.input).
  return (
    <div className={`flex flex-col gap-input-gap ${className}`}>
      <label
        htmlFor={inputId}
        className="text-input-label-font-size font-input-label-font-weight text-input-label-text"
      >
        {label}
        {required && (
          <span className="text-input-label-required" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>

      {/* La caja del campo: borde, fondo y foco. El icono y el texto van dentro, uno junto al otro. */}
      <div
        className={[
          'flex items-center gap-input-icon-gap rounded-input-radius border-width-input-border-width bg-input-background px-input-padding-x',
          // Anillo de foco doble alrededor de la caja (docs/accesibilidad.md, regla 2).
          'focus-within:focus-ring-input',
          'has-disabled:cursor-not-allowed has-disabled:bg-input-background-disabled',
          isInvalid ? 'border-input-border-danger' : 'border-input-border',
        ].join(' ')}
      >
        {IconStart && (
          <IconStart
            aria-hidden="true"
            className="pointer-events-none shrink-0 size-input-icon-size stroke-input-icon-stroke text-input-icon"
          />
        )}
        <input
          id={inputId}
          required={required}
          aria-invalid={isInvalid || undefined}
          aria-describedby={describedBy}
          className={[
            'min-w-0 flex-1 bg-input-background-transparent py-input-padding-y outline-none',
            'text-input-font-size leading-input-line-height text-input-text placeholder:text-input-text-placeholder',
            'disabled:cursor-not-allowed disabled:text-input-text-disabled',
          ].join(' ')}
          {...rest}
        />
      </div>

      {hint && (
        <p id={hintId} className="text-input-hint-font-size text-input-hint-text">
          {hint}
        </p>
      )}
      {errorMessage && (
        <p id={errorId} className="flex items-center gap-input-gap text-input-hint-font-size text-input-error-text">
          <IconAlertCircle
            aria-hidden="true"
            className="shrink-0 size-input-error-icon-size stroke-input-icon-stroke text-input-error-icon"
          />
          {errorMessage}
        </p>
      )}
    </div>
  )
}
