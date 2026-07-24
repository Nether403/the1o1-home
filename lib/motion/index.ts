/**
 * M3 — the motion orchestrator.
 *
 * Dynamically imported after hydration (see components/spine/Motion.tsx) so
 * GSAP + Lenis never touch the critical path. Wires the canonical
 * Lenis ↔ ScrollTrigger loop, mounts every world's timeline factory inside
 * one gsap.context, and returns a full cleanup.
 *
 * prefers-reduced-motion: nothing mounts — the CSS layer keeps every word
 * and CTA visible, statically. Parity is contractual, not best-effort.
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { heroIn, heroMotion } from "./hero";
import { swissMotion } from "./swiss";
import { maisonMotion } from "./maison";
import { brutMotion } from "./brut";
import { termMotion } from "./term";
import { toyMotion } from "./toy";
import { y2kMotion } from "./y2k";
import { noirMotion } from "./noir";
import { endMotion } from "./end";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export function initMotion(): () => void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return () => {};
  }

  gsap.registerPlugin(ScrollTrigger);
  let lenis: Lenis | undefined;
  let mm: gsap.MatchMedia | undefined;
  let ctx: gsap.Context | undefined;
  const extraCleanups: Array<() => void> = [];
  const raf = (time: number) => lenis?.raf(time * 1000);
  const onRedealt = () => heroIn();
  const cleanup = () => {
    window.removeEventListener("the1o1:redealt", onRedealt);
    extraCleanups.forEach((fn) => fn());
    mm?.revert();
    ctx?.revert();
    gsap.ticker.remove(raf);
    lenis?.destroy();
    window.__lenis = undefined;
    document.documentElement.removeAttribute("data-motion");
  };

  try {
    document.documentElement.setAttribute("data-motion", "gsap");
    lenis = new Lenis({ duration: 1.15 });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    mm = gsap.matchMedia();
    ctx = gsap.context(() => {
      heroMotion();
      swissMotion(mm!);
      maisonMotion();
      const brutCleanup = brutMotion();
      if (brutCleanup) extraCleanups.push(brutCleanup);
      termMotion();
      toyMotion();
      const y2kCleanup = y2kMotion();
      if (y2kCleanup) extraCleanups.push(y2kCleanup);
      noirMotion();
      endMotion();
    });

    window.addEventListener("the1o1:redealt", onRedealt);
    heroIn();
    requestAnimationFrame(() => ScrollTrigger.refresh());
    return cleanup;
  } catch (error) {
    cleanup();
    throw error;
  }
}
