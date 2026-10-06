const { pipeline, TRACK, dayKey } = require('./_db');

const BOT = /bot|crawl|spider|preview|facebookexternalhit|telegram|whatsapp|slurp|vercel/i;

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).end();
  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  const id = body && body.id;
  if (!TRACK[id] || BOT.test(req.headers['user-agent'] || '')) return res.status(204).end();
  const day = 'clicks:' + dayKey();
  try {
    await pipeline([
      ['HINCRBY', 'clicks', id, 1],
      ['HINCRBY', day, id, 1],
      ['EXPIRE', day, 60 * 60 * 24 * 400]
    ]);
  } catch {}
  res.status(204).end();
};
