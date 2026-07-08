/* ============================================================
   nav.js — Navbar scroll, sliding indicator, mobile menu
   ============================================================ */

const header = document.getElementById('navbar');
const menuBtn = document.getElementById('menuBtn');
const navPanel = document.getElementById('navPanel');
const navLinks = document.getElementById('navLinks');
const navIndicator = document.getElementById('navIndicator');
const navLinkItems = document.querySelectorAll('.nav-link');
const navCta = document.querySelector('.nav-cta');
const sections = document.querySelectorAll('section[id]');

function setMenuOpen(open) {
  if (!menuBtn || !navPanel) return;
  menuBtn.classList.toggle('open', open);
  navPanel.classList.toggle('open', open);
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.style.overflow = open ? 'hidden' : '';
}

if (menuBtn && navPanel) {
  menuBtn.addEventListener('click', () => {
    setMenuOpen(!navPanel.classList.contains('open'));
  });
}

if (navPanel) {
  navPanel.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => setMenuOpen(false));
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setMenuOpen(false);
});

function getNavKey(target) {
  return target?.dataset?.nav || 'contact';
}

function moveIndicator(target) {
  if (!navIndicator || !navPanel || !target || window.innerWidth <= 900) {
    if (navIndicator) navIndicator.style.opacity = window.innerWidth <= 900 ? '0' : '';
    return;
  }

  const panelRect = navPanel.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const navKey = getNavKey(target);

  navIndicator.dataset.target = navKey;
  navIndicator.style.opacity = '1';
  navIndicator.style.width = `${targetRect.width}px`;
  navIndicator.style.height = `${targetRect.height}px`;
  navIndicator.style.transform = `translate(${targetRect.left - panelRect.left}px, ${targetRect.top - panelRect.top}px)`;
}

function setActiveNav(sectionId) {
  navLinkItems.forEach((link) => {
    const isActive = link.getAttribute('href') === `#${sectionId}`;
    link.classList.toggle('active', isActive);
    if (isActive) moveIndicator(link);
  });

  if (navCta) {
    const contactActive = sectionId === 'contact';
    navCta.classList.toggle('nav-cta-active', contactActive);
    if (contactActive) moveIndicator(navCta);
  }
}

function getCurrentSection() {
  const offset = window.innerHeight * 0.35;
  let current = sections[0]?.id || 'hero';

  sections.forEach((section) => {
    const top = section.offsetTop - offset;
    if (window.scrollY >= top) {
      current = section.id;
    }
  });

  return current;
}

function onScroll() {
  if (header) {
    header.classList.toggle('scrolled', window.scrollY > 24);
  }
  setActiveNav(getCurrentSection());
}

navLinkItems.forEach((link) => {
  link.addEventListener('mouseenter', () => moveIndicator(link));
  link.addEventListener('mouseleave', () => {
    const active = document.querySelector('.nav-link.active');
    if (active) moveIndicator(active);
  });
});

if (navCta) {
  navCta.addEventListener('mouseenter', () => moveIndicator(navCta));
  navCta.addEventListener('mouseleave', () => {
    const active = document.querySelector('.nav-link.active');
    if (active) moveIndicator(active);
    else if (navCta.classList.contains('nav-cta-active')) moveIndicator(navCta);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
onScroll();
