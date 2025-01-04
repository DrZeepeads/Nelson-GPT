import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import { componentTagger } from "lovable-tagger";
import { pwaManifest, pwaWorkboxConfig } from './src/config/pwa.config';

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'android-chrome-192x192.png',
        'android-chrome-512x512.png',
        'android-chrome-maskable-192x192.png',
        'android-chrome-maskable-512x512.png',
        'apple-touch-icon.png',
        'favicon.ico'
      ],
      workbox: pwaWorkboxConfig,
      manifest: pwaManifest,
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8080
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
}));