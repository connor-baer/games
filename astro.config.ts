import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import { browserslistToTargets } from 'lightningcss';
import browserslist from 'browserslist';
import vercel from '@astrojs/vercel/serverless';

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
  integrations: [svelte()],
  vite: {
    css: {
      transformer: 'lightningcss',
      lightningcss: {
        targets: browserslistToTargets(browserslist()),
      },
    },
  },
});
