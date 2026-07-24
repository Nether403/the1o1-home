import LaunchArtifact from "@/components/artifact/LaunchArtifact";

export default function Brut() {
  return (
    <>
<div className="seam" id="s-brut" data-w="brut" data-label="ENTERING — W·03 BRUT" aria-hidden="true">
  <div className="strip a"></div>
  <h3>NEXT: <em>THE CLAIM.</em><br/>NO HEDGING.</h3>
  <div className="strip b"></div>
</div>

<section className="world" id="w-brut" data-w="brut" data-label="W·03 — RELAY / LAUNCH PROPOSITION" aria-labelledby="brut-title">
  <span className="wtag ea">W·03 / BRUTALIST — THE LAUNCH PROPOSITION, NO DECORATION</span>
  <h2 className="ea" id="brut-title" style={{marginTop:'22px'}}>Stop collecting.<br/><span className="inv">Start deciding.</span></h2>
  <div className="marq" aria-hidden="true"><div className="inner" id="marq">&nbsp;NO RECOMMENDATION WITHOUT SOURCES — NO DECISION WITHOUT AN OWNER — NO RECOMMENDATION WITHOUT SOURCES — NO DECISION WITHOUT AN OWNER —&nbsp;</div></div>
  <div className="rows">
    <div className="row ea"><span className="rn">CLAIM/01</span><h3>Trace the evidence</h3><p>Every product recommendation opens back to the interviews, tickets, and observed behavior behind it.</p><span className="ar">01</span></div>
    <div className="row ea"><span className="rn">CLAIM/02</span><h3>Expose disagreement</h3><p>Conflicting evidence stays visible. Relay does not manufacture consensus to make the interface look decisive.</p><span className="ar">02</span></div>
    <div className="row ea"><span className="rn">CLAIM/03</span><h3>Record the call</h3><p>The product owner makes the decision and records why. The model supplies an argument, not authority.</p><span className="ar">03</span></div>
  </div>
  <div className="stamp ea">FICTIONAL PRODUCT CONCEPT — REL/001</div>
  <div className="artifact-wrap ea"><LaunchArtifact world="brut" /></div>
</section>
    </>
  );
}
