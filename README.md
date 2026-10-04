# Matrixo

Company profile site for **Matrixo Software Technology PLC** — *Software built for the real world.*

A single-page, 3D-driven company site: one fixed WebGL canvas behind the whole page, a
procedural geometric Matrixo avatar, and a four-step scroll story that disassembles the avatar
into an architecture layer stack, a network sphere, and a rebuilt final frame. Warm-stone
light theme, near-black dark sections, a single deep-green accent (`#0f7b35`). No gradients,
no glassmorphism, no card grids — typography, hairlines and the scene carry the design.

- **Hero** — headline left, live 3D avatar right, quiet mono meta row at the bottom
- **Story** (`#story`) — four scroll steps: assemble → layers → network → rebuild
- **Brand moment** — full-bleed dark frame with the mega wordmark
- **Capabilities** (`#capabilities`) — services 01–06 with the orbiting 3D scene
- **About / Contact / Footer** — one page, section anchors, theme flips along the scroll
- All copy lives in `src/data/site.ts`

## Stack

- [Vite](https://vite.dev) + [React 19](https://react.dev) + TypeScript
- [Three.js](https://threejs.org) + [React Three Fiber](https://r3f.docs.pmnd.rs) + [drei](https://drei.pmnd.rs) + [GSAP ScrollTrigger](https://gsap.com/scrolltrigger/)
- Plain CSS design system (`src/styles/`): tokens → base → layout → motion → per-section sheets
- Self-hosted Inter + JetBrains Mono + Jost latin subsets — **zero third-party requests at runtime**
- oxlint; no UI component library

## Performance & fallbacks

- Scene is a `React.lazy` chunk mounted after `requestIdleCallback`; initial bundle ≈ 75 kB gz
- DPR capped (1.75 desktop / 1.25 mobile); render loop pauses on `document.hidden`
- No WebGL → static SVG fallback (`StaticArt`); a runtime scene error → same fallback
- `?no3d` renders the HTML page without the canvas (used by layout test suites)
- `prefers-reduced-motion` disables breathing, pulses, head-tracking and entrance transforms;
  scroll-driven scene changes still work and snap

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
  App.tsx                 single-page composition + reveal observer + theme/scroll drive
  data/site.ts            all page copy (nav, story, services, about, contact, footer)
  lib/
    theme.ts              scroll-driven theme controller (CSS vars + scene fog)
    reveal.ts             reveal delay helper
  sections/
    Hero / Story / BrandMoment / Services / About / Contact
    StaticArt.tsx         no-WebGL fallback illustration
  components/
    Navigation.tsx        fixed bar, scroll-spy, full-screen mobile menu
    Footer.tsx            structured footer
    MatrixoMark.tsx       the shared M symbol (header, favicon, avatar chest)
  three/
    Stage.tsx             WebGL gate, idle-mount, error boundary
    Scene.tsx             canvas, lights, frameloop control
    Avatar / Layers / Network / Orbit / Rig    scene objects + camera choreography
    store.ts, materials.ts, scroll.ts          mutable store, shared materials, GSAP drive
  styles/                 tokens, base, layout, motion + one sheet per section
```

## Accessibility

- Semantic landmarks, single `h1`, skip link, labelled controls, no heading-level jumps
- Visible `:focus-visible` outlines; mobile menu traps focus, Escape closes, scroll locks
- Section themes flip background/foreground via CSS variables — contrast verified (7:1+)
- All non-scroll motion guarded by `prefers-reduced-motion`
- No horizontal overflow from 320px up; verified with headless Chrome at 320–1440

## SEO

Document metadata, OpenGraph/Twitter tags, canonical URL, `robots.txt`, `sitemap.xml` and
Organization JSON-LD in `index.html`.

## Deployment

Pushed to GitHub and published with GitHub Pages (`.github/workflows/deploy.yml` runs
`npm ci && npm run lint && npm run build` and deploys `dist/` with the official Pages actions).
The build uses a relative asset base, so it works from a project site or a user site.
