# ZORAIZ ARSHAD — Engineering Archive

A neo-brutalist "engineering terminal" portfolio. Cream paper, hard black borders,
offset shadows, sticky-note accents, monospace system labels, and motion that snaps.

## Stack
- **Vite** + **React 18** + **TypeScript**
- **Tailwind CSS** (custom brutalist design tokens)
- **Framer Motion** (page transitions, scroll reveals, micro-interactions)
- **React Router** (Home · About · Projects · Project Detail · Contact)

## Develop
```bash
npm install
npm run dev      # start dev server
npm run build    # typecheck + production build
npm run preview  # preview the production build
```

## Structure
```
src/
  components/   # Layout, Navbar, Footer, Marquee, shared UI + motion presets
  lib/data.ts   # single source of truth for profile, projects, skills
  pages/        # one file per route
  index.css     # design system: tokens, brutalist utilities
tailwind.config.js  # colors, shadows, keyframes/animations
```

## Design system
Edit colors, shadows, and animations in `tailwind.config.js`. Reusable surface
classes (`.panel`, `.sticker`, `.btn-*`, `.tag`, `.display`) live in `src/index.css`,
so every page stays visually consistent. Content lives in `src/lib/data.ts` — add a
project there and it appears in the archive, on the home teaser, and gets its own
detail route automatically.
