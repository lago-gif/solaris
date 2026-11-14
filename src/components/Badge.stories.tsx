import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconAlertTriangle, IconCheck, IconInfoCircle, IconX } from '@tabler/icons-react'
import { Badge } from './Badge'

const meta = {
  title: 'Componentes/Badge',
  component: Badge,
  args: { children: 'Tomada', tone: 'success' },
  argTypes: {
    icon: {
      options: ['Ninguno', 'IconCheck', 'IconAlertTriangle', 'IconInfoCircle', 'IconX'],
      mapping: { Ninguno: undefined, IconCheck, IconAlertTriangle, IconInfoCircle, IconX },
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const PorDefecto: Story = {}

export const Tonos: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      <Badge {...args} tone="neutral">Neutral</Badge>
      <Badge {...args} tone="info">Info</Badge>
      <Badge {...args} tone="success">Tomada</Badge>
      <Badge {...args} tone="warning">Pendiente</Badge>
      <Badge {...args} tone="danger">Fuera de rango</Badge>
    </div>
  ),
}

export const ConIcono: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      <Badge {...args} tone="info" icon={IconInfoCircle}>Info</Badge>
      <Badge {...args} tone="success" icon={IconCheck}>Tomada</Badge>
      <Badge {...args} tone="warning" icon={IconAlertTriangle}>Pendiente</Badge>
      <Badge {...args} tone="danger" icon={IconX}>Fuera de rango</Badge>
    </div>
  ),
}

export const Tamaños: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge {...args} size="sm">Pequeño (sm)</Badge>
      <Badge {...args} size="md">Mediano (md)</Badge>
    </div>
  ),
}
