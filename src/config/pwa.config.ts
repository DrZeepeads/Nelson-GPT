import type { ManifestOptions } from 'vite-plugin-pwa'
import type { GenerateSWOptions } from 'workbox-build'

export const pwaManifest: Partial<ManifestOptions> = {
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
  categories: ['medical', 'education', 'healthcare', 'reference'],
  launch_handler: {
    client_mode: ['navigate-existing', 'auto']
  },
  display_override: ['standalone', 'window-controls-overlay'],
  handle_links: 'preferred',
  edge_side_panel: {
    preferred_width: 480
  },
  shortcuts: [
    {
      name: 'Chat',
      url: '/',
      description: 'Start a new chat session'
    },
    {
      name: 'Drug Calculator',
      url: '/drug-calculator',
      description: 'Calculate drug dosages'
    }
  ],
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

export const pwaWorkboxConfig: Partial<GenerateSWOptions> = {
  skipWaiting: true,
  clientsClaim: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\./,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 // 24 hours
        },
        backgroundSync: {
          name: 'api-queue',
          options: {
            maxRetentionTime: 24 * 60 // Retry for 24 hours
          }
        }
      }
    },
    {
      urlPattern: /\.(png|jpg|jpeg|svg|gif)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'image-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
        }
      }
    }
  ],
  navigationPreload: true,
  cleanupOutdatedCaches: true
}