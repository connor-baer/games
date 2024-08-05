import { defineConfig } from 'astro/config';
import db from '@astrojs/db';
import svelte from '@astrojs/svelte';
import vercel from '@astrojs/vercel/serverless';
import { browserslistToTargets } from 'lightningcss';
import browserslist from 'browserslist';

// https://astro.build/config
export default defineConfig({
  output: 'hybrid',
  adapter: vercel({
    imageService: true,
    functionPerRoute: false,
  }),
  security: {
    checkOrigin: true,
  },
  experimental: {
    contentCollectionCache: true,
  },
  site: 'https://wizard.madebyconnor.co',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [svelte(), db()],
  vite: {
    css: {
      transformer: 'lightningcss',
      lightningcss: {
        targets: browserslistToTargets(browserslist()),
      },
    },
  },
});
