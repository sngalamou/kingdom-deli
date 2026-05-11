# ADR 0002 — Bakery Interface Deferred

**Status:** Accepted
**Date:** 2026-05-09
**Scope:** Kingdom Deli client engagement
**Source:** Henry, intake 2026-05-09 ("ignore for now")

---

## Context

The original feature list included "Interface with bakery." Henry indicated at intake that this is out of scope for V1 and to ignore for now.

The phrase is ambiguous on its face. Without scoping, "bakery interface" could refer to:

1. **Customer-facing bakery shop** — browse cakes / cheesecakes / cookies, place pickup order. This is part of the V1 site as the `bakery.astro` page backed by Square Online.
2. **Back-of-house bakery production planning** — dashboard for the bakery to track what's been baked, what's running low, what needs to be produced for tomorrow, batch tracking, recipe yields, ingredient inventory.

Interpretation #1 is in scope for V1. Interpretation #2 is what is being deferred.

## Decision

Defer **back-of-house bakery production planning**. Front-of-house bakery sales (browsing, pickup ordering, ecommerce) remain in scope for V1.

Front-end SKUs for baked goods are managed through the same Square catalog as the deli menu. No separate production-side data model is built.

## Consequences

**Positive**
- V1 scope stays inside the Restaurant variant template. No custom backend work.
- Henry's baked-ahead inventory model means production planning doesn't block sales — bakers know what to produce based on prior-day sales reports from Square. Adequate for opening.

**Negative**
- When the bakery interface comes back into scope (post-launch), it will require a separate engagement. Likely needs:
  - Production schedule data model (Sanity or Supabase).
  - Recipe / yield tracking.
  - Daily production sheet for bakers.
  - Possibly inventory deduction triggers from Square sales.
- Risk that "deferred" silently becomes "forgotten." This ADR exists specifically to prevent that.

## Trigger for Revisit

Revisit when any of the following occur:
- Bakery output exceeds what baked-ahead inventory + Square sales reports can manage.
- Henry expresses interest in custom-order cakes (lead time, deposits, consultations) — a separate feature class that would also live here.
- Kingdom Deli expands to a second location and needs centralized production planning.

## Related Decisions

- **ADR 0001:** Square anchor — only front-of-house SKUs are loaded into the Square catalog at V1.
