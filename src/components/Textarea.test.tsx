// Tests de lógica de Textarea (contracts/textarea.json): qué hace cada prop y cada estado.
// El teclado, el foco y la accesibilidad se prueban en Storybook (historia Teclado y panel Accessibility).
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Textarea } from '@/components'

describe('Textarea', () => {
  it('label: nombra el campo y está conectada a él', () => {
    render(<Textarea label="Notas de la consulta" />)
    expect(screen.getByLabelText('Notas de la consulta').tagName).toBe('TEXTAREA')
  })

  it('id: si no se pasa, se genera uno distinto para cada campo', () => {
    render(<><Textarea label="Notas" /><Textarea label="Motivo" /></>)
    const [a, b] = screen.getAllByRole('textbox')
    expect(a.id).toBeTruthy()
    expect(a.id).not.toBe(b.id)
  })

  it('rows: por defecto muestra 4 líneas', () => {
    render(<Textarea label="Notas" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '4')
  })

  it('rows: se puede cambiar', () => {
    render(<Textarea label="Resumen" rows={8} />)
    expect(screen.getByRole('textbox')).toHaveAttribute('rows', '8')
  })

  it('hint: muestra la ayuda y la conecta con el campo', () => {
    render(<Textarea label="Cómo te encuentras" hint="Puedes incluir síntomas" />)
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Puedes incluir síntomas')
  })

  it('required: añade el atributo y un asterisco oculto al lector de pantalla', () => {
    render(<Textarea label="Motivo" required />)
    expect(screen.getByRole('textbox')).toBeRequired()
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true')
  })

  describe('invalid y errorMessage', () => {
    it('sin error: el campo es válido y su borde es el normal', () => {
      render(<Textarea label="Motivo" />)
      expect(screen.getByRole('textbox')).toBeValid()
      expect(screen.getByRole('textbox')).toHaveClass('border-textarea-border')
    })

    it('invalid: marca el campo como no válido y pinta el borde de peligro, sin mensaje', () => {
      render(<Textarea label="Motivo" invalid />)
      const field = screen.getByRole('textbox')
      expect(field).toHaveAttribute('aria-invalid', 'true')
      expect(field).toHaveClass('border-textarea-border-danger')
      expect(field).not.toHaveAccessibleDescription()
    })

    it('errorMessage: muestra el mensaje con icono, lo enlaza al campo y lo marca como no válido', () => {
      render(<Textarea label="Motivo" errorMessage="Escribe el motivo" />)
      const field = screen.getByRole('textbox')
      expect(field).toHaveAttribute('aria-invalid', 'true')
      expect(field).toHaveAccessibleDescription('Escribe el motivo')
      expect(screen.getByText('Escribe el motivo').querySelector('svg')).toHaveClass('tabler-icon-alert-circle')
    })

    it('hint y errorMessage a la vez: el campo enlaza los dos, primero la ayuda', () => {
      render(<Textarea label="Motivo" hint="Para preparar la cita" errorMessage="Escribe el motivo" />)
      expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Para preparar la cita Escribe el motivo')
    })
  })

  it('onChange: avisa de cada cambio y guarda los saltos de línea', async () => {
    const onChange = vi.fn()
    render(<Textarea label="Notas" onChange={onChange} />)
    await userEvent.type(screen.getByRole('textbox'), 'Uno{Enter}dos')
    expect(onChange).toHaveBeenCalled()
    expect(screen.getByRole('textbox')).toHaveValue('Uno\ndos')
  })

  it('maxLength: no deja escribir más caracteres', async () => {
    render(<Textarea label="Notas" maxLength={5} />)
    await userEvent.type(screen.getByRole('textbox'), 'demasiado')
    expect(screen.getByRole('textbox')).toHaveValue('demas')
  })

  it('disabled: no se puede escribir', async () => {
    render(<Textarea label="Notas" disabled defaultValue="No editable" />)
    await userEvent.type(screen.getByRole('textbox'), 'x')
    expect(screen.getByRole('textbox')).toBeDisabled()
    expect(screen.getByRole('textbox')).toHaveValue('No editable')
  })

  it('className: va en el contenedor, no en el campo', () => {
    render(<Textarea label="Notas" className="mt-space-md" />)
    const field = screen.getByRole('textbox')
    expect(field).not.toHaveClass('mt-space-md')
    expect(field.closest('.mt-space-md')).not.toBeNull()
  })
})
