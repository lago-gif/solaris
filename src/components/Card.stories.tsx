import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { active, expectFocusRingVisible } from '../stories/a11y/keyboard'
import { IconAlertTriangle, IconCalendarEvent, IconCheck, IconPill } from '@tabler/icons-react'
import { Badge } from './Badge'
import { Button } from './Button'
import { Card } from './Card'

const meta = {
  title: 'Componentes/Card',
  component: Card,
  args: {
    title: 'Ibuprofeno 600 mg',
    description: '1 comprimido cada 8 horas',
  },
  argTypes: {
    icon: {
      options: ['Ninguno', 'IconPill', 'IconCalendarEvent'],
      mapping: { Ninguno: undefined, IconPill, IconCalendarEvent },
      control: { type: 'select' },
    },
    headingLevel: { control: { type: 'select' }, options: [2, 3, 4, 5, 6] },
    children: { control: false },
    footer: { control: false },
  },
  decorators: [(Story) => <div className="max-w-md"><Story /></div>],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Basica: Story = {}

export const ConIcono: Story = {
  args: { icon: IconPill },
}

export const ConContenidoYPie: Story = {
  args: {
    icon: IconPill,
    children: (
      <Badge tone="warning" icon={IconAlertTriangle}>
        Próxima toma: 16:00
      </Badge>
    ),
    footer: (
      <>
        <Button size="sm" icon={IconCheck}>Marcar tomada</Button>
        <Button size="sm" variant="secondary">Detalles</Button>
      </>
    ),
  },
}

export const Cita: Story = {
  args: {
    icon: IconCalendarEvent,
    title: 'Dentista',
    description: 'Martes 18, 10:30 · Clínica Sol',
    children: 'Revisión anual.',
  },
}

// El título es un h2 porque la tarjeta va directamente bajo el título de la pantalla (h1).
export const NivelDeEncabezado: Story = {
  args: { icon: IconPill, headingLevel: 2 },
}

export const SoloContenido: Story = {
  args: { title: undefined, description: undefined, children: 'Una tarjeta sin cabecera, solo con contenido.' },
}

/**
 * Prueba de teclado (docs/accesibilidad.md, regla 2).
 * La tarjeta no es interactiva: el foco no se para en ella, sino en los botones de su pie, en orden.
 */
export const Teclado: Story = {
  args: {
    icon: IconPill,
    footer: (
      <>
        <Button size="sm" icon={IconCheck}>Marcar tomada</Button>
        <Button size="sm" variant="secondary">Detalles</Button>
      </>
    ),
  },
  play: async ({ canvasElement, step }) => {
    await step('Tab se salta la tarjeta y llega a los botones del pie, en orden y con anillo de foco', async () => {
      for (const label of ['Marcar tomada', 'Detalles']) {
        await userEvent.tab()
        await expect(active(canvasElement)?.tagName).toBe('BUTTON')
        await expect(active(canvasElement)).toHaveTextContent(label)
        await expectFocusRingVisible(active(canvasElement))
      }
    })
  },
}
