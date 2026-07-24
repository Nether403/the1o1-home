import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** W·01 Swiss — gate rides the grid rails; gridlines draw with the scroll;
 *  practices pin and walk sideways (≥900px). */
export function swissMotion(mm: gsap.MatchMedia): void {
  /* seam gate */
  gsap.fromTo("#s-swiss h3", { x: "16vw" }, {
    x: "-8vw", ease: "none",
    scrollTrigger: { trigger: "#s-swiss", start: "top bottom", end: "bottom top", scrub: 0.4 },
  });
  gsap.fromTo("#s-swiss .rail", { scaleX: 0 }, {
    scaleX: 1, ease: "none",
    scrollTrigger: { trigger: "#s-swiss", start: "top 85%", end: "center 45%", scrub: 0.5 },
  });

  /* world entrances */
  gsap.utils.toArray<HTMLElement>("#w-swiss .ea").forEach((el, i) => {
    gsap.fromTo(el, { x: -40, opacity: 0 }, {
      x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 82%" }, delay: (i % 3) * 0.06,
    });
  });
  gsap.to("#w-swiss .gridlines i", {
    scaleY: 1, stagger: 0.05, ease: "none",
    scrollTrigger: { trigger: "#w-swiss", start: "top 80%", end: "top 10%", scrub: 0.6 },
  });
  gsap.fromTo("#w-swiss .rule", { scaleX: 0 }, {
    scaleX: 1, ease: "none",
    scrollTrigger: { trigger: "#w-swiss", start: "top 75%", end: "top 30%", scrub: 0.6 },
  });

  /* pinned horizontal practices — desktop only */
  mm.add("(min-width: 900px)", () => {
    const track = document.getElementById("pintrack");
    if (!track) return;
    gsap.to(track, {
      x: () => -(track.scrollWidth - innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: "#pinwrap",
        start: "top top",
        end: () => "+=" + (track.scrollWidth - innerWidth),
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === document.getElementById("pinwrap")) st.kill();
      });
    };
  });
}
