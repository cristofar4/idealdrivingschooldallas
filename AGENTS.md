# Project conventions — Ideal Driving School

Stack: **Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · GSAP · Framer Motion · Lenis · shadcn-style UI**.

## Where things live
- **Business data is centralized** in `src/lib/site.ts` — edit copy, pricing, programs, testimonials, FAQs, and instructors there, not in components.
- Reusable page sections: `src/components/sections/`. Page files in `src/app/*/page.tsx` should compose sections, stay thin, and export `metadata`.
- All imagery is generated SVG/gradient art via `src/components/visuals/scene.tsx` — there are **no external image assets** by design. Add new visuals as `Scene` kinds.
- Design tokens, custom utilities, and keyframes are defined in `src/app/globals.css` using Tailwind v4 `@theme` / `@utility`.

## Conventions
- Dark sections use the `dark` class (flips semantic tokens) + `bg-ink text-cream`.
- Brand color utilities: `gold`, `gold-deep`, `ink`, `navy`, `cream`, `bone` (e.g. `bg-gold/12`, `text-gold-deep`).
- Animations should respect reduced motion (handled globally via `MotionConfig reducedMotion="user"` and a CSS media query).
- Avoid `transform` on ancestors of `position: sticky` elements; use `overflow-clip` (not `overflow-hidden`) when clipping around sticky content.

## Verify before committing
```bash
pnpm lint && pnpm build
```
