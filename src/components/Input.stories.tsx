import type { Meta, StoryObj } from '@storybook/react-vite'
import { IconMail, IconSearch } from '@tabler/icons-react'
import { Input } from './Input'

const meta = {
  title: 'Componentes/Input',
  component: Input,
  args: { label: 'Nombre', placeholder: 'Tu nombre' },
  argTypes: {
    icon: {
      options: ['Ninguno', 'IconSearch', 'IconMail'],
      mapping: { Ninguno: undefined, IconSearch, IconMail },
      control: { type: 'select' },
    },
  },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const PorDefecto: Story = {}

export const ConAyuda: Story = {
  args: { label: 'Número de tarjeta sanitaria', placeholder: '', hint: 'Como aparece en tu tarjeta' },
}

export const ConIcono: Story = {
  args: { label: 'Buscar medicamento', placeholder: 'Ibuprofeno', icon: IconSearch },
}

export const Obligatorio: Story = {
  args: { required: true },
}

export const ConError: Story = {
  args: {
    label: 'Correo',
    placeholder: '',
    icon: IconMail,
    defaultValue: 'lago@',
    error: 'Escribe un correo válido, por ejemplo nombre@correo.com',
  },
}

export const Desactivado: Story = {
  args: { disabled: true, defaultValue: 'No editable' },
}
