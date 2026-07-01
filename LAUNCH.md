# Launching Kingdom Deli

Pre-launch checklist for the **July 11** grand opening. Ordered so build-breakers
come first, then security, then dead-file cleanup, then correctness, and finally
the one end-to-end test that proves the ordering loop.

This reflects the **Square Checkout API** integration deployed on **Vercel**:
custom cart → `/api/checkout` → Square-hosted payment page → `/order/thanks/`.
See `DEPLOY.md` for the deploy settings this assumes.

---

## 0. How ordering works (recap)

- Static Astro site on Vercel **+ one serverless function** (`api/checkout.js`).
- Browse pages render menu cards from `src/content/menu/*.json`. A card shows an
  **Add** button only when its name maps to a Square item (mapping lives in
  `src/lib/orderable.ts`).
- The cart is site-wide in `localStorage` (`src/lib/cart.ts`) and stores **IDs +
  quantities only — never prices**.
- `/order` reviews the cart and POSTs `{ variationId, quantity }[]` to
  `/api/checkout`.
- The function calls Square with the **secret** token; **Square sets prices from
  the catalog** and returns a hosted checkout URL; the browser redirects there.
- After payment Square redirects to `/order/thanks/`, which clears the cart.
  Orders land in the Square POS as real catalog items.

---

## 1. Build-breakers — fix first

- [ ] `src/lib/cart.ts` ends at `initAddButtons`'s closing `};` with **no stray
      `<script>` block** (that counter belongs in `Header.astro`). *Looks resolved
      in the latest file — confirm.*
- [ ] `Header.astro` contains the cart-count `<script>` reading the `kd-cart` key.
- [ ] `pnpm --filter=@ngc/kingdom-deli build` completes clean **locally** before
      any deploy.

---

## 2. Security — before the site is public

- [ ] **Delete `api/health.js`** — exposes that a live token exists + your
      location name on a public URL.
- [ ] **Delete `api/catalog.js`** — dumps every catalog item ID + price publicly.
- [ ] **Redeploy** after deleting so they're gone from the live deployment.
- [ ] *(Hygiene)* Rotate `SQUARE_ACCESS_TOKEN` in the Square dashboard — it was
      surfaced during setup/debugging. Update the Vercel env var, then **redeploy**
      (Vercel does not apply new env values to existing deployments automatically).

---

## 3. Dead / duplicate files — delete

- [ ] **Two `api/` folders exist.** With Vercel Root Directory =
      `apps/clients/Kingdom-Deli`, the live function is
      `apps/clients/Kingdom-Deli/api/checkout.js`. Delete the monorepo-root
      `kingdom-deli/api/` copy so there's a single source of truth.
- [ ] **`src/lib/square.ts`** — byte-for-byte duplicate of `menu.ts`; nothing
      imports it. Confirm with `grep -rn "lib/square" src` then delete.
- [ ] **`src/pages/orderOld.astro`** — delete (its `dist/orderOld/` clears on the
      next build).
- [ ] *(Optional)* stale siblings: `MenuItem-old.astro`, `BaseLayoutOld.astro`,
      `globals-old.css`, `tokens-old.css`.

---

## 4. Square catalog correctness

- [ ] **Buffalo Wings has no price in Square** (`priceCents: null`). Set a price
      in the dashboard, or leave it unmapped — a blank-price item makes the payment
      link error if anyone reaches it.
- [ ] **Soda alias decision:** `orderable.ts` maps `fountain soda → soda regular`
      ($3.99). Switch to `soda large` if that's what you'd rather sell online.
- [ ] **Spot-check the three alias-resolved items** point at the right item/price:
      Jerk Chicken Plate → Jerk Chicken Tips, Beef Tacos → the 3-taco variation,
      Slaw → Mama's Cole Slaw.
- [ ] If you change the catalog: re-run the (temporary) `/api/catalog` dump,
      repaste into `orderable.ts` `CATALOG`, re-run `verify-orderable.ts`, then
      delete the dump again.

---

## 5. Domain + redirect

- [ ] `redirect_url` in `api/checkout.js` is `https://kingdomdeli.com/order/thanks/`
      — confirm that's the **exact** production domain (the **g** in "kingdom",
      apex vs `www`, trailing slash). A mismatch 404s the customer after payment.
- [ ] Custom domain attached in Vercel (apex **and** `www`), DNS verified, SSL active.
- [ ] `astro.config.mjs` `site` field set to the final domain.

---

## 6. Content / UX judgment calls

- [ ] Items with no Square match still appear on the menu with **no Add button**
      (the 4 bakery items: Half-Dozen cookies, both cheesecakes, Specialty Cake).
      Add an **"in-store only"** note on those cards so it reads as intentional.
- [ ] *(Optional)* Add a dark scrim to the `index.astro` hero overlay so the
      headline stays legible over `home-hero.jpg` on the dark theme.
- [ ] Run `verify-orderable.ts` once more against the final menu JSON and confirm
      the orderable / no-button split is what you intend.

---

## 7. The acceptance test — do this last, on production

You're on a **production** Square token; **real cards get charged.** Use a cheap
item and refund it.

1. [ ] On the live site, add one cheap item from a menu card → header count increments.
2. [ ] `/order` shows the line with working **+ / – / remove**.
3. [ ] Checkout → redirected to Square's hosted page → pay with a **real card**.
4. [ ] Land on `/order/thanks/` → cart is now empty.
5. [ ] Order appears in **Square POS / Dashboard** with the correct item + price.
6. [ ] **Refund** it from Square.

If step 5 shows the right item at the right price, the full loop is verified.

---

## Quick command reference

```bash
# from the monorepo root
pnpm install
pnpm --filter=@ngc/kingdom-deli build                 # must pass before deploy

# mapping check (Node >= 22.6; no install needed)
node --experimental-strip-types apps/clients/Kingdom-Deli/verify-orderable.ts

# confirm the dead loader is unused before deleting it
grep -rn "lib/square" apps/clients/Kingdom-Deli/src
```
