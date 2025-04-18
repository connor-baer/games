import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import { browserslistToTargets } from 'lightningcss';
import browserslist from 'browserslist';
import AstroPWA from '@vite-pwa/astro';

// https://astro.build/config
export default defineConfig({
  site: 'https://games.connorbaer.com',
  integrations: [
    svelte(),
    AstroPWA({
      base: '/',
      scope: '/',
      workbox: {
        navigateFallback: '/',
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}'],
      },
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\/$/],
      },
    }),
  ],
  vite: {
    css: {
      transformer: 'lightningcss',
      lightningcss: {
        targets: browserslistToTargets(browserslist()),
      },
    },
  },
});
