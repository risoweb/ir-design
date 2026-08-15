import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Permite qualquer host externo (como o ngrok)
    allowedHosts: 
    [
      'thong-cautious-untwist.ngrok-free.dev' // Domínio do seu ngrok sem o https://
    ]
  }
})
