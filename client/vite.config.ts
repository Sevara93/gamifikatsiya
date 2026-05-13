import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Упрощённый вариант вместо '0.0.0.0'
    port: Number(process.env.PORT) || 5173,
  },
  preview: {
    host: true,
    port: Number(process.env.PORT) || 4173,
    strictPort: false
  }
})