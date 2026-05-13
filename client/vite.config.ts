import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    allowedHosts: process.env.RAILWAY_PUBLIC_DOMAIN
      ? [process.env.RAILWAY_PUBLIC_DOMAIN]
      : undefined,
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})