/* ============================================================
   form.js — Contact form validation & submission
   ============================================================ */

function handleFormSubmit(e) {
  e.preventDefault();

  const fname        = document.getElementById('fname');
  const email        = document.getElementById('email');
  const message      = document.getElementById('message');
  const fnameError   = document.getElementById('fnameError');
  const emailError   = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');

  // Clear previous errors
  fnameError.classList.remove('show');
  emailError.classList.remove('show');
  messageError.classList.remove('show');

  let valid = true;

  if (!fname.value.trim()) {
    fnameError.classList.add('show');
    valid = false;
  }
  if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    emailError.classList.add('show');
    valid = false;
  }
  if (!message.value.trim()) {
    messageError.classList.add('show');
    valid = false;
  }

  if (!valid) return;

  const btn = document.getElementById('submitBtn');
  btn.classList.add('sending');
  btn.textContent = 'Sending…';

  // Simulate async send (replace with real fetch/EmailJS call)
  setTimeout(() => {
    btn.style.display = 'none';
    document.getElementById('formSuccess').classList.add('show');
  }, 1500);
}

// Expose globally so the inline onclick can reach it
window.handleFormSubmit = handleFormSubmit;
