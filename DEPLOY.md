# Deploying Kingdom Deli

Target: **Vercel**. The site is a static Astro build **plus one serverless
function** (`api/checkout.js`) that creates Square hosted-checkout links. Vercel
serves both from a single project.

> **Why Vercel, not Cloudflare Pages (the original ADR 0001 plan):** ordering moved
> from a hosted Square Online site to the **Square Checkout API**, which needs a
> server-side function holding the secret `SQUARE_ACCESS_TOKEN`. `api/checkout.js`
> is written for Vercel's Node function signature
> (`export default async function handler(req, res)`). Cloudflare Pages can do this
> too, but only after porting that file to a Pages Function — see
> *Switching targets* at the bottom.

---

## 1. Verify the build runs locally first

From the monorepo root:

```bash
pnpm install
pnpm --filter=@ngc/kingdom-deli build
```

What this does:
- Resolves all `@ngc/*` workspace packages.
- Turbo runs the build with proper dependency ordering.
- Outputs static assets to `apps/clients/Kingdom-Deli/dist/`.

Preview the built output:

```bash
pnpm --filter=@ngc/kingdom-deli preview
```

Notes:
- The **function is not exercised by the static build** — `pnpm build` won't catch
  an error in `api/checkout.js`. Test that against the deployed URL (see LAUNCH.md).
- The menu now comes from `src/content/menu/*.json` (Sanity is **not** used for V1),
  so a missing `SANITY_PROJECT_ID` is expected and fine.

Common first-build issues:
- **Node version.** Need Node ≥ 20 (the function uses global `fetch` and
  `crypto.randomUUID`). Match local — pin to 22.x in Vercel (see §3).
- **Folder-name case.** The committed folder is `apps/clients/Kingdom-Deli`
  (capital K, capital D). Windows is case-insensitive, but Vercel builds on
  **case-sensitive Linux** — the Root Directory and any path you type must match
  the repo casing exactly, or the build can't find the app.

---

## 2. Environment variables

Set in **Vercel → Project → Settings → Environment Variables**.

| Name | Value | Scope | Required |
|---|---|---|---|
| `SQUARE_ACCESS_TOKEN` | *(secret; `EAAA…` production token)* | Production + Preview | **Yes** — server only, **no `PUBLIC_` prefix** |
| `SQUARE_LOCATION_ID` | *(your Square location ID)* | Production + Preview | **Yes** |
| `SQUARE_APPLICATION_ID` | *(already set)* | Production + Preview | No — only the Web Payments SDK uses it; harmless to leave |
| `PUBLIC_CONTACT_FORM_ENDPOINT` | *(form-handler URL)* | Production + Preview | Only if the contact form posts to a service |

Rules that bite if ignored:
- **Never `PUBLIC_` the access token.** Astro inlines any `PUBLIC_*` var into
  client JS — it would ship the secret to every browser.
- **Enable for Production *and* Preview**, or branch/preview deploys 500 while
  production works.
- **Changing a value needs a redeploy** to take effect on existing deployments.
- **Retired vars:** `PUBLIC_SQUARE_SITE_URL` (no hosted Square site — using the
  Checkout API) and `SANITY_PROJECT_ID` / `SANITY_DATASET` (Sanity dropped) are no
  longer used. Remove them to avoid confusion.

Node / pnpm versions:
- **Node:** Settings → **Build & Deployment → Node.js Version → 22.x** (or add
  `"engines": { "node": "22.x" }` to the app `package.json`).
- **pnpm:** Vercel detects it from the `packageManager` field in the root
  `package.json` and the `pnpm-lock.yaml`. Keep `"packageManager": "pnpm@9.x"`
  set at the root.

---

## 3. Project settings (monorepo)

| Setting | Value |
|---|---|
| Framework preset | **Astro** (or *Other*) |
| Root Directory | `apps/clients/Kingdom-Deli` |
| Build command | `pnpm --filter=@ngc/kingdom-deli build` |
| Output directory | `dist` *(relative to Root Directory)* |
| Install command | `cd ../../.. && pnpm install` *(installs the workspace from the monorepo root)* |
| Include files outside the Root Directory | **On** — so imports from `packages/*` resolve during the build |

**The function:** with Root Directory set to the app, Vercel auto-detects
`apps/clients/Kingdom-Deli/api/` and serves each file at `/api/*`
(`api/checkout.js` → `/api/checkout`). No extra config. Keep the function
**dependency-free** (plain `fetch` + `node:crypto`) so it never pulls a workspace
package into the serverless bundle — that's where monorepo function builds get
fiddly.

---

## 4. The serverless function(s)

- **`api/checkout.js`** — the only function needed at launch. Reads
  `process.env.SQUARE_ACCESS_TOKEN` / `SQUARE_LOCATION_ID` at request time; static
  pages cannot read those, so keep all token use inside the function.
- **`api/health.js` and `api/catalog.js`** — temporary setup/diagnostic tools.
  **Delete both before launch** (they expose token existence, location name, and
  the full catalog). Tracked in LAUNCH.md.

---

## 5. Push to a git remote

```bash
cd /path/to/ngc-monorepo
git add .
git commit -m "Kingdom Deli — Square checkout + dark theme"
git push           # to the connected GitHub/GitLab/Bitbucket remote
```

---

## 6. Connect / deploy on Vercel

1. Vercel dashboard → **Add New… → Project** → import the `ngc-monorepo` repo.
2. Apply the settings in §3 and the env vars in §2.
3. **Deploy.** First build takes ~2–4 minutes; Vercel assigns a `*.vercel.app`
   preview URL.
4. Verify `/api/checkout` works end-to-end against that URL **before** the custom
   domain (run the acceptance test in LAUNCH.md).

---

## 7. Custom domain

When `kingdomdeli.com` is confirmed:

1. Vercel → Project → **Domains** → add `kingdomdeli.com` **and** `www.kingdomdeli.com`.
2. Add the DNS records Vercel provides at the registrar (or move DNS to Vercel).
   SSL is automatic once DNS verifies.
3. **Then** confirm two things match the live domain exactly:
   - `redirect_url` in `api/checkout.js` → `https://kingdomdeli.com/order/thanks/`
   - `site` in `astro.config.mjs`

---

## 8. Subsequent deploys

Every push to `main` triggers a production deploy; PRs and branches get their own
preview URLs. After changing an env var, **redeploy** (dashboard → Deployments →
Redeploy) so the new value takes effect.

---

## Switching targets (Cloudflare Pages / Netlify)

The **static build is portable; the function is not** without a rewrite.

- **Cloudflare Pages:** static settings — Framework preset **None**, build command
  `pnpm install && pnpm --filter=@ngc/kingdom-deli build`, output
  `apps/clients/Kingdom-Deli/dist`, Root Directory blank (monorepo root). Then
  **port the function**: move `api/checkout.js` → `functions/api/checkout.js` and
  rewrite it as `export async function onRequest(context)`, reading
  `context.env.SQUARE_ACCESS_TOKEN` instead of `process.env` and returning a
  `Response` instead of using `(req, res)`. The Square REST call itself is identical.
- **Netlify:** function goes in `netlify/functions/checkout.js` and returns
  `{ statusCode, body }`; add a root `netlify.toml` with
  `base = "apps/clients/Kingdom-Deli"` and `publish = "dist"`.