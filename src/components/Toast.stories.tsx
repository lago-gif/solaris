import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent } from 'storybook/test'
import { active, expectFocusRingVisible } from '../stories/a11y/keyboard'
import { Button, Toast } from '@/components'

const meta = {
  title: 'Componentes/Toast',
  parameters: {
    docs: {
      description: {
        component:
          'Aviso breve de que algo ha pasado. Siempre lleva icono y texto. No se cierra solo: si quieres que se pueda cerrar, pasa `onClose`.',
      },
    },
  },
  component: Toast,
  args: { variant: 'success', title: 'Nota guardada', children: 'La encontrarás en Consultas, 12 de marzo.' },
  decorators: [(Story) => <div className="max-w-md"><Story /></div>],
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

export const PorDefecto: Story = {}

export const Variantes: Story = {
  render: () => (
    <div className="flex flex-col gap-space-md">
      <Toast variant="neutral">Sincronizando tus datos.</Toast>
      <Toast variant="info" title="Recordatorio">Tu revisión de la vista es dentro de 2 semanas.</Toast>
      <Toast variant="success" title="Cita confirmada">Dentista, martes 18 a las 10:30.</Toast>
      <Toast variant="warning" title="Falta un dato">Añade tu alergia a la penicilina antes de la cita.</Toast>
      <Toast variant="danger" title="No se ha enviado">Revisa tu conexión y vuelve a intentarlo.</Toast>
    </div>
  ),
}

export const SinTitulo: Story = {
  args: { title: undefined, children: 'Análisis compartido con la Dra. Ruiz.' },
}

export const ConCerrar: Story = {
  args: { onClose: fn() },
}

/** Mostrar un aviso tras guardar: la región (role status) ya está en la pantalla antes de que llegue el aviso. */
function GuardarNota() {
  const [saved, setSaved] = useState(false)
  return (
    <div className="flex flex-col gap-space-md">
      <Button onClick={() => setSaved(true)}>Guardar nota</Button>
      <div>
        {saved && (
          <Toast variant="success" title="Nota guardada" onClose={() => setSaved(false)}>
            La encontrarás en Consultas.
          </Toast>
        )}
      </div>
    </div>
  )
}

export const AlGuardar: Story = { render: () => <GuardarNota /> }

/**
 * Prueba de teclado (docs/accesibilidad.md, regla 2).
 * El aviso no es interactivo: Tab llega a su botón de cerrar, con anillo de foco, y Enter lo cierra.
 */
export const Teclado: Story = {
  args: { onClose: fn() },
  play: async ({ args, canvasElement, step }) => {
    await step('Tab llega al botón de cerrar y muestra el anillo de foco', async () => {
      await userEvent.tab()
      await expect(active(canvasElement)).toHaveAccessibleName('Cerrar aviso')
      await expectFocusRingVisible(active(canvasElement))
    })
    await step('Enter cierra el aviso', async () => {
      await userEvent.keyboard('{Enter}')
      await expect(args.onClose).toHaveBeenCalledOnce()
    })
  },
}
