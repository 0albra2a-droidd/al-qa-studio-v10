import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Al-Qa Studio V10.1.0',
        short_name: 'القح ستوديو',
        description: 'استوديو تصميم الإعلانات الاحترافية',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        lang: 'ar',
        dir: 'rtl',
        icons: [
          { src: '/vite.svg', sizes: '192x192', type: 'image/svg+xml' },
          { src: '/vite.svg', sizes: '512x512', type: 'image/svg+xml' }
        ]
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react', '@imgly/background-removal'],
  },
  build: {
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['colorthief', 'html-to-image'],
        }
      }
    }
  }
});
