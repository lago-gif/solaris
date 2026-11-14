import { useId } from 'react'
import type { InputHTMLAttributes } from 'react'
import { IconAlertCircle } from '@tabler/icons-react'
import type { Icon } from '@tabler/icons-react'

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  /** Texto que describe el campo. Obligatorio, para que se entienda y lo lean los lectores de pantalla. */
  label: string
  /** Ayuda opcional bajo el campo, por ejemplo "Como aparece en tu tarjeta sanitaria". */
  hint?: string
  /** Mensaje de error. Si existe, el campo se marca en rojo y se anuncia como no válido. */
  error?: string
  /** Icono de Tabler opcional dentro del campo, a la izquierda. */
  icon?: Icon
}

export function Input({ label, hint, error, icon: IconComponent, id, required, className = '', ...rest }: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const hintId = `${inputId}-hint`
  const errorId = `${inputId}-error`
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={inputId} className="text-sm font-medium text-gray-900">
        {label}
        {required && (
          <span className="text-red-700" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>

      <div className="relative">
        {IconComponent && (
          <IconComponent
            size={20}
            stroke={1.75}
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-500"
          />
        )}
        <input
          id={inputId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={[
            'h-10 w-full rounded-lg border bg-white px-3 text-base text-gray-900 placeholder:text-gray-500',
            'focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-blue-600',
            'disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500',
            IconComponent ? 'pl-10' : '',
            error ? 'border-red-700' : 'border-gray-500',
          ].join(' ')}
          {...rest}
        />
      </div>

      {hint && (
        <p id={hintId} className="text-sm text-gray-600">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="flex items-center gap-1.5 text-sm text-red-700">
          <IconAlertCircle size={16} stroke={2} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}
