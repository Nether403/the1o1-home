import gsap from "gsap";

/** W·02 Maison — a gold thread lowers; the section lifts out of black;
 *  the headline breathes its tracking closed. */
export function maisonMotion(): void {
  /* seam gate */
  gsap.fromTo("#s-maison .gold", { scaleY: 0 }, {
    scaleY: 1, ease: "none",
    scrollTrigger: { trigger: "#s-maison", start: "top 80%", end: "center 50%", scrub: 0.5 },
  });
  gsap.fromTo("#s-maison h3", { opacity: 0, letterSpacing: "0.34em" }, {
    opacity: 1, letterSpacing: "0.02em", ease: "none",
    scrollTrigger: { trigger: "#s-maison", start: "top 75%", end: "center 45%", scrub: 0.5 },
  });

  /* dark lift into the world */
  gsap.set("#w-maison .lift", { opacity: 1 });
  gsap.to("#w-maison .lift", {
    opacity: 0, ease: "none",
    scrollTrigger: { trigger: "#w-maison", start: "top 85%", end: "top 20%", scrub: 0.5 },
  });
  gsap.fromTo("#sheenh", { letterSpacing: "0.14em", opacity: 0 }, {
    letterSpacing: "0em", opacity: 1, ease: "none",
    scrollTrigger: { trigger: "#sheenh", start: "top 95%", end: "top 40%", scrub: 0.6 },
  });
  gsap.utils.toArray<HTMLElement>("#w-maison .ea").forEach((el) => {
    if (el.id === "sheenh") return;
    gsap.fromTo(el, { y: 44, opacity: 0 }, {
      y: 0, opacity: 1, duration: 1.2, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 86%" },
    });
  });
  gsap.fromTo("#w-maison .hr", { scaleX: 0 }, {
    scaleX: 1, duration: 1.2, ease: "power2.inOut",
    scrollTrigger: { trigger: "#w-maison .hr", start: "top 90%" },
  });
}
