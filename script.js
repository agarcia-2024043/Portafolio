// ═══════════════════════════════════════════════
// GERA.DEV — Portfolio Script
// ═══════════════════════════════════════════════

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────
// Project data
// ─────────────────────────────────────────────
const caseData = {
  '1': {
    title: 'OneCoin',
    desc: 'Plataforma bancaria con microservicios: transferencias con límites, reversión de depósitos, tasas de cambio en tiempo real y autenticación con recuperación de contraseña vía OTP. Incluye app móvil en React Native con el mismo sistema de diseño dark/gold.',
    tags: '.NET — React — React Native — PostgreSQL — MongoDB — JWT',
    img: 'images/project-onecoin.jpg',
    link: 'https://github.com/agarcia-2024043/BitCoiners-Sistema-Bancario-One-Coin.git',
    linkText: 'Ver repositorio'
  },
  '2': {
    title: 'El Gepardo — Hamburguesería y Mixología',
    desc: 'Aplicación para restaurante y mixología con panel administrativo para gestión de pedidos y menú digital, subida de imágenes en la nube con Cloudinary y actualización de estado de pedidos en tiempo real vía websockets.',
    tags: '.NET — React Native — React — Cloudinary — Node.js',
    img: 'images/project-gepardo.png',
    link: 'https://github.com/lcastro-2021276/BitCoiners-Mixologa-el-Gepardo.git',
    linkText: 'Ver repositorio'
  },
  '3': {
    title: 'K-DontForget',
    desc: 'Backend con Clean Architecture y panel administrativo para Fundación Kinal, con sistema de notificaciones vía correo electrónico integrado con Gmail API. Gestión completa de recordatorios y usuarios.',
    tags: '.NET — Clean Architecture — React — Gmail API — PostgreSQL',
    img: 'images/project-kdontforget.png',
    link: 'https://github.com/agarcia-2024043/K-DontForget---BitCoiners.git',
    linkText: 'Ver repositorio'
  },
  '4': {
    title: 'THE CUT — Catálogo para barbería',
    desc: 'Diseño y desarrollo de catálogo web interactivo para barberías y salones de belleza. Permite explorar cortes de tendencia, servicios de afeitado y cuidado de barba con tarifas detalladas, facilitando la conversión de clientes y la presencia digital del negocio.',
    tags: 'Diseño Web — Catálogo Digital — JavaScript — UI/UX',
    img: 'images/project-thecut.png',
    link: 'https://agarcia-2024043.github.io/Catalogo_Barber/',
    linkText: 'Visitar sitio web'
  }
};

// ─────────────────────────────────────────────
// 1. Loading Screen
// ─────────────────────────────────────────────
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    animateHero();
  }, 1400);
});

// ─────────────────────────────────────────────
// 2. Scroll Progress Bar
// ─────────────────────────────────────────────
const progressBar = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = ((scrollTop / docHeight) * 100) + '%';
}, { passive: true });

// ─────────────────────────────────────────────
// 3. Custom Cursor
// ─────────────────────────────────────────────
const cursor = document.getElementById('cursor');
let cursorX = 0, cursorY = 0, mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

(function updateCursor() {
  cursorX += (mouseX - cursorX) * 0.12;
  cursorY += (mouseY - cursorY) * 0.12;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  requestAnimationFrame(updateCursor);
})();

document.querySelectorAll('a, button, .btn-marquee, .case-row, .email-copy').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('expanded'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('expanded'));
});

if ('ontouchstart' in window) cursor.style.display = 'none';

// ─────────────────────────────────────────────
// 4. Hero Animation (on load)
// ─────────────────────────────────────────────
function animateHero() {
  gsap.from('.hero-pretitle span', {
    y: '100%', duration: 1, ease: 'power4.out', delay: 0.1
  });
  gsap.from('.hero h1 .line span', {
    y: '110%', rotationZ: 3, duration: 1.3,
    ease: 'power4.out', stagger: 0.12, delay: 0.3
  });
}

// ─────────────────────────────────────────────
// 5. Section titles reveal (CSS class-based)
// ─────────────────────────────────────────────
const lineObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      lineObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.anim-line').forEach(el => lineObserver.observe(el));

// ─────────────────────────────────────────────
// 6. Cases grid: title reveal on scroll
// ─────────────────────────────────────────────
const caseRowObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('anim-visible');
      caseRowObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.case-row').forEach(row => caseRowObserver.observe(row));

