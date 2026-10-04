import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Relative base so the build can be served from any path (GitHub Pages project site, root, etc.)
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
  },
})
