import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    // This allows the specific Railway URL
    allowedHosts: ['client-production-f9de.up.railway.app'],
    // Alternatively, to allow all hosts (less secure but works for debugging):
    // allowedHosts: true, 
    port: 4173,
    host: true // This exposes the project on the network
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})