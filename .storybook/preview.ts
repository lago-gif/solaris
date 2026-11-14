import type { Preview } from '@storybook/react-vite'
// Carga Tailwind y los estilos del proyecto en todas las historias.
import '../src/index.css'

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    options: {
      storySort: { order: ['Status', 'Componentes'] },
    },
  },
}

export default preview
