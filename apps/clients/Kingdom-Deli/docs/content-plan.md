# Kingdom Deli — Content Plan

## Sitemap

```
/                  Home          Hero + hours + wayfinding teaser
/menu              Menu          All items, grouped by category
/order             Order         Square Online pickup embed
/bakery            Bakery        Bakery story + Square shop embed
/about             About         Henry's story + no-pork explainer
/find-us           Find us       Address, parking, mall entrance, map
/contact           Contact       Direct contact + message form
```

Seven pages, no deeper hierarchy. A V1 deli doesn't need more.

## Page-by-page

### Home — `/`

**Goal:** Land, signal what this is, push to either menu or order.

**Locked copy:**
- Hero headline: "Wholistic, good food."
- Hero subhead: "An old-school Chicago deli and bakery counter, set up in the Louis Joliet Mall food court."
- Brand blurb: "Small on purpose. One counter, a short menu of things we believe in..."
- Closing CTA: "Two ways in. Order ahead for pickup, or come find us at the counter."

**Locked structure:**
- Hero with primary CTA (Order pickup) and secondary CTA (See the menu)
- Hours block
- Wayfinding teaser pointing to /find-us

**Gated on Henry:**
- Hero photo (replaces empty cream space — counter shot, sandwich shot, or sign shot)
- Tagline confirmation — "Wholistic, good food" is what he said in intake, confirm before going live

### Menu — `/menu`

**Goal:** Show every item, mark the no-pork ones, set expectation on the bakery 48hr lead time.

**Locked copy:**
- Intro: "Short menu, made fresh..."
- Legend: "No pork on my fork — small stamp marks items on our all-beef line..."
- Footer: "Menu and prices subject to change. Allergies or dietary questions? Ask at the counter..."

**Gated on Henry:**
- Final menu item list (current JSON is a strong first cut, needs Henry sign-off)
- Final prices (current prices are mall-food-court realistic estimates)
- Confirmation: Polish = Vienna Beef all-beef? (gates ADR 0003)
- Photo per item (optional V1 — placeholders are functional)

### Order — `/order`

**Goal:** Hand off cleanly to Square Online pickup flow.

**Locked copy:**
- Cinemark entrance lede
- "How pickup works" footer (3-step explainer)

**Gated on Henry:**
- Square account provisioned (`PUBLIC_SQUARE_SITE_URL` env var)

### Bakery — `/bakery`

**Goal:** Tell the lunchroom-cookie story, push to Square shop for orders.

**Locked copy:**
- Chicago Public Schools cafeteria nostalgia framing (Wednesday lunch, pink frosted, paper liner, steel pan)
- 48-hour notice for whole cakes/cheesecakes

**Gated on Henry:**
- Sign-off on the cafeteria-nostalgia framing — if it doesn't ring true to him, swap to generic vintage-bakery angle
- Square shop URL

### About — `/about`

**Goal:** Henry's voice. Why this place exists.

**Locked copy:**
- No-pork explainer (faith / health / how-people-were-raised framing)

**Gated on Henry:**
- 2–3 paragraphs in his words covering:
  1. Why he started Kingdom Deli — one specific reason
  2. A Maxwell Street memory that connects to what he's doing now
  3. What "wholistic, good food" means in plain words
  4. What "Kingdom" means in the name

### Find us — `/find-us`

**Goal:** Get someone from a phone in the parking lot to the counter.

**Locked copy:**
- Address (mall)
- Parking note (4,600 spaces, park near Cinemark)
- Cinemark entrance wayfinding
- Hours block
- Google Maps embed

**Gated on Henry:**
- Nothing — this page is fully ready to ship.

### Contact — `/contact`

**Goal:** Give people a way to reach Henry without him giving up his personal cell.

**Locked structure:**
- Direct contact section (phone, email)
- Message form

**Gated on Henry:**
- Phone number — direct line, business line, or "stop by the counter"?
- Email — direct address, routed inbox, or none?
- Form endpoint — Formspree / Web3Forms / Cloudflare Function

## Things that go in `src/content/`

The content directory holds the single source of truth for everything text and price related, separate from the page components that render it:

- `menu/*.json` — 6 files, one per category
- `location.json` — address, hours, contact, mall details
- `site.json` — taglines, voice, social, opening date, CTA copy

When Sanity is provisioned, these JSON files become the Sanity studio's default content. Page components consume the same shape either way.

## Tone checks

When writing or editing copy, ask:

- Would Henry actually say this at the counter?
- Are we making a site-wide claim that should be product-specific? (Especially "no pork.")
- Is there a corporate word doing the work of a normal word? (eatery, fare, eats, curated, artisanal)
- Is there a sentence longer than it needs to be? Cut it.
