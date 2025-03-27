import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()],
    base: process.env.VITE_BASE_PATH ||"/spotify-cbg",
    server: {
      host: '0.0.0.0', // Allows access from other devices on your network
      port: 3000, // You can change this to another port if needed
    }
})
