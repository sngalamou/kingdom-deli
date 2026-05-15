# Kingdom Deli Folder Map

## Layout

```
kingdom-deli/
    ├── .env.example
    ├── .gitignore
    ├── DEPLOY.md                         # Cloudflare Pages deploy guide
    ├── README.md
    ├── astro.config.mjs                  # extends @ngc/config, conditional Sanity
    ├── package.json                      # @ngc/kingdom-deli, ngcVariant: restaurant
    ├── tailwind.config.cjs               # extends @ngc/config, deli palette
    │
    ├── docs/
    │   ├── architecture.md               # stack diagram, Square anchor rationale
    │   ├── brand-guide.md                # voice, do/don't, palette, type
    │   ├── client-brief.md               # frozen intake notes
    │   ├── content-plan.md               # sitemap, page-by-page copy plan
    │   └── decisions/
    │       ├── 0001-square-as-anchor.md
    │       ├── 0002-bakery-interface-deferred.md
    │       ├── 0003-no-pork-as-product-badge.md
    │       └── 0004-square-payments-variant.md
    │
    ├── public/
    │   ├── favicon.svg                   # meat-red K monogram on cream
    │   ├── robots.txt                    # disallow indexing for V0
    │   └── images/
    │       ├── logo/
    │       |   ├── logo.png            ← primary logo, transparent bg
    │       |   ├── logo-white.png      ← white version for dark backgrounds
    │       |   └── og-image.jpg        ← 1200×630 social preview
    │       ├── hero/
    │       |   ├── home-hero.jpg       ← Reuben/pastrami hero
    │       |   └── bakery-hero.jpg     ← bakery counter hero
    │       ├── menu/
    │       |   ├── corned-beef.jpg
    │       |   ├── pastrami.jpg
    │       |   ├── chicago-dog.jpg
    │       |   ├── polish.jpg
    │       |   ├── jerk-chicken.jpg
    │       |   ├── butter-cookie.jpg
    │       |   └── cheesecake.jpg
    │       ├── about/
    │       |   ├── henry-portrait.jpg
    │       |   └── inside-deli.jpg
    │       ├── findus/
    │       |   ├── storefront.jpg
    │       |   ├── cinemark-entrance.jpg
    │       |   └── wayfinding-map.svg
    ├── sanity/
    │   └── schemas/                      # extends @ngc/sanity-schemas
    │       ├── location.ts               # adds parentVenue, entranceNote
    │       ├── menuCategory.ts           # adds displayOrder
    │       └── menuItem.ts               # adds noPork, squareSku, featured
    │
    ├── square/
    │   ├── catalog-import.csv            # bulk upload template
    │   ├── modifier-sets.md              # toppings, builds, sides, soda
    │   └── setup-checklist.md            # 10-section account provisioning
    │
    └── src/
        ├── components/                   # client-specific only
        │   ├── NoPorkBadge.astro         # butcher's-stamp chip
        │   └── WayfindingCard.astro      # Cinemark entrance graphic
        │
        ├── content/                      # source of truth — all copy and data
        │   ├── location.json             # mall address, hours, parking, contact
        │   ├── site.json                 # taglines, voice, CTAs, opening date
        │   └── menu/
        │       ├── bakery.json           # 5 items inc. butter cookies
        │       ├── deli.json             # 4 items (corned beef, pastrami)
        │       ├── dogs.json             # 4 items (Vienna Beef line)
        │       ├── drinks.json           # 3 items
        │       ├── plates.json           # 4 items (jerk, tacos)
        │       └── sides.json            # 4 items (fries, slaw, pickle)
        │
        ├── lib/
        │   └── menu.ts                   # JSON loader, swappable for Sanity
        │
        ├── pages/
        │   ├── about.astro               # Henry's story placeholder + no-pork
        │   ├── bakery.astro              # lunchroom cookie story, Square shop
        │   ├── contact.astro             # direct contact + form
        │   ├── find-us.astro             # reads location.json
        │   ├── index.astro               # reads site.json, featured items
        │   ├── menu.astro                # renders 24 items, 6 categories
        │   └── order.astro               # Cinemark lede, Square order embed
        │
        └── styles/
            ├── globals.css               # reset, prose defaults, focus ring
            └── tokens.css                # deli palette in @layer ngc-client
```
