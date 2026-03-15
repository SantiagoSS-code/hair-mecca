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

  // Before/After slider
  const container = document.getElementById('baContainer');
  const before = document.getElementById('baBefore');
  const handle = document.getElementById('baHandle');
  let dragging = false;

  function setPosition(x) {
    const rect = container.getBoundingClientRect();
    let pct = ((x - rect.left) / rect.width) * 100;
    pct = Math.max(5, Math.min(95, pct));
    before.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
    handle.style.left = pct + '%';
  }

  handle.addEventListener('mousedown', e => { dragging = true; e.preventDefault(); });
  document.addEventListener('mouseup', () => dragging = false);
  document.addEventListener('mousemove', e => { if (dragging) setPosition(e.clientX); });

  handle.addEventListener('touchstart', e => { dragging = true; }, { passive: true });
  document.addEventListener('touchend', () => dragging = false);
  document.addEventListener('touchmove', e => {
    if (dragging) setPosition(e.touches[0].clientX);
  }, { passive: true });

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