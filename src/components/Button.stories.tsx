import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconArrowRight, IconCheck, IconPlus, IconTrash } from '@tabler/icons-react'
import { Button } from './Button'

const meta = {
  title: 'Componentes/Button',
  component: Button,
  args: { children: 'Añadir cita' },
  argTypes: {
    icon: {
      options: ['Ninguno', 'IconPlus', 'IconCheck', 'IconArrowRight', 'IconTrash'],
      mapping: { Ninguno: undefined, IconPlus, IconCheck, IconArrowRight, IconTrash },
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Variantes: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      <Button {...args} variant="primary">Primary</Button>
      <Button {...args} variant="secondary">Secondary</Button>
      <Button {...args} variant="ghost">Ghost</Button>
      <Button {...args} variant="danger">Danger</Button>
    </div>
  ),
}

export const Tamaños: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="sm">Pequeño (sm)</Button>
      <Button {...args} size="md">Mediano (md)</Button>
      <Button {...args} size="lg">Grande (lg)</Button>
    </div>
  ),
}

export const ConIcono: Story = {
  args: { icon: IconPlus },
}

export const IconoALaDerecha: Story = {
  args: { icon: IconArrowRight, iconPosition: 'right', variant: 'ghost', children: 'Ver todo' },
}

export const Desactivado: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      <Button {...args} variant="primary" disabled>Primary</Button>
      <Button {...args} variant="secondary" disabled>Secondary</Button>
      <Button {...args} variant="ghost" disabled>Ghost</Button>
      <Button {...args} variant="danger" disabled>Danger</Button>
    </div>
  ),
}

export const AnchoCompleto: Story = {
  args: { fullWidth: true },
}
