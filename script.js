/* ===========================================
   PORTFOLIO — script.js
   Vishal Andhale | Premium Portfolio
   =========================================== */

'use strict';

// ─── SCROLL PROGRESS BAR ────────────────────
const scrollProgressBar = document.getElementById('scroll-progress');

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  scrollProgressBar.style.width = `${progress}%`;
}

window.addEventListener('scroll', updateScrollProgress, { passive: true });

// ─── CUSTOM CURSOR ──────────────────────────
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursor-trail');
let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = `${mouseX}px`;
  cursor.style.top = `${mouseY}px`;
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  cursorTrail.style.left = `${trailX}px`;
  cursorTrail.style.top = `${trailY}px`;
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Cursor scale on hover
document.querySelectorAll('a, button, .project-card, .social-card, .soft-skill-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '6px';
    cursor.style.height = '6px';
    cursorTrail.style.width = '50px';
    cursorTrail.style.height = '50px';
    cursorTrail.style.borderColor = 'rgba(168, 85, 247, 0.7)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    cursorTrail.style.width = '36px';
    cursorTrail.style.height = '36px';
    cursorTrail.style.borderColor = 'rgba(124, 58, 237, 0.5)';
  });
});

// Hide cursor when it leaves window
document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  cursorTrail.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
  cursorTrail.style.opacity = '1';
});

// ─── NAVBAR SCROLL EFFECT ───────────────────
const navbar = document.getElementById('navbar');

function handleNavScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', handleNavScroll, { passive: true });
handleNavScroll();

// ─── MOBILE HAMBURGER MENU ──────────────────
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close mobile menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ─── ACTIVE NAV LINK ON SCROLL ──────────────
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

function updateActiveNavLink() {
  const scrollY = window.scrollY;

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      navLinkEls.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink, { passive: true });
updateActiveNavLink();

// ─── TYPEWRITER EFFECT ──────────────────────
const typewriterEl = document.getElementById('typewriter');
const phrases = [
  'Aspiring Software Developer',
  'Front-End Enthusiast',
  'Problem Solver',
  'Code. Create. Innovate.',
  'B.Tech CSE Student',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeTimeout;

function typeWriter() {
  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting) {
    typewriterEl.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      typeTimeout = setTimeout(typeWriter, 2200);
      return;
    }
  } else {
    typewriterEl.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeTimeout = setTimeout(typeWriter, 400);
      return;
    }
  }

  const speed = isDeleting ? 50 : 85;
  typeTimeout = setTimeout(typeWriter, speed);
}

setTimeout(typeWriter, 1000);

// ─── PARTICLES CANVAS ───────────────────────
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
let animFrame;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const PARTICLE_COUNT = 90;

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.hue = Math.random() > 0.5 ? 271 : 185; // purple or cyan
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${this.hue}, 80%, 65%, ${this.opacity})`;
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particlesArray.push(new Particle());
  }
}

function connectParticles() {
  const maxDist = 120;
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a + 1; b < particlesArray.length; b++) {
      const dx = particlesArray[a].x - particlesArray[b].x;
      const dy = particlesArray[a].y - particlesArray[b].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDist) {
        const opacity = 1 - dist / maxDist;
        ctx.strokeStyle = `rgba(124, 58, 237, ${opacity * 0.3})`;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  animFrame = requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// ─── SCROLL-TRIGGERED ANIMATIONS (AOS) ──────
const aosElements = document.querySelectorAll('[data-aos]');

const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.style.getPropertyValue('--delay') || '0s';
      const delayMs = parseFloat(delay) * 1000;
      setTimeout(() => {
        entry.target.classList.add('aos-visible');
      }, delayMs);
      aosObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

aosElements.forEach(el => aosObserver.observe(el));

// ─── SKILL BAR ANIMATIONS ───────────────────
const skillFills = document.querySelectorAll('.skill-fill');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const targetWidth = fill.getAttribute('data-width');
      setTimeout(() => {
        fill.style.width = `${targetWidth}%`;
      }, 200);
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.5 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ─── CONTACT FORM ───────────────────────────
const contactForm   = document.getElementById('contact-form');
const submitBtn     = document.getElementById('submit-btn');
const formSuccess   = document.getElementById('form-success');
const charCounter   = document.getElementById('char-counter');
const messageArea   = document.getElementById('message');
const CHAR_LIMIT    = 500;

// ── Character counter ──
if (messageArea && charCounter) {
  messageArea.addEventListener('input', () => {
    const len = messageArea.value.length;
    charCounter.textContent = `${len} / ${CHAR_LIMIT}`;
    charCounter.classList.toggle('near-limit', len >= CHAR_LIMIT * 0.8 && len < CHAR_LIMIT);
    charCounter.classList.toggle('at-limit',   len >= CHAR_LIMIT);
  });
}

// ── Helpers ──
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function setFieldError(fieldId, msg) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}-error`);
  if (!field) return;
  field.classList.toggle('input-error', !!msg);
  if (error) error.textContent = msg || '';
}

