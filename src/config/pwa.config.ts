import { icons } from './pwa/icons.config';
import { relatedApplications } from './pwa/apps.config';
import { workboxConfig } from './pwa/workbox.config';

export const pwaManifest = {
  name: 'Nelson-GPT',
  short_name: 'Nelson-GPT',
  description: 'Your AI-powered pediatric assistant',
  theme_color: '#003B4D',
  background_color: '#003B4D',
  display: 'standalone',
  orientation: 'portrait',
  scope: '/',
  start_url: '/',
  iarc_rating_id: 'e84b072d-71b3-4d3e-86ae-31a8ce4e53b7',
  id: 'com.nelsongpt.app',
  categories: ['medical', 'education', 'healthcare'],
  screenshots: [],
  related_applications: relatedApplications,
  prefer_related_applications: false,
  icons,
};

export const pwaWorkboxConfig = workboxConfig;