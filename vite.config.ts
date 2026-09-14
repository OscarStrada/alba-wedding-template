import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'motion'
            if (id.includes('gsap')) return 'gsap'
            if (id.includes('react-dom') || id.includes('/react/')) return 'vendor'
          }
        },
      },
    },
  },
})
