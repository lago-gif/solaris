// Tests de lógica de Badge (contracts/badge.json): qué hace cada prop.
// La accesibilidad se prueba en Storybook (panel Accessibility).
import { render, screen } from '@testing-library/react'
import { IconCheck } from '@tabler/icons-react'
import { describe, expect, it } from 'vitest'
import { Badge } from '@/components'

describe('Badge', () => {
  it('children: muestra el texto', () => {
    render(<Badge>Tomada</Badge>)
    expect(screen.getByText('Tomada')).toBeInTheDocument()
  })

  it('variant: por defecto es neutral', () => {
    render(<Badge>Sin revisar</Badge>)
    expect(screen.getByText('Sin revisar')).toHaveClass('bg-badge-background-neutral', 'text-badge-text-neutral')
  })

  it.each(['neutral', 'info', 'success', 'warning', 'danger'] as const)(
    'variant="%s": usa el fondo y el texto de su rol',
    (variant) => {
      render(<Badge variant={variant}>Estado</Badge>)
      expect(screen.getByText('Estado')).toHaveClass(`bg-badge-background-${variant}`, `text-badge-text-${variant}`)
    },
  )

  it.each(['sm', 'md'] as const)('size="%s": cambia el relleno y el tamaño de letra', (size) => {
    render(<Badge size={size}>Tomada</Badge>)
    expect(screen.getByText('Tomada')).toHaveClass(`px-badge-padding-x-${size}`, `text-badge-font-size-${size}`)
  })

  it('size: por defecto es md', () => {
    render(<Badge>Tomada</Badge>)
    expect(screen.getByText('Tomada')).toHaveClass('px-badge-padding-x-md')
  })

  it('iconStart: pinta el icono delante del texto, con el color de su variante y oculto al lector', () => {
    render(<Badge variant="success" iconStart={IconCheck}>Tomada</Badge>)
    const icon = screen.getByText('Tomada').firstElementChild
    expect(icon).toHaveClass('tabler-icon-check', 'text-badge-icon-success')
    expect(icon).toHaveAttribute('aria-hidden', 'true')
  })

  it('sin iconStart: no hay icono', () => {
    render(<Badge>Tomada</Badge>)
    expect(screen.getByText('Tomada').querySelector('svg')).toBeNull()
  })

  it('className: se añade a sus clases sin quitarlas', () => {
    render(<Badge className="ml-space-xs">Tomada</Badge>)
    expect(screen.getByText('Tomada')).toHaveClass('ml-space-xs', 'bg-badge-background-neutral')
  })
})
