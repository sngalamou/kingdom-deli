// api/checkout.js — Square hosted checkout via catalog line items (server sets price).
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { lineItems } = req.body; // [{ variationId, quantity }]
  if (!Array.isArray(lineItems) || lineItems.length === 0) {
    return res.status(400).json({ error: 'Empty cart' });
  }
  // Trust nothing from the browser except IDs + small integer quantities.
  const clean = lineItems
    .filter((li) => typeof li.variationId === 'string' && li.variationId.length > 0)
    .map((li) => {
      const q = Math.max(1, Math.min(50, parseInt(li.quantity, 10) || 1));
      return { catalog_object_id: li.variationId, quantity: String(q) };
    });
  if (clean.length === 0) return res.status(400).json({ error: 'No valid items' });

  const r = await fetch('https://connect.squareup.com/v2/online-checkout/payment-links', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
      'Square-Version': '2025-05-21',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idempotency_key: crypto.randomUUID(),
      order: {
        location_id: process.env.SQUARE_LOCATION_ID,
        line_items: clean,
      },
      checkout_options: {
        redirect_url: 'https://kingdomdeli.com/order/thanks/',
        ask_for_shipping_address: false,
      },
    }),
  });

  const data = await r.json();
  if (!r.ok) return res.status(502).json({ error: data });
  res.status(200).json({ url: data.payment_link.url });
}