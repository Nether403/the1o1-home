"use client";

import { useEffect } from "react";

/**
 * M4 — lazy module loader: heavy per-world behavior loads one world ahead
 * of the scroll and never joins the critical path.
 *
 * - #w-toy approaching  → Rapier physics (WASM) takes over the chips
 * - #w-noir approaching → canvas grain + eased flashlight
 *
 * prefers-reduced-motion: nothing loads — the CSS layer already carries
 * the static treatment for both worlds.
 */
export default function Modules() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let alive = true;
    const cleanups: Array<() => void> = [];
    const loaded = new Set<string>();

    const load = (id: string) => {
      if (loaded.has(id)) return;
      loaded.add(id);
      if (id === "w-toy") {
        import("@/lib/modules/toy-physics").then(async (m) => {
          if (!alive) return;
          const cleanup = await m.initToyPhysics();
          if (alive) cleanups.push(cleanup);
          else cleanup();
        });
      } else if (id === "w-noir") {
        import("@/lib/modules/noir-light").then((m) => {
          if (!alive) return;
          cleanups.push(m.initNoirLight());
        });
      }
    };

    /* "one world ahead": generous rootMargin fires while the previous
       world is still on screen */
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && load(e.target.id)),
      { rootMargin: "120% 0px" }
    );
    ["w-toy", "w-noir"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });

    return () => {
      alive = false;
      io.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, []);
  return null;
}
