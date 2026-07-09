# Teja Kuchallapati — Developer Portfolio

A modern, fully animated developer portfolio built with vanilla HTML, CSS, and JavaScript.  
No heavy frameworks. Just clean, fast code.

---

## 📁 Folder Structure

```
portfolio/
├── index.html              ← Main entry point
├── css/
│   └── style.css           ← All styles (variables, layout, components, responsive)
├── js/ (served via /public/js/)
│   ├── nav.js              ← Mobile menu + active section highlight
│   ├── animations.js       ← Scroll reveal, smooth scroll
│   ├── typewriter.js       ← Role rotator / typewriter effect
│   ├── form.js             ← Contact form validation & submission handler
│   ├── project-skills.js   ← Project skill tag colour mapping
│   └── cert-lightbox.js    ← Certificate lightbox viewer
└── assets/
    ├── teja.png            ← Profile photo
    ├── projects/           ← Project preview screenshots
    └── certificates/       ← Certification images
```

---

## 🚀 Getting Started

### Option A — Open directly
Just double-click `index.html`. Everything works without a server.

### Option B — Local server (recommended)
```bash
# Python
python3 -m http.server 3000

# Node
npx serve .

# VS Code
Install "Live Server" extension → right-click index.html → Open with Live Server
```

Then visit `http://localhost:3000`

---

## 🌐 Deployment

### Vercel (recommended — free)
```bash
npm i -g vercel
vercel
```

### Netlify
Drag the entire `portfolio/` folder onto [netlify.com/drop](https://app.netlify.com/drop)

### GitHub Pages
Push to a repo → Settings → Pages → Source: main branch → root folder

---

## 🛠 Tech Used

| Layer | Technology |
|---|---|
| Structure | HTML5 Semantic Markup |
| Styling | Vanilla CSS (custom properties, animations) |
| Scripting | Vanilla JavaScript (ES6+) |
| Typography | Inter · Outfit · JetBrains Mono (Google Fonts) |
| Hosting | Vercel |

---

## 📝 Connecting the Contact Form

The form currently shows a success message after 1.5 s (simulated).  
To send real emails, replace the `setTimeout` in `js/form.js` with one of:

- **[EmailJS](https://emailjs.com)** — free tier, no backend needed
- **[Formspree](https://formspree.io)** — point the form action at your endpoint
- **Custom API** — `fetch('/api/contact', { method:'POST', body: formData })`

---

Made with ♥ by Teja Kuchallapati.
# my---portfolio
