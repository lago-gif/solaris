import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent } from 'storybook/test'
import { active, expectFocusRingVisible } from '../stories/a11y/keyboard'
import { Textarea } from './Textarea'

const meta = {
  title: 'Componentes/Textarea',
  component: Textarea,
  args: { label: 'Notas de la consulta', placeholder: '' },
  decorators: [(Story) => <div className="max-w-md"><Story /></div>],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const PorDefecto: Story = {}

export const ConAyuda: Story = {
  args: { label: '¿Cómo te encuentras hoy?', hint: 'Puedes incluir síntomas y desde cuándo los notas.' },
}

export const Obligatorio: Story = {
  args: { label: 'Motivo de la cita', required: true },
}

export const ConError: Story = {
  args: {
    label: 'Motivo de la cita',
    required: true,
    errorMessage: 'Escribe el motivo para que el médico pueda prepararla.',
  },
}

export const MasLineas: Story = {
  args: { label: 'Resumen de la revisión', rows: 8 },
}

export const Desactivado: Story = {
  args: { disabled: true, defaultValue: 'Nota de la consulta del 12 de marzo. No editable.' },
}

/**
 * Prueba de teclado (docs/accesibilidad.md, regla 2).
 * Tab recorre los campos en orden, se salta el desactivado y el campo con el foco muestra el anillo doble.
 * Enter hace un salto de línea, no envía nada.
 */
export const Teclado: Story = {
  render: () => (
    <div className="flex flex-col gap-space-lg">
      <Textarea label="Notas" />
      <Textarea label="Desactivado" disabled defaultValue="No editable" />
      <Textarea label="Motivo" errorMessage="Escribe el motivo" />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    await step('Tab llega al primer campo y muestra el anillo de foco', async () => {
      await userEvent.tab()
      await expect(active(canvasElement)).toHaveAccessibleName('Notas')
      await expectFocusRingVisible(active(canvasElement))
    })
    await step('Enter hace un salto de línea dentro del campo', async () => {
      await userEvent.keyboard('Me duele{Enter}la cabeza')
      await expect(active(canvasElement)).toHaveValue('Me duele\nla cabeza')
    })
    await step('Tab se salta el desactivado y llega al campo con error, también con anillo', async () => {
      await userEvent.tab()
      await expect(active(canvasElement)).toHaveAccessibleName('Motivo')
      await expectFocusRingVisible(active(canvasElement))
    })
  },
}
