// Tests de lógica de Card (contracts/card.json): qué hace cada prop.
// El teclado y la accesibilidad se prueban en Storybook (historia Teclado y panel Accessibility).
import { render, screen } from '@testing-library/react'
import { IconPill } from '@tabler/icons-react'
import { describe, expect, it } from 'vitest'
import { Button, Card } from '@/components'

describe('Card', () => {
  it('es un article', () => {
    render(<Card title="Ibuprofeno" />)
    expect(screen.getByRole('article')).toBeInTheDocument()
  })

  it('title: es un encabezado h3 por defecto', () => {
    render(<Card title="Ibuprofeno 600 mg" />)
    expect(screen.getByRole('heading', { level: 3, name: 'Ibuprofeno 600 mg' })).toBeInTheDocument()
  })

  it.each([2, 3, 4, 5, 6] as const)('headingLevel=$0: el título es un h$0', (level) => {
    render(<Card title="Ibuprofeno" headingLevel={level} />)
    expect(screen.getByRole('heading', { level, name: 'Ibuprofeno' })).toBeInTheDocument()
  })

  it('description: aparece bajo el título', () => {
    render(<Card title="Ibuprofeno" description="1 comprimido cada 8 horas" />)
    expect(screen.getByText('1 comprimido cada 8 horas')).toBeInTheDocument()
  })

  it('iconStart: pinta el icono en la cabecera, oculto al lector', () => {
    render(<Card title="Ibuprofeno" iconStart={IconPill} />)
    const icon = screen.getByRole('article').querySelector('header svg')
    expect(icon).toHaveClass('tabler-icon-pill')
    expect(icon).toHaveAttribute('aria-hidden', 'true')
  })

  it('sin title, description ni iconStart: no hay cabecera', () => {
    render(<Card>Solo contenido</Card>)
    expect(screen.getByRole('article').querySelector('header')).toBeNull()
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('solo con iconStart: hay cabecera pero no encabezado vacío', () => {
    render(<Card iconStart={IconPill}>Contenido</Card>)
    expect(screen.getByRole('article').querySelector('header')).not.toBeNull()
    expect(screen.queryByRole('heading')).not.toBeInTheDocument()
  })

  it('children: muestra el contenido', () => {
    render(<Card title="Dentista">Revisión anual.</Card>)
    expect(screen.getByText('Revisión anual.')).toBeInTheDocument()
  })

  it('footer: muestra el pie con lo que se le pase', () => {
    render(<Card title="Ibuprofeno" footer={<Button>Marcar tomada</Button>} />)
    const footer = screen.getByRole('article').querySelector('footer')
    expect(footer).toContainElement(screen.getByRole('button', { name: 'Marcar tomada' }))
  })

  it('sin footer: no hay pie', () => {
    render(<Card title="Ibuprofeno" />)
    expect(screen.getByRole('article').querySelector('footer')).toBeNull()
  })

  it('className: se añade a sus clases sin quitarlas', () => {
    render(<Card title="Ibuprofeno" className="mt-space-md" />)
    expect(screen.getByRole('article')).toHaveClass('mt-space-md', 'bg-card-background')
  })
})
