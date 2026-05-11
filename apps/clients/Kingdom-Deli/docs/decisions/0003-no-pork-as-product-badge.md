# ADR 0003 — "No Pork on My Fork" as Product-Level Badge

**Status:** Proposed (pending Henry confirmation that Polish = Vienna Beef all-beef)
**Date:** 2026-05-09
**Scope:** Kingdom Deli client engagement
**Depends on:** ADR 0004 (introduces the `noPork` field on the `menuItem` schema)

---

## Context

Henry's brand voice direction included the tagline "No pork on my fork" applied to non-pork items. The menu mixes:

- Items that are reliably non-pork: Vienna hot dogs (all-beef line), corned beef, pastrami (typically beef), tacos (assumed beef / chicken — to confirm), jerk chicken, fries, soda, bakery items.
- Items where the no-pork claim depends on sourcing: Polish sausage. Traditional Maxwell Street Polish is a pork-beef blend; Vienna Beef offers an all-beef Polish.

Two ways to apply the tagline:

- **Option A — Site-wide claim.** "Kingdom Deli is no-pork." Applies the tagline as a brand-wide identity claim.
- **Option B — Product-level badge.** Tag each item that qualifies and render a visible "No pork on my fork" badge on those items. Other items render normally.

## Decision

**Option B.** Implement as a product-level badge driven by a `noPork: boolean` field on the Sanity `menuItem` schema (introduced via the Restaurant variant in ADR 0004). The `<NoPorkBadge />` component renders only when the flag is true.

This requires Henry to confirm: **Polish on the menu is the Vienna Beef all-beef variety.** If confirmed, all primary protein items qualify for the badge. If Henry decides to also carry traditional pork Polish at any point, the badge gracefully omits from those SKUs without affecting the rest.

## Consequences

**Positive**
- Brand stays honest at the product level. Avoids any future contradiction if Henry adds a pork item (a holiday special, bakery items containing lard, etc.).
- Communicates the no-pork option clearly to halal-leaning, kosher-style, and dietary-conscious customers without forcing the entire brand into that positioning.
- Mall context supports this: Louis Joliet Mall food court has positive reviews for halal options, suggesting demand for clearly-flagged non-pork choices.
- Schema field `noPork` is broadly reusable across future restaurant clients (cross-cutting benefit captured in ADR 0004).

**Negative**
- Requires per-item editorial discipline in Sanity. Henry (or NGC during setup) must check the flag correctly on each item.
- Visual real estate on menu cards for the badge — needs design accommodation. Tokens documented in `src/styles/tokens.css`.

## Alternatives Considered

1. **Site-wide claim (Option A).** Rejected — blocks any future menu expansion that includes pork (lard in baked goods, a seasonal item) and would force a brand-voice retraction.
2. **Category-level claim** (e.g. "The deli case is all no-pork"). Rejected — too granular to communicate cleanly, and Vienna Beef Polish vs. traditional Polish is itself a within-category distinction.
3. **No badge, just trust the menu names.** Rejected — loses the brand voice. The phrase "No pork on my fork" is a memorable brand asset; the badge is the surface that makes it work.

## Open Items

- Henry confirmation: Polish = Vienna Beef all-beef.
- Confirm taco and jerk chicken protein sourcing (no-pork assumed; needs Henry sign-off).
- Confirm bakery items contain no pork-derived fats (lard). If yes, badge applies to bakery as well.

## Related Decisions

- **ADR 0004:** Introduces the `noPork` field at the schema level.
- **ADR 0001:** Square catalog will surface this field via Sanity → catalog sync.
