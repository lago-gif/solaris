import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { active, expectFocusRingVisible } from '../stories/a11y/keyboard'
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

/**
 * Prueba de teclado (docs/accesibilidad.md, regla 2).
 * Tab recorre los campos en orden, se salta el desactivado, y la caja del campo con el foco
 * muestra el anillo doble, también con error.
 */
export const Teclado: Story = {
  render: () => (
    <div className="flex flex-col gap-space-lg">
      <Input label="Nombre" />
      <Input label="Desactivado" disabled defaultValue="No editable" />
      <Input label="Correo" defaultValue="lago@" error="Escribe un correo válido" />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step('Tab llega al primer campo y su caja muestra el anillo de foco', async () => {
      await userEvent.tab()
      await expect(active(canvasElement)).toHaveAccessibleName('Nombre')
      await expectFocusRingVisible(active(canvasElement), 'parent')
    })
    await step('Tab se salta el campo desactivado y llega al campo con error, también con anillo', async () => {
      await userEvent.tab()
      await expect(active(canvasElement)).toHaveAccessibleName('Correo')
      await expectFocusRingVisible(active(canvasElement), 'parent')
    })
    await step('Se puede escribir en el campo con el foco', async () => {
      // Al entrar con Tab, el navegador selecciona el texto: Fin lleva el cursor al final antes de escribir.
      await userEvent.keyboard('{End}x')
      await expect(active(canvasElement)).toHaveValue('lago@x')
    })
  },
}
