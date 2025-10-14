import svelte from '@astrojs/svelte';
import AstroPWA from '@vite-pwa/astro';
import { defineConfig, envField } from 'astro/config';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';

// https://astro.build/config
export default defineConfig({
  site: 'https://games.connorbaer.com',
  env: {
    schema: {
      LANGUAGE: envField.string({
        context: 'client',
        access: 'public',
        default: 'en',
      }),
    },
  },
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
