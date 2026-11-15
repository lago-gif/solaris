import type { Preview } from '@storybook/react-vite'
// Tipografía de la marca (font-family.sans en tokens/tokens.json), servida desde el propio proyecto.
import '@fontsource/atkinson-hyperlegible-next/400.css'
import '@fontsource/atkinson-hyperlegible-next/500.css'
import '@fontsource/atkinson-hyperlegible-next/600.css'
import '@fontsource/atkinson-hyperlegible-next/700.css'
// Carga Tailwind y los estilos del proyecto en todas las historias.
import '../src/index.css'

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    controls: { expanded: true },
    options: {
      storySort: { order: ['Status', 'Fundamentos', 'Componentes'] },
    },
  },
}

export default preview
