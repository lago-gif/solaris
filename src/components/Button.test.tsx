// Tests de lógica de Button (contracts/button.json): qué hace cada prop y cada estado.
// El teclado, el foco y la accesibilidad se prueban en Storybook (historia Teclado y panel Accessibility).
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { IconArrowRight, IconPlus } from '@tabler/icons-react'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '@/components'

const icons = (button: HTMLElement) => [...button.querySelectorAll('svg')].map((svg) => svg.getAttribute('class'))

describe('Button', () => {
  it('children: muestra el texto, que es también su nombre', () => {
    render(<Button>Añadir cita</Button>)
    expect(screen.getByRole('button', { name: 'Añadir cita' })).toBeInTheDocument()
  })

  it('variant: por defecto es primary y usa los tokens de su rol', () => {
    render(<Button>Guardar</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-button-background-brand')
  })

  it.each([
    ['primary', 'bg-button-background-brand'],
    ['secondary', 'bg-button-background-neutral'],
    ['ghost', 'bg-button-background-transparent'],
    ['danger', 'bg-button-background-danger'],
  ] as const)('variant="%s": usa %s', (variant, token) => {
    render(<Button variant={variant}>Acción</Button>)
    expect(screen.getByRole('button')).toHaveClass(token)
  })

  it.each([
    ['sm', 'px-button-padding-x-sm', 'size-button-icon-size-sm'],
    ['md', 'px-button-padding-x-md', 'size-button-icon-size-md'],
    ['lg', 'px-button-padding-x-lg', 'size-button-icon-size-lg'],
  ] as const)('size="%s": cambia el relleno y el tamaño del icono', (size, padding, iconSize) => {
    render(<Button size={size} iconStart={IconPlus}>Añadir</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass(padding)
    expect(button.querySelector('svg')).toHaveClass(iconSize)
  })

  it('iconStart: pinta el icono delante del texto, oculto al lector de pantalla', () => {
    render(<Button iconStart={IconPlus}>Añadir</Button>)
    const button = screen.getByRole('button')
    expect(button.firstElementChild).toHaveClass('tabler-icon-plus')
    expect(button.firstElementChild).toHaveAttribute('aria-hidden', 'true')
  })

  it('iconEnd: pinta el icono detrás del texto', () => {
    render(<Button iconEnd={IconArrowRight}>Ver todo</Button>)
    expect(screen.getByRole('button').lastElementChild).toHaveClass('tabler-icon-arrow-right')
  })

  it('iconStart e iconEnd a la vez: uno delante y otro detrás', () => {
    render(<Button iconStart={IconPlus} iconEnd={IconArrowRight}>Añadir</Button>)
    const [start, end] = icons(screen.getByRole('button'))
    expect(start).toContain('tabler-icon-plus')
    expect(end).toContain('tabler-icon-arrow-right')
  })

  it('sin iconos: no pinta ningún icono', () => {
    render(<Button>Guardar</Button>)
    expect(icons(screen.getByRole('button'))).toHaveLength(0)
  })

  it('onClick: se llama al pulsar', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Guardar</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('type: por defecto es "button" y no envía el formulario', async () => {
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault())
    render(<form onSubmit={onSubmit}><Button>Añadir</Button></form>)
    await userEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('type="submit": envía el formulario', async () => {
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault())
    render(<form onSubmit={onSubmit}><Button type="submit">Enviar</Button></form>)
    await userEvent.click(screen.getByRole('button'))
    expect(onSubmit).toHaveBeenCalledOnce()
  })

  describe('isLoading', () => {
    it('anuncia el botón como ocupado y desactivado', () => {
      render(<Button isLoading>Guardando</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-busy', 'true')
      expect(button).toHaveAttribute('aria-disabled', 'true')
    })

    it('no llama a onClick al pulsar', async () => {
      const onClick = vi.fn()
      render(<Button isLoading onClick={onClick}>Guardando</Button>)
      await userEvent.click(screen.getByRole('button'))
      expect(onClick).not.toHaveBeenCalled()
    })

    it('no envía el formulario, aunque sea type="submit"', async () => {
      const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault())
      render(<form onSubmit={onSubmit}><Button type="submit" isLoading>Enviando</Button></form>)
      await userEvent.click(screen.getByRole('button'))
      expect(onSubmit).not.toHaveBeenCalled()
    })

    it('cambia el icono de delante por el indicador de carga y mantiene el de detrás', () => {
      render(<Button isLoading iconStart={IconPlus} iconEnd={IconArrowRight}>Guardando</Button>)
      const [start, end] = icons(screen.getByRole('button'))
      expect(start).toContain('tabler-icon-loader-2')
      expect(start).not.toContain('tabler-icon-plus')
      expect(end).toContain('tabler-icon-arrow-right')
    })

    it('no usa el atributo disabled, para que el botón siga recibiendo el foco', () => {
      render(<Button isLoading>Guardando</Button>)
      expect(screen.getByRole('button')).not.toHaveAttribute('disabled')
    })

    it('sin isLoading no marca nada como ocupado', () => {
      render(<Button>Guardar</Button>)
      expect(screen.getByRole('button')).not.toHaveAttribute('aria-busy')
      expect(screen.getByRole('button')).not.toHaveAttribute('aria-disabled')
    })
  })

  it('disabled: desactiva el botón y no llama a onClick', async () => {
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>Guardar</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toBeDisabled()
    expect(onClick).not.toHaveBeenCalled()
  })

  it('fullWidth: ocupa todo el ancho', () => {
    render(<Button fullWidth>Guardar</Button>)
    expect(screen.getByRole('button')).toHaveClass('w-full')
  })

  it('aria-label: da nombre al botón de solo icono', () => {
    render(<Button iconStart={IconPlus} aria-label="Añadir cita" />)
    expect(screen.getByRole('button', { name: 'Añadir cita' })).toBeInTheDocument()
  })

  it('className: se añade a sus clases sin quitarlas', () => {
    render(<Button className="mt-space-md">Guardar</Button>)
    expect(screen.getByRole('button')).toHaveClass('mt-space-md', 'bg-button-background-brand')
  })
})
