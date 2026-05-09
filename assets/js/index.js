/* ==========================================================================
   VIKRAM ENGINEERING · V3
   ========================================================================== */
(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ---------- Loader ---------- */
  const loader = $('#loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader?.classList.add('is-done'), 2000);
  });
  // Fallback
  setTimeout(() => loader?.classList.add('is-done'), 3000);

  /* ---------- Year ---------- */
  const y = $('#year'); if (y) y.textContent = new Date().getFullYear();

  /* ---------- Nav scroll state ---------- */
  const nav = $('#nav');
  const onScroll = () => {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const burger = $('#burger');
  const mobileMenu = $('#mobileMenu');
  burger?.addEventListener('click', () => {
    burger.classList.toggle('is-open');
    mobileMenu?.classList.toggle('is-open');
  });
  $$('#mobileMenu a').forEach(a => a.addEventListener('click', () => {
    burger?.classList.remove('is-open');
    mobileMenu?.classList.remove('is-open');
  }));

  /* ---------- Custom cursor ---------- */
  const cursor = $('.cursor');
  const cursorDot = $('.cursor-dot');
  if (cursor && cursorDot && window.matchMedia('(pointer: fine)').matches) {
    let mx = 0, my = 0, cx = 0, cy = 0;
    window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
    const loop = () => {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      cursor.style.transform = `translate(${cx - 16}px, ${cy - 16}px)`;
      cursorDot.style.transform = `translate(${mx - 2}px, ${my - 2}px)`;
      requestAnimationFrame(loop);
    };
    loop();
    const hoverables = 'a, button, .product, .spec-card, .timeline li, .pill, label, input, select, textarea';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverables)) cursor.classList.add('is-hover');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverables)) cursor.classList.remove('is-hover');
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  $$('[data-reveal]').forEach(el => io.observe(el));

  /* ---------- Count-up stats ---------- */
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target;
      const to = parseInt(el.dataset.to, 10) || 0;
      const dur = 1800;
      const start = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(to * eased);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      countIO.unobserve(el);
    });
  }, { threshold: 0.5 });
  $$('.count').forEach(el => { el.textContent = '0'; countIO.observe(el); });

  /* ---------- Hero ring ticks ---------- */
  const ticksG = $('.ring-ticks');
  if (ticksG) {
    const cx = 300, cy = 300;
    let svg = '';
    for (let i = 0; i < 72; i++) {
      const a = (i / 72) * Math.PI * 2;
      const r1 = 250, r2 = i % 6 === 0 ? 268 : 258;
      const x1 = cx + Math.cos(a) * r1, y1 = cy + Math.sin(a) * r1;
      const x2 = cx + Math.cos(a) * r2, y2 = cy + Math.sin(a) * r2;
      svg += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke-width="${i % 6 === 0 ? 1 : 0.5}" />`;
    }
    ticksG.innerHTML = svg;
  }

  /* ---------- Parallax hero ring ---------- */
  const ring = $('.hero__ring');
  if (ring && window.matchMedia('(pointer: fine)').matches) {
    let rx = 0, ry = 0, tx = 0, ty = 0;
    window.addEventListener('mousemove', (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      tx = nx * 20; ty = ny * 20;
    });
    const loop = () => {
      rx += (tx - rx) * 0.06;
      ry += (ty - ry) * 0.06;
      ring.style.transform = `translate(${rx}px, calc(-50% + ${ry}px))`;
      requestAnimationFrame(loop);
    };
    loop();

    // Scroll parallax
    window.addEventListener('scroll', () => {
      const sc = window.scrollY;
      if (sc < window.innerHeight) {
        ring.style.opacity = 1 - sc / window.innerHeight * 0.7;
      }
    }, { passive: true });
  }

  /* World map is a static image + HTML-positioned pins (see index.html) */

  /* ---------- Smooth scroll for anchors ---------- */
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          window.scrollTo({ top: target.offsetTop - 40, behavior: 'smooth' });
        }
      }
    });
  });

})();
