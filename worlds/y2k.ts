import type { WorldManifest } from "./schema";

/**
 * G·01 — WORLD OF THE MONTH №1 (July 2026): Y2K CHROME
 *
 * The future, as remembered. Liquid metal, capsule UI, Eurostile-class
 * type (Michroma), one lens flare — earned ironically. Proof that the
 * roster is extensible through a shared registry and an authored chapter.
 */
export const y2k: WorldManifest = {
  id: "y2k",
  kind: "guest",
  displayCode: "G·01",
  walkPosition: 6,
  sectionId: "w-y2k",
  dealEligible: true,
  meterEligible: true,
  featured: { from: "2026-07-01T00:00:00Z", until: "2026-08-01T00:00:00Z", weight: 0.3 },
  label: "G·01 Y2K CHROME",
  shortName: "Y2K",
  sectionLabel: "G·01 — WORLD OF THE MONTH",
  gateLabel: "THE WALK — GUEST GATE · WORLD OF THE MONTH",
  tokens: {
    bg: "#C9D0D9",
    ink: "#14171C",
    accent: "#0047FF",
    support: "#7E8794",
    radius: "22px",
    borderWeight: "1px",
  },
  fonts: {
    display: { family: "var(--font-michroma), sans-serif", weights: [400] },
    body: { family: "var(--font-inter), sans-serif", weights: [400, 500, 600] },
    label: { family: "var(--font-plex-mono), monospace", weights: [400, 500, 600] },
  },
  cursor: {
    width: 22,
    height: 22,
    radius: "50%",
    background: "linear-gradient(160deg,#ffffff 8%,#aeb8c4 38%,#5c6672 52%,#e6ebf1 78%)",
    border: "1px solid #7E8794",
  },
  wipe: { kind: "columns", ease: "power2.inOut", stagger: 0.05, duration: 0.55, from: "center" },
  motion: { ease: "power2.out", entrance: "shine", seam: "flare-sweep" },
};
