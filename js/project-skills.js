/* ============================================================
   project-skills.js — Icons for project tech tags
   ============================================================ */

const SKILL_ICONS = {
  html: '<span class="psi-text psi-html">&lt;/&gt;</span>',
  css: '<span class="psi-text psi-css">CSS</span>',
  javascript: '<span class="psi-text psi-js">JS</span>',
  react: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></svg>',
  vite: '<span class="psi-text psi-vite">V</span>',
  tailwind: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9.5 8.5C8 5.5 4.5 4 2 6c-1.5 6 1 10 5 11.5C11 19 15 17 17 12c1.5-4 0-7-2.5-8.5C12 2 10 3 9.5 8.5z"/></svg>',
  node: '<span class="psi-text psi-node">N</span>',
  express: '<span class="psi-text psi-express">Ex</span>',
  mongo: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2c-1 3-4 6-4 10a4 4 0 008 0c0-4-3-7-4-10z"/></svg>',
  api: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 12h16M12 4v16"/><path d="M7 7l10 10M17 7L7 17"/></svg>',
  responsive: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg>',
};

document.querySelectorAll('[data-skill]').forEach((tag) => {
  const key = tag.dataset.skill;
  const icon = SKILL_ICONS[key];
  if (!icon) return;

  const label = tag.textContent.trim();
  tag.textContent = '';
  tag.classList.add(`psi-${key}`);

  const iconEl = document.createElement('span');
  iconEl.className = 'project-skill-icon';
  iconEl.setAttribute('aria-hidden', 'true');
  iconEl.innerHTML = icon;

  const textEl = document.createElement('span');
  textEl.textContent = label;

  tag.append(iconEl, textEl);
});
