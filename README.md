# the1o1.one

> We don't have a style. We have a standard.

A proof-first portfolio for Martin van Deursen, aimed at founders and product
leaders working through uncertain launches and difficult digital systems.

## Experience

- **The evidence room** presents only public, inspectable practice artifacts.
  Anonymized client records are added only when their context and evidence are
  approved for publication.
- **The Deal** chooses a hero register before paint and supports shareable
  `?w=swiss|maison|brut|term|toy|y2k|noir` links.
- **The Relay walk** carries one explicitly fictional AI-native product concept
  through six permanent worlds and one active guest.
- **The inquiry** submits through a server-side transactional-email action and
  always provides `support@101dev.xyz` as a direct fallback. Submissions are not
  stored in an application database.
- **The dossier** at `/built` documents the architecture and measured budgets.

## World Model

| Walk | Identity | Register | Relay responsibility |
|---:|---|---|---|
| 01 | W.01 | Swiss International | The product bet |
| 02 | W.02 | La Maison | Position and trust |
| 03 | W.03 | Brutalist | Launch proposition |
| 04 | W.04 | Terminal | AI system and guardrails |
| 05 | W.05 | Toy Box | First-run experience |
| 06 | G.01 | Y2K Chrome | Active guest / rollout console |
| 07 | W.06 | Noir | Release decision |

World metadata is server-safe and shared by navigation, transitions, sharing,
and tests. Each chapter remains deliberately authored in React, CSS, and an
optional motion or interaction module.

## Stack

- Next.js 15 App Router, React 19, and TypeScript
- GSAP, ScrollTrigger, and Lenis as an optional post-hydration motion layer
- Rapier 2D as scroll-gated WebAssembly with a keyboard/pointer spring fallback
- Resend for server-side inquiry delivery
- Vitest, Playwright, and axe-core for unit, browser, no-JS, reduced-motion,
  responsive, and accessibility verification

## Local Development

```bash
npm ci
npm run dev
```

Copy `.env.example` to `.env.local` to test inquiry delivery. Use a Resend API
key and an `INQUIRY_FROM` address on a verified sending domain. Never expose the
API key to client code.

## Verification

```bash
npm run typecheck
npm run test:unit
npm run build
npm run test:e2e
node ci/check-budgets.mjs
npm audit --audit-level=high
```

The browser suite runs against `next start`, not the development server.
The latest local verification evidence is recorded in `VERIFICATION.md`.

## Deployment

Deploy the Next.js application to a Node-compatible host. Configure:

```text
RESEND_API_KEY
INQUIRY_FROM
INQUIRY_TO=support@101dev.xyz
```

The previous root-level single-file build has been removed; this Next.js app is
the only canonical production artifact.

---

Copyright 2026 Martin van Deursen. No tracking beyond your own curiosity.
