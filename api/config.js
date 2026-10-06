const { getConfig } = require('./_db');

module.exports = async (req, res) => {
  try {
    const config = await getConfig();
    // Short CDN cache: admin changes reach the site within ~15 s without hitting Redis on every visit
    res.setHeader('Cache-Control', 'public, s-maxage=15, stale-while-revalidate=60');
    res.status(200).json(config);
  } catch (e) {
    res.setHeader('Cache-Control', 'no-store');
    res.status(503).json({ error: e.message });
  }
};
