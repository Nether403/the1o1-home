import LaunchArtifact from "@/components/artifact/LaunchArtifact";
import { RELAY } from "@/content/launch";

export default function Swiss() {
  return (
    <>
<div className="seam" id="s-swiss" data-w="swiss" data-label="ENTERING — W·01 SWISS" aria-hidden="true">
  <div className="s-kick">RELAY — CHAPTER 01 / THE PRODUCT BET</div>
  <h3>NOW ENTERING <span>→</span> SWISS INTERNATIONAL</h3>
  <div className="rail"></div>
</div>

<section className="world" id="w-swiss" data-w="swiss" data-label="W·01 — RELAY / THE PRODUCT BET" aria-labelledby="swiss-title">
  <div className="gridlines" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
  <span className="wtag ea">W·01 / SWISS INTERNATIONAL — RELAY, BEFORE THE AESTHETICS</span>
  <div className="rule ea"></div>
  <h2 className="ea" id="swiss-title">First define<br/>the <span>bet.</span></h2>
  <div className="intro">
    <div className="ea"><div className="lbl">Audience</div><p>{RELAY.audience}. Not another dashboard for collecting more data.</p></div>
    <div className="ea"><div className="lbl">Problem</div><p>{RELAY.problem} <b>The difficult part is deciding what the evidence changes.</b></p></div>
    <div className="ea"><div className="lbl">Product promise</div><p><b>{RELAY.promise}</b></p></div>
  </div>
  <div className="artifact-wrap ea"><LaunchArtifact world="swiss" /></div>

  <div id="pinwrap">
    <div id="pintrack">
      <div className="panel"><span className="pnum">DECISION 01/03</span><h3>Evidence before output</h3><p>Relay starts with source material and disagreement. A recommendation without a traceable basis is not intelligence; it is decoration.</p><div className="pfoot">KEEP SCROLLING — THE ARGUMENT MOVES SIDEWAYS →</div></div>
      <div className="panel"><span className="pnum">DECISION 02/03</span><h3>Uncertainty stays visible</h3><p>The interface distinguishes signal, inference, and unresolved conflict. Confidence is a review aid, never a substitute for judgment.</p><div className="pfoot">THE CLAIM IS GETTING NARROWER →</div></div>
      <div className="panel"><span className="pnum">DECISION 03/03</span><h3>A human owns the call</h3><p>{RELAY.trustPrinciple} The product helps teams reason together; it does not quietly become the decision-maker.</p><div className="pfoot">BET DEFINED. NOW GIVE IT A VOICE ↓</div></div>
    </div>
  </div>
</section>
    </>
  );
}