function clearFieldError(fieldId) {
  setFieldError(fieldId, '');
}

function validateName() {
  const val = document.getElementById('name').value.trim();
  if (!val)          { setFieldError('name', 'Name is required.'); return false; }
  if (val.length < 2){ setFieldError('name', 'Name must be at least 2 characters.'); return false; }
  clearFieldError('name'); return true;
}

function validateEmail() {
  const val = document.getElementById('email').value.trim();
  if (!val)              { setFieldError('email', 'Email is required.'); return false; }
  if (!isValidEmail(val)){ setFieldError('email', 'Please enter a valid email address.'); return false; }
  clearFieldError('email'); return true;
}

function validateMessage() {
  const val = messageArea ? messageArea.value.trim() : '';
  if (!val)           { setFieldError('message', 'Message cannot be empty.'); return false; }
  if (val.length < 10){ setFieldError('message', 'Message must be at least 10 characters.'); return false; }
  clearFieldError('message'); return true;
}

// ── Real-time clear on input ──
['name', 'email', 'message'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('input', () => clearFieldError(id));
});

// ── Blur validation ──
const nameEl  = document.getElementById('name');
const emailEl = document.getElementById('email');
if (nameEl)  nameEl.addEventListener('blur', validateName);
if (emailEl) emailEl.addEventListener('blur', validateEmail);
if (messageArea) messageArea.addEventListener('blur', validateMessage);

// ── Shake animation ──
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-8px); }
    40%       { transform: translateX(8px); }
    60%       { transform: translateX(-5px); }
    80%       { transform: translateX(5px); }
  }
