import type { WorldId, WorldManifest } from "./schema";

const MONO = { family: "var(--font-plex-mono), ui-monospace, monospace", weights: [400, 500, 600] };
const INTER = { family: "var(--font-inter), sans-serif", weights: [400, 500, 600, 700] };

export const swiss: WorldManifest = {
  id: "swiss",
  kind: "core",
  displayCode: "W·01",
  walkPosition: 1,
  sectionId: "w-swiss",
  dealEligible: true,
  meterEligible: true,
  label: "W·01 SWISS INTERNATIONAL",
  sectionLabel: "W·01 — RELAY / PRODUCT BET",
  gateLabel: "RELAY — CHAPTER 01 / PRODUCT BET",
  tokens: { bg: "#F4F3EF", ink: "#111111", accent: "#E30613", radius: "0px", borderWeight: "2px" },
  fonts: {
    display: { family: "var(--font-archivo), sans-serif", weights: [700] },
    body: INTER,
    label: MONO,
  },
  cursor: { width: 18, height: 18, radius: "0", background: "transparent", border: "2px solid #E30613" },
  wipe: { kind: "columns", ease: "power4.inOut", stagger: 0.05, duration: 0.5, from: "start" },
  motion: { ease: "power3.out", entrance: "slide", seam: "grid-rail" },
};

export const maison: WorldManifest = {
  id: "maison",
  kind: "core",
  displayCode: "W·02",
  walkPosition: 2,
  sectionId: "w-maison",
  dealEligible: true,
  meterEligible: true,
  label: "W·02 LA MAISON",
  sectionLabel: "W·02 — RELAY / POSITION AND TRUST",
  gateLabel: "RELAY — CHAPTER 02 / POSITION AND TRUST",
  tokens: { bg: "#14120F", ink: "#E8E1D5", accent: "#C7A96B", support: "#9B9284", radius: "0px", borderWeight: "1px" },
  fonts: {
    display: { family: "var(--font-bodoni), serif", weights: [400, 500], italic: true },
    body: INTER,
    label: MONO,
  },
  cursor: { width: 26, height: 26, radius: "50%", background: "transparent", border: "1px solid #C7A96B" },
  wipe: { kind: "columns", ease: "power2.inOut", stagger: 0.07, duration: 0.8, from: "end" },
  motion: { ease: "power2.out", entrance: "lift", seam: "gold-thread" },
};

export const brut: WorldManifest = {
  id: "brut",
  kind: "core",
  displayCode: "W·03",
  walkPosition: 3,
  sectionId: "w-brut",
  dealEligible: true,
  meterEligible: true,
  label: "W·03 BRUTALIST",
  sectionLabel: "W·03 — RELAY / LAUNCH PROPOSITION",
  gateLabel: "RELAY — CHAPTER 03 / LAUNCH PROPOSITION",
  tokens: { bg: "#FFE600", ink: "#000000", accent: "#FF3B30", radius: "0px", borderWeight: "4px" },
  fonts: {
    display: { family: "var(--font-archivo-black), sans-serif", weights: [400] },
    body: { family: "var(--font-archivo), sans-serif", weights: [400, 500, 600, 700] },
    label: MONO,
  },
  cursor: { width: 20, height: 20, radius: "0", background: "#000000", border: "none" },
  wipe: { kind: "columns", ease: "power1.in", stagger: 0.015, duration: 0.16, from: "random" },
  motion: { ease: "power1.in", entrance: "slam", seam: "crash-zoom" },
};

export const term: WorldManifest = {
  id: "term",
  kind: "core",
  displayCode: "W·04",
  walkPosition: 4,
  sectionId: "w-term",
  dealEligible: true,
  meterEligible: true,
  label: "W·04 TERMINAL",
  sectionLabel: "W·04 — RELAY / AI SYSTEM",
  gateLabel: "RELAY — CHAPTER 04 / AI SYSTEM",
  tokens: { bg: "#050805", ink: "#33FF66", accent: "#7ef0a0", support: "#2ea355", radius: "0px", borderWeight: "1px" },
  fonts: {
    display: { family: "var(--font-plex-mono), monospace", weights: [500, 600] },
    body: { family: "var(--font-plex-mono), monospace", weights: [400] },
    label: MONO,
  },
  cursor: { width: 11, height: 20, radius: "0", background: "#33FF66", border: "none" },
  wipe: { kind: "columns", ease: "power3.inOut", stagger: 0.045, duration: 0.45, from: "end" },
  motion: { ease: "power2.out", entrance: "type", seam: "progress-mount" },
};

export const toy: WorldManifest = {
  id: "toy",
  kind: "core",
  displayCode: "W·05",
  walkPosition: 5,
  sectionId: "w-toy",
  dealEligible: true,
  meterEligible: true,
  label: "W·05 THE TOY BOX",
  sectionLabel: "W·05 — RELAY / FIRST-RUN EXPERIENCE",
  gateLabel: "RELAY — CHAPTER 05 / FIRST-RUN EXPERIENCE",
  tokens: { bg: "#E9F5FF", ink: "#1F3350", accent: "#FF6B9D", support: "#4DABF7", radius: "28px", borderWeight: "0px" },
  fonts: {
    display: { family: "var(--font-baloo), cursive", weights: [700, 800] },
    body: INTER,
    label: MONO,
  },
  cursor: { width: 22, height: 22, radius: "50%", background: "#FF6B9D", border: "none" },
  wipe: { kind: "columns", ease: "back.inOut(1.4)", stagger: 0.06, duration: 0.6, from: "center" },
  motion: { ease: "back.out(1.8)", entrance: "pop", seam: "trampoline" },
};

export const noir: WorldManifest = {
  id: "noir",
  kind: "core",
  displayCode: "W·06",
  walkPosition: 7,
  sectionId: "w-noir",
  dealEligible: true,
  meterEligible: true,
  label: "W·06 NOIR",
  sectionLabel: "W·06 — RELAY / RELEASE DECISION",
  gateLabel: "RELAY — CHAPTER 07 / RELEASE DECISION",
  tokens: { bg: "#07070A", ink: "#EDEDF2", accent: "#C1121F", support: "#9a9aa6", radius: "0px", borderWeight: "1px" },
  fonts: {
    display: { family: "var(--font-oswald), sans-serif", weights: [300, 400, 500, 600] },
    body: { family: "var(--font-playfair), serif", weights: [400, 500], italic: true },
    label: MONO,
  },
  cursor: { width: 14, height: 14, radius: "50%", background: "#ffffff", border: "none" },
  wipe: { kind: "fade", ease: "power2.inOut", stagger: 0, duration: 0.5, from: "start" },
  motion: { ease: "power2.out", entrance: "fade", seam: "flashlight" },
};

import { y2k } from "./y2k";
export { y2k };

export const WORLDS: Record<WorldId, WorldManifest> = { swiss, maison, brut, term, toy, noir, y2k };
/** The Walk order — noir stays the closer; the guest world sits before the final reel. */
export const WORLD_ORDER: WorldId[] = ["swiss", "maison", "brut", "term", "toy", "y2k", "noir"];
export const CORE_WORLDS = WORLD_ORDER.map((id) => WORLDS[id]).filter((world) => world.kind === "core");
export const GUEST_WORLDS = WORLD_ORDER.map((id) => WORLDS[id]).filter((world) => world.kind === "guest");
export const DEAL_WORLD_IDS = WORLD_ORDER.filter((id) => WORLDS[id].dealEligible);
export const METER_WORLD_IDS = WORLD_ORDER.filter((id) => WORLDS[id].meterEligible);
export type { WorldId, WorldManifest } from "./schema";
