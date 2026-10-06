// Upstash Redis over REST: no packages needed. The Vercel integration may add a custom prefix
// (STORAGE_KV_REST_API_URL, …), so match on the suffix; the read-only token is skipped.
const envBy = re => { const k = Object.keys(process.env).find(n => re.test(n) && !/READ_ONLY/.test(n)); return k && process.env[k]; };
const URL_ = envBy(/(KV_REST_API|REDIS_REST)_URL$/);
const TOKEN = envBy(/(KV_REST_API|REDIS_REST)_TOKEN$/);

async function pipeline(cmds) {
  if (!URL_ || !TOKEN) throw new Error('Redis ulanmagan');
  const r = await fetch(URL_ + '/pipeline', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + TOKEN, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmds)
  });
  if (!r.ok) throw new Error('Redis ' + r.status);
  return (await r.json()).map(x => x.result);
}
const cmd = async (...c) => (await pipeline([c]))[0];

// Every button the site counts. The admin panel shows them in this order.
const TRACK = {
  'view': 'Sayt ochildi',
  'nav-yozilish': 'Menyu: «Yozilish»',
  'hero-telegram': 'Bosh ekran: «Telegramda yozilish»',
  'hero-tariflar': 'Bosh ekran: «Tariflarni koʻrish»',
  'c1-yozilish': 'Motion Mastery Club: «Kursga yozilish»',
  'c2-yozilish': 'Motion — 0 dan: «Kursga yozilish»',
  'faq-telegram': 'Savollar: @telegram link',
  'close-telegram': 'Pastki blok: Telegramga yozish',
  'close-instagram': 'Pastki blok: Instagram',
  'banner': 'Eʼlon yozuvi',
  'foot-kanal': 'Footer: Telegram kanal',
  'foot-telegram': 'Footer: @telegram',
  'foot-instagram': 'Footer: Instagram'
};

const DEFAULT_CONFIG = {
  courses: {
    c1: { price: 100, sale: null, saleUntil: '', soldOut: false },
    c2: { price: 200, sale: null, saleUntil: '', soldOut: false }
  },
  telegram: 'adhamov_motion',
  banner: { on: false, text: '', until: '' }
};

async function getConfig() {
  const raw = await cmd('GET', 'config');
  if (!raw) return DEFAULT_CONFIG;
  try {
    const c = JSON.parse(raw);
    return { ...DEFAULT_CONFIG, ...c, courses: { ...DEFAULT_CONFIG.courses, ...c.courses }, banner: { ...DEFAULT_CONFIG.banner, ...c.banner } };
  } catch { return DEFAULT_CONFIG; }
}

// Days are counted in Tashkent time (UTC+5), so "bugun" matches the owner's day.
const dayKey = (d = new Date()) => new Date(d.getTime() + 5 * 3600e3).toISOString().slice(0, 10);

module.exports = { pipeline, cmd, TRACK, DEFAULT_CONFIG, getConfig, dayKey };
