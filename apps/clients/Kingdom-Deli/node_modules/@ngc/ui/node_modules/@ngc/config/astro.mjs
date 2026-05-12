// @ngc/config/astro
//
// Variant-aware Astro base. Each client's astro.config.mjs spreads this:
//
//   import { ngcAstroBase } from '@ngc/config/astro';
//   export default defineConfig({
//     ...ngcAstroBase({ variant: 'small-commerce-restaurant' }),
//     site: 'https://kingdomdeli.com',
//   });
//
// The variant decides which integrations and output mode are wired by default.
// Client configs add Tailwind and Sanity themselves so they can pass project-specific options.

const VARIANT_DEFAULTS = {
  'lead-gen': {
    output: 'static',
    prefetch: { defaultStrategy: 'viewport' },
  },
  'content-brand': {
    output: 'static',
    prefetch: { defaultStrategy: 'viewport' },
  },
  'small-commerce': {
    output: 'static',
    prefetch: { defaultStrategy: 'viewport' },
  },
  'small-commerce-restaurant': {
    output: 'static',
    prefetch: { defaultStrategy: 'viewport' },
  },
};

/**
 * Returns Astro config defaults for the requested variant.
 * @param {{ variant: keyof typeof VARIANT_DEFAULTS }} options
 */
export function ngcAstroBase({ variant } = { variant: 'lead-gen' }) {
  const defaults = VARIANT_DEFAULTS[variant];
  if (!defaults) {
    throw new Error(
      `[@ngc/config] Unknown variant "${variant}". ` +
        `Expected one of: ${Object.keys(VARIANT_DEFAULTS).join(', ')}`
    );
  }
  return {
    ...defaults,
    image: {
      service: { entrypoint: 'astro/assets/services/sharp' },
    },
    build: {
      inlineStylesheets: 'auto',
    },
    vite: {
      ssr: {
        noExternal: ['@ngc/ui', '@ngc/square'],
      },
    },
  };
}
