import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Ensure assets resolve correctly on GitHub Pages
  base: '/NessalysGroupCap/',
  plugins: [react()],
})
