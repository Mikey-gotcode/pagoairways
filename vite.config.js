import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
   server: {
    host: true, // Allow access from external networks
    port: 5173, // Ensure this matches your dev server port
    allowedHosts: [
      "localhost",
      "https://140420078a6f.ngrok-free.app/api",//backend api cor cors
      "plus-west-hot-tournament.trycloudflare.com "
    ],
    cors: true, // Enable CORS for external access
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
