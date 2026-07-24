/**
 * M4 — noir grain & light module.
 *
 * Upgrades the static CSS treatment to a living one, dependency-free:
 * - animated film grain: a small noise tile regenerated ~12fps, tiled
 *   across a canvas overlay (the CSS SVG grain hides while mounted)
 * - eased flashlight: the spotlight lerps toward the pointer instead of
 *   snapping, at a true cinematic weight
 *
 * Runs only while the noir section is on screen; full teardown restores
 * the CSS fallback. (A TSL/WebGPU pass stays deferred until a world earns
 * real 3D — per plan: "WebGPU where earned".)
 */

declare global {
  interface Window {
    __noirFx?: boolean;
  }
}

const TILE = 160;
const GRAIN_FPS = 12;

export function initNoirLight(): () => void {
  const section = document.getElementById("w-noir");
  if (!section) return () => {};

  window.__noirFx = true;
  document.documentElement.setAttribute("data-noirfx", "");

  /* ---------- canvas grain overlay ---------- */
  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.cssText =
    "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;opacity:.14;mix-blend-mode:screen";
  section.appendChild(canvas);
  const ctx = canvas.getContext("2d");

  const tile = document.createElement("canvas");
  tile.width = TILE;
  tile.height = TILE;
  const tctx = tile.getContext("2d");

  let visible = false;
  let raf = 0;
  let lastGrain = 0;

  const drawGrain = (t: number) => {
    if (!tctx || !ctx) return;
    if (t - lastGrain > 1000 / GRAIN_FPS) {
      lastGrain = t;
      const img = tctx.createImageData(TILE, TILE);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        d[i] = d[i + 1] = d[i + 2] = v;
        d[i + 3] = 255;
      }
      tctx.putImageData(img, 0, 0);
      const pat = ctx.createPattern(tile, "repeat");
      if (pat) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = pat;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  const resize = () => {
    const r = section.getBoundingClientRect();
    canvas.width = Math.ceil(r.width / 2); // half-res: cheaper, filmier
    canvas.height = Math.ceil(r.height / 2);
  };
  resize();
  window.addEventListener("resize", resize);

  /* ---------- eased flashlight ---------- */
  const spot = section.querySelector<HTMLElement>(".spot");
  let tx = innerWidth / 2;
  let ty = 200;
  let sx = tx;
  let sy = ty;
  const onMove = (e: PointerEvent) => {
    const r = section.getBoundingClientRect();
    tx = e.clientX;
    ty = e.clientY - r.top;
  };
  window.addEventListener("pointermove", onMove, { passive: true });

  const loop = (t: number) => {
    if (!visible) return;
    drawGrain(t);
    sx += (tx - sx) * 0.09;
    sy += (ty - sy) * 0.09;
    if (spot) {
      spot.style.setProperty("--sx", sx + "px");
      spot.style.setProperty("--sy", sy + "px");
    }
    raf = requestAnimationFrame(loop);
  };

  const io = new IntersectionObserver(
    (es) => {
      const nowVisible = es.some((e) => e.isIntersecting);
      if (nowVisible && !visible) {
        visible = true;
        raf = requestAnimationFrame(loop);
      } else if (!nowVisible) {
        visible = false;
        cancelAnimationFrame(raf);
      }
    },
    { rootMargin: "10% 0px" }
  );
  io.observe(section);

  return () => {
    visible = false;
    cancelAnimationFrame(raf);
    io.disconnect();
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("resize", resize);
    canvas.remove();
    document.documentElement.removeAttribute("data-noirfx");
    window.__noirFx = undefined;
  };
}
