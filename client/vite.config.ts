import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    allowedHosts: [".railway.app"]
  },
  server: {
    port: 3000,
    allowedHosts: [".railway.app"],
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})