import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** W·03 Brut — crash-zoom gate, hazard strips shearing past, slam entrances,
 *  and the marquee that skews with scroll velocity. */
export function brutMotion(): (() => void) | void {
  /* seam gate */
  gsap.fromTo("#s-brut h3", { scale: 2.6, rotation: -7, opacity: 0 }, {
    scale: 1, rotation: 0, opacity: 1, ease: "power1.in",
    scrollTrigger: { trigger: "#s-brut", start: "top 85%", end: "center 50%", scrub: 0.4 },
  });
  gsap.fromTo("#s-brut .strip.a", { xPercent: -30 }, {
    xPercent: 22, ease: "none",
    scrollTrigger: { trigger: "#s-brut", start: "top bottom", end: "bottom top", scrub: 0.3 },
  });
  gsap.fromTo("#s-brut .strip.b", { xPercent: 26 }, {
    xPercent: -24, ease: "none",
    scrollTrigger: { trigger: "#s-brut", start: "top bottom", end: "bottom top", scrub: 0.3 },
  });

  /* slam entrances — no easing grace */
  gsap.utils.toArray<HTMLElement>("#w-brut .ea").forEach((el, i) => {
    gsap.fromTo(el, { opacity: 0, scale: 1.12, rotation: -1.5 }, {
      opacity: 1, scale: 1, rotation: 0, duration: 0.14, ease: "power1.in",
      scrollTrigger: { trigger: el, start: "top 85%" }, delay: (i % 4) * 0.05,
    });
  });

  /* velocity marquee */
  const marq = document.getElementById("marq");
  if (!marq) return;
  let mx = 0;
  const tick = () => {
    mx -= 1.2;
    const half = marq.scrollWidth / 2;
    if (-mx >= half) mx += half;
    gsap.set(marq, { x: mx });
  };
  gsap.ticker.add(tick);
  const skewSetter = gsap.quickSetter("#w-brut .marq .inner", "skewX", "deg");
  ScrollTrigger.create({
    trigger: "#w-brut",
    start: "top bottom",
    end: "bottom top",
    onUpdate: (self) => skewSetter(gsap.utils.clamp(-12, 12, self.getVelocity() / -120)),
  });
  return () => gsap.ticker.remove(tick);
}
