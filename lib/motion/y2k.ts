import gsap from "gsap";

/** W·07 Y2K Chrome — the lens flare sweeps the gate on scroll; capsules
 *  rise with a gleam; the chrome blob tails the cursor like it's 1999. */
export function y2kMotion(): (() => void) | void {
  /* seam gate: flare sweep + title settle */
  gsap.fromTo("#s-y2k .flare", { x: "-20vw" }, {
    x: "120vw", ease: "none",
    scrollTrigger: { trigger: "#s-y2k", start: "top 90%", end: "bottom 20%", scrub: 0.4 },
  });
  gsap.fromTo("#s-y2k h3", { scale: 0.94, opacity: 0 }, {
    scale: 1, opacity: 1, ease: "none",
    scrollTrigger: { trigger: "#s-y2k", start: "top 80%", end: "center 50%", scrub: 0.5 },
  });

  /* world entrances: rise with gleam */
  gsap.utils.toArray<HTMLElement>("#w-y2k .ea").forEach((el, i) => {
    gsap.fromTo(el, { y: 30, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 86%" }, delay: (i % 3) * 0.07,
    });
  });

  /* signature: the chrome blob tails the cursor (fine pointers only) */
  const section = document.getElementById("w-y2k");
  const blob = section?.querySelector<HTMLElement>(".y2k-blob");
  if (!section || !blob || !matchMedia("(pointer: fine)").matches) return;

  let visible = false;
  let raf = 0;
  let tx = 0, ty = 0, bx = 0, by = 0;

  const onMove = (e: PointerEvent) => {
    const r = section.getBoundingClientRect();
    tx = e.clientX - r.left - 60;
    ty = e.clientY - r.top - 60;
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  const loop = () => {
    if (!visible) return;
    bx += (tx - bx) * 0.055; /* heavy metal lags like it means it */
    by += (ty - by) * 0.055;
    blob.style.transform = `translate(${bx}px,${by}px)`;
    raf = requestAnimationFrame(loop);
  };
  const io = new IntersectionObserver(
    (es) => {
      const now = es.some((e) => e.isIntersecting);
      if (now && !visible) {
        visible = true;
        blob.classList.add("on");
        raf = requestAnimationFrame(loop);
      } else if (!now && visible) {
        visible = false;
        blob.classList.remove("on");
        cancelAnimationFrame(raf);
      }
    },
    { rootMargin: "5% 0px" }
  );
  io.observe(section);

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    window.removeEventListener("pointermove", onMove);
  };
}
