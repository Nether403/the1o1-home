import gsap from "gsap";

/** W·04 Terminal — the seam's loading bar IS the scroll; the machine room rises. */
export function termMotion(): void {
  gsap.fromTo("#s-term .load i", { scaleX: 0 }, {
    scaleX: 1, ease: "none",
    scrollTrigger: {
      trigger: "#s-term", start: "top 80%", end: "center 40%", scrub: 0.3,
      onUpdate: (self) => {
        const p = document.querySelector<HTMLElement>("#s-term .pct");
        if (p)
          p.textContent =
            "MOUNTING /house-of-every-style … " +
            Math.round(self.progress * 100) + "%" +
            (self.progress > 0.99 ? " — OK" : "");
      },
    },
  });
  gsap.utils.toArray<HTMLElement>("#w-term .ea").forEach((el) => {
    gsap.fromTo(el, { y: 36, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%" },
    });
  });
}
