import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    allowedHosts: true
  },
  server: {
    port: 3000,
    allowedHosts: true,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})