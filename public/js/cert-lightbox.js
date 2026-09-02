/* ============================================================
   cert-lightbox.js — Open certificates in a full-screen viewer
   ============================================================ */

function initCertLightbox() {
  const certLightbox = document.getElementById('certLightbox');
  const certLightboxBackdrop = document.getElementById('certLightboxBackdrop');
  const certLightboxClose = document.getElementById('certLightboxClose');
  const certLightboxImg = document.getElementById('certLightboxImg');
  const certLightboxTitle = document.getElementById('certLightboxTitle');

  if (!certLightbox || !certLightboxImg) return;

  let lastTrigger = null;

  function openCertLightbox(src, title, trigger) {
    if (!src) return;

    lastTrigger = trigger || null;
    certLightboxTitle.textContent = title || 'Certificate';
    certLightboxImg.alt = title || 'Certificate';
    certLightboxImg.src = src;

    certLightbox.classList.add('is-open');
    certLightbox.removeAttribute('hidden');
    certLightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    certLightboxClose?.focus();
  }

  function closeCertLightbox() {
    certLightbox.classList.remove('is-open');
    certLightbox.setAttribute('hidden', '');
    certLightbox.setAttribute('aria-hidden', 'true');
    certLightboxImg.removeAttribute('src');
    document.body.style.overflow = '';
    lastTrigger?.focus?.();
    lastTrigger = null;
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.cert-preview, .cert-view-btn');
    if (!trigger) return;

    e.preventDefault();
    e.stopPropagation();

    const src =
      trigger.getAttribute('data-cert-src') ||
      trigger.getAttribute('href') ||
      trigger.querySelector('img')?.getAttribute('src');

    const title = trigger.getAttribute('data-cert-title') || 'Certificate';

    if (src) openCertLightbox(src, title, trigger);
  });

  certLightboxClose?.addEventListener('click', closeCertLightbox);
  certLightboxBackdrop?.addEventListener('click', closeCertLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certLightbox.classList.contains('is-open')) {
      closeCertLightbox();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCertLightbox);
} else {
  initCertLightbox();
}
