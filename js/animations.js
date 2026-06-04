/* ============================================================
   animations.js — Scroll reveal · Skill bars · Card tilt
                   Project filter · Smooth scroll
   ============================================================ */

// ── Reveal on scroll ────────────────────────────────────────
const reveals    = document.querySelectorAll('.reveal');
const revealObs  = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.15 });
reveals.forEach(el => revealObs.observe(el));

// ── Skill bar fill on scroll ─────────────────────────────────
const skillItems = document.querySelectorAll('.skill-item');
const skillObs   = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.2 });
skillItems.forEach(el => skillObs.observe(el));

// ── Project filter tabs ──────────────────────────────────────
const filterBtns = document.querySelectorAll('.filter-btn');
const cards      = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const f = btn.dataset.filter;
    cards.forEach(c => {
      if (f === 'all' || c.dataset.cat === f) {
        c.classList.remove('hidden');
        // Restart entry animation
        c.style.animation = 'none';
        requestAnimationFrame(() => { c.style.animation = ''; });
      } else {
        c.classList.add('hidden');
      }
    });
  });
});

// ── 3-D card tilt on hover ───────────────────────────────────
document.querySelectorAll('.project-card, .cert-card, .avatar-frame').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform =
      `translateY(-8px) scale(1.01) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── Smooth scroll for anchor links ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── CLI typing animation for hero eyebrow ────────────────────
const eyebrow = document.getElementById('typing-eyebrow');
if (eyebrow) {
  const phrases = [
    "> whoami",
    "Full Stack Engineer",
    "UI/UX Focused Developer",
    "Creative Technologist",
    "Digital Visionary"
  ];
  let pIdx = 0, cIdx = 0, isDeleting = false;

  function type() {
    const currentMsg = phrases[pIdx];
    if (isDeleting) {
      eyebrow.textContent = currentMsg.substring(0, cIdx--);
    } else {
      eyebrow.textContent = currentMsg.substring(0, cIdx++);
    }

    let speed = isDeleting ? 40 : 80;
    if (!isDeleting && cIdx > currentMsg.length) {
      speed = 2000; // pause at end
      isDeleting = true;
    } else if (isDeleting && cIdx === 0) {
      isDeleting = false;
      pIdx = (pIdx + 1) % phrases.length;
      speed = 500;
    }
    setTimeout(type, speed);
  }
  type();
}

// ── Entrance Sequence ───────────────────────────────────────
window.addEventListener('load', () => {
  document.body.classList.add('loading');
  setTimeout(() => {
    document.body.classList.remove('loading');
    document.body.classList.add('entrance-complete');
  }, 500); // Small delay to ensure WebGL/Styles are ready
});

// ── Theme Toggle ────────────────────────────────────────────
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  // Check local storage for preference
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);

  themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  });
}

// ── Tech Badge Modal Handler ────────────────────────────────
document.querySelectorAll('.tech-float').forEach(badge => {
  badge.style.pointerEvents = 'auto';
  badge.style.cursor = 'pointer';
  badge.addEventListener('click', () => {
    const tech = badge.dataset.tech;
    const level = badge.dataset.level;
    const projects = badge.dataset.projects;
    if (!tech) return;

    document.getElementById('techTitle').textContent = tech;
    document.getElementById('techLevel').textContent = level;
    document.getElementById('techProjects').textContent = projects;
    document.getElementById('techModal').classList.add('show');
  });
});

const closeTechModal = document.getElementById('closeTechModal');
if (closeTechModal) {
  closeTechModal.addEventListener('click', () => {
    document.getElementById('techModal').classList.remove('show');
  });
}
window.addEventListener('click', e => {
  if (e.target.id === 'techModal') {
    e.target.classList.remove('show');
  }
});

// ── Character splatting for animated text ────────────────────
document.querySelectorAll('.char-anim').forEach(el => {
  const text = el.textContent.trim();
  el.textContent = '';
  // Force reflow/preserve line breaks if any
  [...text].forEach(char => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char;
    el.appendChild(span);
  });
});


