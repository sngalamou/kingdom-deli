'''text
kingdom-deli/
├── README.md                       # Brief, decisions log, deploy notes
├── .env.example                    # Square API keys, analytics IDs (template only)
├── .gitignore
│
├── docs/
│   ├── client-brief.md             # Henry's frozen intake answers
│   ├── architecture.md             # Stack diagram + Square anchor rationale
│   ├── content-plan.md             # Sitemap + page-by-page copy plan
│   ├── brand-guide.md              # Voice, taglines, do/don't (placeholders until assets land)
│   ├── timeline.md                 # 5/9 → 7/11 milestones
│   └── decisions/                  # ADR log
│       ├── 0001-square-as-anchor.md
│       ├── 0002-bakery-interface-deferred.md
│       └── 0003-no-pork-as-product-badge.md
│
├── public/
│   ├── images/
│   │   ├── logo/                   # PLACEHOLDER until Henry's assets land
│   │   ├── hero/                   # PLACEHOLDER
│   │   ├── menu/                   # PLACEHOLDER per item
│   │   └── wayfinding/             # Cinemark-entrance route graphic
│   ├── fonts/
│   └── favicon.ico
│
├── src/
│   ├── pages/
│   │   ├── index.astro             # Home
│   │   ├── menu.astro
│   │   ├── order.astro             # Square Online embed (hot food pickup)
│   │   ├── bakery.astro            # Square shop view (cakes/cheesecakes/cookies)
│   │   ├── about.astro             # Maxwell St heritage + wholistic angle
│   │   ├── find-us.astro           # Mall map + Cinemark entrance + hours
│   │   └── contact.astro
│   │
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── HoursBlock.astro
│   │   ├── MenuItem.astro
│   │   ├── NoPorkBadge.astro       # Renders only when item.no_pork === true
│   │   ├── SquareOrderEmbed.astro
│   │   ├── SquareShopEmbed.astro
│   │   └── WayfindingCard.astro
│   │
│   ├── content/                    # Source of truth for all menu/site data
│   │   ├── menu/
│   │   │   ├── deli.json           # Corned Beef, Pastrami
│   │   │   ├── dogs.json           # Vienna hot dogs, Polish (no_pork: true)
│   │   │   ├── plates.json         # Tacos, Jerk Chicken
│   │   │   ├── sides.json          # Fries
│   │   │   ├── drinks.json         # Soda
│   │   │   └── bakery.json         # Specialty Cakes, Cheesecakes, Butter Cookies
│   │   ├── location.json           # Mall address, hours, phone, entrance note
│   │   └── site.json               # Tagline, social, brand voice tokens
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   └── tokens.css              # Old-school deli palette + type tokens
│   │
│   └── lib/
│       └── square.ts               # Square helpers if we go beyond embeds
│
├── square/                         # Setup artifacts, NOT deployed
│   ├── catalog-import.csv          # Bulk menu upload for Square Online
│   ├── modifier-sets.md            # Toppings, sizes, etc.
│   └── setup-checklist.md          # Account, processor, locations, taxes
│
└── tests/
    └── smoke/                      # Page-loads + link-check pre-launch
    
'''