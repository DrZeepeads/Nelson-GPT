import { pwaIcons } from './pwa/icons.config';
import { pwaWorkboxConfig } from './pwa/workbox.config';
import { pwaRelatedApps } from './pwa/apps.config';
import type { ManifestOptions } from 'vite-plugin-pwa';

export const pwaManifest: Partial<ManifestOptions> = {
  name: 'NelsonGPT',
  short_name: 'NelsonGPT',
  description: 'Evidence-based pediatric knowledge assistant powered by Nelson Textbook of Pediatrics',
  theme_color: '#ffffff',
  background_color: '#ffffff',
  display: 'standalone' as const,
  scope: '/',
  start_url: '/',
  orientation: 'portrait-primary' as const,
  icons: pwaIcons,
  related_applications: pwaRelatedApps,
  prefer_related_applications: false
};

export { pwaWorkboxConfig };