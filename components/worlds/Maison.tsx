import Specimen from "@/components/specimen/Specimen";
import { SPECIMEN_VARIANTS } from "@/content/specimen";

export default function Maison() {
  return (
    <>
<div className="seam" id="s-maison" data-w="maison" data-label="ENTERING — W·02 MAISON" aria-hidden="true">
  <div className="s-kick">THE WALK — GATE 02/07</div>
  <div className="gold"></div>
  <h3>Chapitre deux — La Maison</h3>
</div>

<section className="world" id="w-maison" data-w="maison" data-label="W·02 — MAISON / SERVICES" aria-labelledby="maison-title">
  <div className="lift" aria-hidden="true"></div>
  <span className="wtag ea">W·02 / LA MAISON — THE SERVICES, CONDUCTED QUIETLY</span>
  <h2 id="maison-title" className="ea"><span id="sheenh">Range is the luxury.<br/><span className="it">Discipline is the proof.</span></span></h2>
  <p className="lede ea">Whatever world you are standing in, the offer never moves: three practices, plainly stated, reachable in one gesture. <b>The calmest thing on the page is the deal itself.</b></p>
  <div className="hr ea"></div>
  <div className="svc">
    <div className="ea"><div className="no">SERVICE — I</div><h3>Design</h3><p>Identity, interaction, motion, art direction. The claim of this entire site, made contractual: <b>any register, executed to the standard you are currently scrolling through.</b></p></div>
    <div className="ea"><div className="no">SERVICE — II</div><h3>Development</h3><p>The engineering that lets seven design systems share one page without breaking a performance budget. Next.js, physics, motion systems — <b>the how of this site, sold as a practice.</b></p></div>
    <div className="ea"><div className="no">SERVICE — III</div><h3>Research</h3><p>Independent inquiry — AI alignment, evidence, the assumptions inside systems. The reason the work holds up under interrogation.</p></div>
  </div>
  <div className="eng ea">
    <div><b>Project</b>Defined scope, defined end.</div>
    <div><b>Retainer</b>A standing seat at your table.</div>
    <div><b>Advisory</b>The hard questions, on call.</div>
    <div><b>Terms</b>Priced in conversation, not on a page.</div>
  </div>
  <Specimen world="maison" variant={SPECIMEN_VARIANTS.maison} />
</section>
    </>
  );
}
