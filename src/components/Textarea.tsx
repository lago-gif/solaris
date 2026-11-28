import { useId } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import { IconAlertCircle } from '@tabler/icons-react'

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  /** Texto que describe el campo. Obligatorio, para que se entienda y lo lean los lectores de pantalla. */
  label: string
  /** Ayuda opcional bajo el campo, por ejemplo "Puedes incluir síntomas y desde cuándo". */
  hint?: string
  /** Si es `true`, el valor no es válido: el borde cambia y el lector de pantalla lo anuncia. */
  invalid?: boolean
  /** Texto que explica el error, con icono. Si existe, el campo se marca también como `invalid`. */
  errorMessage?: string
}

export function Textarea({
  label,
  hint,
  invalid = false,
  errorMessage,
  rows = 4,
  id,
  required,
  className = '',
  ...rest
}: TextareaProps) {
  const generatedId = useId()
  const fieldId = id ?? generatedId
  const hintId = `${fieldId}-hint`
  const errorId = `${fieldId}-error`
  const isInvalid = invalid || Boolean(errorMessage)
  const describedBy = [hint ? hintId : null, errorMessage ? errorId : null].filter(Boolean).join(' ') || undefined

  // Cada clase es un token de componente (tokens/tokens.json → component.textarea).
  return (
    <div className={`flex flex-col gap-textarea-gap ${className}`}>
      <label
        htmlFor={fieldId}
        className="text-textarea-label-font-size font-textarea-label-font-weight text-textarea-label-text"
      >
        {label}
        {required && (
          <span className="text-textarea-label-required" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>

      <textarea
        id={fieldId}
        rows={rows}
        required={required}
        aria-invalid={isInvalid || undefined}
        aria-describedby={describedBy}
        className={[
          'resize-y rounded-textarea-radius border-width-textarea-border-width bg-textarea-background px-textarea-padding-x py-textarea-padding-y',
          'text-textarea-font-size leading-textarea-line-height text-textarea-text placeholder:text-textarea-text-placeholder',
          // Anillo de foco doble (docs/accesibilidad.md, regla 2).
          'focus-visible:focus-ring-textarea',
          'disabled:cursor-not-allowed disabled:bg-textarea-background-disabled disabled:text-textarea-text-disabled',
          isInvalid ? 'border-textarea-border-danger' : 'border-textarea-border',
        ].join(' ')}
        {...rest}
      />

      {hint && (
        <p id={hintId} className="text-textarea-hint-font-size text-textarea-hint-text">
          {hint}
        </p>
      )}
      {errorMessage && (
        <p id={errorId} className="flex items-center gap-textarea-gap text-textarea-hint-font-size text-textarea-error-text">
          <IconAlertCircle
            aria-hidden="true"
            className="shrink-0 size-textarea-error-icon-size stroke-textarea-icon-stroke text-textarea-error-icon"
          />
          {errorMessage}
        </p>
      )}
    </div>
  )
}
