export type EvidenceDisclosure = "public" | "anonymized";

export interface EvidenceRecord {
  id: string;
  disclosure: EvidenceDisclosure;
  title: string;
  context: string;
  challenge: string;
  role: string;
  shipped: string;
  evidenceLabel: string;
  href?: string;
}

export const EVIDENCE: EvidenceRecord[] = [
  {
    id: "mvdtv",
    disclosure: "public",
    title: "MVD.TV",
    context: "Independent design portfolio",
    challenge: "Turn a broad body of visual and interactive work into an interface with its own point of view.",
    role: "Concept, art direction, interaction design, and development.",
    shipped: "A live broadcast-style portfolio where projects become channels rather than thumbnails.",
    evidenceLabel: "View the live portfolio",
    href: "https://portfolio.the1o1.one",
  },
  {
    id: "witness-protocol",
    disclosure: "public",
    title: "The Witness Protocol",
    context: "Independent AI-alignment research",
    challenge: "Make questions of transparency, corrigibility, and human oversight legible beyond a research paper.",
    role: "Research, system framing, communication design, and implementation.",
    shipped: "A public protocol and digital research surface built for inspection, not mystique.",
    evidenceLabel: "Inspect the protocol",
    href: "https://twpf.online",
  },
  {
    id: "house-of-every-style",
    disclosure: "public",
    title: "The House of Every Style",
    context: "Portfolio system and engineering proof",
    challenge: "Demonstrate visual range without fragmenting the experience or abandoning performance discipline.",
    role: "Product strategy, design systems, motion direction, and Next.js engineering.",
    shipped: "Six permanent worlds plus a monthly guest register, one shared spine, progressive enhancement, and a public build dossier.",
    evidenceLabel: "Read the build dossier",
    href: "/built",
  },
];
