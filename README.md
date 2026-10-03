# Matrixo

Company profile site for **Matrixo Software Technology PLC** — *Software built for the real world.*

A restrained editorial system: warm paper surfaces, charcoal technical sections, compact
Inter headings, JetBrains Mono labels and a single brand-green accent used sparingly. No dark-mode
toggle, no gradients, no floating cards — the grid and the typography carry the design.

- **Hero** — "Software built for the real world." with a live reference-architecture panel
  (coordinates, scan line, animated route)
- **Sections** — Selected work (Oringo, Penta Learning Hub) → Products → Services → dark
  Engineering section with an animated architecture diagram → Principles → Company → Technology
  index → Insights → Contact CTA → footer
- **`#/contact`** — hash route with a full contact form (no backend: submit prepares a pre-filled
  `mailto:` message plus a copyable summary and the direct phone numbers)
- Everything is driven by `src/data/site.ts`, so copy and project facts live in one place

## Stack

- [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript
- Plain CSS design system (`src/styles/`): tokens → base → layout → motion → components
- Self-hosted Inter + JetBrains Mono latin subsets — **zero third-party requests at runtime**
- oxlint; no UI component library; no animation library (CSS + `IntersectionObserver`)

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
  App.tsx                 composition + hash routing + scroll-reveal observer
  router.ts               minimal hash router (#/contact vs in-page anchors)
  index.css               ordered stylesheet imports
  data/site.ts            nav, projects, capabilities, principles, technology, contact
  lib/reveal.ts           reveal delay helper
  styles/
    tokens.css            color, type, space, motion tokens
    base.css              reset, typography, focus, skip link, print
    layout.css            container, 12/6/1-col grid, section rhythm, buttons
    motion.css            reveals, masked headlines, diagram animation, reduced motion
    nav/hero/work/...     one stylesheet per section
  components/
    Navigation.tsx        fixed bar, scroll-spy, full-screen mobile menu
    Hero.tsx              headline + reference-architecture system panel
    SelectedWork.tsx      large project rows with SVG interface diagrams
    Products.tsx          engineering-spec product rows
    Capabilities.tsx      6-item architectural grid
    Engineering.tsx       dark section + ArchitectureDiagram
    Principles.tsx        numbered editorial rows
    Company.tsx           prose + direct contact panel
    TechnologyIndex.tsx   10-item technology index
    Insights.tsx          honest empty state
    ContactCTA.tsx        "Have something worth building?"
    ContactPage.tsx       contact form route
    Footer.tsx            structured footer
design/                   original single-file design kept for reference
```

## Accessibility

- Semantic landmarks, single `h1`, no heading-level jumps, skip link, labelled form controls
- Visible `:focus-visible` outlines (accent on paper, light accent on charcoal)
- Mobile menu: `aria-expanded`, Escape closes, focus moved into the menu, scroll locked
- All motion guarded by `prefers-reduced-motion`; print forces revealed content visible
- No horizontal overflow from 320px up; verified with headless Chrome at 320/375/768/1024/1440

## SEO

Document metadata, OpenGraph/Twitter tags, canonical URL, `robots.txt`, `sitemap.xml` and
Organization JSON-LD in `index.html`.

## Deployment

Pushed to GitHub and published with GitHub Pages (`.github/workflows/deploy.yml` runs
`npm ci && npm run lint && npm run build` and deploys `dist/` with the official Pages actions).
The build uses a relative asset base, so it works from a project site or a user site.
