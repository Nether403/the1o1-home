import { METER_WORLD_IDS, WORLDS, type WorldId } from "@/worlds";

/**
 * THE SPECIMEN — Brief №001.
 *
 * One brief travels the entire walk and is re-set, completely, in every
 * register. Same words. Different world. Same standard. This is the
 * argument of the site made into a recurring object.
 *
 * Deliberately generic: it is a *type* of brief, not a claim about a
 * specific client. No invented customers, no invented outcomes.
 */
export const SPECIMEN = {
  id: "№001",
  ask: "Make it impossible to ignore.",
} as const;

export interface SpecimenVariant {
  /** The ask, cased for the register. */
  ask: string;
  /** Four meta lines, voiced for the register. */
  meta: string[];
}

export const SPECIMEN_VARIANTS: Record<WorldId, SpecimenVariant> = {
  swiss: {
    ask: "“Make it impossible to ignore.”",
    meta: [
      "CLIENT — ANYONE WITH A HARD PROBLEM",
      "SCOPE — IDENTITY / WEB / MOTION",
      "STYLE — UNDECIDED, DELIBERATELY",
      "STANDARD — ABSOLUTE",
    ],
  },
  maison: {
    ask: "“Make it impossible to ignore.”",
    meta: [
      "Client — anyone with a hard problem",
      "Scope — identity · web · motion",
      "Style — undecided, deliberately",
      "Standard — absolute",
    ],
  },
  brut: {
    ask: "“MAKE IT IMPOSSIBLE TO IGNORE.”",
    meta: [
      "CLIENT: ANYONE W/ A HARD PROBLEM",
      "SCOPE: IDENTITY+WEB+MOTION",
      "STYLE: UNDECIDED. DELIBERATELY.",
      "STANDARD: ABSOLUTE",
    ],
  },
  term: {
    ask: "“Make it impossible to ignore.”",
    meta: [
      "client:   anyone_with_a_hard_problem",
      "scope:    [identity, web, motion]",
      "style:    undecided   # deliberately",
      "standard: absolute",
    ],
  },
  toy: {
    ask: "“Make it impossible to ignore!”",
    meta: [
      "Client: anyone with a hard problem",
      "Scope: identity + web + motion",
      "Style: undecided (on purpose!)",
      "Standard: absolute. always.",
    ],
  },
  y2k: {
    ask: "“Make it impossible to ignore.”",
    meta: [
      "CLIENT — ANYONE WITH A HARD PROBLEM",
      "SCOPE — IDENTITY · WEB · MOTION",
      "STYLE — THIS MONTH: CHROME",
      "STANDARD — ABSOLUTE, AS ALWAYS",
    ],
  },
  noir: {
    ask: "“Make it impossible to ignore.”",
    meta: [
      "CLIENT — ANYONE WITH A HARD PROBLEM",
      "SCOPE — IDENTITY · WEB · MOTION",
      "STYLE — SEVEN ANSWERS, ONE QUESTION",
      "STANDARD — YOU JUST SCROLLED THROUGH IT",
    ],
  },
};

/** "APPEARANCE 3/7" — derived so adding a guest world can't desync the count. */
export function specimenCaption(world: WorldId): string {
  const order = METER_WORLD_IDS;
  const index = order.indexOf(world);
  const position = index === -1 ? WORLDS[world].walkPosition : index + 1;
  const total = order.length;
  if (world === "noir") return `THE SPECIMEN — FINAL APPEARANCE · ${position}/${total}`;
  if (world === "swiss") return `THE SPECIMEN — BRIEF ${SPECIMEN.id} · APPEARANCE 1/${total}`;
  return `THE SPECIMEN — APPEARANCE ${position}/${total} · SAME WORDS`;
}
