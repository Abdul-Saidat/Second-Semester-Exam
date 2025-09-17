// vite.config.ts
import { defineConfig } from 'vite'
import path from "path"
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     // Please make sure that '@tanstack/router-plugin' is passed before '@vitejs/plugin-react'
//     TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
//     react(),
//     tailwindcss()
//     // ...,
//   ],
// })

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
})