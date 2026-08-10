import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Whenever your frontend makes a request starting with /api, 
      // Vite will forward it to your backend domain.
      '/api': {
        target: 'https://api.befinehealthcare.com',
        changeOrigin: true,
        secure: false, // Set to false if you encounter SSL certificate issues locally
      }
    }
  }
})
