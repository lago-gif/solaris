// Tests de lógica de Toast (contracts/toast.json): qué hace cada prop.
// El teclado y la accesibilidad se prueban en Storybook (historia Teclado y panel Accessibility).
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Toast } from '@/components'

describe('Toast', () => {
  it('children: muestra el mensaje', () => {
    render(<Toast>Nota guardada en Consultas.</Toast>)
    expect(screen.getByText('Nota guardada en Consultas.')).toBeInTheDocument()
  })

  it('variant: por defecto es neutral, con su fondo y su icono', () => {
    render(<Toast>Sincronizando</Toast>)
    const toast = screen.getByRole('status')
    expect(toast).toHaveClass('bg-toast-background-neutral')
    expect(toast.querySelector('svg')).toHaveClass('tabler-icon-bell')
  })

  it.each([
    ['neutral', 'status', 'tabler-icon-bell'],
    ['info', 'status', 'tabler-icon-info-circle'],
    ['success', 'status', 'tabler-icon-circle-check'],
    ['warning', 'status', 'tabler-icon-alert-triangle'],
    ['danger', 'alert', 'tabler-icon-alert-circle'],
  ] as const)('variant="%s": se anuncia como %s, con su fondo y el icono %s', (variant, role, icon) => {
    render(<Toast variant={variant}>Mensaje</Toast>)
    const toast = screen.getByRole(role)
    expect(toast).toHaveClass(`bg-toast-background-${variant}`)
    expect(toast.querySelector('svg')).toHaveClass(icon, `text-toast-icon-${variant}`)
    expect(toast.querySelector('svg')).toHaveAttribute('aria-hidden', 'true')
  })

  it('title: aparece antes del mensaje', () => {
    render(<Toast title="Nota guardada">La encontrarás en Consultas.</Toast>)
    const toast = screen.getByRole('status')
    expect(toast).toHaveTextContent(/^Nota guardadaLa encontrarás en Consultas\.$/)
  })

  it('sin title: solo hay mensaje', () => {
    render(<Toast>La encontrarás en Consultas.</Toast>)
    expect(screen.getByRole('status')).toHaveTextContent(/^La encontrarás en Consultas\.$/)
  })

  it('sin onClose: no hay botón de cerrar', () => {
    render(<Toast>Nota guardada</Toast>)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('onClose: aparece el botón "Cerrar aviso" y lo llama al pulsarlo', async () => {
    const onClose = vi.fn()
    render(<Toast onClose={onClose}>Nota guardada</Toast>)
    await userEvent.click(screen.getByRole('button', { name: 'Cerrar aviso' }))
    expect(onClose).toHaveBeenCalledOnce()
    expect(onClose).toHaveBeenCalledWith() // sin argumentos, como dice el contrato
  })

  it('className: se añade a sus clases sin quitarlas', () => {
    render(<Toast className="mt-space-md">Nota guardada</Toast>)
    expect(screen.getByRole('status')).toHaveClass('mt-space-md', 'bg-toast-background-neutral')
  })
})
