const crypto = require('crypto');
const { pipeline, cmd, TRACK, getConfig, dayKey } = require('./_db');

const sha = s => crypto.createHash('sha256').update(String(s)).digest();
const passOk = given => {
  const real = process.env.ADMIN_PASSWORD;
  return !!real && !!given && crypto.timingSafeEqual(sha(given), sha(real));
};

const int = (v, min, max) => { const n = Math.round(Number(v)); return Number.isFinite(n) && n >= min && n <= max ? n : null; };
const date = v => (typeof v === 'string' && v && !isNaN(Date.parse(v)) ? new Date(v).toISOString() : '');

function clean(input, prev) {
  const out = { courses: {}, telegram: prev.telegram, banner: { on: false, text: '', until: '' } };
  for (const id of ['c1', 'c2']) {
    const c = (input.courses && input.courses[id]) || {};
    const price = int(c.price, 1, 100000) ?? prev.courses[id].price;
    const sale = c.sale === '' || c.sale == null ? null : int(c.sale, 0, 100000);
    out.courses[id] = {
      price,
      sale: sale != null && sale < price ? sale : null,
      saleUntil: date(c.saleUntil),
      soldOut: !!c.soldOut
    };
  }
  const tg = String(input.telegram || '').trim().replace(/^@|^https?:\/\/t\.me\//i, '');
  if (/^[A-Za-z0-9_]{4,32}$/.test(tg)) out.telegram = tg;
  const b = input.banner || {};
  out.banner = { on: !!b.on, text: String(b.text || '').trim().slice(0, 160), until: date(b.until) };
  if (!out.banner.text) out.banner.on = false;
  return out;
}

async function stats(days) {
  const keys = [];
  for (let i = days - 1; i >= 0; i--) keys.push(dayKey(new Date(Date.now() - i * 864e5)));
  const res = await pipeline([['HGETALL', 'clicks'], ...keys.map(k => ['HGETALL', 'clicks:' + k])]);
  // Upstash returns HGETALL as a flat [field, value, ...] array
  const toObj = arr => { const o = {}; for (let i = 0; arr && i < arr.length; i += 2) o[arr[i]] = Number(arr[i + 1]); return o; };
  return {
    labels: TRACK,
    total: toObj(res[0]),
    days: keys.map((date, i) => ({ date, counts: toObj(res[i + 1]) }))
  };
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'x';
  const failKey = 'fail:' + ip;
  try {
    // Lock an IP out for 15 minutes after 8 wrong passwords
    const fails = Number(await cmd('GET', failKey)) || 0;
    if (fails >= 8) return res.status(429).json({ error: 'Juda koʻp urinish. 15 daqiqadan keyin qayta urinib koʻring.' });
    if (!passOk(req.headers['x-admin-key'])) {
      await pipeline([['INCR', failKey], ['EXPIRE', failKey, 900]]);
      return res.status(401).json({ error: 'Parol notoʻgʻri' });
    }

    if (req.method === 'GET') {
      const days = int(req.query.days, 1, 90) || 30;
      const [config, s] = await Promise.all([getConfig(), stats(days)]);
      return res.status(200).json({ config, stats: s });
    }
    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') body = JSON.parse(body);
      const config = clean(body || {}, await getConfig());
      await cmd('SET', 'config', JSON.stringify(config));
      return res.status(200).json({ config });
    }
    res.status(405).end();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