`;
document.head.appendChild(shakeStyle);

function shakeForm() {
  if (!contactForm) return;
  contactForm.style.animation = 'shake 0.4s ease';
  setTimeout(() => { contactForm.style.animation = ''; }, 400);
}

// ── Submit ──
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const ok = [validateName(), validateEmail(), validateMessage()];
    if (ok.includes(false)) { shakeForm(); return; }

    const nameVal    = document.getElementById('name').value.trim();
    const emailVal   = document.getElementById('email').value.trim();
    const subjectVal = (document.getElementById('subject')?.value.trim()) || 'Portfolio Contact';
    const msgVal     = messageArea.value.trim();

    // Show loading state
    const btnText    = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    btnText.classList.add('hidden');
    btnLoading.classList.remove('hidden');
    submitBtn.disabled = true;

    // Build mailto link as real-world fallback
    const mailtoBody = `Hi Vishal,\n\nMy name is ${nameVal}.\n\n${msgVal}\n\nBest,\n${nameVal}\n${emailVal}`;
    const mailtoLink = `mailto:vishalandhale2323@gmail.com`
      + `?subject=${encodeURIComponent(subjectVal)}`
      + `&body=${encodeURIComponent(mailtoBody)}`;

    setTimeout(() => {
      window.location.href = mailtoLink;   // opens mail client
      btnText.classList.remove('hidden');
      btnLoading.classList.add('hidden');
      submitBtn.disabled = false;
      formSuccess.classList.remove('hidden');
      contactForm.reset();
      if (charCounter) { charCounter.textContent = `0 / ${CHAR_LIMIT}`; charCounter.classList.remove('near-limit','at-limit'); }
      setTimeout(() => formSuccess.classList.add('hidden'), 6000);
    }, 1200);
  });
}

// ─── INPUT FOCUS EFFECT ──────────────────────
document.querySelectorAll('.input-wrapper input, .input-wrapper textarea').forEach(input => {
  input.addEventListener('focus', () => input.parentElement.classList.add('focused'));
  input.addEventListener('blur',  () => input.parentElement.classList.remove('focused'));
});

// ─── DOWNLOAD CV BUTTON (Coming Soon) ────────
const downloadCvBtn = document.getElementById('download-cv');
if (downloadCvBtn) {
  downloadCvBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Pulse the button briefly
    downloadCvBtn.style.transform = 'scale(0.96)';
    setTimeout(() => { downloadCvBtn.style.transform = ''; }, 200);
    showToast('📄 CV coming soon! Connect on LinkedIn in the meantime.', 'info');
  });
}

// ─── TOAST NOTIFICATION ─────────────────────
function showToast(message, type = 'info') {
  const existing = document.querySelector('.toast-notification');
  if (existing) {
    existing.style.animation = 'toastOut 0.2s ease forwards';
    setTimeout(() => existing.remove(), 200);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-notification';

  const colors = {
    info:    { border: 'rgba(124, 58, 237, 0.5)', icon: '#a855f7', bg: 'rgba(124,58,237,0.08)' },
    success: { border: 'rgba(34, 197, 94, 0.5)',  icon: '#22c55e', bg: 'rgba(34,197,94,0.08)' },
    error:   { border: 'rgba(239, 68, 68, 0.5)',  icon: '#ef4444', bg: 'rgba(239,68,68,0.08)' },
  };
  const c = colors[type] || colors.info;

  toast.innerHTML = `
    <div style="
      width:36px; height:36px; border-radius:50%;
      background:${c.bg}; border:1px solid ${c.border};
      display:flex; align-items:center; justify-content:center;
      flex-shrink:0;
    ">
      <i class="fas fa-clock" style="color:${c.icon}; font-size:0.9rem;"></i>
    </div>
    <div style="display:flex; flex-direction:column; gap:2px;">
      <span style="font-weight:600; font-size:0.85rem; color:#fff;">Coming Soon</span>
      <span style="font-size:0.8rem; color:#94a3b8; line-height:1.4;">${message}</span>
    </div>
    <button onclick="this.parentElement.style.animation='toastOut 0.3s ease forwards'; setTimeout(()=>this.parentElement.remove(),300);"
      style="margin-left:auto; background:none; border:none; color:#64748b; cursor:pointer; font-size:1rem; padding:2px 4px; line-height:1;">
      &times;
    </button>
  `;

  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '2rem',
    right: '2rem',
    maxWidth: '340px',
    background: 'rgba(9, 13, 31, 0.96)',
    backdropFilter: 'blur(24px)',
    webkitBackdropFilter: 'blur(24px)',
    border: `1px solid ${c.border}`,
    borderRadius: '14px',
    padding: '0.9rem 1.1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.85rem',
    color: '#e2e8f0',
    fontFamily: "'Poppins', sans-serif",
    zIndex: '9999',
    boxShadow: `0 12px 40px rgba(0,0,0,0.6), 0 0 24px ${c.border}`,
    animation: 'toastIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both',
  });

  if (!document.getElementById('toast-keyframes')) {
    const style = document.createElement('style');
    style.id = 'toast-keyframes';
    style.textContent = `
      @keyframes toastIn  { from { opacity:0; transform:translateY(24px) scale(0.88); } to { opacity:1; transform:translateY(0) scale(1); } }
      @keyframes toastOut { from { opacity:1; transform:translateY(0) scale(1); } to { opacity:0; transform:translateY(16px) scale(0.92); } }
    `;
    document.head.appendChild(style);
  }

  document.body.appendChild(toast);

  setTimeout(() => {
    if (!toast.isConnected) return;
    toast.style.animation = 'toastOut 0.35s ease forwards';
    setTimeout(() => toast.remove(), 350);
  }, 4500);
}

// ─── SMOOTH SCROLL FOR ALL ANCHOR LINKS ─────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ─── PROJECT CARD TILT EFFECT ───────────────
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease';
  });
});

// ─── COUNTER ANIMATION FOR STATS ────────────
function animateCounter(el, target, suffix = '') {
  let count = 0;
  const duration = 1500;
  const increment = target / (duration / 16);

  const update = () => {
    count += increment;
    if (count < target) {
      el.textContent = Math.floor(count) + suffix;
      requestAnimationFrame(update);
    } else {
      el.textContent = target + suffix;
    }
  };
  update();
}

const statNums = document.querySelectorAll('.stat-num');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const txt = el.textContent;
      if (txt === '∞') return;
      const num = parseInt(txt.replace(/\D/g, ''));
      const suffix = txt.replace(/[0-9]/g, '');
      animateCounter(el, num, suffix);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.6 });

statNums.forEach(el => statObserver.observe(el));

// ─── HERO NAME GLITCH HOVER ─────────────────
document.querySelectorAll('.name-word').forEach(word => {
  word.addEventListener('mouseenter', () => {
    word.style.animation = 'nameGlitch 0.4s ease';
  });
  word.addEventListener('animationend', () => {
    word.style.animation = '';
  });
});

const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
  @keyframes nameGlitch {
    0% { transform: skewX(0deg); }
    20% { transform: skewX(-4deg); filter: hue-rotate(45deg); }
    40% { transform: skewX(4deg); }
    60% { transform: skewX(-2deg); filter: hue-rotate(0deg); }
    80% { transform: skewX(2deg); }
    100% { transform: skewX(0deg); }
  }
`;
document.head.appendChild(glitchStyle);

// ─── SECTION BACKGROUND GLOW ON SCROLL ──────
const glowSections = document.querySelectorAll('.section');

const glowObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.setProperty('--section-glow', '1');
    } else {
      entry.target.style.setProperty('--section-glow', '0');
    }
  });
}, { threshold: 0.3 });

glowSections.forEach(s => glowObserver.observe(s));

// ─── INIT ────────────────────────────────────
console.log('%c✨ Vishal Andhale — Portfolio Loaded', 'color: #a855f7; font-weight: bold; font-size: 14px;');
console.log('%cBuilt with HTML, CSS & Vanilla JS 🚀', 'color: #06d6e0; font-size: 12px;');
