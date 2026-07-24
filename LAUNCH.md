# Launch Checklist — the1o1.one

> Nothing ships without Martin's hand on it. This list is the hand.

## Pre-flight (verify on the Railway production URL)

- [ ] `the1o1.one` resolves with valid TLS (DNS propagated, Railway custom domain green)
- [ ] THE DEAL: all six core worlds and the active guest can appear as hero; every supported `?w=` deep link honours the parameter
- [ ] REDEAL: column wipes carry the destination world's color; noir fades through black; no double-fire on rapid clicks
- [ ] THE WALK: all seven worlds and seam gates animate; Swiss practices pin and release cleanly; velocity marquee skews with fast scroll
- [ ] Toy physics: chips collide/flick/settle and **sleep** (CPU idles when chips rest); springs still work with WASM blocked (devtools → block request)
- [ ] Noir: grain animates, flashlight eases; CSS fallback appears when JS chunks are blocked
- [ ] Terminal: `help`, `whoami`, `services`, `stack`, `worlds`, `brief`, `contact`, `redeal`, `clear`
- [ ] 101/101 meter completes after visiting all seven worlds
- [ ] OG cards: paste `the1o1.one` and `the1o1.one?w=brut` into a Slack/WhatsApp/X preview — `/og/deal` renders; try `/og/maison` directly
- [ ] Reduced motion (OS setting or devtools emulation): every word, every world, every CTA present; zero morphs; no hidden content
- [ ] No-JS (devtools → disable JavaScript): hero, evidence room, all seven worlds, inquiry fallback, and direct email remain visible
- [ ] Keyboard-only pass: skip link appears on first Tab; walk index, terminal, Toy chips, and inquiry are operable
- [ ] Mobile pass (real device): touch chips, tap dial targets, wipe performance, no horizontal overflow
- [ ] Lighthouse (mobile, production URL): Performance ≥ 90, A11y ≥ 95, no CLS regressions
- [ ] CI green on `main` (typecheck, unit, production browser, accessibility, audit, and budget gates)
- [ ] `/built` dossier reads true — every claim on it matches the shipped build

## Launch

- [ ] Final content read-through (typos are the only unforgivable bug on a consultancy site)
- [ ] Confirm analytics decision (see below) — currently **none**, and the colophon says so
- [ ] Announce: the site itself is the demo — share `?w=` links per audience (e.g. `?w=term` to engineers, `?w=maison` to brand clients)

## Analytics — decision required (Martin)

The colophon currently promises "no tracking beyond your own curiosity." Options, in order of alignment with that promise:

1. **None** (current state) — the promise stays literal. Referrals judged by project inquiries.
2. **Server-side request counts** (Railway logs) — zero client impact, no promise broken.
3. **Privacy-respecting client analytics** (Plausible/GoatCounter-class, self-hostable, no cookies) — requires softening the colophon line.

Option 3 requires a copy change; don't ship the contradiction.

## Post-launch

- [ ] Watch Railway metrics for the first 48h (cold starts, memory)
- [ ] `git tag v2.0.0` on the launch commit
- [ ] Start the World of the Month cadence (see WOTM.md)
