import gsap from "gsap";

/** Hero entrance — replayed on every redeal via the `the1o1:redealt` event. */
export function heroIn(): void {
  gsap.fromTo(
    "#hero .ea",
    { y: 34, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, stagger: 0.09, ease: "power3.out", delay: 0.15, overwrite: true }
  );
}

/** Hero exit — the deal parallaxes away as The Walk begins. */
export function heroMotion(): void {
  gsap.to("#hero .hx", {
    yPercent: -16,
    opacity: 0.1,
    ease: "none",
    scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom 35%", scrub: 0.5 },
  });
}
