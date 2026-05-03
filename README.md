# Aman Bansal — Portfolio Website

Personal portfolio website built with React, Vite, and Tailwind CSS. Deployed via GitHub Pages.

🌐 **Live:** [retr0rat.github.io/Aman_Bansal](https://retr0rat.github.io/Aman_Bansal/)

---

## About

A fully custom single-page portfolio showcasing my projects, skills, and background as a full-stack developer and ML engineer. Designed with a dark/light theme, smooth page transitions, and a clean typographic aesthetic built around the Syne font family.

---

## Features

- **Page transition system** — opacity + translateY animations between sections, driven by scroll wheel (desktop) and swipe gestures (mobile)
- **Dark / light theme** — persistent toggle with a smooth fade transition, no flash on load
- **Custom cursor** — follows pointer with lag, hidden on touch devices
- **Nebula background** — animated canvas particle system
- **Projects showcase** — carousel with a detail drawer (bottom sheet on mobile, modal on desktop), project images, stat cards, and tech tags
- **About** — timeline layout with scrollable panel on mobile
- **Contact** — EmailJS-powered contact form
- **Resume** — inline resume viewer with PDF export via html2pdf.js
- **Cylinder roll animation** — letter-by-letter hover effect on interactive text links
- **Mobile-first** — swipe navigation, `100dvh`, `env(safe-area-inset-bottom)`, no tab bar

---

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 19 |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Email | EmailJS |
| PDF export | html2pdf.js |
| Deployment | GitHub Pages (`gh-pages`) |

---

## Projects Featured

1. **Social Media Integrity Platform** — ML bot detection + fake news classifier (DistilBERT, Random Forest, 91% accuracy, 700K+ samples)
2. **Expense Splitter App** — Full-stack group expense tracker with TDD (25 Vitest tests, CI/CD via GitHub Actions)
3. **ML Classification API** — XGBoost species classifier REST API, 95.62% F1-score, Dockerised with FastAPI
4. **Mon Amour E-Commerce** — MERN stack fashion platform with JWT auth, admin dashboard, and checkout flow

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:5173/Aman_Bansal/

# Production build
npm run build

# Deploy to GitHub Pages
npm run deploy
```

---

## Structure

```
src/
├── App.jsx                  # Page transition system, scroll/swipe handlers
├── index.css                # Global styles, dvh overrides
├── components/
│   ├── Hero.jsx             # Landing section
│   ├── About.jsx            # Bio + timeline
│   ├── Projects.jsx         # Project carousel + detail drawer
│   ├── Contact.jsx          # Contact form (EmailJS)
│   ├── ResumePage.jsx       # Resume viewer + PDF export
│   ├── Nav.jsx              # Desktop dot navigation
│   ├── CylinderText.jsx     # Letter-roll hover animation
│   ├── NebulaBackground.jsx # Canvas particle background
│   ├── ThemeToggle.jsx      # Dark/light toggle
│   └── CustomCursor.jsx     # Custom pointer
└── styles/
    ├── theme.css            # CSS variables (dark + light)
    ├── cylinder.css         # Cylinder roll keyframes
    ├── nav.css              # Nav styles
    └── loader.css           # Loader animation
```

---

## Deployment

Hosted on GitHub Pages. The `gh-pages` branch contains the production build. Source lives on `main`.

To redeploy after changes:

```bash
npm run build && npm run deploy
```
