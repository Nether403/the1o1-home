import gsap from "gsap";

/** Epilogue — quiet, staggered return to the void. */
export function endMotion(): void {
  gsap.utils.toArray<HTMLElement>("#end .ea").forEach((el, i) => {
    gsap.fromTo(el, { y: 22, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 88%" }, delay: i * 0.08,
    });
  });
}
