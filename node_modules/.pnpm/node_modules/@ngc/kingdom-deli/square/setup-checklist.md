# Square Setup Checklist — Kingdom Deli

Use this checklist during initial Square account provisioning for Henry. Each step gates a downstream piece of the build, so order matters.

## Account & Legal

- [ ] Square business account created under Henry's name / EIN
- [ ] Business legal name and DBA ("Kingdom Deli") confirmed in Square
- [ ] Bank account linked for deposits
- [ ] Tax info filed (W-9, state sales tax registration if not yet handled)
- [ ] IL sales tax rate configured (Joliet / Will County combined rate — verify at point of setup; do not hardcode)

## Location

- [ ] Single location created: "Kingdom Deli — Louis Joliet Mall"
- [ ] Address: 3340 Mall Loop Dr, Joliet, IL 60431
- [ ] Hours match `client-brief.md`:
  - Mon–Thu 11–7
  - Fri–Sat 10–8
  - Sun 11–6
- [ ] Time zone: America/Chicago

## Hardware

- [ ] Square Register or Square Stand selected — recommend Register for single-counter food court
- [ ] Receipt printer (Square-supported model)
- [ ] Cash drawer
- [ ] Card reader (built into Register; standalone if Stand is chosen)
- [ ] KDS (kitchen display system) — defer at V1; revisit if order volume warrants

## Catalog

- [ ] Categories created in Square dashboard, mirroring `menuCategory` records in Sanity:
  - Deli (10)
  - Dogs & Polish (20)
  - Hot Plates (30)
  - Sides (40)
  - Drinks (50)
  - Bakery (60)
- [ ] Items imported via `square/catalog-import.csv` (bulk upload in Square dashboard)
- [ ] Prices set on each item (Henry to provide — currently TBD across the menu)
- [ ] Modifier sets configured — see `square/modifier-sets.md`
- [ ] Photos uploaded (placeholder OK at rough draft; replace before launch)

## Square Online

- [ ] Square Online site enabled (free tier)
- [ ] Custom domain skipped — keep Square Online on a Square subdomain; the marketing site is the front door
- [ ] Pickup fulfillment enabled at the location
- [ ] Pickup time slots configured to match operating hours
- [ ] Shipping disabled at V1 (revisit post-launch for the bakery line)
- [ ] Order embed snippet captured for use in the `<SquareOrderEmbed>` component

## API / Integration

- [ ] Square application created in the Square Developer Dashboard
- [ ] Sandbox access token obtained (for staging environment)
- [ ] Production access token obtained (rotated into production env at launch only — not before)
- [ ] Location ID captured for the `PUBLIC_SQUARE_LOCATION_ID` env var
- [ ] Webhook subscriptions configured (`orders.updated`, `catalog.updated`) — defer at V1 unless real-time sync is needed before launch

## Pre-launch QA

- [ ] Test order placed in sandbox — pickup flow end-to-end
- [ ] Receipt prints correctly at the counter
- [ ] Tax appears on receipt at correct IL rate
- [ ] Bakery item appears in Square Online shop view with pickup option
- [ ] Modifier set selection works on a representative item (e.g. a hot dog with toppings)

## Open Items

- Henry needs to confirm pricing across the entire menu before catalog import is meaningful.
- Decide on Square plan tier: starting at Free, upgrade to Plus only if modifier set complexity or staff management requires it.
- Confirm whether Henry wants a dedicated business phone line (separate from the mall main line) before launch.
