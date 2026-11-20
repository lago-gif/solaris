import type { Preview } from '@storybook/react-vite'
// Tipografía de la marca (font-family.sans en tokens/tokens.json), servida desde el propio proyecto.
import '@fontsource/atkinson-hyperlegible-next/400.css'
import '@fontsource/atkinson-hyperlegible-next/500.css'
import '@fontsource/atkinson-hyperlegible-next/600.css'
import '@fontsource/atkinson-hyperlegible-next/700.css'
// Carga Tailwind y los estilos del proyecto en todas las historias.
import '../src/index.css'
// Páginas de documentación más anchas, para las tablas de tokens.
import '../src/stories/docs.css'

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    // Complemento de accesibilidad: revisa cada historia con axe y enseña sus fallos en el panel "Accessibility".
    // "error" marca la historia como fallida si hay algún problema (docs/accesibilidad.md).
    a11y: { test: 'error' },
    controls: { expanded: true },
    options: {
      storySort: { order: ['Cómo funciona', 'Status', 'Fundamentos', ['Primitivos', 'Semánticos'], 'Componentes'] },
    },
  },
}

export default preview
