# Kingdom Deli — Client Brief

**Status:** Frozen intake (Phase 1)
**Date frozen:** 2026-05-09
**Engagement:** NGC Small Commerce System (Restaurant variant)

---

## Client Metadata

| Field | Value |
|---|---|
| Owner | Henry |
| Business name | Kingdom Deli |
| Category | Restaurant / Bakery |
| Soft opening | TBD |
| Grand opening | 2026-07-11 |
| Rough draft due | ASAP |
| Engagement start | 2026-05-09 |

## Operational Details

- **Physical address:** Louis Joliet Mall food court, 3340 Mall Loop Drive, Joliet, IL 60431
- **Wayfinding:** Cinemark theater entrance is the fastest path to the food court. Find Us page leads with this.
- **Hours (mirrors Louis Joliet Mall):**
  - Mon–Thu: 11:00 AM – 7:00 PM
  - Fri–Sat: 10:00 AM – 8:00 PM
  - Sun: 11:00 AM – 6:00 PM
- **Operating model:** Food court counter. Walk-up + pickup orders. No dine-in seating owned by Kingdom Deli (uses food court common seating).
- **Bakery model:** Baked-ahead inventory. No custom-order, consultation, or lead-time workflow at V1.

## Menu (current scope)

**Deli**
- Corned beef
- Pastrami

**Hot Dogs & Polish (Vienna Beef line)**
- Vienna hot dogs
- Polish (all-beef Vienna confirmed direction — see ADR 0003)

**Hot Plates**
- Tacos
- Jerk chicken

**Sides**
- Fries

**Drinks**
- Soda

**Bakery**
- Specialty cakes
- Cheesecakes
- Chicago lunchroom butter cookies (signature item — feature on Home + Bakery pages)

## Brand Voice

- **Style:** Old-school deli. Maxwell Street heritage angle.
- **Positioning phrase:** "Wholistic, good food."
- **No-pork product line:** "No pork on my fork" — applied as a per-product badge on the all-beef Vienna line and other qualifying items, not a site-wide claim. See ADR 0003.

## Features Required (V1)

- E-commerce
- POS
- Mobile order / online order

## Features Deferred

- Bakery interface (back-of-house production planning) — see ADR 0002. Front-end bakery sales remain in scope.

## Budget Tier

Low-to-mid (between low and mid of NGC's three-tier offering). Drives stack choices toward Square over Toast and away from custom commerce builds.

## Brand Assets Status

| Asset | Status | Action |
|---|---|---|
| Logo | Not provided | Use placeholder; flagged in `public/images/logo/` |
| Color palette | Not provided | Use deli-default tokens until Henry delivers |
| Photography (menu items) | Not provided | Use placeholder boxes per item |
| Hero imagery | Not provided | Use placeholder |
| Cinemark-entrance wayfinding graphic | Not provided | Stub on Find Us page until Henry approves direction |

## Open Questions / Pending Confirmations

1. Confirm "Polish = Vienna Beef all-beef Polish." Henry indicated this direction; needs explicit sign-off before menu page copy is written.
2. Confirm Square as POS anchor and Square Online for e-commerce / mobile order. Henry has not yet engaged with vendor selection — currently a NGC-recommended default, not a Henry-confirmed choice. See ADR 0001.
3. Domain — does Henry own `kingdomdeli.com` or similar? If not, advise registration before site goes live.
4. Email / contact channel for the Contact page — routed inbox, forwarded address, or just the mall counter phone?
5. Social channels — does Kingdom Deli have IG / FB / TikTok yet? If yes, capture handles for footer.
6. Taco and jerk chicken protein sourcing (relevant to no-pork badge — see ADR 0003).
7. Bakery items — any pork-derived fats (lard) in cakes, cheesecakes, or butter cookies?
