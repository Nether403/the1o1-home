"use client";

import { useEffect } from "react";
import { WORLDS, WORLD_ORDER, type WorldId } from "@/worlds";
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
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer: fine)").matches;
    /* Smooth-scroll helper: prefer the Lenis instance mounted by the M3
       motion layer; fall back to native scrolling. */
    const scrollToEl = (el: Element | null) => {
      if (!el) return;
      const lenis = (window as Window & { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
      if (lenis && !reduce) lenis.scrollTo(el, { duration: 1.4 });
      else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
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

    /* ---------- reveal (CSS-based until M3's GSAP layer) ---------- */
    document.documentElement.removeAttribute("data-m1-pending");

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
        setTimeout(redeal, reduce ? 0 : 900);
      });

    /* ---------- world tracking: label, dial, cursor, meter ---------- */
    const secs = Array.from(document.querySelectorAll<HTMLElement>("section[data-w]"));
    const obs = Array.from(document.querySelectorAll<HTMLElement>("section[data-w], .seam"));
    const dialBtns = Array.from(document.querySelectorAll<HTMLButtonElement>("#dial button"));
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

    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const w = el.getAttribute("data-w") ?? "hero";
          curWorld = w;
          setCursor(w);
          if (wl) wl.textContent = el.getAttribute("data-label") ?? "THE HOUSE OF EVERY STYLE";
          const i = secs.indexOf(el as HTMLElement);
          if (i > -1) dialBtns.forEach((d, j) => d.classList.toggle("on", j === i));
          if ((WORLD_ORDER as string[]).includes(w) && !seen.has(w)) {
            seen.add(w);
            bubbles.forEach((b) => {
              if (seen.has(b.getAttribute("data-b") ?? "")) b.classList.add("hit");
            });
            if (meterline)
              meterline.innerHTML =
                seen.size >= WORLD_ORDER.length
                  ? "<b>101/101 — you’ve seen the range. Now bring the brief.</b>"
                  : `Worlds seen: <b>${seen.size}/${WORLD_ORDER.length}</b> — keep walking.`;
          }
        });
      },
      { threshold: 0.45 }
    );
    obs.forEach((s) => io.observe(s));
    cleanups.push(() => io.disconnect());
    dialBtns.forEach((b) =>
      on(b, "click", () => {
        const t = b.getAttribute("data-t");
        if (t) scrollToEl(document.querySelector(t));
      })
    );

    /* ---------- pointer: cursor, spotlights, sheen ---------- */
    if (fine && cur) {
      setCursor("hero");
      on(
        window,
        "mousemove",
        ((e: MouseEvent) => {
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
    const CMD: Record<string, string> = {
      help: "  whoami     the person behind the worlds\n  services   what the consultancy does\n  stack      how this page holds six design systems\n  worlds     list the registers on this scroll\n  brief      print specimen brief_001.yaml\n  contact    open a channel\n  redeal     re-deal the hero world\n  clear      wipe the buffer",
      whoami:
        "martin van deursen — designer / developer / independent researcher.\ntwo decades of enterprise systems, then the pivot to AI-native building.\nlocation: amsterdam, NL. one person. three modes. no random routes.",
      services:
        "design      identity, interaction, motion — any register, one standard\ndevelopment interfaces, engines, tools — typescript-first, production-honest\nresearch    independent AI-alignment inquiry — the practice that keeps the\n            other two honest\nterms       project / retainer / advisory — priced in conversation",
      stack:
        "worlds are token manifests, not code forks.\neach register = fonts + palette + motion curves + cursor spec, applied at\nruntime. heavy modules (physics, shaders) lazy-load one world ahead.\nthis build: next.js 15 app router + typescript. M2 adds view-transition\nmorphs, M3 the gsap/lenis choreography, M4 rapier physics + font subsets.",
      worlds:
        "w01 swiss international  — the origin, on the grid\nw02 la maison            — the services, in bodoni\nw03 brutalist            — the work, no decoration\nw04 terminal             — you are here\nw05 the toy box          — physics with manners\nw06 noir                 — the ask, under a flashlight\nw07 y2k chrome           — world of the month, july 2026",
      brief:
        '# brief_001.yaml — the specimen (appearance 4/6)\nask:      "make it impossible to ignore."\nclient:   anyone_with_a_hard_problem\nscope:    [identity, web, motion]\nstyle:    undecided   # deliberately\nstandard: absolute',
      contact: "channel: martin@101dev.xyz\nsubject: the hard problem\nnote:    opening mail client…",
    };
    const esc = (s: string) => s.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" })[c] as string);
    if (cliin && cliout) {
      on(cliin, "keydown", ((e: KeyboardEvent) => {
        if (e.key !== "Enter") return;
        const v = cliin.value.trim().toLowerCase();
        cliin.value = "";
        if (!v) return;
        if (v === "clear") {
          cliout.innerHTML = '<span class="dim">buffer wiped. try: help</span>';
          return;
        }
        let out: string;
        if (v === "redeal") {
          out = "dealing…";
          redeal();
          scrollToEl(document.getElementById("hero"));
        } else if (v === "contact") {
          out = CMD.contact;
          setTimeout(() => {
            location.href = "mailto:martin@101dev.xyz?subject=The%20hard%20problem";
          }, 600);
        } else {
          out = CMD[v] ?? "command not found: " + v + "\ntry: help";
        }
        const pre = document.createElement("pre");
        pre.innerHTML = `<span class="p">$</span> <span class="c">${esc(v)}</span>\n${esc(out)}`;
        cliout.appendChild(pre);
        cliout.parentElement && (cliout.parentElement.scrollTop = cliout.parentElement.scrollHeight);
      }) as EventListener);
    }

    /* ---------- toy chips: pointer springs — universal fallback.
       The M4 Rapier module takes ownership when it mounts (__toyPhys). ---------- */
    if (!reduce) {
      document.querySelectorAll<HTMLElement>("#w-toy .chip").forEach((ch) => {
        let dx = 0, dy = 0, sx = 0, sy = 0, vx = 0, vy = 0, raf = 0;
        let drag = false;
        on(ch, "pointerdown", ((e: PointerEvent) => {
          if ((window as Window & { __toyPhys?: boolean }).__toyPhys) return;
          drag = true;
          sx = e.clientX - dx;
          sy = e.clientY - dy;
          ch.setPointerCapture(e.pointerId);
          cancelAnimationFrame(raf);
        }) as EventListener);
        on(ch, "pointermove", ((e: PointerEvent) => {
          if (!drag) return;
          const nx = e.clientX - sx, ny = e.clientY - sy;
          vx = nx - dx; vy = ny - dy; dx = nx; dy = ny;
          ch.style.transform = `translate(${dx}px,${dy}px) rotate(${dx * 0.05}deg) scale(1.06)`;
        }) as EventListener);
        const rel = () => {
          if (!drag) return;
          drag = false;
          const spring = () => {
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
          spring();
        };
        on(ch, "pointerup", rel);
        on(ch, "pointercancel", rel);
        cleanups.push(() => cancelAnimationFrame(raf));
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
