import gsap from "gsap";

/** W·05 Toy — PLAYTIME trampolines in; candy blobs drift on parallax;
 *  everything pops with overshoot. */
export function toyMotion(): void {
  gsap.fromTo("#s-toy h3 span", { y: 80, opacity: 0, rotation: 8 }, {
    y: 0, opacity: 1, rotation: 0, stagger: 0.055, duration: 0.65, ease: "back.out(2.4)",
    scrollTrigger: { trigger: "#s-toy", start: "top 72%" },
  });
  gsap.utils.toArray<HTMLElement>("#w-toy .blob").forEach((b, i) => {
    gsap.to(b, {
      yPercent: i % 2 ? -18 : 14, ease: "none",
      scrollTrigger: { trigger: "#w-toy", start: "top bottom", end: "bottom top", scrub: 0.8 },
    });
  });
  gsap.utils.toArray<HTMLElement>("#w-toy .ea").forEach((el, i) => {
    gsap.fromTo(el, { y: 50, opacity: 0, scale: 0.9 }, {
      y: 0, opacity: 1, scale: 1, duration: 0.75, ease: "back.out(1.8)",
      scrollTrigger: { trigger: el, start: "top 88%" }, delay: (i % 5) * 0.05,
    });
  });
}
