import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// La app se sirve siempre en http://localhost:3000.
// strictPort: si el puerto 3000 está ocupado, Vite se detiene con un aviso
// en lugar de cambiar a otro puerto.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
})
