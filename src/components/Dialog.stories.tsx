import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'
import { IconShare, IconTrash } from '@tabler/icons-react'
import { active, expectFocusRingVisible } from '../stories/a11y/keyboard'
import { Button } from './Button'
import { Dialog } from './Dialog'
import { Textarea } from './Textarea'

const meta = {
  title: 'Componentes/Dialog',
  component: Dialog,
  parameters: {
    docs: {
      description: {
        component:
          'Ventana modal sobre el `<dialog>` nativo. Pulsa el botón de cada historia para abrirla: el foco entra en el diálogo, Esc lo cierra y el foco vuelve al botón.',
      },
    },
  },
  // Los args los pone cada historia: el diálogo se abre con su botón.
  args: { open: false, onClose: () => {}, title: '' },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

/** Confirmar antes de borrar datos de salud: la acción es danger y el título dice qué se borra. */
function ConfirmarBorrado() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <>
      <Button variant="danger" iconStart={IconTrash} onClick={() => setOpen(true)}>
        Borrar nota
      </Button>
      <Dialog
        open={open}
        onClose={close}
        title="¿Borrar la nota de la consulta?"
        description="Se borrará la nota del 12 de marzo. No se puede deshacer."
        footer={
          <>
            <Button variant="secondary" onClick={close}>Cancelar</Button>
            <Button variant="danger" iconStart={IconTrash} onClick={close}>Borrar nota</Button>
          </>
        }
      />
    </>
  )
}

/** Confirmar antes de compartir: dice con quién se comparte y qué. */
function ConfirmarCompartir() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <>
      <Button variant="secondary" iconStart={IconShare} onClick={() => setOpen(true)}>
        Compartir análisis
      </Button>
      <Dialog
        open={open}
        onClose={close}
        title="¿Compartir el análisis de sangre?"
        description="La Dra. Ruiz podrá ver los resultados del 3 de febrero."
        footer={
          <>
            <Button variant="secondary" onClick={close}>Cancelar</Button>
            <Button onClick={close}>Compartir</Button>
          </>
        }
      />
    </>
  )
}

/** Una tarea corta con un campo dentro. */
function ConContenido() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Añadir nota</Button>
      <Dialog
        open={open}
        onClose={close}
        title="Nota de la consulta"
        footer={
          <>
            <Button variant="secondary" onClick={close}>Cancelar</Button>
            <Button onClick={close}>Guardar nota</Button>
          </>
        }
      >
        <Textarea label="Qué te ha dicho el médico" hint="Solo tú puedes ver tus notas." />
      </Dialog>
    </>
  )
}

export const Borrar: Story = { render: () => <ConfirmarBorrado /> }

export const Compartir: Story = { render: () => <ConfirmarCompartir /> }

export const ConCampo: Story = { render: () => <ConContenido /> }

/**
 * Prueba de teclado (docs/accesibilidad.md, regla 2).
 * Enter abre el diálogo, el foco entra en él, Tab se queda dentro, Esc lo cierra y el foco vuelve al botón.
 */
export const Teclado: Story = {
  render: () => <ConfirmarBorrado />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: 'Borrar nota' })

    await step('Tab llega al botón y Enter abre el diálogo', async () => {
      await userEvent.tab()
      await expect(active(canvasElement)).toBe(trigger)
      await userEvent.keyboard('{Enter}')
      await expect(canvas.getByRole('dialog', { name: '¿Borrar la nota de la consulta?' })).toBeVisible()
    })
    await step('El foco entra en el diálogo, en el botón de cerrar, con anillo visible', async () => {
      await expect(active(canvasElement)).toHaveAccessibleName('Cerrar')
      await expectFocusRingVisible(active(canvasElement))
    })
    await step('Tab recorre los botones del diálogo en orden', async () => {
      for (const name of ['Cancelar', 'Borrar nota']) {
        await userEvent.tab()
        await expect(active(canvasElement)?.closest('dialog')).not.toBeNull()
        await expect(active(canvasElement)).toHaveAccessibleName(name)
        await expectFocusRingVisible(active(canvasElement))
      }
    })
    await step('Esc cierra el diálogo y el foco vuelve al botón que lo abrió', async () => {
      await userEvent.keyboard('{Escape}')
      await expect(canvasElement.querySelector('dialog')?.open).toBe(false)
      await expect(active(canvasElement)).toBe(trigger)
    })
  },
}

/** Abre el diálogo para revisar su accesibilidad con el panel Accessibility. */
export const Abierto: Story = {
  render: () => <ConfirmarBorrado />,
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Borrar nota' }))
  },
}
