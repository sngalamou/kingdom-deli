// api/catalog.js — TEMPORARY. Lists orderable variations + IDs. Delete after copying output.
export default async function handler(req, res) {
  const token = process.env.SQUARE_ACCESS_TOKEN;
  const r = await fetch('https://connect.squareup.com/v2/catalog/list?types=ITEM', {
    headers: { Authorization: `Bearer ${token}`, 'Square-Version': '2025-05-21' },
  });
  const data = await r.json();
  if (!r.ok) return res.status(502).json({ error: data });
  const items = (data.objects || []).flatMap((it) =>
    (it.item_data?.variations || []).map((v) => ({
      label: it.item_data?.name + (v.item_variation_data?.name ? ` — ${v.item_variation_data.name}` : ''),
      variationId: v.id,
      priceCents: v.item_variation_data?.price_money?.amount ?? null,
    }))
  );
  res.status(200).json({ count: items.length, items });
}