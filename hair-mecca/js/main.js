// ─── NAV: transparent on hero, solid on scroll ───
  const nav = document.querySelector('nav');
  function updateNav() {
    if (window.scrollY > 40) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }
  updateNav(); // run on load
  window.addEventListener('scroll', updateNav, { passive: true });

  // ─── HAMBURGER MENU ───
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinksList = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('is-open');
    navLinksList.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a nav link is clicked
  navLinksList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('is-open');
      navLinksList.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // ─── Before/After slider (reusable) ───
  function initBASlider(containerId, beforeId, handleId) {
    const container = document.getElementById(containerId);
    const before = document.getElementById(beforeId);
    const handle = document.getElementById(handleId);
    if (!container || !before || !handle) return;
    let dragging = false;

    function setPosition(x) {
      const rect = container.getBoundingClientRect();
      let pct = ((x - rect.left) / rect.width) * 100;
      pct = Math.max(5, Math.min(95, pct));
      before.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      handle.style.left = pct + '%';
    }

    handle.addEventListener('mousedown', e => { dragging = true; e.preventDefault(); });
    document.addEventListener('mouseup', () => { dragging = false; });
    document.addEventListener('mousemove', e => { if (dragging) setPosition(e.clientX); });
    handle.addEventListener('touchstart', () => { dragging = true; }, { passive: true });
    document.addEventListener('touchend', () => { dragging = false; });
    document.addEventListener('touchmove', e => {
      if (dragging) setPosition(e.touches[0].clientX);
    }, { passive: true });
  }

  initBASlider('baContainer', 'baBefore', 'baHandle');
  initBASlider('baFaceContainer', 'baFaceBefore', 'baFaceHandle');
  initBASlider('baHairContainer', 'baHairBefore', 'baHairHandle');

  // Smooth nav highlight
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current ? 'var(--gold)' : '';
    });
  });

  // ─── MOBILE: scroll-driven service card video expansion ───
  function updateMobileServiceCards() {
    if (window.innerWidth > 900) return;
    const cards = document.querySelectorAll('.service-card');
    const vh = window.innerHeight;
    // On single-column (≤540) expand more; on 2-col tablet expand less
    const maxH = window.innerWidth <= 540 ? Math.round(vh * 0.62) : Math.round(vh * 0.48);
    const minH = 210;

    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const cardCenterY = rect.top + rect.height / 2;
      const screenCenterY = vh / 2;

      // 0 = card centered in screen, 1 = one full vh away
      const dist = Math.abs(cardCenterY - screenCenterY) / vh;
      // 1 when centered, 0 when far
      const raw = Math.max(0, 1 - dist * 1.6);
      // ease-in-out
      const eased = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;

      const height = Math.round(minH + (maxH - minH) * eased);
      const media = card.querySelector('.service-card-video-wrap video, .service-card-video-wrap img');
      if (media) media.style.height = height + 'px';
    });
  }

  function resetDesktopCards() {
    document.querySelectorAll('.service-card video, .service-card img').forEach(el => {
      el.style.height = '';
    });
  }

  window.addEventListener('scroll', () => {
    if (window.innerWidth <= 900) updateMobileServiceCards();
  }, { passive: true });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) resetDesktopCards();
    else updateMobileServiceCards();
  }, { passive: true });

  updateMobileServiceCards(); // run on load

  // ─── SCROLL REVEAL ───
  // Only fire once per element (first time it enters the viewport)
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target); // fire once only
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
    revealObserver.observe(el);
  });