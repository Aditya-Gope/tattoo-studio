# ⚡ Atelier Ink — Luxury Tattoo Studio Web Experience

> **High-Performance, Cinematic Concept Website for a Custom Tattoo Studio.**  
> Crafted with Next.js 16, React 19, TypeScript, Tailwind CSS, and GSAP Motion Design.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAditya-Gope%2Ftattoo-studio)

---

## 🎨 Visual Identity & Key Highlights

- **Black Editorial Theme:** Minimalist luxury aesthetic with Deep Ink Black (`#0A0A0A`), Charcoal (`#151515`), Warm Bone (`#EFE9DE`), and Oxblood (`#7C2027`) accents.
- **Cinematic Hero Experience:**
  - Automated three-slide carousel driven by an "Ink Curtain" transition that completely prevents transparent double-exposure ghosting.
  - Typewriter headline effect with zero layout shift (built on CSS Grid measurement).
  - Scroll-linked subtle parallax layer decoupled from slide transition logic.
  - Deterministic z-index layering and single-instance action controls.
- **Global GSAP Choreography:** Word-by-word masked reveal animations across all section headings, staggered card reveals, and smooth scroll triggers.
- **Mobile-First & Fully Responsive:** Pixel-perfect layout across 360px mobile viewports up to ultrawide desktop screens.
- **Accessible & Performance-Optimized:** `prefers-reduced-motion` compliance, automated accessibility attributes, and Next.js Turbopack-optimized bundle.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Motion:** [GSAP 3](https://gsap.com/) & ScrollTrigger
- **Validation:** [Zod](https://zod.dev/)
- **Package Manager:** npm

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/Aditya-Gope/tattoo-studio.git
cd tattoo-studio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run development server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 📁 Project Architecture

```
tattoo-studio-web/
├── public/                # Static assets, local images & concept photography
│   └── images/
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── page.tsx       # Homepage (Hero, Brand Statement, Portfolio, Style Explorer, etc.)
│   │   ├── portfolio/     # Selected portfolio showcase & detail views
│   │   ├── artists/       # Resident artists & concept bios
│   │   ├── studio/        # Studio tour, hygiene protocols & facilities
│   │   ├── book/          # Consultation booking flow
│   │   └── api/booking/   # Server route for handling consultations
│   ├── components/
│   │   ├── home/          # Hero, BrandStatement, PortfolioSection, StyleExplorer, etc.
│   │   ├── ui/            # Buttons, Containers, Lightbox, SectionHeadings
│   │   └── ui/animations/ # TypewriterText, AnimatedHeading, AnimatedList, etc.
│   ├── lib/               # Content loaders, splitText utility, class helpers
│   └── data/              # Studio data & portfolio catalogue
└── next.config.ts         # Next.js configuration
```

---

## 🌐 1-Click Live Deployment

Deploy directly to **Vercel** with zero configuration:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FAditya-Gope%2Ftattoo-studio)

---

## 📄 License

MIT © [Aditya Gope](https://github.com/Aditya-Gope)
