/* EJT DIGITAL — main.js
   Mobile menu, scroll animations, counter animations, form validation.
   Vanilla JS. Zero dependencies. */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile menu toggle ───────────────────────────── */
  const toggle = document.querySelector('.nav-toggle');
  const body = document.body;
  if (toggle) {
    toggle.addEventListener('click', () => {
      body.classList.toggle('menu-open');
      toggle.textContent = body.classList.contains('menu-open') ? '×' : '≡';
      toggle.setAttribute('aria-expanded', body.classList.contains('menu-open'));
    });
  }
  document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', () => {
      body.classList.remove('menu-open');
      if (toggle) toggle.textContent = '≡';
    });
  });

  /* ── Active nav based on current page ─────────────── */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === 'index.html' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ── Scroll reveal (fade-in-up when element enters viewport) ── */
  const revealEls = document.querySelectorAll('.reveal, .section-head, .layer-card, .step, .work-card, .pkg-card, .hero-proof, .founder-block');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -80px 0px' });
    revealEls.forEach(el => {
      if (!el.classList.contains('reveal')) el.classList.add('reveal');
      io.observe(el);
    });
  } else {
    // Fallback for very old browsers — just show everything
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ── Counter animation for stats (10×, 60+, 6×, R3,500 etc.) ── */
  function animateCounter(el) {
    const raw = (el.getAttribute('data-count') || el.textContent).trim();
    // Parse: extract leading number (int or float), keep prefix + suffix
    const match = raw.match(/^([^0-9]*)([0-9,\s]+)(.*)$/);
    if (!match) return;
    const prefix = match[1] || '';
    const numString = match[2].replace(/[\s,]/g, '');
    const suffix = match[3] || '';
    const target = parseInt(numString, 10);
    if (isNaN(target)) return;
    const duration = 1600;
    const startTime = performance.now();
    const format = (n) => {
      // Add commas to thousands if original had them
      if (match[2].includes(',')) {
        return n.toLocaleString('en-ZA');
      }
      return n.toString();
    };
    function frame(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      el.textContent = prefix + format(current) + suffix;
      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = prefix + format(target) + suffix;
        el.classList.add('counted');
      }
    }
    requestAnimationFrame(frame);
  }

  const counters = document.querySelectorAll('.stat[data-count], .hero-proof-num[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          animateCounter(e.target);
          countObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(c => countObserver.observe(c));
  } else {
    // Fallback — just set final values
    counters.forEach(c => {
      const raw = c.getAttribute('data-count') || c.textContent;
      c.textContent = raw;
    });
  }

  /* ── Sticky nav shadow on scroll ──────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > 40) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
      lastScroll = y;
    }, { passive: true });
  }

  /* Contact form submission is handled inline in contact.html via EmailJS. */

  /* ── Year in footer ────────────────────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
