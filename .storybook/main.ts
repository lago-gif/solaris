import { fileURLToPath } from 'node:url'
import type { StorybookConfig } from '@storybook/react-vite'
import { mergeConfig } from 'vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: '@storybook/react-vite',
  // Alias "@/" → src, el mismo que en vite.config.ts y tsconfig.app.json: las historias importan de '@/components'.
  viteFinal: (config) =>
    mergeConfig(config, {
      resolve: { alias: { '@': fileURLToPath(new URL('../src', import.meta.url)) } },
    }),
}

export default config
