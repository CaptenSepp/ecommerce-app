import { defineConfig } from 'vite' // base Vite config helper
import { fileURLToPath, URL } from 'node:url' // path helpers for aliases
import react from '@vitejs/plugin-react' // react plugin for Vite
import tailwindcss from '@tailwindcss/vite'; // tailwind plugin for Vite

export default defineConfig({
  plugins: [react(), tailwindcss()], // app plugins
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // src alias
    },
  },
})
