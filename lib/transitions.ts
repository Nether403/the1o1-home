/**
 * M2 — THE REDEAL transition engine.
 *
 * Fully data-driven from each world's WipeSpec:
 * - kind "columns": staggered column shutters (Web Animations API), colored
 *   with the DESTINATION world's ground token, ordered per `from`
 *   (start / end / center / random) — each world keeps its v1 personality.
 * - kind "fade": View Transitions API cross-fade (noir fades through black),
 *   with a WAAPI overlay fallback where VT is unsupported.
 * - prefers-reduced-motion: instant swap, no choreography.
 *
 * M3 layers GSAP scroll choreography on top; this engine stays the
 * authority for world swaps.
 */
import { WORLDS, type WorldId } from "@/worlds";

const EASE_CSS: Record<string, string> = {
  "power1.in": "cubic-bezier(.55,.085,.68,.53)",
  "power2.out": "cubic-bezier(.25,.46,.45,.94)",
  "power2.inOut": "cubic-bezier(.455,.03,.515,.955)",
  "power3.inOut": "cubic-bezier(.645,.045,.355,1)",
  "power4.inOut": "cubic-bezier(.77,0,.175,1)",
  "back.inOut(1.4)": "cubic-bezier(.68,-.4,.32,1.4)",
};
const easeToCss = (e: string) => EASE_CSS[e] ?? "ease-in-out";

let dealing = false;

export async function redealTo(next: WorldId, apply: () => void): Promise<void> {
  if (dealing) return;
  dealing = true;
  try {
    const w = WORLDS[next];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const swap = () => {
      document.documentElement.setAttribute("data-hero", next);
      apply();
    };
    if (!w || reduce) {
      swap();
      return;
    }
    if (w.wipe.kind === "fade") await fadeSwap(swap, w.wipe.duration);
    else await columnsSwap(swap, next);
  } finally {
    dealing = false;
  }
}

/* ---------- fade: View Transitions first, overlay fallback ---------- */
async function fadeSwap(swap: () => void, duration: number): Promise<void> {
  const doc = document as Document & {
    startViewTransition?: (cb: () => void) => { finished: Promise<void> };
  };
  if (typeof doc.startViewTransition === "function") {
    document.documentElement.style.setProperty("--vt-dur", `${duration}s`);
    try {
      await doc.startViewTransition(swap).finished;
    } catch {
      /* transition skipped — swap already applied */
    }
    return;
  }
  const fade = document.getElementById("fade");
  if (!fade) return swap();
  fade.style.visibility = "visible";
  await fade.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: duration * 1000,
    easing: "ease-in",
    fill: "forwards",
  }).finished;
  swap();
  await fade.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: duration * 1800,
    easing: "ease-out",
    fill: "forwards",
  }).finished;
  fade.style.visibility = "hidden";
}

/* ---------- columns: WAAPI shutters from the WipeSpec ---------- */
async function columnsSwap(swap: () => void, next: WorldId): Promise<void> {
  const w = WORLDS[next];
  const wipe = document.getElementById("wipe");
  const cols = wipe ? Array.from(wipe.querySelectorAll<HTMLElement>(".col")) : [];
  if (!wipe || cols.length === 0) return swap();

  const { duration, stagger, from } = w.wipe;
  const easing = easeToCss(w.wipe.ease);
  const order = staggerOrder(cols.length, from);

  cols.forEach((c) => {
    c.style.background = w.tokens.bg;
    c.style.transform = "scaleY(0)";
  });
  wipe.style.visibility = "visible";

  const run = (origin: "top" | "bottom", reverse: boolean) =>
    Promise.all(
      cols.map((c, i) => {
        c.style.transformOrigin = origin;
        const frames = reverse
          ? [{ transform: "scaleY(1)" }, { transform: "scaleY(0)" }]
          : [{ transform: "scaleY(0)" }, { transform: "scaleY(1)" }];
        return c.animate(frames, {
          duration: duration * 1000,
          delay: order[i] * stagger * 1000,
          easing,
          fill: "forwards",
        }).finished;
      })
    );

  await run("bottom", false); // cover
  swap();
  await new Promise((r) => setTimeout(r, 80));
  await run("top", true); // reveal
  wipe.style.visibility = "hidden";
}

/** Maps `from` to per-column stagger multipliers, preserving v1 personalities. */
function staggerOrder(n: number, from: "start" | "end" | "center" | "random"): number[] {
  const idx = Array.from({ length: n }, (_, i) => i);
  switch (from) {
    case "end":
      return idx.map((i) => n - 1 - i);
    case "center":
      return idx.map((i) => Math.abs(i - (n - 1) / 2));
    case "random": {
      const shuffled = [...idx].sort(() => Math.random() - 0.5);
      const pos = Array<number>(n).fill(0);
      shuffled.forEach((v, k) => (pos[v] = k));
      return pos;
    }
    default:
      return idx;
  }
}
