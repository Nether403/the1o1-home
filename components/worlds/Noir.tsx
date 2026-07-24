import Specimen from "@/components/specimen/Specimen";
import { SPECIMEN_VARIANTS } from "@/content/specimen";

export default function Noir() {
  return (
    <>
<div className="seam" id="s-noir" data-w="noir" data-label="ENTERING — W·06 NOIR" aria-hidden="true">
  <div className="s-kick">THE WALK — GATE 07/07 · LIGHTS DOWN</div>
  <h3>— the <b>final reel</b> —</h3>
</div>

<section className="world" id="w-noir" data-w="noir" data-label="W·06 — NOIR / CONTACT" aria-labelledby="noir-title">
  <div className="bars top" aria-hidden="true"></div><div className="bars bot" aria-hidden="true"></div>
  <div className="grain" aria-hidden="true"></div>
  <div className="spot" aria-hidden="true"></div>
  <div className="z">
    <span className="wtag ea">W·06 / NOIR — FINAL REEL. THE ASK.</span>
    <h2 className="ea" id="noir-title">Bring the<br/><span className="thin">hard problem</span></h2>
    <p className="tagline ea">Those are usually the interesting ones. You have seen seven answers to one brief — the next brief should be yours.</p>
    <a className="mail ea" href="#inquiry">START A PROJECT ↓</a>
    <div className="links ea">
      <a href="https://portfolio.the1o1.one" target="_blank" rel="noopener noreferrer">PORTFOLIO ↗</a>
      <a href="https://github.com/Nether403" target="_blank" rel="noopener noreferrer">GITHUB ↗</a>
      <a href="https://www.linkedin.com/in/mvd101" target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a>
      <a href="https://101dev.xyz" target="_blank" rel="noopener noreferrer">101DEV ↗</a>
    </div>
    <Specimen world="noir" variant={SPECIMEN_VARIANTS.noir} />
  </div>
</section>
    </>
  );
}
