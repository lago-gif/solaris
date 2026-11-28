// Tests de lógica de Dialog (contracts/dialog.json): qué hace cada prop y cómo se abre y se cierra.
// El foco, la tecla Esc y la accesibilidad se prueban en Storybook (historia Teclado y panel Accessibility).
import { useState } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button, Dialog } from '@/components'

const dialog = () => document.querySelector('dialog')!

describe('Dialog', () => {
  it('open={false}: el diálogo está cerrado', () => {
    render(<Dialog open={false} onClose={() => {}} title="¿Borrar la nota?" />)
    expect(dialog()).not.toHaveAttribute('open')
  })

  it('open: abre el diálogo como ventana modal', () => {
    const showModal = vi.spyOn(HTMLDialogElement.prototype, 'showModal')
    render(<Dialog open onClose={() => {}} title="¿Borrar la nota?" />)
    expect(showModal).toHaveBeenCalledOnce()
    expect(dialog()).toHaveAttribute('open')
    showModal.mockRestore()
  })

  it('title: es un h2 y da nombre al diálogo', () => {
    render(<Dialog open onClose={() => {}} title="¿Borrar la nota?" />)
    expect(screen.getByRole('heading', { level: 2, name: '¿Borrar la nota?' })).toBeInTheDocument()
    expect(screen.getByRole('dialog', { name: '¿Borrar la nota?' })).toBe(dialog())
  })

  it('description: aparece y describe el diálogo', () => {
    render(<Dialog open onClose={() => {}} title="¿Borrar la nota?" description="No se puede deshacer." />)
    expect(screen.getByRole('dialog')).toHaveAccessibleDescription('No se puede deshacer.')
  })

  it('sin description: el diálogo no apunta a una descripción que no existe', () => {
    render(<Dialog open onClose={() => {}} title="¿Borrar la nota?" />)
    expect(dialog()).not.toHaveAttribute('aria-describedby')
  })

  it('children: muestra el contenido', () => {
    render(<Dialog open onClose={() => {}} title="Nota"><p>Contenido de la nota</p></Dialog>)
    expect(screen.getByText('Contenido de la nota')).toBeInTheDocument()
  })

  it('footer: muestra los botones del pie', () => {
    render(<Dialog open onClose={() => {}} title="¿Borrar?" footer={<Button variant="danger">Borrar nota</Button>} />)
    expect(dialog().querySelector('footer')).toContainElement(screen.getByRole('button', { name: 'Borrar nota' }))
  })

  it('sin footer: no hay pie', () => {
    render(<Dialog open onClose={() => {}} title="¿Borrar?" />)
    expect(dialog().querySelector('footer')).toBeNull()
  })

  it('botón de cerrar: siempre está y llama a onClose', async () => {
    const onClose = vi.fn()
    render(<Dialog open onClose={onClose} title="¿Borrar?" />)
    await userEvent.click(screen.getByRole('button', { name: 'Cerrar' }))
    expect(onClose).toHaveBeenCalled()
  })

  it('onClose: se llama cuando el diálogo se cierra por cualquier vía', () => {
    const onClose = vi.fn()
    render(<Dialog open onClose={onClose} title="¿Borrar?" />)
    dialog().close()
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('open pasa de true a false: el diálogo se cierra', () => {
    const { rerender } = render(<Dialog open onClose={() => {}} title="¿Borrar?" />)
    rerender(<Dialog open={false} onClose={() => {}} title="¿Borrar?" />)
    expect(dialog()).not.toHaveAttribute('open')
  })

  it('con la pantalla controlando open: abrir, cerrar con el botón y volver a abrir', async () => {
    function Pantalla() {
      const [open, setOpen] = useState(false)
      return (
        <>
          <Button onClick={() => setOpen(true)}>Borrar nota</Button>
          <Dialog open={open} onClose={() => setOpen(false)} title="¿Borrar la nota?" />
        </>
      )
    }
    render(<Pantalla />)
    await userEvent.click(screen.getByRole('button', { name: 'Borrar nota' }))
    expect(dialog()).toHaveAttribute('open')
    await userEvent.click(screen.getByRole('button', { name: 'Cerrar' }))
    expect(dialog()).not.toHaveAttribute('open')
    await userEvent.click(screen.getByRole('button', { name: 'Borrar nota', hidden: true }))
    expect(dialog()).toHaveAttribute('open')
  })
})
