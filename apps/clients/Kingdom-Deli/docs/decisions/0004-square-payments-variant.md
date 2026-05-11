# ADR 0004 — Restaurant Variant of Small Commerce System: Square Payments

**Status:** Proposed
**Date:** 2026-05-09
**Triggered by:** Kingdom Deli engagement
**Scope:** NGC template library (cross-cutting — not Kingdom-Deli-specific)

> **Note on location:** Drafted under `apps/clients/kingdom-deli/docs/decisions/` because this engagement surfaced the need. On acceptance, promote to repo-level `docs/decisions/` and link from `packages/square/README.md`.

---

## Context

NGC's Small Commerce System base assumes **Stripe** (or Shopify) as the default payments / commerce module. This works cleanly for clients whose business is fundamentally online — DTC ecommerce, services, digital goods.

Restaurant clients have different requirements:

1. **Physical POS hardware at the counter.** Stripe Terminal exists but is a weak hardware story compared to Square Register / Square Stand / Square POS, which dominate U.S. food service. Shopify POS is retail-first and clumsy for food.
2. **Tightly coupled inventory across counter, online order, and ecommerce.** A restaurant selling baked goods online needs the same SKU to update across all three surfaces in real time. Square's catalog is one source. Stripe + a separate POS would require a sync layer NGC would have to build and maintain per client.
3. **Modifier sets, KDS integration, and tip flow.** Standard at Square out of the box. Bolt-on with Stripe.
4. **Onboarding speed and merchant familiarity.** Independent restaurant operators recognize Square. They do not recognize Stripe Terminal. Reduces friction in the consulting handoff.

Continuing to push restaurant clients onto the Stripe-default base would force per-engagement custom work that defeats the productization model.

## Decision

Introduce a **Restaurant variant** of the Small Commerce System.

- Default payments module: `@ngc/square` (new shared package) instead of `@ngc/stripe`.
- New shared package created at `packages/square/` containing:
  - `SquareOrderEmbed.astro` — pickup / mobile order embed wrapper.
  - `SquareShopEmbed.astro` — shop view for retail / baked-goods sales.
  - `lib/` — Square API helpers, catalog import utilities, modifier-set helpers.
- Variant is selected at workspace creation via a config flag in `apps/clients/<client>/package.json` (e.g. `"ngcVariant": "small-commerce-restaurant"`) or via the Turborepo provisioning pipeline.
- Sanity schema base for `menuItem` is added under `packages/sanity-schemas/`, including a `noPork: boolean` field — justified by Kingdom Deli but broadly useful for any kosher / halal / dietary-flag scenario in the restaurant variant.

## Consequences

**Positive**
- Future restaurant clients onboard at the same productized speed as lead-gen sites.
- Square integration knowledge becomes shared IP across the practice instead of per-engagement rework.
- Modifier sets, catalog import CSVs, and POS hardware setup checklists become reusable artifacts under `packages/square/`.
- Promotes Kingdom Deli's `square/` setup folder contents (catalog-import.csv template, modifier-sets.md, setup-checklist.md) to first-class shared assets after this engagement validates them.

**Negative**
- `packages/square/` adds a maintenance surface (Square API changes, breaking embed updates).
- Variant-selection logic in the provisioning step adds a branch — projected slip from the 5–15 min provision target to 20–30 min for the restaurant variant. Acceptable.
- Stripe and Square onboarding flows diverge enough that the intake form needs a variant-aware section (POS hardware questions only fire for the restaurant variant).

**Neutral**
- Stripe-default Small Commerce remains the right call for non-restaurant clients. This is an additive variant, not a replacement.

## Alternatives Considered

1. **Toast as the restaurant default.** Rejected for low-to-mid budget tier: $69+/mo per terminal, hardware lock-in, weak retail / shipping story for baked goods. Would force a per-client uplift to a tier most NGC restaurant clients won't pay for.
2. **Clover.** Rejected on lock-in concerns and fragmented developer experience. Often bundled by mall processors but limits client portability.
3. **Custom Stripe + headless commerce + separate POS sync layer.** Rejected on maintenance cost. Defeats productization.
4. **Refuse restaurant clients until a future variant is built.** Rejected — restaurant clients are common in the small-business consulting market NGC targets.

## Related Decisions

- **ADR 0001 (Kingdom Deli):** Square as the anchor stack for this client — application of this variant.
- **ADR 0003 (Kingdom Deli):** No-pork as product badge — uses the `noPork` schema field introduced here.

## Open Items

- Decide on Square plan tier (Free vs. Plus) as a recommended default in the Restaurant variant. Likely Free for low-mid clients, Plus when modifier set complexity or KDS becomes important.
- Decide whether `packages/square/` ships its own Sanity schema for `restaurantLocation` (with hours, entrance notes, dine-in / pickup flags) or whether that stays in `packages/sanity-schemas/`.
- Decide how the variant flag propagates to Henry-facing intake forms in the NGC delivery platform (out of scope for Kingdom Deli, in scope for the next restaurant engagement).
