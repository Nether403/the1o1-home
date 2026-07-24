"use client";

import { useEffect } from "react";

/**
 * Mounts the M3 motion layer via dynamic import — GSAP/Lenis load as an
 * async chunk after hydration, keeping them off the first-load JS path.
 */
export default function Motion() {
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let alive = true;
    let loading = false;
    let cleanup: (() => void) | undefined;
    const sync = () => {
      if (preference.matches) {
        cleanup?.();
        cleanup = undefined;
        return;
      }
      if (cleanup || loading) return;
      loading = true;
      import("@/lib/motion")
        .then((m) => {
          if (alive && !preference.matches) cleanup = m.initMotion();
        })
        .catch(() => document.documentElement.removeAttribute("data-motion"))
        .finally(() => { loading = false; });
    };
    preference.addEventListener("change", sync);
    sync();
    return () => {
      alive = false;
      preference.removeEventListener("change", sync);
      cleanup?.();
    };
  }, []);
  return null;
}
