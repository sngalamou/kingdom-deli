# ADR 0001 — Square as Stack Anchor for Kingdom Deli

**Status:** Proposed
**Date:** 2026-05-09
**Scope:** Kingdom Deli client engagement
**Depends on:** ADR 0004 (Restaurant variant of Small Commerce System)

---

## Context

Kingdom Deli requires:
- POS for a single food-court counter at Louis Joliet Mall.
- Online ordering / mobile ordering for pickup.
- E-commerce capability for baked goods (specialty cakes, cheesecakes, butter cookies).
- Low-to-mid budget tier.

Henry has no existing tech stack. All vendor decisions are open.

## Decision

Anchor the entire commerce surface on **Square**:

- **POS:** Square for Restaurants on a single Square Register or Square Stand at the food court counter.
- **Online ordering / mobile order:** Square Online (free starter tier) for hot food pickup.
- **E-commerce (bakery):** Square Online shop view configured for in-mall pickup. Shipping disabled at V1; can be enabled post-launch without re-platforming.
- **Catalog:** Single Square catalog feeds POS, Online, and the marketing site (via Sanity sync of select fields for menu page display).

Site is built on the NGC Small Commerce System Restaurant variant (ADR 0004), which sets `@ngc/square` as the payments module by default.

## Consequences

**Positive**
- One vendor across POS, mobile order, and ecommerce. Single inventory, single dashboard, single payout.
- ~2.6% + $0.10 per tap card processing — competitive at this tier and predictable.
- Hardware footprint minimal: register / terminal + receipt printer. Fits a food-court counter.
- Free Online tier means no monthly SaaS floor; cost scales with revenue.
- Bakery shipping is a configuration toggle later, not a re-platform.

**Negative**
- Vendor concentration risk on Square. Acceptable at this scale; revisit at multi-location.
- Square's marketing-site theming is limited; that's why the marketing site is built outside Square (Astro + Sanity) and Square is embedded only on the order / shop surfaces. Documented to avoid future drift toward "just use Square's site builder."
- Modifier sets and tax setup require careful initial configuration. Captured in `square/setup-checklist.md`.

## Alternatives Considered

1. **Toast** — better-fit POS for full-service restaurants but overkill for a single mall counter at this budget tier; weak retail / shipping for the bakery line. Rejected.
2. **Clover** — common mall-processor bundle but lock-in risk and fragmented developer experience. Rejected.
3. **Stripe + standalone POS** — rejected per ADR 0004 reasoning.
4. **Shopify + Shopify POS** — retail-first; food modifier flow is awkward; transaction fees on top of Shopify plan stack up at low-mid revenue. Rejected.

## Related Decisions

- **ADR 0004:** Restaurant variant of Small Commerce System — establishes Square as the variant default.
- **ADR 0002:** Bakery interface deferred — affects scope of Square catalog setup (only front-of-house SKUs needed at V1).
- **ADR 0003:** No-pork badge — surfaced via the Sanity `menuItem` schema, with Square catalog as the SKU master.
