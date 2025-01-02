import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['apple-touch-icon.png', 'masked-icon.svg'],
      workbox: {
        // Enable background sync
        runtimeCaching: [{
          urlPattern: /^https:\/\/api\./,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'api-cache',
            backgroundSync: {
              name: 'api-queue',
              options: {
                maxRetentionTime: 24 * 60 // Retry for 24 hours
              }
            }
          }
        }],
        // Periodic sync for background updates
        periodicSync: {
          name: 'content-sync',
          options: {
            minInterval: 24 * 60 * 60 * 1000 // Once per day
          }
        }
      },
      manifest: {
        id: 'com.nelsongpt.app',
        name: 'NelsonGPT - Pediatric Knowledge Assistant',
        short_name: 'NelsonGPT',
        description: 'Evidence-based pediatric knowledge assistant powered by Nelson Textbook of Pediatrics',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        dir: 'ltr',
        scope: '/',
        start_url: '/',
        prefer_related_applications: false,
        categories: [
          'medical',
          'education',
          'healthcare',
          'reference'
        ],
        launch_handler: {
          client_mode: ['navigate-existing', 'auto']
        },
        screenshots: [
          {
            src: 'screenshot-1.png',
            sizes: '1170x2532',
            type: 'image/png',
            platform: 'narrow',
            label: 'Chat Interface'
          },
          {
            src: 'screenshot-2.png',
            sizes: '1170x2532',
            type: 'image/png',
            platform: 'narrow',
            label: 'Drug Calculator'
          }
        ],
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
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