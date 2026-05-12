// @ngc/config/tailwind — base Tailwind config every client extends.
//
// Conventions:
// - Color names use *brand tokens* (cream, mustard, etc.) at the client level;
//   the base sets *semantic slots* (bg, surface, text, accent) via CSS vars
//   so shared @ngc/ui components stay client-agnostic.
// - Clients spread theme.extend.colors with their own brand palette and map
//   the semantic slots in their tokens.css.

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Each client overrides this; their config narrows to their src tree.
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Semantic slots — driven by CSS variables, mapped per client.
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        accent: 'var(--color-accent)',
        'accent-alt': 'var(--color-accent-alt)',
        rule: 'var(--color-rule)',
      },
      fontFamily: {
        // Each client overrides via theme.extend.fontFamily in their own config.
        // Defaults are intentionally generic to avoid collisions.
        display: ['Georgia', 'serif'],
        body: ['Georgia', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--color-text)',
            a: { color: 'var(--color-accent)' },
            strong: { color: 'var(--color-text)' },
            h1: { color: 'var(--color-text)', fontFamily: 'var(--font-display)' },
            h2: { color: 'var(--color-text)', fontFamily: 'var(--font-display)' },
            h3: { color: 'var(--color-text)', fontFamily: 'var(--font-display)' },
          },
        },
      },
    },
  },
  plugins: [],
};