// ─────────────────────────────────────────────
// 7. General reveal on scroll
// ─────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('show');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ─────────────────────────────────────────────
// 8. Skill bars
// ─────────────────────────────────────────────
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.width = e.target.dataset.pct + '%';
      barObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.bar-fill').forEach(b => barObserver.observe(b));

// ─────────────────────────────────────────────
// 9. Header auto-hide on scroll down
// ─────────────────────────────────────────────
let lastScroll = 0;
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  const cur = window.scrollY;
  header.style.transition = 'transform 0.4s ease';
  header.style.transform = (cur > lastScroll && cur > 100)
    ? 'translateY(-100%)'
    : 'translateY(0)';
  lastScroll = cur;
}, { passive: true });

// ─────────────────────────────────────────────
// 10. Copy email
// ─────────────────────────────────────────────
const emailEl = document.getElementById('emailCopy');
if (emailEl) {
  emailEl.addEventListener('click', () => {
    navigator.clipboard.writeText(emailEl.textContent.trim());
    const orig = emailEl.textContent;
    emailEl.textContent = '¡Copiado! ✓';
    emailEl.style.color = '#4ade80';
    setTimeout(() => { emailEl.textContent = orig; emailEl.style.color = ''; }, 1800);
  });
}

// ─────────────────────────────────────────────
// 11. Smooth scroll for anchors
// ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    if (this.classList.contains('case-detail-link')) return;
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ─────────────────────────────────────────────
// 12. GSAP parallax on section titles
// ─────────────────────────────────────────────
document.querySelectorAll('.section-title').forEach(title => {
  gsap.to(title, {
    y: -24,
    scrollTrigger: {
      trigger: title,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5
    }
  });
});

// ─────────────────────────────────────────────
// 13. Cases grid — click interaction
//     • Toggle .active on the clicked row (full color image)
//     • Open the detail overlay
// ─────────────────────────────────────────────
const detailOverlay = document.getElementById('caseDetail');
const detailBg      = document.getElementById('caseDetailBg');
const detailTitle   = document.getElementById('caseDetailTitle');
const detailDesc    = document.getElementById('caseDetailDesc');
const detailImg     = document.getElementById('caseDetailImg');
const detailTags    = document.getElementById('caseDetailTags');
const detailLink    = document.getElementById('caseDetailLink');
const backBtn       = document.getElementById('caseBack');

let activeRow = null;

function openCase(row) {
  const id = row.dataset.case;
  const data = caseData[id];
  if (!data) return;

  // Mark row active (full color)
  if (activeRow && activeRow !== row) activeRow.classList.remove('active');
  row.classList.add('active');
  activeRow = row;

  // Populate overlay
  detailTitle.textContent = data.title;
  detailDesc.textContent  = data.desc;
  detailTags.textContent  = data.tags;
  detailImg.src           = data.img;
  detailImg.alt           = data.title;

  if (data.link && data.link !== '#' && data.link.trim() !== '') {
    detailLink.href = data.link;
    detailLink.style.display = 'inline-flex';
    const label = data.linkText || 'Ver repositorio';
    detailLink.innerHTML = `${label} <svg width="17" height="17" xmlns="http://www.w3.org/2000/svg" fill="white"><path d="M14.875 13.357V3.643L1.518 17 0 15.482 13.357 2.125H3.643V0H17v13.357z"/></svg>`;
  } else {
    detailLink.style.display = 'none';
  }

  // Blurred background = same image
  detailBg.style.backgroundImage = `url('${data.img}')`;

  // Show overlay
  document.body.style.overflow = 'hidden';
  detailOverlay.classList.add('open');

  // Animate detail content in
  gsap.fromTo('.case-detail-content', 
    { y: 60, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
  );
}

function closeCase() {
  gsap.to('.case-detail-content', {
    y: 40, opacity: 0, duration: 0.4, ease: 'power2.in',
    onComplete: () => {
      detailOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// Attach click to each row
document.querySelectorAll('.case-row').forEach(row => {
  row.addEventListener('click', () => openCase(row));
});

// Back button closes overlay
backBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  closeCase();
});

// Repository link — stop propagation so click navigates to repo
detailLink.addEventListener('click', (e) => {
  e.stopPropagation();
});

// ESC key closes overlay
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && detailOverlay.classList.contains('open')) closeCase();
});
