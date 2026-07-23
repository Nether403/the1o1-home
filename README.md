# the1o1.one — The House of Every Style

> We don't have a style. We have a standard.

The shapeshifting homepage for **Martin van Deursen — design & consultancy**.
One set of content, six fully-committed design worlds. The metamorphosis is the portfolio.

## Concept

- **The Deal** — every visit deals one of six worlds as the hero, seeded pre-paint (no flash). Deep-linkable: `?w=swiss|maison|brut|term|toy|noir`. `↻ REDEAL` re-renders the hero with a wipe whose personality matches the destination world.
- **The Walk** — scrolling crosses all six worlds through designed seam gates (grid-rail ride, gold thread, crash-zoom + hazard strips, scroll-driven loading bar, trampoline letters, flashlight sweep).
- **The Dial** — right-edge world switcher; nav label and cursor morph per world.
- **The Constant** — nav + `START A PROJECT` CTA and the semantic DOM never change between worlds. The conversion spine is style-independent.
- **The Specimen** — one brief ("Make it impossible to ignore.") re-set in every world. Same words, six worlds, one standard.
- **101/101 meter** — visit all six worlds and the toy-world tracker completes.

## Worlds

| # | World | Register | Signature |
|---|-------|----------|-----------|
| 01 | Swiss International | Müller-Brockmann grid | Scroll-drawn gridlines, pinned horizontal practices |
| 02 | La Maison | Bodoni luxury | Cursor-tracked gold sheen, dark lift |
| 03 | Brutalist | Raw web | Velocity-skewed marquee, slam entrances |
| 04 | Terminal | Phosphor CLI | A real shell: `help`, `whoami`, `services`, `stack`, `brief`, `redeal` |
| 05 | Toy Box | Candy physics | Spring-drag chips, worlds-seen meter |
| 06 | Noir | Letterboxed cinema | Flashlight cursor, scroll-closing bars |

## Stack (this build)

Single-file static build: semantic HTML + CSS + vanilla JS, with
[GSAP 3.12](https://gsap.com) + ScrollTrigger and [Lenis](https://lenis.darkroom.engineering/) via CDN.
Google Fonts: Archivo (+Black), Bodoni Moda, IBM Plex Mono, Baloo 2, Oswald, Playfair Display, Inter.

- No build step. Deploy `index.html` anywhere static (Vercel, Netlify, Pages).
- Full `prefers-reduced-motion` fallback (all content, zero morphs).
- No tracking.

## Deploying

1. Point the `the1o1.one` apex at this repo's hosting (e.g. Vercel project → add domain).
2. That's it — one file.

## Roadmap (production port)

Planned per the approved Proposal 003 ("The House of Every Style"):

- Next.js 15 port — worlds as **token manifests** (data, not code forks)
- View Transitions API world morphs; per-world lazy modules
- Rapier physics for the Toy world; WebGPU/TSL where a world earns it
- Per-world font subsetting; CI-enforced perf budgets
- **World of the Month** — a rotating seventh register

---

© 2026 Martin van Deursen — Design / Development / Research · [martin@101dev.xyz](mailto:martin@101dev.xyz)
Built with Nexus (draft reviewed and shipped by Martin).
