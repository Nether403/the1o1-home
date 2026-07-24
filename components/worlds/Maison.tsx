import LaunchArtifact from "@/components/artifact/LaunchArtifact";
import { RELAY } from "@/content/launch";

export default function Maison() {
  return (
    <>
<div className="seam" id="s-maison" data-w="maison" data-label="ENTERING — W·02 MAISON" aria-hidden="true">
  <div className="s-kick">RELAY — CHAPTER 02 / POSITION AND TRUST</div>
  <div className="gold"></div>
  <h3>Chapitre deux — La Maison</h3>
</div>

<section className="world" id="w-maison" data-w="maison" data-label="W·02 — RELAY / POSITION AND TRUST" aria-labelledby="maison-title">
  <div className="lift" aria-hidden="true"></div>
  <span className="wtag ea">W·02 / LA MAISON — THE PROMISE, EDITED TO ITS ESSENCE</span>
  <h2 id="maison-title" className="ea"><span id="sheenh">Intelligence is easy to claim.<br/><span className="it">Trust is designed.</span></span></h2>
  <p className="lede ea">Relay should not sound omniscient. Its value is more precise: <b>{RELAY.promise}</b> Restraint is part of the product behavior, not merely the tone of voice.</p>
  <div className="hr ea"></div>
  <div className="svc">
    <div className="ea"><div className="no">PROMISE — I</div><h3>Cited</h3><p>Every recommendation preserves a path back to the source material that shaped it.</p></div>
    <div className="ea"><div className="no">BEHAVIOR — II</div><h3>Reviewable</h3><p>Teams can inspect the inference, challenge the framing, and record why the final decision changed.</p></div>
    <div className="ea"><div className="no">BOUNDARY — III</div><h3>Human-owned</h3><p>{RELAY.trustPrinciple}</p></div>
  </div>
  <div className="artifact-wrap ea"><LaunchArtifact world="maison" /></div>
</section>
    </>
  );
}
