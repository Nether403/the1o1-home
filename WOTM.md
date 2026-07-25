# World of the Month — the sequel machine

> The roster is extensible by design: server-safe metadata coordinates an
> authored section, seam gate, optional motion/module, tests, and OG card.
> Six core worlds remain permanent; G·01 is the active guest.

## Why

- **Return traffic**: the site never finishes. "What's this month's world?" is a reason to come back.
- **A devlog beat**: every world ships with a short write-up (extend `/built`) — content marketing that is literally the product.
- **A monthly demo**: each new world is a fresh, sharable `?w=` link aimed at a specific client audience.

## The process (repeatable, ~2–4 days per world)

1. **Pick the register** — from the candidate bench below, or a client-industry register worth courting.
2. **Registry first** (`worlds/<id>.ts`) — identity, walk position, tokens, font pair, cursor, wipe personality, and motion spec. The chapter still requires authored implementation.
3. **Section + seam gate** — one content section in the register + one designed intermission. The Specimen gets re-dressed (appearance N/N).
4. **Motion factory** (`lib/motion/<id>.ts`) — entrance choreography + one signature interactive moment. One moment, tightly scoped — the M-series discipline holds.
5. **OG card** — `/og/<id>` follows automatically from tokens; check it renders.
6. **Wire the walk** — register one guest and let the derived order drive the dial, meter, and deal pool. The guest keeps a G-series identity independent of its walk position.
7. **Budget gate** — CI must stay green. A world that can't fit the budget doesn't ship that month.
8. **Devlog entry** — 300–500 words on `/built`: what the register demanded, what it cost, one trick.

## Candidate bench (pick, don't hoard)

| Register | One-line direction | Signature moment idea |
|---|---|---|
| **Newsprint** | 1940s broadsheet: columns, rules, halftone photos | Headline letterpress "ink spread" on hover |
| **Bauhaus poster** | Primary shapes, diagonal composition, Universal type | Shapes reflow into the layout grid as you scroll |
| **Blueprint** | Cyanotype ground, white technical linework, dimensions | Elements draw themselves with measurement callouts |
| **E-ink** | Paper-grey, dithered images, page-turn pacing | Scroll advances in discrete "page flips" with ghosting |
| **Vaporwave** | Dusk gradients, marble busts, grid horizon — knowing, not kitsch | Sun sets/rises with scroll position |
| **Teletext** | CEEFAX blocks, 8 colors, double-height rows | Content "tunes in" row by row |
| **Field guide** | Patagonia-catalog utility: kraft, specimen tags, stitched borders | Tags tear off and flutter (physics reuse) |

## Cadence

- **Monthly** on the 1st, announced via the deal itself (new arrivals get dealt the new world first for week one — `deal.ts` weight tweak).
- Skip a month rather than ship a weak world. The standard is the brand; the calendar is not.
