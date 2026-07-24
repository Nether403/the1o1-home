import LaunchArtifact from "@/components/artifact/LaunchArtifact";

const CLI_INITIAL = `<span class="dim">relay concept console — inspect the product argument.</span>
<span class="dim">──────────────────────────────────────────────</span>
<span class="p">$</span> <span class="c">help</span>
  <span class="y">product</span>    the product thesis
  <span class="y">workflow</span>   how evidence becomes a decision
  <span class="y">guardrails</span> what Relay refuses to automate
  <span class="y">evals</span>      launch evaluation criteria
  <span class="y">risks</span>      what remains unresolved
  <span class="y">contact</span>    open a channel
  <span class="y">clear</span>      wipe the buffer`;

export default function Term() {
  return (
    <>
<div className="seam" id="s-term" data-w="term" data-label="ENTERING — W·04 TERMINAL" aria-hidden="true">
  <div className="s-kick" style={{color:'#2ea355'}}>RELAY — CHAPTER 04 / THE AI SYSTEM</div>
  <h3>$ mounting rel_001: evidence engine</h3>
  <div className="load"><i></i></div>
  <div className="pct">MOUNTING /relay/evidence-engine … SCROLL TO COMPLETE</div>
</div>

<section className="world" id="w-term" data-w="term" data-label="W·04 — RELAY / THE AI SYSTEM" aria-labelledby="term-title">
  <span className="wtag ea">W·04 / TERMINAL — THE PRODUCT ARGUMENT, QUERYABLE</span>
  <h2 className="ea" id="term-title">ask Relay how it earns confidence</h2>
  <div className="win ea">
    <div className="bar"><i></i><i></i><i></i><span>reviewer@relay — /rel/001 — concept console</span></div>
    <div className="body">
      <div id="cliout" role="log" aria-live="polite" aria-relevant="additions"><pre dangerouslySetInnerHTML={{ __html: CLI_INITIAL }} /></div>
      <form className="cliline" id="cliform"><span aria-hidden="true">$</span><label className="sr-only" htmlFor="cliin">Relay command</label><input id="cliin" type="text" autoComplete="off" spellCheck="false" placeholder="type help and press enter"/><button type="submit">RUN</button></form>
    </div>
  </div>
  <div className="hint ea">KEYBOARD AND TOUCH READY. WITHOUT JAVASCRIPT, THE PRODUCT THESIS ABOVE STILL HOLDS.</div>
  <div className="artifact-wrap ea"><LaunchArtifact world="term" /></div>
</section>
    </>
  );
}
