# Teja Kuchallapati Portfolio

Personal portfolio for **Teja Kuchallapati** — Full Stack Developer.  
Built with Vite, a React island for hero social icons, Tailwind/shadcn UI pieces, and vanilla HTML/CSS/JS sections.

**Live:** [https://tejakuchallapatiportfolio.vercel.app](https://tejakuchallapatiportfolio.vercel.app)

---

## Folder Structure

```
portfolio/
├── index.html              ← Main page markup
├── css/style.css           ← Site styles
├── src/main.tsx            ← React entry (imports CSS + social icons)
├── components/ui/          ← shadcn-style UI components
├── public/js/              ← Vanilla JS (copied to dist/js)
│   ├── nav.js
│   ├── animations.js
│   ├── typewriter.js
│   ├── form.js
│   ├── project-skills.js
│   └── cert-lightbox.js
├── public/og.png           ← Stable social preview image
├── public/favicon.jpg      ← Favicon
├── assets/                 ← Photos, project & certificate images
└── vercel.json             ← Vercel Vite build config
```

---

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

```bash
npm run build    # production build → dist/
npm run preview  # preview the production build
```

> Opening `index.html` directly will not load styles correctly — CSS is imported through Vite/`src/main.tsx`.

---

## Deployment

Connected to Vercel from the `main` branch. Push to `main` to redeploy.

Or manually:

```bash
npm i -g vercel
vercel
```

---

## Tech Used

| Layer | Technology |
|---|---|
| Build | Vite |
| UI island | React + Tailwind + shadcn-style components |
| Structure | HTML5 |
| Styling | CSS custom properties + Tailwind utilities |
| Scripting | Vanilla JS (nav, form, lightbox, animations) |
| Hosting | Vercel |

---

## Contact Form

The form posts through [FormSubmit](https://formsubmit.co) to `teja26kt@gmail.com`.  
On first submit, FormSubmit may ask you to confirm the email address in your inbox.

Alternatives: EmailJS or a custom `/api/contact` endpoint.

---

Made with ♥ by Teja Kuchallapati.
