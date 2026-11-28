/// <reference types="vitest/config" />
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// La app se sirve siempre en http://localhost:3000.
// strictPort: si el puerto 3000 está ocupado, Vite se detiene con un aviso
// en lugar de cambiar a otro puerto.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Alias: "@/" es la carpeta src. Así se importa siempre igual: import { Button } from '@/components'.
  // Si cambias el alias, cámbialo también en tsconfig.app.json y en .storybook/main.ts.
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
  // Tests de lógica (npm test): un archivo *.test.tsx junto a cada componente, en un navegador simulado (jsdom).
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    setupFiles: ['./src/test/setup.ts'],
  },
})
