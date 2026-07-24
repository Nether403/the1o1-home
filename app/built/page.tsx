import type { Metadata } from "next";
import Link from "next/link";
import { WORLDS, WORLD_ORDER } from "@/worlds";

export const metadata: Metadata = {
  title: "How this was built — the1o1.one",
  description:
    "The engineering dossier for The House of Every Style: architecture, budgets, tricks, and tradeoffs. Transparent by design.",
  openGraph: {
    title: "How this was built — the1o1.one",
    description: "Seven design systems on one page, budget-gated in CI. The full dossier.",
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
      <a className="skip-link" href="#dossier-content">Skip to dossier</a>
      <nav className="b-nav" aria-label="dossier">
        <Link href="/">← the1o1.one</Link>
        <span>DOSSIER — HOW THIS WAS BUILT</span>
        <a href="/#inquiry">START A PROJECT ↘</a>
      </nav>

      <main id="dossier-content">
      <header className="b-hero">
        <p className="b-kick">THE HOUSE OF EVERY STYLE — ENGINEERING DOSSIER</p>
        <h1>
          Seven authored chapters.
          <br />
          One page. <span>No excuses.</span>
        </h1>
        <p className="b-lede">
          The homepage you just left carries one fictional product argument through six permanent design
          worlds and one active guest — with dedicated typography, layout, motion, and interaction for each.
          This page explains the shared registry and authored implementation. If you&apos;re evaluating
          whether we can engineer your hard problem: this is the evidence, not the pitch.
        </p>
      </header>

      <section>
        <h2>01 — A registry coordinates authored chapters</h2>
        <p>
          Every register has server-safe metadata for identity, walk position, tokens, font pairing,
          cursor, and transition personality. Each chapter is still deliberately authored in React,
          CSS, and an optional motion or interaction module. The registry prevents navigation, sharing,
          progress, and deal logic from drifting; it does not pretend art direction is a configuration file.
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
          WASM ships as a separate streamed asset (~427KB gzip) parsed off the JS thread — it is the
          single heaviest thing on this site, and it is opt-in by scroll.
        </p>
      </section>

      <section>
        <h2>05 — The numbers (CI-enforced)</h2>
        <p>
          Every build runs a budget gate. Failing any line fails the build — raising a budget requires
          a written justification in the PR. The dated local receipt is kept in <code>VERIFICATION.md</code>;
          deployment-specific checks remain separate in <code>LAUNCH.md</code>.
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
            <tr><td>First-load JS (gzip)</td><td>~111 KB</td><td>125 KB</td></tr>
            <tr><td>CSS (gzip)</td><td>~13 KB</td><td>25 KB</td></tr>
            <tr><td>Async chunk (default)</td><td>≤ 59 KB</td><td>80 KB each</td></tr>
            <tr><td>Physics WASM (streamed, scroll-gated)</td><td>~427 KB</td><td>470 KB</td></tr>
            <tr><td>Explicit font preloads</td><td>0</td><td>6 maximum</td></tr>
            <tr><td>Third-party font requests</td><td>0</td><td>0 — hard ban</td></tr>
          </tbody>
        </table>
        <p>
          Fonts are served from the application through <code>next/font</code>, with no browser request to
          Google font hosts. The prerendered HTML contains the evidence room, every Relay chapter, the
          inquiry fallback, and the contact path. Browser tests verify no-JavaScript and reduced-motion
          behavior; CI also measures the route assets and the client Rapier WASM separately.
        </p>
      </section>

      <section>
        <h2>06 — Devlog: World of the Month №1 — Y2K Chrome</h2>
        <p>
          July 2026&apos;s guest register extends the shared registry with one authored chapter,
          dedicated Michroma treatment, a liquid-metal cursor spec, a center-out wipe,
          one gate with a scroll-scrubbed lens flare, and one signature moment — a chrome
          blob that tails the cursor at the lag heavy metal deserves. The deal now weights the
          featured world at ~30% for its month; deep link: <code>?w=y2k</code>.
        </p>
        <p>
          What it cost: one self-hosted Michroma face, zero new runtime dependencies, and no increase
          to the CI budgets. The trick worth keeping: chrome is just
          a five-stop gradient with the mids crushed; everything else is restraint.
        </p>
      </section>

      <section>
        <h2>07 — Standing on shoulders</h2>
        <ul className="b-links">
          <li><a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">Next.js 15</a> — static-first shell, App Router</li>
          <li><a href="https://gsap.com" target="_blank" rel="noopener noreferrer">GSAP + ScrollTrigger</a> &amp; <a href="https://lenis.darkroom.engineering" target="_blank" rel="noopener noreferrer">Lenis</a> — the scroll cinema</li>
          <li><a href="https://rapier.rs" target="_blank" rel="noopener noreferrer">Rapier</a> — deterministic physics, Rust→WASM</li>
          <li><a href="https://github.com/brunosimon/folio-2025" target="_blank" rel="noopener noreferrer">Bruno Simon&apos;s folio-2025</a> — the open-sourced proof that play belongs on portfolios</li>
        </ul>
        <p className="b-prov">
          Built by Martin van Deursen. No tracking beyond your own curiosity.
          <br />
          The hard problem is the fun part — <a href="mailto:support@101dev.xyz?subject=Product%20inquiry">support@101dev.xyz</a>
        </p>
      </section>
      </main>
    </div>
  );
}
