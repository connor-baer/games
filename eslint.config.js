import { configs, defineConfig } from '@sumup-oss/foundry/eslint';

export default defineConfig([
  configs.ignores,
  {
    extends: [configs.typescript],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  configs.browser,
]);
