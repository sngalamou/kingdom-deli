# Kingdom Deli

Marketing site + Square commerce integration for Kingdom Deli, a Chicago-style deli + bakery in the Louis Joliet Mall food court.

**Status:** Build in progress (rough draft phase, May 2026)
**Grand opening:** July 11, 2026
**NGC variant:** `small-commerce-restaurant` (see [ADR 0004](./docs/decisions/0004-square-payments-variant.md))

---

## Stack

- **Framework:** Astro
- **CMS:** Sanity (headless)
- **Payments / commerce:** Square — POS, Online ordering, ecommerce
- **Hosting:** Cloudflare Pages
- **Styling:** Tailwind, with Kingdom-Deli token overrides in `src/styles/tokens.css`
- **Repo model:** Workspace inside the NGC Turborepo monorepo

## Local development

```bash
# from the monorepo root
pnpm install
pnpm --filter @ngc/kingdom-deli dev
```

Visit http://localhost:4321.

## Project layout

- `src/pages/` — page-level routes
- `src/components/` — Kingdom-Deli-only components (`NoPorkBadge`, `WayfindingCard`)
- `src/styles/tokens.css` — design tokens (color, type, spacing)
- `sanity/schemas/` — Sanity schema extensions for menu, category, and location
- `square/` — Square setup artifacts (catalog import, modifier sets, setup checklist) — not deployed
- `docs/` — client brief, decisions log, content plan
- `docs/decisions/` — architecture decision records (ADRs)

Most components on this site come from `@ngc/ui` (shared). Only the Kingdom-Deli-specific surfaces — the no-pork badge and the Cinemark-entrance wayfinding card — are local.

## Decisions

See `docs/decisions/` for ADRs. Highlights:

- [0004 — Restaurant variant of Small Commerce System](./docs/decisions/0004-square-payments-variant.md) (cross-cutting; promote to repo root on accept)
- [0001 — Square as stack anchor](./docs/decisions/0001-square-as-anchor.md)
- [0002 — Bakery interface deferred](./docs/decisions/0002-bakery-interface-deferred.md)
- [0003 — No-pork-on-my-fork as product badge](./docs/decisions/0003-no-pork-as-product-badge.md)

## Open items

See "Open Questions / Pending Confirmations" in [client-brief.md](./docs/client-brief.md).
