import type { WorldId } from "@/worlds";

export interface LaunchChapter {
  world: WorldId;
  phase: string;
  question: string;
}

export const RELAY = {
  id: "REL/001",
  name: "Relay",
  fictional: true as const,
  disclosure: "Fictional product concept",
  audience: "Product teams making consequential roadmap decisions",
  problem: "Customer evidence is fragmented across calls, tickets, research, and internal opinion.",
  promise: "Turn scattered evidence into cited, reviewable product decisions.",
  trustPrinciple: "No recommendation without sources. No decision without a human owner.",
  status: "Concept study / not a live product",
  artifact: {
    title: "Decision under review",
    recommendation: "Prioritize guided onboarding before expanding automation.",
    evidence: ["Research synthesis", "Support themes", "Activation review"],
    caveat: "Confidence is provisional until the product owner reviews conflicting evidence.",
  },
  chapters: [
    { world: "swiss", phase: "The product bet", question: "What decision deserves to exist?" },
    { world: "maison", phase: "Position and trust", question: "What should the promise refuse to hide?" },
    { world: "brut", phase: "Launch proposition", question: "What must land in one uncompromising sentence?" },
    { world: "term", phase: "The AI system", question: "How does the machine earn confidence?" },
    { world: "toy", phase: "First-run experience", question: "How does evidence become understandable?" },
    { world: "y2k", phase: "Rollout console", question: "How does the private beta become a launch?" },
    { world: "noir", phase: "Release decision", question: "What remains unresolved before release?" },
  ] satisfies LaunchChapter[],
};
