import { defineConfig } from 'vite'
import daisyUi from 'daisyui';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    [daisyUi],
  ],
})