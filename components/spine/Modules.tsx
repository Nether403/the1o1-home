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
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    /* M5 device-tier gate: lite devices keep the CSS treatments and the
       spring fallback — no WASM, no canvas loops */
    const lite = document.documentElement.getAttribute("data-tier") === "lite";
    const cleanups: Array<() => void> = [];
    const loading = new Set<string>();
    const loaded = new Set<string>();
    let generation = 0;
    let io: IntersectionObserver | undefined;

    const load = (id: string) => {
      if (loaded.has(id) || loading.has(id)) return;
      const currentGeneration = generation;
      loading.add(id);
      if (id === "w-toy") {
        import("@/lib/modules/toy-physics")
          .then(async (m) => {
            if (currentGeneration !== generation) return;
            const cleanup = await m.initToyPhysics();
            if (currentGeneration !== generation) return cleanup();
            loaded.add(id);
            cleanups.push(cleanup);
          })
          .catch(() => loaded.delete(id))
          .finally(() => loading.delete(id));
      } else if (id === "w-noir") {
        import("@/lib/modules/noir-light")
          .then((m) => {
            if (currentGeneration !== generation) return;
            cleanups.push(m.initNoirLight());
            loaded.add(id);
          })
          .catch(() => loaded.delete(id))
          .finally(() => loading.delete(id));
      }
    };

    const stop = () => {
      generation += 1;
      io?.disconnect();
      io = undefined;
      cleanups.splice(0).forEach((cleanup) => cleanup());
      loading.clear();
      loaded.clear();
    };
    const start = () => {
      if (lite || preference.matches || io) return;
      io = new IntersectionObserver(
        (entries) => entries.forEach((entry) => entry.isIntersecting && load(entry.target.id)),
        { rootMargin: "120% 0px" }
      );
      ["w-toy", "w-noir"].forEach((id) => {
        const element = document.getElementById(id);
        if (element) io?.observe(element);
      });
    };
    const sync = () => {
      stop();
      start();
    };
    preference.addEventListener("change", sync);
    start();

    return () => {
      preference.removeEventListener("change", sync);
      stop();
    };
  }, []);
  return null;
}
