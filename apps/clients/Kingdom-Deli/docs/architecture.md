# Kingdom Deli — Architecture

## What's running where

```
┌─────────────────────┐    ┌──────────────────────┐    ┌─────────────────┐
│  kingdomdeli.com    │    │  square.kingdomdeli  │    │  Square POS     │
│  (Astro static)     │    │  (Square Online)     │    │  (counter iPad) │
│                     │    │                      │    │                 │
│  Marketing, menu,   │    │  Order pickup,       │    │  In-person sale │
│  hours, about,      ├───►│  bakery shop,        │◄───┤  Card + cash    │
│  contact            │    │  payment intake      │    │                 │
└──────────┬──────────┘    └──────────┬───────────┘    └────────┬────────┘
           │                          │                          │
           │ Sanity                   │ Square Catalog           │
           │ (CMS, future)            │ (single source of truth) │
           ▼                          ▼                          │
┌─────────────────────┐    ┌──────────────────────┐              │
│  Sanity Studio      │    │  Square Dashboard    │              │
│  Menu copy, prices, │    │  Items, modifiers,   │◄─────────────┘
│  photos, about      │    │  prices, inventory   │
└─────────────────────┘    └──────────────────────┘
```

## The Square anchor

Square is the **system of record for transactions** — every dollar that hits Kingdom Deli, from online pickup to in-person counter, lands in the same Square account. That's the anchor decision (see `docs/decisions/0001-square-as-anchor.md`).

What that gets you:

- **One catalog.** Items, prices, and modifiers live in Square. The website's order page is an embed of Square Online — it can never disagree with the POS, because it *is* the POS view of the same catalog.
- **One payout.** All sales (online + in-store) settle to the same bank account on the same schedule.
- **One end-of-day.** Z-report covers everything sold that day, regardless of channel.
- **Lower fees than Toast.** Square Online's free tier covers pickup ordering; transaction fees are competitive; no SaaS subscription.

The trade-off is feature ceiling — Square doesn't do back-of-house bakery production planning the way Square for Restaurants Plus or a specialized bakery system would. That's deferred (see `0002-bakery-interface-deferred.md`).

## The website's job

The Astro site exists to do four things Square Online does poorly:

1. **Tell the story.** Henry's voice, the no-pork commitment, the lunchroom-cookie heritage — Square Online's templates can't hold that.
2. **Tell people where to come.** Mall food courts are confusing. The "Fastest way in: Cinemark entrance" guidance is the single most useful thing on the site.
3. **Render fast.** Static HTML on Cloudflare's edge. Pages should hit FCP under 1s on a phone in the mall parking lot.
4. **Hand off cleanly.** "Order pickup" goes straight to the Square embed and stays in flow. We never try to recreate cart/checkout.

## What the site is NOT

- Not a payment system. Square is.
- Not a reservation system. The deli is walk-up / pickup-only at V1.
- Not a delivery aggregator. Future work; defer until Henry decides whether to add DoorDash/Uber Eats and on what economics.
- Not a loyalty program. Square Loyalty is the path when Henry wants it.

## Stack

| Layer | Tool | Why |
|---|---|---|
| Hosting | Cloudflare Pages | Free, fast edge, generous build minutes |
| Framework | Astro | Static-first, minimal JS, fast build |
| Styling | Tailwind + CSS custom properties | Brand tokens swap per client |
| CMS | Sanity (deferred) | Real-time, structured, free tier covers small shops |
| Commerce | Square Online + Square for Restaurants | Single source of truth for catalog and payments |
| Forms | TBD (Formspree / Web3Forms / CF Function) | Pick when Henry chooses a contact channel |
| Analytics | TBD | Add Plausible or CF Web Analytics after launch |

## Build & deploy

See `DEPLOY.md` in this folder.

## When things change

- **Henry wants to add a menu item:** Square Dashboard → Items → Add. Then update `src/content/menu/<category>.json` so the website shows it too. (Future: Sanity replaces the JSON step.)
- **Henry wants to change hours:** Edit `src/content/location.json`. Also update Square Online's hours (separate setting).
- **Henry wants to add a page:** New file in `src/pages/`. Add a link to the header nav in `packages/ui/src/components/Header.astro`.
