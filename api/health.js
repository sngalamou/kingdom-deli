// api/health.js — throwaway wiring check. DELETE before launch.
// Confirms the function sees SQUARE_ACCESS_TOKEN and can reach Square. No charges.
export default async function handler(req, res) {
  const token = process.env.SQUARE_ACCESS_TOKEN;
  const locationId = process.env.SQUARE_LOCATION_ID;

  const report = {
    sees_SQUARE_ACCESS_TOKEN: Boolean(token),
    sees_SQUARE_LOCATION_ID: Boolean(locationId),
    token_preview: token ? `${token.slice(0, 4)}…${token.slice(-2)}` : null,
  };

  if (!token) {
    return res.status(500).json({ ok: false, ...report,
      error: 'SQUARE_ACCESS_TOKEN not visible to this function' });
  }

  try {
    const r = await fetch('https://connect.squareup.com/v2/locations', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Square-Version': '2025-05-21',   // match your dashboard's API version
        'Content-Type': 'application/json',
      },
    });
    const data = await r.json();
    if (!r.ok) {
      return res.status(502).json({ ok: false, ...report,
        square_status: r.status, square_error: data });
    }
    const locations = (data.locations || []).map((l) =>
      ({ id: l.id, name: l.name, status: l.status }));
    return res.status(200).json({
      ok: true,
      ...report,
      reached_square: true,
      location_count: locations.length,
      location_id_matches_a_location: locationId
        ? locations.some((l) => l.id === locationId) : null,
      locations,
    });
  } catch (err) {
    return res.status(502).json({ ok: false, ...report, error: String(err) });
  }
}