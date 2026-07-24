import type { Metadata } from "next";
import Link from "next/link";
import { WORLDS, WORLD_ORDER } from "@/worlds";

export const metadata: Metadata = {
  title: "How this was built — the1o1.one",
  description:
    "The engineering dossier for The House of Every Style: architecture, budgets, tricks, and tradeoffs. Transparent by design.",
  openGraph: {
    title: "How this was built — the1o1.one",
    description: "Six design systems on one page, budget-gated in CI. The full dossier.",
    images: [{ url: "/og/deal", width: 1200, height: 630 }],
  },
};

/**
 * The dossier is deliberately set in the void register — no world, no
 * spectacle. An engineering document, written plainly. Transparency is
 * the strongest sales asset this consultancy owns.
 */
export default function Built() {
  return (
    <div id="built">
      <nav className="b-nav" aria-label="dossier">
        <Link href="/">← the1o1.one</Link>
        <span>DOSSIER — HOW THIS WAS BUILT</span>
        <a href="mailto:martin@101dev.xyz?subject=The%20hard%20problem">START A PROJECT ↗</a>
      </nav>

      <header className="b-hero">
        <p className="b-kick">THE HOUSE OF EVERY STYLE — ENGINEERING DOSSIER</p>
        <h1>
          Six design systems.
          <br />
          One page. <span>No excuses.</span>
        </h1>
        <p className="b-lede">
          The homepage you just left renders one set of content through six fully-committed design
          languages — typography, palette, motion physics, cursor — and deals you a different opening
          world every visit. This page explains how, with real numbers. If you&apos;re evaluating
          whether we can engineer your hard problem: this is the evidence, not the pitch.
        </p>
      </header>

      <section>
        <h2>01 — Worlds are data, not code forks</h2>
        <p>
          Every register is a typed <em>manifest</em>: tokens (ground, ink, accent), font pairing with
          exact weights, a cursor spec, a redeal &quot;wipe personality&quot;, and a motion spec. The
          page has one semantic DOM; only presentation swaps. Adding a seventh world is a data PR — no
          new architecture, no fork.
        </p>
        <div className="b-worlds">
          {WORLD_ORDER.map((id) => {
            const w = WORLDS[id];
            return (
              <div className="b-world" key={id} style={{ borderColor: w.tokens.accent }}>
                <i style={{ background: w.tokens.bg, borderColor: w.tokens.accent }} />
                <b>{w.label}</b>
                <span>
                  wipe: {w.wipe.kind}/{w.wipe.from} · seam: {w.motion.seam}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2>02 — The Deal</h2>
        <p>
          A &lt;1KB inline script runs before first paint: it seeds a random world (or honors a{" "}
          <code>?w=</code> deep link) by setting one attribute on <code>&lt;html&gt;</code>. No flash,
          no hydration mismatch, no server cost — the page stays fully static. The REDEAL button swaps
          worlds through a transition engine driven entirely by each manifest&apos;s wipe spec: Web
          Animations API column shutters in the destination&apos;s ground color, or a View Transitions
          fade for noir. Every redeal writes <code>?w=</code> back into the URL, so whatever world
          you&apos;re looking at is the world you share.
        </p>
      </section>

      <section>
        <h2>03 — Motion that costs the critical path nothing</h2>
        <p>
          GSAP + ScrollTrigger + Lenis load as async chunks after hydration — first-load JavaScript is
          identical with or without the motion layer. Each world&apos;s choreography is its own
          timeline factory: the Swiss practices pin and walk sideways, the brutalist marquee skews with
          scroll velocity, the terminal gate&apos;s loading bar is literally your scroll progress, the
          noir letterbox closes as you arrive. Under <code>prefers-reduced-motion</code> the layer
          never mounts and CSS carries every word statically. Parity is enforced in CI, not promised.
        </p>
      </section>

      <section>
        <h2>04 — Physics with manners</h2>
        <p>
          The toy chips are rigid bodies in a Rapier (Rust→WASM) world: kinematic while you drag,
          dynamic with your real flick velocity on release, asleep the moment they settle. The module
          loads one world ahead of your scroll and never for visitors who don&apos;t get there. The
          WASM ships as a separate streamed asset (~424KB gzip) parsed off the JS thread — it is the
          single heaviest thing on this site, and it is opt-in by scroll.
        </p>
      </section>

      <section>
        <h2>05 — The numbers (CI-enforced)</h2>
        <p>
          Every build runs a budget gate. Failing any line fails the build — raising a budget requires
          a written justification in the PR.
        </p>
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Measured</th>
              <th>Budget</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>First-load JS (gzip)</td><td>~107 KB</td><td>244 KB</td></tr>
            <tr><td>CSS (gzip)</td><td>~9 KB</td><td>24 KB</td></tr>
            <tr><td>Async chunk (default)</td><td>≤ 58 KB</td><td>146 KB each</td></tr>
            <tr><td>Physics WASM (streamed, scroll-gated)</td><td>~424 KB</td><td>781 KB</td></tr>
            <tr><td>Font preloads (spine faces only)</td><td>4</td><td>6</td></tr>
            <tr><td>Third-party font requests</td><td>0</td><td>0 — hard ban</td></tr>
          </tbody>
        </table>
        <p>
          Fonts are latin-subset woff2, self-hosted with size-adjusted fallback metrics (CLS guard).
          The two spine faces preload; world display faces swap in on demand — the honest strategy
          when the opening world is random by design. The prerendered HTML contains every world, the
          services, and the contact path with zero scripts: the CI gate greps for them.
        </p>
      </section>

      <section>
        <h2>06 — Standing on shoulders</h2>
        <ul className="b-links">
          <li><a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">Next.js 15</a> — static-first shell, App Router</li>
          <li><a href="https://gsap.com" target="_blank" rel="noopener noreferrer">GSAP + ScrollTrigger</a> &amp; <a href="https://lenis.darkroom.engineering" target="_blank" rel="noopener noreferrer">Lenis</a> — the scroll cinema</li>
          <li><a href="https://rapier.rs" target="_blank" rel="noopener noreferrer">Rapier</a> — deterministic physics, Rust→WASM</li>
          <li><a href="https://github.com/brunosimon/folio-2025" target="_blank" rel="noopener noreferrer">Bruno Simon&apos;s folio-2025</a> — the open-sourced proof that play belongs on portfolios</li>
        </ul>
        <p className="b-prov">
          Built by Martin van Deursen with Nexus. No tracking beyond your own curiosity.
          <br />
          The hard problem is the fun part — <a href="mailto:martin@101dev.xyz?subject=The%20hard%20problem">martin@101dev.xyz</a>
        </p>
      </section>
    </div>
  );
}
