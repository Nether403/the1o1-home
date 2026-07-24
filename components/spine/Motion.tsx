"use client";

import { useEffect } from "react";

/**
 * Mounts the M3 motion layer via dynamic import — GSAP/Lenis load as an
 * async chunk after hydration, keeping them off the first-load JS path.
 */
export default function Motion() {
  useEffect(() => {
    let alive = true;
    let cleanup: (() => void) | undefined;
    import("@/lib/motion").then((m) => {
      if (alive) cleanup = m.initMotion();
      else return;
    });
    return () => {
      alive = false;
      cleanup?.();
    };
  }, []);
  return null;
}
