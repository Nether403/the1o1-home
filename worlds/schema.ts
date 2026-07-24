/**
 * The House of Every Style — world manifest schema.
 *
 * Server-safe metadata shared by navigation, transitions, sharing, and CI.
 * Section components and optional client modules live in separate registries.
 */

export type WorldId = "swiss" | "maison" | "brut" | "term" | "toy" | "noir" | "y2k";

export interface FontRef {
  /** CSS font-family stack as used in stylesheets */
  family: string;
  /** Weights this world actually uses (drives M4 subsetting) */
  weights: number[];
  italic?: boolean;
}

export interface CursorSpec {
  width: number;
  height: number;
  radius: string;
  background: string;
  border: string;
}

/** Redeal wipe personality (consumed by the transition engine in M2). */
export interface WipeSpec {
  kind: "columns" | "fade";
  ease: string;
  stagger: number;
  duration: number;
  from: "start" | "end" | "center" | "random";
}

/** Scroll/motion personality (consumed by the GSAP timeline factories in M3). */
export interface MotionSpec {
  ease: string;
  entrance: "slide" | "lift" | "slam" | "type" | "pop" | "fade" | "shine";
  /** Seam-gate choreography id, implemented per world in M3 */
  seam:
    | "grid-rail"
    | "gold-thread"
    | "crash-zoom"
    | "progress-mount"
    | "trampoline"
    | "flashlight"
    | "flare-sweep";
}

export interface WorldManifest {
  id: WorldId;
  kind: "core" | "guest";
  /** Stable public identity, independent of where the world appears. */
  displayCode: string;
  /** Current position on The Walk. */
  walkPosition: number;
  sectionId: `w-${WorldId}`;
  dealEligible: boolean;
  meterEligible: boolean;
  featured?: {
    from: string;
    until: string;
    weight: number;
  };
  label: string; // e.g. "W·01 SWISS INTERNATIONAL"
  sectionLabel: string; // e.g. "W·01 — SWISS / ORIGIN"
  gateLabel: string; // e.g. "ENTERING — W·01 SWISS"
  tokens: {
    bg: string;
    ink: string;
    accent: string;
    /** secondary accent / support color where the register has one */
    support?: string;
    radius: string;
    borderWeight: string;
  };
  fonts: {
    display: FontRef;
    body: FontRef;
    label: FontRef;
  };
  cursor: CursorSpec;
  wipe: WipeSpec;
  motion: MotionSpec;
}
