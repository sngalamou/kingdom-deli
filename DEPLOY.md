# Deploying Kingdom Deli

Target: **Cloudflare Pages** (per ADR 0001 / monorepo README).

To swap targets later (Vercel, Netlify), only the build settings move — the workspace itself doesn't change.

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
- Outputs static assets to `apps/clients/kingdom-deli/dist/`.

If this succeeds locally, Cloudflare Pages will succeed too. If not, fix it here before connecting the cloud.

Common first-build issues:
- **Node version mismatch.** Need Node ≥ 20. Check with `node -v`.
- **Missing peer dep for `@astrojs/sanity`.** It's in `kingdom-deli/package.json`; if pnpm complains, run `pnpm install` again from the root.
- **Sanity errors.** Build is configured to skip Sanity entirely when `SANITY_PROJECT_ID` is unset. If you set it but it's wrong, unset it for V0 deploy: `unset SANITY_PROJECT_ID`.

To preview the built output locally:

```bash
pnpm --filter=@ngc/kingdom-deli preview
```

---

## 2. Push to a git remote

```bash
cd /path/to/ngc-monorepo
git init
git add .
git commit -m "Initial monorepo + Kingdom Deli rough draft"
gh repo create ngc-monorepo --private --source=. --push   # via GitHub CLI
# or push to an existing remote
```

Cloudflare Pages connects to GitHub, GitLab, or Bitbucket. Private repos work on the free tier.

---

## 3. Connect Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
2. Authorize and pick the `ngc-monorepo` repo.
3. Set up build:

   | Setting | Value |
   |---|---|
   | Project name | `kingdom-deli` |
   | Production branch | `main` |
   | Framework preset | **None** (do not pick "Astro" — it assumes a single-app repo) |
   | Build command | `pnpm install && pnpm --filter=@ngc/kingdom-deli build` |
   | Build output directory | `apps/clients/kingdom-deli/dist` |
   | Root directory | *(leave blank — uses monorepo root)* |

4. Environment variables (under **Settings → Environment variables**):

   | Name | Value | When to set |
   |---|---|---|
   | `NODE_VERSION` | `20` | Always |
   | `PNPM_VERSION` | `9` | Always |
   | `PUBLIC_SQUARE_SITE_URL` | `https://kingdomdeli.square.site` | After Henry provisions Square |
   | `SANITY_PROJECT_ID` | *(your Sanity project ID)* | After Sanity project is created |
   | `SANITY_DATASET` | `production` | After Sanity project is created |
   | `PUBLIC_CONTACT_FORM_ENDPOINT` | *(form-handler URL)* | After picking a form service |

   None are required for V0. Without them, the order/bakery pages render their built-in "coming soon" panels and the menu page renders empty — both intentional.

5. Click **Save and Deploy**. First build takes 2–4 minutes.

6. Cloudflare assigns a `kingdom-deli.pages.dev` subdomain (or similar). That's your shareable preview URL.

---

## 4. (Later) Custom domain

When Henry confirms `kingdomdeli.com`:

1. Cloudflare Pages → **Custom domains** → **Set up a custom domain**.
2. Enter `kingdomdeli.com` and `www.kingdomdeli.com`.
3. Cloudflare gives you DNS records to add at the registrar (or transfers DNS if it's the registrar already).
4. Once DNS propagates (usually under 5 minutes on Cloudflare), the site responds at the custom domain. SSL is automatic.

Update `astro.config.mjs` `site` field to match the final domain.

---

## 5. Subsequent deploys

Every push to `main` triggers a new production deploy. PRs and other branches get their own preview URLs automatically.

To force a rebuild without a code change: dashboard → project → **Deployments** → **Retry deployment**.

---

## Switching to Vercel or Netlify

If Cloudflare Pages misbehaves on monorepo builds (it sometimes does with workspace protocols), the swap is small:

**Vercel:**
- Build command: `pnpm --filter=@ngc/kingdom-deli build`
- Output directory: `apps/clients/kingdom-deli/dist`
- Root directory: `apps/clients/kingdom-deli` (Vercel handles workspace install at root automatically)
- Install command: `cd ../../.. && pnpm install`

**Netlify:**
- Add `netlify.toml` at monorepo root specifying `base = "apps/clients/kingdom-deli"` and `publish = "dist"`.
- Build command: `pnpm install && pnpm --filter=@ngc/kingdom-deli build`.
