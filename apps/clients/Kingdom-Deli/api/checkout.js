// api/checkout.js — Square hosted checkout via catalog line items (server sets price).
import crypto from 'node:crypto';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') return res.status(405).json({ message: 'POST only' });

    if (!process.env.SQUARE_ACCESS_TOKEN || !process.env.SQUARE_LOCATION_ID) {
      return res.status(500).json({ message: 'Server missing Square env vars' });
    }

    // Body can arrive parsed or as a string depending on runtime — handle both.
    let body = req.body;
    if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
    const lineItems = body?.lineItems;

    if (!Array.isArray(lineItems) || lineItems.length === 0) {
      return res.status(400).json({ message: 'Empty cart' });
    }

    const clean = lineItems
      .filter((li) => typeof li.variationId === 'string' && li.variationId.length > 0)
      .map((li) => {
        const q = Math.max(1, Math.min(50, parseInt(li.quantity, 10) || 1));
        return { catalog_object_id: li.variationId, quantity: String(q) };
      });
    if (clean.length === 0) return res.status(400).json({ message: 'No valid items' });

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

    if (!r.ok) {
      // Surface Square's real reason so the browser/logs can show it.
      const first = data?.errors?.[0];
      return res.status(502).json({
        message: first ? `Square: ${first.code} — ${first.detail}` : 'Square rejected the order',
        square_status: r.status,
        square_errors: data?.errors ?? data,
      });
    }

    if (!data?.payment_link?.url) {
      return res.status(502).json({ message: 'No checkout URL returned', raw: data });
    }

    return res.status(200).json({ url: data.payment_link.url });
  } catch (err) {
    // This is what was previously becoming an opaque 500.
    return res.status(500).json({ message: 'Function crashed', error: String(err) });
  }
}