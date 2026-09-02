# SteelThreads

Marketing site for SteelThreads — software consulting and custom development.
Single page, no backend, deployed as static files.

## Running it

```bash
npm install
npm run dev      # http://localhost:5173
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Typecheck (`tsc -b`) then build to `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | Oxlint |

## Stack

React 19 + TypeScript, Vite, Tailwind v4, Motion for animation, Phosphor for
icons. Geist and Geist Mono are self-hosted via `@fontsource-variable`, so the
site loads no external fonts at runtime.

## Where things live

```
src/
  content.ts          all site copy and contact details — edit here, not in components
  index.css           design tokens (light/dark), the 48px grid, spotlight, focus ring
  components/
    Mark.tsx          the logo mark; also exports the shared path data
    Splash.tsx        load-time splash that draws the mark
    GridSpotlight.tsx cursor-following grid glow (mouse only)
    GridCanvas.tsx    tap/click ripple + ambient twinkles on the grid
    Reveal.tsx        scroll-reveal wrapper
    Nav / Hero / Packages / Proof / CaseStudy / Footer
public/
  favicon.svg  apple-touch-icon.png  og.png  robots.txt  sitemap.xml
```

**Copy changes go in `src/content.ts`.** Services, metrics, examples, and the
contact details are all data; the components only lay them out.

## Design system

Paper `#F4F2EC`, ink `#14161A`, one accent teal `#0E6B57`, defined as CSS
variables in `index.css` and exposed to Tailwind through `@theme inline`. Dark
mode swaps the paper/ink roles; the Proof and Case study sections stay dark in
both. One easing token, `cubic-bezier(0.23, 1, 0.32, 1)`, is used everywhere.

Every animation degrades under `prefers-reduced-motion`: the splash and grid
effects switch off entirely, scroll reveals keep a short fade without movement.

## Assets

`public/og.png` (1200×630 link preview) and `public/apple-touch-icon.png` are
rendered from HTML in `logos/` (untracked) via headless Chrome, so they stay
consistent with the site. The logo's source of truth is the path data in
`src/components/Mark.tsx` — regenerate the images if the mark ever changes.
