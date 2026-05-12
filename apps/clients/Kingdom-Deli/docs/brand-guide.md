# Kingdom Deli — Brand Guide

Working version. Tighten with Henry on review.

## Voice

Kingdom Deli sounds like the counter, not the corporate website. Plain words. Short sentences. Specific over general. Confident, warm, never pleading.

### Do

- Write the way Henry talks. If he wouldn't say it at the counter, it doesn't belong on the site.
- Be specific. "Pink-frosted butter cookies on a paper liner" beats "baked goods."
- Earn every sentence. If a sentence isn't doing work, cut it.
- Treat the no-pork commitment as a *product* statement, not a *brand* statement. One item at a time.

### Don't

- No corporate filler. No "eatery," "eats," "curated experience," "artisanal."
- No emojis on the site copy. (Social posts: fine, Henry's call.)
- No exclamation marks unless something genuinely earns one.
- No site-wide claims we can't make item-by-item.

## Taglines

| Use | Tagline |
|---|---|
| Primary | Wholistic, good food. |
| Sub | An old-school Chicago deli and bakery counter, set up in the Louis Joliet Mall food court. |
| Footer | Wholistic, good food. Louis Joliet Mall. |
| Closing CTA | Two ways in. Order ahead for pickup, or come find us at the counter. |
| Bakery hook | The cookie from the cafeteria tray. The one with the pink frosting. |

## Colors

Old-school Chicago lunchroom signage. Cream paper, mustard yellow, meat-counter red, charcoal ink. The palette is restrained — three colors do most of the work; relish green is a rare accent.

| Token | Hex | Use |
|---|---|---|
| `--color-cream-100` | `#f7f1de` | Page background |
| `--color-cream-50` | `#fdfaf3` | Card surfaces, lifts |
| `--color-mustard-500` | `#d4a017` | Primary accent, CTAs, sign offsets |
| `--color-mustard-400` | `#e8b837` | Hover, highlights |
| `--color-meatred-500` | `#a32424` | Secondary accent, badges, key emphasis |
| `--color-meatred-400` | `#c33a3a` | Hover on red |
| `--color-charcoal-900` | `#15110d` | Body text, ink, rules |
| `--color-charcoal-800` | `#2a2622` | Muted text |
| `--color-relish-500` | `#5b8a3a` | Sparing — use only when relish-green is contextually correct |

**Rules of thumb:**
- Mustard for "do this" (CTAs, buttons).
- Meat-red for "this is special" (badges, emphasis, the no-pork stamp).
- Charcoal on cream is the default reading mode.
- Never put red on mustard or mustard on red — they fight.
- Never use pure black (`#000`) or pure white (`#fff`). Cream and charcoal only.

## Type

| Token | Family | Use |
|---|---|---|
| `--font-display` | Alfa Slab One | Headlines, signage, the "K I N G D O M  D E L I" feel |
| `--font-body` | Vollkorn | Body copy, captions, fine print |

**Rules of thumb:**
- Display is heavy. Use sparingly. Headlines and short labels only — never body copy, never sentences longer than ~10 words.
- Body in Vollkorn 1.0625rem / 1.55 line-height. It's a warm serif that pairs with the slab without competing.
- No sans-serif. No Inter, no Roboto, no Helvetica. The deli aesthetic doesn't survive a sans-serif.

## The "No pork on my fork" badge

This is the most distinctive design element on the site. Treat it carefully.

**What it is:** A small butcher's-stamp chip, meat-red ink on cream paper, rotated -3°. Reads "NO PORK ON MY FORK."

**Where it goes:**
- Next to menu items that are confirmed all-beef.
- Inline in body copy when explaining the all-beef line (smaller size).
- Nowhere else. It's not a logo. It's not a watermark. It's not a header element.

**Where it does NOT go:**
- On the home page hero.
- In the site header or footer.
- As a background pattern.
- On items where pork status isn't confirmed.

The whole point of the badge is that it's a per-item promise. Putting it everywhere dilutes that promise to a slogan.

## Photography (when assets arrive)

Direction: counter-level, not Instagram-tableau. Things on paper liners. Steam coming off a sandwich. Hand-written labels. The Vienna Beef logo on the package. Henry working.

Avoid: overhead flatlays of sandwiches arranged in a circle. Marble surfaces. Crystal glasses with infused water. Anything that screams 2018 lifestyle blog.

## Logo

TBD. Until Henry provides a logo, the wordmark "Kingdom Deli" in Alfa Slab One is doing the job. That's actually fine as a temporary mark — it's distinctive enough to ship with.

If/when a logo is designed:
- Should hold up at 24px (favicon) and 600px (sign mockup).
- Should work in single-color (meat-red on cream, charcoal on cream).
- Should not include the no-pork badge motif as part of the mark itself.
