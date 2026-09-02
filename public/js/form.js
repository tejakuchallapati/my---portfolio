/* ============================================================
   form.js — Contact form validation & submission
   ============================================================ */

function setFieldError(input, errorEl, show) {
  if (!input || !errorEl) return;
  errorEl.classList.toggle('show', show);
  input.setAttribute('aria-invalid', show ? 'true' : 'false');
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fname = document.getElementById('fname');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const fnameError = document.getElementById('fnameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const btn = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');
  const btnLabel = btn?.querySelector('span');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    setFieldError(fname, fnameError, false);
    setFieldError(email, emailError, false);
    setFieldError(message, messageError, false);

    let valid = true;
    let firstInvalid = null;

    if (!fname.value.trim()) {
      setFieldError(fname, fnameError, true);
      valid = false;
      firstInvalid = firstInvalid || fname;
    }

    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setFieldError(email, emailError, true);
      valid = false;
      firstInvalid = firstInvalid || email;
    }

    if (!message.value.trim()) {
      setFieldError(message, messageError, true);
      valid = false;
      firstInvalid = firstInvalid || message;
    }

    if (!valid) {
      firstInvalid?.focus();
      return;
    }

    btn.disabled = true;
    btn.classList.add('sending');
    if (btnLabel) btnLabel.textContent = 'Sending…';

    try {
      const response = await fetch('https://formsubmit.co/ajax/teja26kt@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: fname.value.trim(),
          email: email.value.trim(),
          message: message.value.trim(),
          _subject: 'Portfolio contact form',
        }),
      });

      if (!response.ok) throw new Error('Submit failed');

      form.reset();
      setFieldError(fname, fnameError, false);
      setFieldError(email, emailError, false);
      setFieldError(message, messageError, false);
      success.classList.add('show');
      success.focus?.();
      btn.style.display = 'none';

      window.setTimeout(() => {
        success.classList.remove('show');
        btn.style.display = '';
        btn.disabled = false;
        btn.classList.remove('sending');
        if (btnLabel) btnLabel.textContent = 'Send Message';
      }, 5000);
    } catch {
      btn.disabled = false;
      btn.classList.remove('sending');
      if (btnLabel) btnLabel.textContent = 'Send Message';
      messageError.textContent = 'Could not send right now. Email me at teja26kt@gmail.com.';
      setFieldError(message, messageError, true);
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initContactForm);
} else {
  initContactForm();
}
