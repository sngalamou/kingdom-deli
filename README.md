# NGC Monorepo

Ngalamou Consultancy productized client delivery. Per-client Astro workspaces share a tested set of components, schemas, configs, and integrations.

## Layout

```
ngc-monorepo/
├── apps/
│   └── clients/
│       └── kingdom-deli/        First restaurant-variant client
└── packages/
    ├── ui/                      Shared Astro layouts + components
    ├── config/                  Shared Astro / Tailwind / Sanity config
    ├── sanity-schemas/          Reusable Sanity schema bases
    └── square/                  Square embed wrappers + helpers
```

## Variants

Each client workspace declares an `ngcVariant` in its `package.json`. The variant determines which shared modules are wired in by default.

| Variant | Default payments | Default integrations |
|---|---|---|
| `lead-gen` | None | Form endpoint, CRM webhook |
| `content-brand` | Stripe (subscriptions optional) | Sanity, mailing list |
| `small-commerce` | Stripe / Shopify | Sanity, Stripe Checkout |
| `small-commerce-restaurant` | Square | Sanity, Square Online + POS |

The restaurant variant was introduced for Kingdom Deli — see `apps/clients/kingdom-deli/docs/decisions/0004-square-payments-variant.md`.

## Local Development

```bash
pnpm install
pnpm dev                                  # runs every workspace's dev script in parallel
pnpm --filter @ngc/kingdom-deli dev       # run one workspace
pnpm build                                # build everything
```

## Adding a Client

1. `cp -r apps/clients/_template apps/clients/<client>` (template TBD — currently `kingdom-deli` is the reference)
2. Edit the new `package.json`: name, description, `ngcVariant`
3. Customize `src/styles/tokens.css` for brand palette
4. Define Sanity schemas in `sanity/schemas/` extending the shared bases
5. Provision Sanity project, Square account (if restaurant variant), domain
6. Replace placeholder assets in `public/images/`

## Deploy

Per-workspace deploy configs (Cloudflare Pages, Vercel, Netlify) live in each client's directory.
