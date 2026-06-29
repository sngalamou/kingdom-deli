export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const { lineItems } = req.body;               // [{ name, quantity, amountCents }]
  if (!lineItems?.length) return res.status(400).json({ error: 'Empty cart' });

  const resp = await fetch('https://connect.squareup.com/v2/online-checkout/payment-links', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SQUARE_ACCESS_TOKEN}`,
      'Square-Version': '2025-05-21',           // set to the current version in your Square dashboard
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      idempotency_key: crypto.randomUUID(),
      order: {
        location_id: process.env.SQUARE_LOCATION_ID,
        line_items: lineItems.map((li) => ({
          name: li.name,
          quantity: String(li.quantity),
          base_price_money: { amount: li.amountCents, currency: 'USD' },
        })),
      },
      checkout_options: { redirect_url: 'https://YOURDOMAIN/order/thanks' },
    }),
  });

  const data = await resp.json();
  if (!resp.ok) return res.status(502).json({ error: data });
  res.status(200).json({ url: data.payment_link.url });
}