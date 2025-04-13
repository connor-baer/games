import { defineConfig } from 'astro/config';
import db from '@astrojs/db';
import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel/serverless';
import { browserslistToTargets } from 'lightningcss';
import browserslist from 'browserslist';
import AstroPWA from '@vite-pwa/astro';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    imageService: true,
  }),
  experimental: {
    svg: true,
  },
  security: {
    checkOrigin: true,
  },
  site: 'https://games.connorbaer.com',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [
    svelte(),
    db(),
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
