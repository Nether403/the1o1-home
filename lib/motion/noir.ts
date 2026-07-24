import gsap from "gsap";

/** W·06 Noir — the flashlight sweeps the gate; letterbox bars close in;
 *  the headline expands its tracking out of the dark. */
export function noirMotion(): void {
  /* seam gate */
  gsap.fromTo("#s-noir", { "--fx": "12%" }, {
    "--fx": "88%", ease: "none",
    scrollTrigger: { trigger: "#s-noir", start: "top bottom", end: "bottom top", scrub: 0.5 },
  });
  gsap.fromTo("#s-noir h3", { opacity: 0 }, {
    opacity: 1, ease: "none",
    scrollTrigger: { trigger: "#s-noir", start: "top 75%", end: "center 50%", scrub: 0.5 },
  });

  /* letterbox closes as the final reel starts */
  gsap.to("#w-noir .bars", {
    height: 52, ease: "none",
    scrollTrigger: { trigger: "#w-noir", start: "top 70%", end: "top 10%", scrub: 0.5 },
  });
  gsap.fromTo("#w-noir h2", { letterSpacing: "0.2em", opacity: 0 }, {
    letterSpacing: "0.045em", opacity: 1, ease: "none",
    scrollTrigger: { trigger: "#w-noir h2", start: "top 95%", end: "top 45%", scrub: 0.6 },
  });
  gsap.utils.toArray<HTMLElement>("#w-noir .ea").forEach((el) => {
    if (el.tagName === "H2") return;
    gsap.fromTo(el, { y: 26, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1.1, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 88%" },
    });
  });
}
