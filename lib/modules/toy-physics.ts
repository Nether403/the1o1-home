/**
 * M4 — Rapier-backed toy-world physics.
 *
 * Lazy-loaded one world ahead of the scroll (see Modules.tsx); the WASM
 * bundle never touches the critical path. The M1 pointer-spring stays as
 * the universal fallback — when this module mounts it takes ownership of
 * the chips (window.__toyPhys flag).
 *
 * Design: the chips row becomes a shallow "toy pit". Every chip is a
 * dynamic cuboid with restitution; drag = kinematic follow; release =
 * flick with real velocity; bodies sleep at rest so idle cost ≈ 0.
 * The step loop only runs while something is awake and the section is
 * on screen.
 */
import type RAPIER_NS from "@dimforge/rapier2d";

declare global {
  interface Window {
    __toyPhys?: boolean;
  }
}

const PX_GRAVITY = 1600; // px/s² — toy-weight gravity, not realism
const PIT_DEPTH = 90; // extra room below the chips row

export async function initToyPhysics(): Promise<() => void> {
  const container = document.querySelector<HTMLElement>("#w-toy .chips");
  const chips = Array.from(document.querySelectorAll<HTMLElement>("#w-toy .chip"));
  const section = document.getElementById("w-toy");
  if (!container || !section || chips.length === 0) return () => {};

  /* wasm-asset build: the .wasm loads as part of this async chunk —
     no init() call, no base64 inflation (M5 slim-down) */
  const RAPIER: typeof RAPIER_NS = await import("@dimforge/rapier2d");
  window.__toyPhys = true;

  /* pit geometry from current layout */
  const cRect = container.getBoundingClientRect();
  container.style.minHeight = cRect.height + PIT_DEPTH + "px";
  const width = cRect.width;
  const floorY = cRect.height + PIT_DEPTH - 8;

  const world = new RAPIER.World({ x: 0, y: PX_GRAVITY });

  /* bounds: floor + walls (ceiling open — flicks can leave and fall back) */
  const wall = (hx: number, hy: number, x: number, y: number) =>
    world.createCollider(RAPIER.ColliderDesc.cuboid(hx, hy).setTranslation(x, y).setFriction(0.6));
  wall(width / 2 + 40, 12, width / 2, floorY + 12);
  wall(12, 4000, -12, 0);
  wall(12, 4000, width + 12, 0);

  interface Chip {
    el: HTMLElement;
    body: RAPIER_NS.RigidBody;
    hw: number;
    hh: number;
    ox: number; // layout origin (center) in container space
    oy: number;
    dragging: boolean;
    px: number; // pointer position in container space
    py: number;
    vx: number;
    vy: number;
    lx: number;
    ly: number;
  }

  const items: Chip[] = chips.map((el) => {
    const r = el.getBoundingClientRect();
    const ox = r.left - cRect.left + r.width / 2;
    const oy = r.top - cRect.top + r.height / 2;
    const body = world.createRigidBody(
      RAPIER.RigidBodyDesc.dynamic().setTranslation(ox, oy).setCanSleep(true).setAngularDamping(0.9).setLinearDamping(0.15)
    );
    world.createCollider(
      RAPIER.ColliderDesc.cuboid(r.width / 2, r.height / 2).setRestitution(0.45).setFriction(0.7).setDensity(1),
      body
    );
    return { el, body, hw: r.width / 2, hh: r.height / 2, ox, oy, dragging: false, px: 0, py: 0, vx: 0, vy: 0, lx: 0, ly: 0 };
  });

  /* ---------- render/step loop — runs only while awake & visible ---------- */
  let raf = 0;
  let running = false;
  let visible = false;
  let last = 0;

  const anyAwake = () => items.some((c) => c.dragging || !c.body.isSleeping());
  const loop = (t: number) => {
    const dt = Math.min((t - last) / 1000, 1 / 30) || 1 / 60;
    last = t;
    world.timestep = dt;
    items.forEach((c) => {
      if (c.dragging) c.body.setNextKinematicTranslation({ x: c.px, y: c.py });
    });
    world.step();
    items.forEach((c) => {
      const p = c.body.translation();
      const rot = c.body.rotation();
      c.el.style.transform = `translate(${p.x - c.ox}px,${p.y - c.oy}px) rotate(${rot}rad)`;
    });
    if (visible && anyAwake()) raf = requestAnimationFrame(loop);
    else running = false;
  };
  const wake = () => {
    if (running) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(loop);
  };

  const io = new IntersectionObserver(
    (es) => {
      visible = es.some((e) => e.isIntersecting);
      if (visible) {
        items.forEach((c) => c.body.wakeUp());
        wake();
      }
    },
    { rootMargin: "20% 0px" }
  );
  io.observe(section);

  /* ---------- pointer: kinematic grab, dynamic flick ---------- */
  const removers: Array<() => void> = [];
  items.forEach((c) => {
    const toLocal = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const down = (e: PointerEvent) => {
      c.dragging = true;
      const p = toLocal(e);
      c.px = p.x;
      c.py = p.y;
      c.lx = p.x;
      c.ly = p.y;
      c.vx = c.vy = 0;
      c.body.setBodyType(RAPIER.RigidBodyType.KinematicPositionBased, true);
      c.el.setPointerCapture(e.pointerId);
      c.el.style.cursor = "grabbing";
      wake();
    };
    const move = (e: PointerEvent) => {
      if (!c.dragging) return;
      const p = toLocal(e);
      c.vx = (p.x - c.lx) * 60; // px/s estimate at ~60hz
      c.vy = (p.y - c.ly) * 60;
      c.lx = p.x;
      c.ly = p.y;
      c.px = p.x;
      c.py = p.y;
    };
    const up = () => {
      if (!c.dragging) return;
      c.dragging = false;
      c.el.style.cursor = "grab";
      c.body.setBodyType(RAPIER.RigidBodyType.Dynamic, true);
      c.body.setLinvel({ x: c.vx, y: c.vy }, true);
      c.body.setAngvel(c.vx * 0.002, true);
      wake();
    };
    c.el.addEventListener("pointerdown", down);
    c.el.addEventListener("pointermove", move);
    c.el.addEventListener("pointerup", up);
    c.el.addEventListener("pointercancel", up);
    removers.push(() => {
      c.el.removeEventListener("pointerdown", down);
      c.el.removeEventListener("pointermove", move);
      c.el.removeEventListener("pointerup", up);
      c.el.removeEventListener("pointercancel", up);
    });
  });

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    removers.forEach((fn) => fn());
    items.forEach((c) => (c.el.style.transform = ""));
    world.free();
    window.__toyPhys = undefined;
  };
}
