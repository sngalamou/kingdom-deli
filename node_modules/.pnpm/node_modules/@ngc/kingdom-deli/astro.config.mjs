import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sanity from '@astrojs/sanity';
import { ngcAstroBase } from '@ngc/config/astro';

// Kingdom Deli site config — extends @ngc/config's small-commerce-restaurant base.
// Shared options (image service, prefetch, build defaults) come from ngcAstroBase.
// Site-specific overrides go below.

// Sanity is loaded conditionally so V0 staging builds work before the Sanity
// project is provisioned. Once SANITY_PROJECT_ID is set, the integration enables
// itself automatically — no config change needed.
const integrations = [tailwind({ applyBaseStyles: false })];

if (process.env.SANITY_PROJECT_ID) {
  integrations.push(
    sanity({
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: process.env.SANITY_DATASET || 'production',
      useCdn: true,
      apiVersion: '2024-01-01',
    })
  );
}

export default defineConfig({
  ...ngcAstroBase({ variant: 'small-commerce-restaurant' }),

  // TODO: confirm domain ownership with Henry. Placeholder until then.
  site: 'https://kingdomdeli.com',

  integrations,
});
