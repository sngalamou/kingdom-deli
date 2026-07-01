// src/lib/cart.ts — catalog-linked cart. Stores Square variation IDs only.
// Price is NEVER stored in the browser; Square sets it at checkout.
export type CartLine = { variationId: string; label: string; quantity: number };

const KEY = 'kd-cart';       // cart contents — must match the key Header.astro reads
const LAST_KEY = 'kd-last';  // variationId of the most-recently-touched add control

export const getCart = (): CartLine[] => {
  if (typeof localStorage === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
};

const save = (cart: CartLine[]) => {
  localStorage.setItem(KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('cart-updated'));
};

export const addToCart = (item: { variationId: string; label: string }) => {
  if (!item?.variationId) return;
  const cart = getCart();
  const found = cart.find((i) => i.variationId === item.variationId);
  if (found) found.quantity += 1;
  else cart.push({ variationId: item.variationId, label: item.label, quantity: 1 });
  save(cart);
};

export const setQty = (variationId: string, quantity: number) => {
  let cart = getCart();
  if (quantity <= 0) cart = cart.filter((i) => i.variationId !== variationId);
  else { const it = cart.find((i) => i.variationId === variationId); if (it) it.quantity = quantity; }
  save(cart);
};

export const clearCart = () => save([]);
export const cartCount = (): number => getCart().reduce((n, i) => n + i.quantity, 0);

const qtyOf = (variationId: string): number =>
  getCart().find((i) => i.variationId === variationId)?.quantity ?? 0;

// --- "most recently touched" marker (drives which button shows the 🛒 shortcut) ---
const getLast = (): string | null => {
  try { return localStorage.getItem(LAST_KEY); } catch { return null; }
};
const setLast = (id: string | null) => {
  try { id ? localStorage.setItem(LAST_KEY, id) : localStorage.removeItem(LAST_KEY); } catch {}
};

// Repaint one [data-add-control] container to reflect its item's quantity:
//   qty 0   →  "+"
//   qty >=1 →  ‹ N ›   (plus a 🛒 link to /order if this is the most-recent item)
const renderControl = (el: HTMLElement) => {
  const id = el.getAttribute('data-variation-id') || '';
  const label = el.getAttribute('data-label') || 'item';
  const qty = qtyOf(id);

  if (qty <= 0) {
    el.classList.remove('is-in-cart');
    el.innerHTML =
      `<button type="button" class="ac-btn ac-add" aria-label="Add ${label} to order">+</button>`;
    if (getLast() === id) setLast(null); // it left the cart — drop the marker
    return;
  }

  el.classList.add('is-in-cart');
  const showCart = getLast() === id;
  el.innerHTML =
    `<div class="ac-stepper">` +
      `<button type="button" class="ac-btn ac-dec" aria-label="Remove one ${label}">\u2039</button>` +
      `<span class="ac-count">${qty}</span>` +
      `<button type="button" class="ac-btn ac-inc" aria-label="Add one ${label}">\u203A</button>` +
    `</div>` +
    (showCart
      ? `<a class="ac-cart" href="/order" aria-label="Go to your order" title="Go to your order">\uD83D\uDED2</a>`
      : '');
};

/** Repaint every add control on the page to match the cart. */
export const syncAddButtons = () => {
  if (typeof document === 'undefined') return;
  document.querySelectorAll<HTMLElement>('[data-add-control]').forEach(renderControl);
};

const pop = (el: HTMLElement) => {
  el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');
};

// One delegated listener for every [data-add-control] on the page. Idempotent.
let wired = false;
export const initAddButtons = () => {
  if (wired || typeof document === 'undefined') return;
  wired = true;

  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const ctrl = target.closest('[data-add-control]') as HTMLElement | null;
    if (!ctrl) return;
    const id = ctrl.getAttribute('data-variation-id') || '';
    const label = ctrl.getAttribute('data-label') || '';
    if (!id) return;

    if (target.closest('.ac-cart')) return;                       // let the <a> navigate to /order
    if (target.closest('.ac-dec')) { setLast(id); setQty(id, qtyOf(id) - 1); pop(ctrl); return; }
    if (target.closest('.ac-add') || target.closest('.ac-inc')) { // "+" and "›" both add one
      setLast(id); addToCart({ variationId: id, label }); pop(ctrl); return;
    }
  });

  window.addEventListener('cart-updated', syncAddButtons);
  window.addEventListener('storage', syncAddButtons);
  syncAddButtons(); // initial paint (reflects items already in the cart on load)
};