# Matrixo

Company profile site for **Matrixo Software Technology PLC** — "Free Your Mind".

The visual design, copy and content come from `design/Matrixo_Official_Website_50Plus (2).html`,
ported faithfully to React: same layout, palette, dark/light theme and imagery, with the original
single-file script rewritten as React state.

- Dark theme by default, light theme via the ◐ toggle (persisted in `localStorage`)
- Sections: hero → proof bar → capabilities → live work (Penta Learning Hub) → process → about →
  "is Matrixo a fit?" chooser → CTA → contact form → footer
- The fit chooser preselects the matching project type in the contact form and scrolls to it
- The contact form validates locally and shows a "your inquiry is ready" notice (no backend)

## Stack

- [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript
- Plain CSS: `src/styles/matrixo.css` (the source design's stylesheet) + `src/styles/extra.css`
  (accessibility additions only: skip link, focus rings, reduced motion, print)
- oxlint

## Commands

```bash
npm install
npm run dev      # local dev server
npm run lint     # oxlint
npm run build    # typecheck + production build into dist/
npm run preview  # serve the production build
```

## Structure

```
src/
  App.tsx                 composition + theme, menu, scroll-reveal and chooser state
  index.css               imports the two stylesheets
  assets.ts               logo URL (works with a relative base)
  choices.ts              fit-chooser options -> contact form project types
  styles/
    matrixo.css           design stylesheet (from the source design)
    extra.css             accessibility-only additions
  components/
    Nav.tsx               fixed nav, theme toggle, mobile menu
    Hero.tsx              hero + build-system visual
    Proof.tsx             four-cell proof bar
    Services.tsx          section header + capability cards
    Work.tsx              Penta Learning Hub case
    Process.tsx           four-step process
    About.tsx             "50+ working systems" lab panel
    Fit.tsx               fit chooser
    Cta.tsx               green call-to-action panel
    Contact.tsx           contact details + inquiry form
    Footer.tsx            footer
design/                   original single-file design (source of truth for the look)
```

## Accessibility

- Semantic landmarks, single `h1`, no heading-level jumps, skip link
- Visible `:focus-visible` outlines, focus order follows the visual order
- Mobile menu: `aria-expanded`, closes on link click and Escape key order preserved
- All animation guarded by `prefers-reduced-motion`; print forces revealed content visible
- No horizontal overflow from 320px up; pointer targets ≥ 24×24px

## Deployment

Pushed to GitHub and published with GitHub Pages (`.github/workflows/deploy.yml` runs
`npm ci && npm run lint && npm run build` and deploys `dist/` with the official Pages actions).
The build uses a relative asset base, so it works from a project site or a user site.
