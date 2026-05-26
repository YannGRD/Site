/* ============================================
   Yann GRD — Scroll behaviors
   ============================================ */

(function() {
  'use strict';

  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ====== Nav light/dark switcher ======
  // Toggle .nav--dark when a section with data-nav-theme="light" is near the top.
  // Pure color change, must run even with prefers-reduced-motion.
  const nav = document.querySelector('.nav');
  const themedSections = document.querySelectorAll('[data-nav-theme]');
  if (nav && themedSections.length && 'IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const theme = entry.target.dataset.navTheme;
          nav.classList.toggle('nav--dark', theme === 'light');
        }
      });
    }, {
      rootMargin: '-10% 0px -85% 0px',
      threshold: 0
    });
    themedSections.forEach(s => navObserver.observe(s));
  }

  // Reduced motion guard
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  // ====== Reveal on scroll ======
  const revealEls = document.querySelectorAll('[data-reveal]');
  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px'
    });
    revealEls.forEach(el => observer.observe(el));
  }

  // ====== Parallax (requestAnimationFrame, lightweight) ======
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length) {
    let ticking = false;
    const updateParallax = () => {
      const scrollY = window.scrollY;
      const winH = window.innerHeight;
      parallaxEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        // Only update when in/near viewport
        if (rect.bottom < -200 || rect.top > winH + 200) return;
        const speed = parseFloat(el.dataset.parallax) || 0.15;
        const offset = (rect.top - winH / 2) * speed * -1;
        el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
      });
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    updateParallax();
  }

  // ====== Smooth anchor scroll with offset ======
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || href === '#!') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ====== YouTube lazy-load (vignette → iframe) ======
  document.querySelectorAll('.cs-video__play').forEach(btn => {
    btn.addEventListener('click', () => {
      const wrap = btn.closest('.cs-video');
      const id = wrap.getAttribute('data-youtube-id');
      if (!id) return;
      const params = 'modestbranding=1&rel=0&autoplay=1&playsinline=1';
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?' + params;
      iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      iframe.setAttribute('allowfullscreen', '');
      iframe.setAttribute('title', wrap.getAttribute('data-title') || 'Vidéo YouTube');
      wrap.innerHTML = '';
      wrap.appendChild(iframe);
    }, { once: true });
  });

})();
