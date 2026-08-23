import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ir-design/',  // <-- isso diz que vai ficar em /ir-design/
  plugins: [react()],
})