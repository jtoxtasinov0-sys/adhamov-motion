(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduce) root.classList.add('js-motion');

  /* ---------- Smooth scroll (Lenis, optional) ---------- */
  let lenis = null;
  const startLenis = () => {
    if (reduce || !window.Lenis || lenis) return;
    lenis = new window.Lenis({ duration: 1.15, easing: t => 1 - Math.pow(1 - t, 4), smoothWheel: true });
    const raf = time => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const id = a.getAttribute('href');
        const target = id.length > 1 && document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: id === '#top' ? 0 : -80 });
      });
    });
  };
  window.addEventListener('load', startLenis);

  /* ---------- Nav state ---------- */
  const nav = document.getElementById('nav');
  const hero = document.querySelector('.hero');
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 40);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- After Effects speed graph: one ease drives the page ---------- */
  const svg = document.getElementById('graphSvg');
  const curveEl = document.getElementById('aeCurve');
  const gridEl = document.getElementById('aeGrid');
  const h1 = document.getElementById('h1');
  const h2 = document.getElementById('h2');
  const inflL = document.getElementById('aeInflL');
  const inflR = document.getElementById('aeInflR');
  const anchor = document.getElementById('aeAnchor');
  const dot = document.getElementById('aeDot');
  const ph = document.getElementById('aePlayhead');
  const value = document.getElementById('graphValue');
  const ball = document.getElementById('graphBall');
  const playBtn = document.getElementById('graphPlay');
  const NS = 'http://www.w3.org/2000/svg';
  // plot area
  const L = 40, R = 294, TOP = 44, BASE = 190, DUR = 1.2; // seconds the curve represents
  const infl = { a: 0.33, b: 0.33 }; // AE influence (outgoing, incoming)

  const bez = (t, p1, p2) => 3 * (1 - t) * (1 - t) * t * p1 + 3 * (1 - t) * t * t * p2 + t * t * t;
  const dbez = (t, p1, p2) => 3 * (1 - t) * (1 - t) * p1 + 6 * (1 - t) * t * (p2 - p1) + 3 * t * t * (1 - p2);
  // value curve = cubic-bezier(a, 0, 1-b, 1); speed = dy/dx
  const samples = () => {
    const out = [];
    for (let i = 0; i <= 400; i++) {
      const t = i / 400;
      const x = bez(t, infl.a, 1 - infl.b);
      const dx = dbez(t, infl.a, 1 - infl.b);
      const dy = dbez(t, 0, 1);
      out.push([x, dx > 1e-6 ? dy / dx : 0, bez(t, 0, 1)]);
    }
    return out;
  };
  const niceMax = v => {
    const p = Math.pow(10, Math.floor(Math.log10(v)));
    for (const m of [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10]) if (m * p >= v) return m * p;
    return 10 * p;
  };
  let pts = [], yMax = 1;
  const px = x => L + x * (R - L);
  const py = s => BASE - (s / yMax) * (BASE - TOP);

  const draw = () => {
    pts = samples();
    const peak = Math.max(...pts.map(p => p[1])) * 100 / DUR; // %/sec
    yMax = niceMax(peak * 1.08) * DUR / 100;
    gridEl.textContent = '';
    const steps = 5, labelMax = yMax * 100 / DUR;
    for (let i = 0; i <= steps; i++) {
      const y = BASE - i / steps * (BASE - TOP);
      const ln = document.createElementNS(NS, 'line');
      ln.setAttribute('class', 'ae-gl');
      ln.setAttribute('x1', L - 4); ln.setAttribute('x2', 320); ln.setAttribute('y1', y); ln.setAttribute('y2', y);
      gridEl.appendChild(ln);
      const tx = document.createElementNS(NS, 'text');
      tx.setAttribute('class', 'ae-ylbl'); tx.setAttribute('x', L - 7); tx.setAttribute('y', y + 3);
      tx.setAttribute('text-anchor', 'end');
      tx.textContent = Math.round(labelMax * i / steps);
      gridEl.appendChild(tx);
    }
    curveEl.setAttribute('d', pts.map((p, i) => `${i ? 'L' : 'M'}${px(p[0]).toFixed(2)} ${py(p[1]).toFixed(2)}`).join(''));
    // AE-style: each yellow handle extends from its keyframe by half its influence,
    // so at 100% both meet in the middle and the speed curve becomes a spike
    const xa = px(infl.a / 2), xb = px(1 - infl.b / 2);
    h1.setAttribute('transform', `translate(${xa.toFixed(2)} ${BASE})`); h2.setAttribute('transform', `translate(${xb.toFixed(2)} ${BASE})`);
    inflL.setAttribute('x2', xa); inflR.setAttribute('x2', xb);
    anchor.setAttribute('transform', `translate(${((xa + xb) / 2).toFixed(1)} ${BASE})`);
    const ease = `cubic-bezier(${infl.a.toFixed(2)}, 0, ${(1 - infl.b).toFixed(2)}, 1)`;
    root.style.setProperty('--ease', ease);
    value.textContent = `Influence ${Math.round(infl.a * 100)}% · ${Math.round(infl.b * 100)}%`;
    h1.setAttribute('aria-valuenow', Math.round(infl.a * 100));
    h2.setAttribute('aria-valuenow', Math.round(infl.b * 100));
  };

  const svgX = e => {
    const p = svg.createSVGPoint(); p.x = e.clientX; p.y = e.clientY;
    return p.matrixTransform(svg.getScreenCTM().inverse()).x;
  };
    const clampKey = (key, v) => Math.min(0.99, Math.max(0.02, v));
  let dragging = null, pending = null, startX = 0, activeEl = null;
  const grips = { a: h1, b: h2 };
  const onDown = (el, key) => e => {
    e.preventDefault();
    activeEl = el;
    el.setPointerCapture(e.pointerId);
    startX = svgX(e);
    // handles sitting on top of each other: let the drag direction pick which one moves
    const gap = Math.abs(px(infl.a / 2) - px(1 - infl.b / 2));
    if (gap < 24) { pending = true; dragging = null; }
    else { pending = false; dragging = key; el.classList.add('is-drag'); }
  };
  const onMove = e => {
    if (!activeEl) return;
    const sx = svgX(e);
    if (pending) {
      if (Math.abs(sx - startX) < 2) return;
      dragging = sx < startX ? 'a' : 'b';
      pending = false;
      grips[dragging].classList.add('is-drag');
    }
    if (!dragging) return;
    const x = (sx - L) / (R - L);
    infl[dragging] = clampKey(dragging, dragging === 'a' ? x * 2 : (1 - x) * 2);
    draw();
  };
  const onUp = () => {
    if (!activeEl) return;
    const moved = dragging;
    activeEl = null; pending = null;
    h1.classList.remove('is-drag'); h2.classList.remove('is-drag');
    dragging = null;
    if (moved) play();
  };
  // iOS/Telegram WebView ignores touch-action on SVG children: block native panning by hand
  const stopTouch = e => { if (activeEl || e.target.closest('.ae-grip')) e.preventDefault(); };
  svg.addEventListener('touchstart', stopTouch, { passive: false });
  svg.addEventListener('touchmove', stopTouch, { passive: false });
  [[h1, 'a'], [h2, 'b']].forEach(([el, key]) => {
    el.addEventListener('pointerdown', onDown(el, key));
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    el.addEventListener('keydown', e => {
      const step = e.shiftKey ? 0.1 : 0.02;
      const d = { ArrowLeft: -step, ArrowRight: step }[e.key];
      if (d === undefined) return;
      e.preventDefault();
      infl[key] = clampKey(key, infl[key] + (key === 'a' ? d : -d));
      draw();
    });
    el.addEventListener('keyup', e => { if (e.key.startsWith('Arrow')) play(); });
  });

  /* ---------- Headline: per-letter reveal, "mixlab" nails itself to the screen ---------- */
  const title = document.getElementById('heroTitle');
  title.setAttribute('aria-label', title.textContent.replace(/\s+/g, ' ').trim());
  const chars = [];
  title.querySelectorAll('.word').forEach(w => {
    const text = w.textContent;
    w.textContent = '';
    w.setAttribute('aria-hidden', 'true');
    [...text].forEach(c => {
      const s = document.createElement('span');
      s.className = 'ch'; s.textContent = c;
      w.appendChild(s);
      chars.push({ el: s, nail: w.classList.contains('word--outline'), line: [...title.children].indexOf(w.closest('.line')) });
    });
  });
  let titleAnims = [];
  const playTitle = () => {
    if (reduce) { chars.forEach(c => { c.el.style.opacity = 1; }); return; }
    titleAnims.forEach(a => a.cancel());
    titleAnims = [];
    const ease = getComputedStyle(root).getPropertyValue('--ease').trim();
    let i = 0, nailAt = 0;
    chars.forEach(c => {
      if (c.nail) return;
      const delay = c.line * 110 + i++ * 22;
      titleAnims.push(c.el.animate([
        { opacity: 0, transform: 'translate3d(0, .42em, 0) rotate(6deg)', filter: 'blur(12px)' },
        { opacity: 1, transform: 'translate3d(0, 0, 0) rotate(0)', filter: 'blur(0)' }
      ], { duration: 1000, delay, easing: ease, fill: 'both' }));
      if (c.line === 0) nailAt = Math.max(nailAt, delay);
    });
    // the nail: slams in from the camera, overshoots, settles; the line takes the hit
    const hit = nailAt + 520;
    chars.filter(c => c.nail).forEach((c, k) => {
      titleAnims.push(c.el.animate([
        { opacity: 0, transform: 'translate3d(0, -.15em, 0) scale(2.6)', filter: 'blur(18px)' },
        { opacity: 1, transform: 'translate3d(0, .04em, 0) scale(.92)', filter: 'blur(0)', offset: .62 },
        { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1.03)', offset: .82 },
        { opacity: 1, transform: 'none', filter: 'blur(0)' }
      ], { duration: 640, delay: hit + k * 18, easing: 'cubic-bezier(.7, 0, .2, 1)', fill: 'both' }));
    });
    titleAnims.push(title.animate([
      { transform: 'translate3d(0, 0, 0)' },
      { transform: 'translate3d(-5px, 3px, 0)' },
      { transform: 'translate3d(4px, -2px, 0)' },
      { transform: 'translate3d(-2px, 1px, 0)' },
      { transform: 'translate3d(0, 0, 0)' }
    ], { duration: 260, delay: hit + 400, easing: 'linear' }));
  };

  // Playhead sweeps the graph in linear time; dot rides the speed curve; ball shows the value.
  let raf = 0;
  const play = (withTitle = true) => {
    if (withTitle) playTitle();
    if (reduce) { ball.style.left = '100%'; return; }
    cancelAnimationFrame(raf);
    dot.classList.add('is-on');
    const t0 = performance.now(), dur = DUR * 1000;
    const step = now => {
      const k = Math.min(1, (now - t0) / dur);
      let j = 1; while (j < pts.length - 1 && pts[j][0] < k) j++;
      const [x0, s0, v0] = pts[j - 1], [x1, s1, v1] = pts[j];
      const f = x1 > x0 ? (k - x0) / (x1 - x0) : 0;
      const s = s0 + (s1 - s0) * f, v = v0 + (v1 - v0) * f;
      ph.setAttribute('transform', `translate(${px(k).toFixed(2)} 0)`);
      dot.setAttribute('cx', px(k)); dot.setAttribute('cy', py(s));
      ball.style.left = `${v * 100}%`;
      if (k < 1) raf = requestAnimationFrame(step);
      else dot.classList.remove('is-on');
    };
    raf = requestAnimationFrame(step);
  };
  playBtn.addEventListener('click', () => play());
  draw();

  /* ---------- Hero intro ---------- */
  const intro = () => requestAnimationFrame(() => {
    hero.classList.add('is-played');
    playTitle();
    if (!reduce) setTimeout(() => play(false), 1700); else ball.style.left = '100%';
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(intro); else intro();

  /* ---------- Timecode + playhead (25 fps, since page opened) ---------- */
  const tc = document.getElementById('timecode');
  const head = document.getElementById('playhead');
  const t0 = performance.now();
  const pad = n => String(n).padStart(2, '0');
  let heroVisible = true;
  new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }).observe(hero);
  const tick = now => {
    if (heroVisible) {
      const s = (now - t0) / 1000;
      const f = Math.floor((s % 1) * 25);
      tc.textContent = `00:${pad(Math.floor(s / 60) % 60)}:${pad(Math.floor(s) % 60)}:${pad(f)}`;
      if (!reduce) {
        const loop = (s % 8) / 8;
        head.style.left = `${loop * 100}%`;
      }
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  /* ---------- Hero photo parallax ---------- */
  // Transform the masked wrapper itself: a moving layer under a mask leaves stale tiles on iOS Safari
  const photo = document.querySelector('.hero__photo');
  if (!reduce) {
    let ticking = false;
    addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, hero.offsetHeight);
        if (hero.classList.contains('is-played')) {
          photo.style.transform = `translateY(${y * 0.18}px) scale(${1 + y / hero.offsetHeight * 0.06})`;
        }
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- Reveals ---------- */
  document.querySelectorAll('.timeline__layers li').forEach((li, i, all) => {
    const siblings = [...li.parentElement.children];
    li.style.setProperty('--i', siblings.indexOf(li));
  });
  document.querySelectorAll('.faq__list .reveal').forEach((el, i) => el.style.setProperty('--d', `${i * 0.07}s`));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal, .close').forEach(el => io.observe(el));

  /* ---------- Course timeline playhead follows scroll ---------- */
  const timelines = [...document.querySelectorAll('[data-timeline]')];
  const scrub = () => {
    const vh = innerHeight;
    timelines.forEach(t => {
      const r = t.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.5)));
      t.style.setProperty('--p', p.toFixed(4));
    });
  };
  if (!reduce) { addEventListener('scroll', scrub, { passive: true }); scrub(); }

  /* ---------- Work wall: tiles play in view, click opens the HD cut ---------- */
  const wall = document.querySelector('.wall');
  if (wall) {
    const tiles = [...wall.querySelectorAll('.tile')];
    const lb = document.getElementById('lightbox');
    const lv = lb.querySelector('video');
    // Start playback only after the blur-in reveal has finished: a video playing under a running filter flickers on iOS
    let settled = reduce || !wall.classList.contains('reveal');
    const visible = new Set();
    const sync = () => tiles.forEach(t => {
      const v = t.querySelector('video');
      if (settled && !reduce && visible.has(t) && !lb.open && !document.hidden) { v.preload = 'auto'; v.play().catch(() => {}); }
      else v.pause();
    });
    tiles.forEach(t => {
      const v = t.querySelector('video');
      t.style.backgroundImage = `url("${v.getAttribute('poster')}")`;
      v.addEventListener('playing', () => {
        const shown = () => t.classList.add('is-playing');
        if (v.requestVideoFrameCallback) v.requestVideoFrameCallback(shown); else setTimeout(shown, 120);
      }, { once: true });
      t.addEventListener('click', () => open(t));
    });
    const tio = new IntersectionObserver(es => { es.forEach(e => e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)); sync(); }, { threshold: matchMedia('(max-width: 860px)').matches ? 0.9 : 0.2 });
    tiles.forEach(t => tio.observe(t));
    document.addEventListener('visibilitychange', sync);
    new MutationObserver(() => { if (wall.classList.contains('is-in')) setTimeout(() => { settled = true; sync(); }, 600); })
      .observe(wall, { attributes: true, attributeFilter: ['class'] });

    const open = t => {
      lv.src = t.dataset.full;
      lv.poster = t.querySelector('video').getAttribute('poster');
      lv.muted = false;
      lb.showModal();
      document.documentElement.style.overflow = 'hidden';
      lenis && lenis.stop();
      sync();
      lv.play().catch(() => { lv.muted = true; lv.play().catch(() => {}); });
    };
    lb.addEventListener('close', () => { lv.pause(); lv.removeAttribute('src'); lv.load(); document.documentElement.style.overflow = ''; lenis && lenis.start(); sync(); });
    lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
    lb.querySelector('.lightbox__close').addEventListener('click', () => lb.close());
  }
  /* ---------- Arrow cursor: white pointer trails the mouse over video tiles, desktop pointers only ---------- */
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const dot = document.createElement('div');
    dot.className = 'cursor';
    dot.setAttribute('aria-hidden', 'true');
    dot.innerHTML = '<svg viewBox="0 0 24 24"><path d="M4 4.2 19.6 13.3 12.4 15.6 7.7 21.3Z"/></svg>';
    document.body.append(dot);
    document.documentElement.classList.add('has-cursor');

    let mx = -200, my = -200, x = mx, y = my, s = 0, target = 0, raf = 0;
    const tick = () => {
      if (reduce) { x = mx; y = my; s = target; }
      else {
        // While hidden, sit on the pointer so the arrow grows in place instead of flying in from the edge
        if (s < 0.02) { x = mx; y = my; } else { x += (mx - x) * 0.22; y += (my - y) * 0.22; }
        s += (target - s) * 0.18;
        if (target === 0 && s < 0.005) s = 0;
      }
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${s.toFixed(3)})`;
      const moving = Math.abs(mx - x) > 0.1 || Math.abs(my - y) > 0.1 || Math.abs(target - s) > 0.001;
      raf = moving ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const hit = node => {
      target = node && node.closest && node.closest('.tile') ? 1 : 0;
      kick();
    };
    addEventListener('pointermove', e => {
      if (e.pointerType !== 'mouse') return;
      mx = e.clientX; my = e.clientY;
      hit(e.target);
    }, { passive: true });
    // Content slides under a still pointer while scrolling
    addEventListener('scroll', () => { if (mx > 0) hit(document.elementFromPoint(mx, my)); }, { passive: true });
    document.documentElement.addEventListener('mouseleave', () => { target = 0; kick(); });
  }
})();

/* ---------- Admin-driven content (prices, sale, sold out, banner, Telegram) and click counting ---------- */
(() => {
  const send = id => {
    const body = JSON.stringify({ id });
    try {
      if (!navigator.sendBeacon('/api/track', new Blob([body], { type: 'application/json' }))) throw 0;
    } catch { fetch('/api/track', { method: 'POST', body, keepalive: true, headers: { 'Content-Type': 'application/json' } }).catch(() => {}); }
  };
  // One "view" per tab session, so reloads don't inflate the count
  let seen = false;
  try { seen = sessionStorage.getItem('mmc-view') === '1'; sessionStorage.setItem('mmc-view', '1'); } catch {}
  if (!seen) send('view');
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-track]');
    if (a) send(a.dataset.track);
  });

  const MONTHS = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'];
  const live = until => !until || Date.parse(until) > Date.now();
  const left = until => {
    const ms = Date.parse(until) - Date.now();
    const d = Math.floor(ms / 864e5), h = Math.floor(ms / 36e5) % 24;
    if (d >= 1) return `${d} kun ${h} soat qoldi`;
    return `${Math.max(1, Math.ceil(ms / 36e5))} soat qoldi`;
  };

  const apply = cfg => {
    if (!cfg || !cfg.courses) return;
    for (const id of ['c1', 'c2']) {
      const c = cfg.courses[id], name = document.getElementById(id);
      if (!c || !name) continue;
      const card = name.closest('.course'), price = card.querySelector('.course__price');
      const onSale = c.sale != null && c.sale < c.price && live(c.saleUntil);
      card.classList.toggle('is-sale', onSale);
      card.querySelector('.course__sale')?.remove();
      if (onSale) {
        const pct = Math.round((1 - c.sale / c.price) * 100);
        price.innerHTML = `<s class="price__old"><span class="cur">$</span>${c.price}</s><span class="cur">$</span>${c.sale}`;
        const tag = document.createElement('p');
        tag.className = 'course__sale';
        const end = c.saleUntil ? new Date(c.saleUntil) : null;
        tag.innerHTML = `<b>−${pct}% chegirma</b>` + (end ? `<span>${end.getDate()}-${MONTHS[end.getMonth()]}gacha · ${left(c.saleUntil)}</span>` : '');
        card.querySelector('.course__head').after(tag);
      } else {
        price.innerHTML = `<span class="cur">$</span>${c.price}`;
      }
      card.classList.toggle('is-soldout', !!c.soldOut);
      const btn = card.querySelector('.btn--block');
      btn.firstChild.textContent = c.soldOut ? '\n      Joylar tugadi · navbatga yozilish\n      ' : '\n      Kursga yozilish\n      ';
    }

    if (cfg.telegram && cfg.telegram !== 'adhamov_motion') {
      document.querySelectorAll('[data-tg]').forEach(a => {
        a.href = 'https://t.me/' + cfg.telegram;
        a.childNodes.forEach(n => { if (n.nodeType === 3) n.textContent = n.textContent.replace('@adhamov_motion', '@' + cfg.telegram); });
      });
    }

    const b = cfg.banner;
    let closed = false;
    try { closed = sessionStorage.getItem('mmc-banner') === b.text; } catch {}
    if (b && b.on && b.text && live(b.until) && !closed) {
      const bar = document.createElement('div');
      bar.className = 'promo';
      bar.setAttribute('role', 'status');
      bar.innerHTML = '<a class="promo__text" href="#kurslar" data-track="banner"></a><button class="promo__x" type="button" aria-label="Yopish"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg></button>';
      bar.querySelector('.promo__text').textContent = b.text;
      bar.querySelector('.promo__x').addEventListener('click', () => {
        bar.classList.remove('is-in');
        try { sessionStorage.setItem('mmc-banner', b.text); } catch {}
        setTimeout(() => bar.remove(), 500);
      });
      document.body.append(bar);
      setTimeout(() => bar.classList.add('is-in'), 1600);
    }
  };

  fetch('/api/config').then(r => (r.ok ? r.json() : null)).then(apply).catch(() => {});
})();
