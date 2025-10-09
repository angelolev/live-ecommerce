import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'Live E-commerce - Tu Tienda Online de Moda y Accesorios',
          description: 'Descubre las mejores ofertas en moda, accesorios, zapatos y más. Compra online con envío rápido y devoluciones gratis.',
        },
      },
    }),
  ],
})
