import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  preview: {
    // This allows any railway URL and the specific host you mentioned
    allowedHosts: [".up.railway.app", "client-production-f9de.up.railway.app"],
    host: true, // Crucial for Railway to route traffic to the container
    port: 4173  // Default Vite preview port
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
})