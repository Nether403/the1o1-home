"use client";

import { useEffect } from "react";
import { METER_WORLD_IDS, WORLDS, type WorldId } from "@/worlds";
import { pickNextWorld } from "@/lib/deal";
import { redealTo } from "@/lib/transitions";

/**
 * M1 behavior layer — a faithful port of the v1 vanilla JS, minus the
 * GSAP/Lenis choreography (that is M3's milestone by design).
 *
 * Owns: world tracking (label / dial / cursor / meter), THE REDEAL
 * (View Transitions when available), the terminal CLI, toy chip springs,
 * and the noir/maison pointer effects. Mounts once; cleans up fully.
 */
export default function Interactions() {
  useEffect(() => {
    const motionPreference = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(pointer: fine)").matches;
    /* Smooth-scroll helper: prefer the Lenis instance mounted by the M3
       motion layer; fall back to native scrolling. */
    const scrollToEl = (el: Element | null) => {
      if (!el) return;
      const lenis = (window as Window & { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
      if (lenis && !motionPreference.matches) lenis.scrollTo(el, { duration: 1.4 });
      else el.scrollIntoView({ behavior: motionPreference.matches ? "auto" : "smooth" });
    };
    const cleanups: Array<() => void> = [];
    const on = <K extends keyof WindowEventMap>(
      target: Window | Document | Element,
      ev: string,
      fn: EventListenerOrEventListenerObject,
      opts?: AddEventListenerOptions
    ) => {
      target.addEventListener(ev, fn, opts);
      cleanups.push(() => target.removeEventListener(ev, fn, opts));
    };

    /* ---------- THE REDEAL ---------- */
    const dealtBadge = document.getElementById("dealt");
    const setBadge = () => {
      const w = document.documentElement.getAttribute("data-hero") as WorldId | null;
      if (dealtBadge && w && WORLDS[w]) dealtBadge.textContent = "DEALT: " + WORLDS[w].label;
    };
    setBadge();
    const redeal = () => {
      const current = document.documentElement.getAttribute("data-hero") ?? "swiss";
      const next = pickNextWorld(current) as WorldId;
      void redealTo(next, () => {
        setBadge();
        setCursor(curWorld);
        /* replay the hero entrance in the M3 motion layer */
        window.dispatchEvent(new CustomEvent("the1o1:redealt"));
        /* deep-link sync: the current deal is always shareable */
        try {
          const url = new URL(location.href);
          url.searchParams.set("w", next);
          history.replaceState(null, "", url);
        } catch {
          /* non-critical */
        }
      });
    };
    const redealBtn = document.getElementById("redeal");
    if (redealBtn) on(redealBtn, "click", redeal);
    const againBtn = document.getElementById("again");
    if (againBtn)
      on(againBtn, "click", () => {
        scrollToEl(document.getElementById("hero"));
        setTimeout(redeal, motionPreference.matches ? 0 : 900);
      });

    /* ---------- world tracking: label, dial, cursor, meter ---------- */
    const secs = Array.from(document.querySelectorAll<HTMLElement>("#hero, section.world, #end"));
    const dialBtns = Array.from(document.querySelectorAll<HTMLAnchorElement>("#dial a"));
    const wl = document.getElementById("wl");
    const cur = document.getElementById("cur");
    const bubbles = document.querySelectorAll<HTMLElement>("#bubbles .bb");
    const meterline = document.getElementById("meterline");
    const seen = new Set<string>();
    let curWorld = "hero";

    const setCursor = (w: string) => {
      if (!fine || !cur) return;
      const id = (w === "hero" ? document.documentElement.getAttribute("data-hero") : w) as WorldId;
      const s = WORLDS[id]?.cursor ?? { width: 10, height: 10, radius: "50%", background: "#0A0A0A", border: "none" };
      cur.style.width = s.width + "px";
      cur.style.height = s.height + "px";
      cur.style.borderRadius = s.radius;
      cur.style.background = s.background;
      cur.style.border = s.border;
    };

    let trackingFrame = 0;
    const updateActiveWorld = () => {
      trackingFrame = 0;
      const line = innerHeight * 0.5;
      const active = secs.reduce((closest, section) => {
        const rect = section.getBoundingClientRect();
        const distance = rect.top <= line && rect.bottom >= line
          ? 0
          : Math.min(Math.abs(rect.top - line), Math.abs(rect.bottom - line));
        return distance < closest.distance ? { section, distance } : closest;
      }, { section: secs[0], distance: Number.POSITIVE_INFINITY }).section;
      if (!active) return;

      const w = active.getAttribute("data-w") ?? "hero";
      if (w === curWorld && document.documentElement.getAttribute("data-active-world")) return;
      curWorld = w;
      document.documentElement.setAttribute("data-active-world", w);
      setCursor(w);
      if (wl) wl.textContent = active.getAttribute("data-label") ?? "THE HOUSE OF EVERY STYLE";
      const i = secs.indexOf(active);
      dialBtns.forEach((dial, index) => {
        const current = index === i;
        dial.classList.toggle("on", current);
        if (current) dial.setAttribute("aria-current", "location");
        else dial.removeAttribute("aria-current");
      });

      if ((METER_WORLD_IDS as string[]).includes(w) && !seen.has(w)) {
        seen.add(w);
        bubbles.forEach((bubble) => bubble.classList.toggle("hit", seen.has(bubble.getAttribute("data-b") ?? "")));
        if (meterline) {
          meterline.innerHTML = seen.size >= METER_WORLD_IDS.length
            ? "<b>101/101 — you’ve seen the range. Now bring the brief.</b>"
            : `Worlds seen: <b>${seen.size}/${METER_WORLD_IDS.length}</b> — keep walking.`;
        }
      }
    };
    const scheduleTracking = () => {
      if (!trackingFrame) trackingFrame = requestAnimationFrame(updateActiveWorld);
    };
    on(window, "scroll", scheduleTracking, { passive: true });
    on(window, "resize", scheduleTracking, { passive: true });
    scheduleTracking();
    cleanups.push(() => cancelAnimationFrame(trackingFrame));
    dialBtns.forEach((b) =>
      on(b, "click", ((event: MouseEvent) => {
        event.preventDefault();
        const t = b.getAttribute("data-t");
        if (t) scrollToEl(document.querySelector(t));
      }) as EventListener)
    );

    /* ---------- pointer: cursor, spotlights, sheen ---------- */
    if (fine && cur) {
      setCursor("hero");
      const useCustomCursor = () => document.documentElement.setAttribute("data-custom-cursor", "");
      const useNativeCursor = (event: KeyboardEvent) => {
        if (event.key === "Tab") document.documentElement.removeAttribute("data-custom-cursor");
      };
      on(window, "keydown", useNativeCursor as EventListener);
      on(
        window,
        "mousemove",
        ((e: MouseEvent) => {
          useCustomCursor();
          cur.style.transform = `translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`;
          const hero = document.getElementById("hero");
          if (hero && document.documentElement.getAttribute("data-hero") === "noir") {
            hero.style.setProperty("--hx", e.clientX + "px");
            hero.style.setProperty("--hy", e.clientY + "px");
          }
          const noir = document.getElementById("w-noir");
          if (noir && !(window as Window & { __noirFx?: boolean }).__noirFx) {
            const r = noir.getBoundingClientRect();
            if (r.top < innerHeight && r.bottom > 0) {
              const spot = noir.querySelector<HTMLElement>(".spot");
              spot?.style.setProperty("--sx", e.clientX + "px");
              spot?.style.setProperty("--sy", e.clientY - r.top + "px");
            }
          }
          const sh = document.getElementById("sheenh");
          if (sh) {
            const sr = sh.getBoundingClientRect();
            if (sr.top < innerHeight && sr.bottom > 0) {
              const p = Math.max(0, Math.min(100, (e.clientX / innerWidth) * 100));
              sh.style.setProperty("--sheen", 100 - p + "%");
            }
          }
        }) as EventListener,
        { passive: true }
      );
    } else if (cur) {
      cur.style.display = "none";
    }

    /* ---------- terminal CLI ---------- */
    const cliout = document.getElementById("cliout");
    const cliin = document.getElementById("cliin") as HTMLInputElement | null;
    const cliform = document.getElementById("cliform") as HTMLFormElement | null;
    const CMD: Record<string, string> = {
      help: "  product     the product thesis\n  workflow    how evidence becomes a decision\n  guardrails  what Relay refuses to automate\n  evals       launch evaluation criteria\n  risks       what remains unresolved\n  contact     the project channel\n  clear       wipe the buffer",
      product: "relay / rel_001\naudience: product teams making consequential roadmap decisions\npromise: turn scattered evidence into cited, reviewable product decisions\nstatus: fictional concept study — not a live product",
      workflow: "01 ingest research, support themes, and product signals\n02 preserve source links and conflicting evidence\n03 generate a bounded recommendation with caveats\n04 require a named human reviewer to make the call\n05 record the decision and what would change it",
      guardrails: "no recommendation without sources\nno hidden confidence as certainty\nno automatic roadmap mutation\nno decision without a human owner",
      evals: "target: reviewers can trace every claim to evidence\ntarget: disagreement remains visible through review\ntarget: a decision records owner, rationale, and reversal criteria\nnote: targets are hypotheses, not achieved product results",
      risks: "retrieval can omit minority evidence\nsummaries can flatten disagreement\nconfidence language can be over-trusted\nsource access can create privacy obligations\nall remain unresolved until tested with real teams",
      contact: "channel: support@101dev.xyz\nnext: use the project form below or your own email client",
    };
    const esc = (s: string) => s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c] as string);
    if (cliin && cliout && cliform) {
      on(cliform, "submit", ((e: SubmitEvent) => {
        e.preventDefault();
        const v = cliin.value.trim().toLowerCase();
        cliin.value = "";
        if (!v) return;
        if (v === "clear") {
          cliout.innerHTML = '<span class="dim">buffer wiped. try: help</span>';
          return;
        }
        const out = CMD[v] ?? "command not found: " + v + "\ntry: help";
        const pre = document.createElement("pre");
        pre.innerHTML = `<span class="p">$</span> <span class="c">${esc(v)}</span>\n${esc(out)}`;
        cliout.appendChild(pre);
        cliout.parentElement && (cliout.parentElement.scrollTop = cliout.parentElement.scrollHeight);
        cliin.focus();
      }) as EventListener);
    }

    /* ---------- toy chips: pointer springs — universal fallback.
       The M4 Rapier module takes ownership when it mounts (__toyPhys). ---------- */
    document.querySelectorAll<HTMLElement>("#w-toy .chip").forEach((ch) => {
        let dx = 0, dy = 0, sx = 0, sy = 0, vx = 0, vy = 0, raf = 0;
        let drag = false;
        on(ch, "pointerdown", ((e: PointerEvent) => {
          if (motionPreference.matches) return;
          if ((window as Window & { __toyPhys?: boolean }).__toyPhys) return;
          drag = true;
          sx = e.clientX - dx;
          sy = e.clientY - dy;
          ch.setPointerCapture(e.pointerId);
          cancelAnimationFrame(raf);
        }) as EventListener);
        on(ch, "pointermove", ((e: PointerEvent) => {
          if (!drag || motionPreference.matches) return;
          const nx = e.clientX - sx, ny = e.clientY - sy;
          vx = nx - dx; vy = ny - dy; dx = nx; dy = ny;
          ch.style.transform = `translate(${dx}px,${dy}px) rotate(${dx * 0.05}deg) scale(1.06)`;
        }) as EventListener);
        const spring = () => {
            if (motionPreference.matches) {
              dx = dy = vx = vy = 0;
              ch.style.transform = "";
              return;
            }
            vx += (0 - dx) * 0.08; vy += (0 - dy) * 0.08;
            vx *= 0.86; vy *= 0.86; dx += vx; dy += vy;
            ch.style.transform = `translate(${dx}px,${dy}px) rotate(${dx * 0.05}deg)`;
            if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5 || Math.abs(vx) > 0.5 || Math.abs(vy) > 0.5) {
              raf = requestAnimationFrame(spring);
            } else {
              dx = dy = vx = vy = 0;
              ch.style.transform = "";
            }
        };
        const rel = () => {
          if (!drag) return;
          drag = false;
          spring();
        };
        on(ch, "keydown", ((e: KeyboardEvent) => {
          if (motionPreference.matches) return;
          const impulses: Record<string, { x: number; y: number }> = {
            ArrowLeft: { x: -520, y: -280 }, ArrowRight: { x: 520, y: -280 },
            ArrowUp: { x: 0, y: -620 }, ArrowDown: { x: 0, y: 420 },
            " ": { x: 360, y: -560 }, Enter: { x: 360, y: -560 },
          };
          const impulse = impulses[e.key];
          if (!impulse) return;
          e.preventDefault();
          if ((window as Window & { __toyPhys?: boolean }).__toyPhys) {
            ch.dispatchEvent(new CustomEvent("the1o1:toy-toss", { detail: impulse }));
          } else {
            cancelAnimationFrame(raf);
            vx = impulse.x / 38; vy = impulse.y / 38;
            spring();
          }
        }) as EventListener);
        on(ch, "pointerup", rel);
        on(ch, "pointercancel", rel);
        const syncMotionPreference = () => {
          if (!motionPreference.matches) return;
          drag = false;
          cancelAnimationFrame(raf);
          dx = dy = vx = vy = 0;
          ch.style.transform = "";
        };
        motionPreference.addEventListener("change", syncMotionPreference);
        cleanups.push(() => cancelAnimationFrame(raf));
        cleanups.push(() => motionPreference.removeEventListener("change", syncMotionPreference));
    });

    return () => {
      document.documentElement.removeAttribute("data-custom-cursor");
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
