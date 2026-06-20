# Ideal Driving School — Premium Driving Academy Platform

A complete, award-winning-grade redesign of [idealdrivingschooldallas.com](https://idealdrivingschooldallas.com) — reimagined as a premium driving-education platform for the Dallas–Fort Worth Metroplex.

Built to communicate **trust, professionalism, expertise, and safety** at first glance, with motion and polish on every interaction.

## ✨ Highlights

- **10 fully designed pages** — Home, About, Programs, Road Test, Pricing, Testimonials, Gallery, FAQ, Booking, Contact
- **Signature scrollytelling** — a GSAP ScrollTrigger "Student Journey" with a sticky visual, progress rail, and animated stages
- **Multi-step booking flow** — service → calendar → instructor → confirmation, with a live summary and success state
- **Self-contained art direction** — every visual is original SVG + gradient art (perspective roads, steering wheels, route maps), so there are **zero external image dependencies** and nothing ever breaks
- **Premium motion** — text/image reveals, parallax, magnetic buttons, animated counters, stagger, marquee, page transitions
- **Accessible & fast** — reduced-motion support, semantic markup, skip link, focus styles, SEO metadata, JSON-LD, sitemap & robots

## 🧱 Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | **Next.js 15** (App Router) |
| Language | **TypeScript** (strict) |
| Styling | **Tailwind CSS v4** (CSS-first `@theme`) |
| Scroll-driven motion | **GSAP** + ScrollTrigger |
| UI motion | **Framer Motion** |
| Smooth scroll | **Lenis** (synced to the GSAP ticker) |
| Components | **shadcn-style** primitives on Radix UI |
| Icons | lucide-react (+ custom brand glyphs) |

## 🎨 Design System

- **Palette:** Midnight Navy `#080b14` · Amber Gold `#f5a524` · Warm Cream `#f7f5f0`
- **Type:** Sora (display) · Inter (body) · Instrument Serif (editorial accent)
- Tokens, custom utilities (`glass`, `text-gradient-gold`, `bg-grid`, …), and keyframes live in `src/app/globals.css`.

## 📁 Structure

```
src/
├── app/                      # routes (one folder per page) + layout, sitemap, robots, icon
├── components/
│   ├── ui/                   # shadcn-style primitives (button, card, accordion, …)
│   ├── layout/               # site header + footer
│   ├── sections/             # composable page sections (hero, journey, pricing, …)
│   ├── booking/              # multi-step booking flow
│   ├── contact/              # contact form
│   ├── anim/                 # reveal, counter, magnetic, marquee, parallax
│   ├── visuals/              # Scene — the SVG/gradient art generator
│   ├── brand/                # logo + logomark
│   └── providers/            # Lenis + GSAP smooth-scroll provider
└── lib/                      # site data (single source of truth), utils, icons, gsap
```

All business information (NAP, programs, pricing, testimonials, FAQs, instructors) is centralized in **`src/lib/site.ts`**.

## 🚀 Getting Started

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # production build
pnpm start      # serve the production build
pnpm lint
```

## 🏢 Business

**Ideal Driving School** · 4101 E. Park Blvd, Suite 147, Plano, TX 75074
📞 (214) 884-5350 / (214) 884-5288 · TDLR-approved driver education serving the Dallas–Fort Worth Metroplex.
