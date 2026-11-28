import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent } from 'storybook/test'
import { active, expectFocusRingVisible } from '../stories/a11y/keyboard'
import { IconArrowRight, IconCheck, IconPlus, IconTrash } from '@tabler/icons-react'
import { Button } from './Button'

const meta = {
  title: 'Componentes/Button',
  parameters: {
    docs: { description: { component: 'Botón con forma de píldora (esquinas totalmente redondeadas, `rounded-full`).' } },
  },
  component: Button,
  args: { children: 'Añadir cita' },
  argTypes: {
    iconStart: {
      options: ['Ninguno', 'IconPlus', 'IconCheck', 'IconArrowRight', 'IconTrash'],
      mapping: { Ninguno: undefined, IconPlus, IconCheck, IconArrowRight, IconTrash },
      control: { type: 'select' },
    },
    iconEnd: {
      options: ['Ninguno', 'IconArrowRight', 'IconCheck'],
      mapping: { Ninguno: undefined, IconArrowRight, IconCheck },
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
  args: { iconStart: IconPlus },
}

export const IconoDetras: Story = {
  args: { iconEnd: IconArrowRight, variant: 'ghost', children: 'Ver todo' },
}

/**
 * Mientras se guarda: el icono de delante pasa a ser un indicador de carga, el botón no responde
 * a los clics y el lector de pantalla lo anuncia como ocupado. Sigue recibiendo el foco.
 */
export const Cargando: Story = {
  args: { isLoading: true, iconStart: IconCheck, children: 'Guardando cita' },
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

/** Botón de solo icono: lleva `aria-label`, que es lo que lee el lector de pantalla (docs/accesibilidad.md, regla 3). */
export const SoloIcono: Story = {
  args: { children: undefined, 'aria-label': 'Borrar nota', iconStart: IconTrash, variant: 'danger' },
}

export const AnchoCompleto: Story = {
  args: { fullWidth: true },
}

/**
 * Prueba de teclado (docs/accesibilidad.md, regla 2).
 * Tab recorre los botones en orden, se salta el desactivado y cada uno muestra el anillo doble.
 * Enter y Espacio activan el botón.
 */
export const Teclado: Story = {
  args: { onClick: fn() },
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      <Button {...args} variant="primary">Primary</Button>
      <Button {...args} variant="secondary">Secondary</Button>
      <Button {...args} variant="danger" disabled>Desactivado</Button>
      <Button {...args} variant="ghost">Ghost</Button>
    </div>
  ),
  play: async ({ args, canvasElement, step }) => {
    await step('Tab recorre los botones en orden y cada uno muestra el anillo de foco', async () => {
      for (const label of ['Primary', 'Secondary', 'Ghost']) {
        await userEvent.tab()
        await expect(active(canvasElement)).toHaveTextContent(label)
        await expectFocusRingVisible(active(canvasElement))
      }
    })
    await step('Enter y Espacio activan el botón con el foco', async () => {
      await userEvent.keyboard('{Enter}')
      await userEvent.keyboard(' ')
      await expect(args.onClick).toHaveBeenCalledTimes(2)
    })
  },
}
