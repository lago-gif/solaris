// Tests de lógica de Input (contracts/input.json): qué hace cada prop y cada estado.
// El teclado, el foco y la accesibilidad se prueban en Storybook (historia Teclado y panel Accessibility).
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IconSearch } from '@tabler/icons-react'
import { describe, expect, it, vi } from 'vitest'
import { Input } from '@/components'

const box = (field: HTMLElement) => field.parentElement!

describe('Input', () => {
  it('label: nombra el campo y está conectada a él', () => {
    render(<Input label="Correo" />)
    expect(screen.getByLabelText('Correo')).toBe(screen.getByRole('textbox'))
  })

  it('id: si no se pasa, se genera uno distinto para cada campo', () => {
    render(<><Input label="Nombre" /><Input label="Apellidos" /></>)
    const [a, b] = screen.getAllByRole('textbox')
    expect(a.id).toBeTruthy()
    expect(a.id).not.toBe(b.id)
  })

  it('id: si se pasa, se usa y sigue conectando la etiqueta', () => {
    render(<Input label="Correo" id="correo" />)
    expect(screen.getByLabelText('Correo')).toHaveAttribute('id', 'correo')
  })

  it('hint: muestra la ayuda y la conecta con el campo', () => {
    render(<Input label="Tarjeta sanitaria" hint="Como aparece en tu tarjeta" />)
    expect(screen.getByRole('textbox')).toHaveAccessibleDescription('Como aparece en tu tarjeta')
  })

  it('required: añade el atributo y un asterisco oculto al lector de pantalla', () => {
    render(<Input label="Nombre" required />)
    expect(screen.getByRole('textbox')).toBeRequired()
    expect(screen.getByText('*')).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByRole('textbox')).toHaveAccessibleName('Nombre')
  })

  it('sin required: no hay asterisco', () => {
    render(<Input label="Nombre" />)
    expect(screen.queryByText('*')).not.toBeInTheDocument()
  })

  describe('invalid y errorMessage', () => {
    it('sin error: el campo es válido y su borde es el normal', () => {
      render(<Input label="Correo" />)
      const field = screen.getByRole('textbox')
      expect(field).toBeValid()
      expect(box(field)).toHaveClass('border-input-border')
    })

    it('invalid: marca el campo como no válido y pinta el borde de peligro, sin mensaje', () => {
      render(<Input label="Correo" invalid />)
      const field = screen.getByRole('textbox')
      expect(field).toHaveAttribute('aria-invalid', 'true')
      expect(box(field)).toHaveClass('border-input-border-danger')
      expect(field).not.toHaveAccessibleDescription()
    })

    it('errorMessage: muestra el mensaje con icono, lo enlaza al campo y lo marca como no válido', () => {
      render(<Input label="Correo" errorMessage="Escribe un correo válido" />)
      const field = screen.getByRole('textbox')
      expect(field).toHaveAttribute('aria-invalid', 'true')
      expect(field).toHaveAccessibleDescription('Escribe un correo válido')
      expect(screen.getByText('Escribe un correo válido').querySelector('svg')).toHaveClass('tabler-icon-alert-circle')
    })

    it('hint y errorMessage a la vez: el campo enlaza los dos, primero la ayuda', () => {
      render(<Input label="Correo" hint="El que usas a diario" errorMessage="Escribe un correo válido" />)
      expect(screen.getByRole('textbox')).toHaveAccessibleDescription('El que usas a diario Escribe un correo válido')
    })
  })

  it('iconStart: pinta el icono dentro del campo, oculto al lector', () => {
    render(<Input label="Buscar" iconStart={IconSearch} />)
    const icon = box(screen.getByRole('textbox')).querySelector('svg')
    expect(icon).toHaveClass('tabler-icon-search')
    expect(icon).toHaveAttribute('aria-hidden', 'true')
  })

  it('onChange y value: avisa de cada cambio con lo que se escribe', async () => {
    const onChange = vi.fn()
    render(<Input label="Nombre" onChange={onChange} />)
    await userEvent.type(screen.getByRole('textbox'), 'Ana')
    expect(onChange).toHaveBeenCalledTimes(3)
    expect(screen.getByRole('textbox')).toHaveValue('Ana')
  })

  it('defaultValue: el campo empieza con ese texto', () => {
    render(<Input label="Nombre" defaultValue="Ana" />)
    expect(screen.getByRole('textbox')).toHaveValue('Ana')
  })

  it('disabled: no se puede escribir', async () => {
    render(<Input label="Nombre" disabled />)
    await userEvent.type(screen.getByRole('textbox'), 'Ana')
    expect(screen.getByRole('textbox')).toBeDisabled()
    expect(screen.getByRole('textbox')).toHaveValue('')
  })

  it('type y placeholder: se pasan al campo de HTML', () => {
    render(<Input label="Correo" type="email" placeholder="nombre@correo.com" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')
    expect(screen.getByPlaceholderText('nombre@correo.com')).toBeInTheDocument()
  })

  it('className: va en el contenedor, no en el campo', () => {
    render(<Input label="Nombre" className="mt-space-md" />)
    const field = screen.getByRole('textbox')
    expect(field).not.toHaveClass('mt-space-md')
    expect(field.closest('.mt-space-md')).not.toBeNull()
  })
})
