import Specimen from "@/components/specimen/Specimen";
import { SPECIMEN_VARIANTS } from "@/content/specimen";

const CLI_INITIAL = `<span class="dim">the1o1 shell — this terminal is real. try a command.</span>
<span class="dim">──────────────────────────────────────────────</span>
<span class="p">$</span> <span class="c">help</span>
  <span class="y">whoami</span>     the person behind the worlds
  <span class="y">services</span>   what the consultancy does
  <span class="y">stack</span>      how this page holds seven design systems
  <span class="y">worlds</span>     list the registers on this scroll
  <span class="y">brief</span>      print specimen brief_001.yaml
  <span class="y">contact</span>    open a channel
  <span class="y">redeal</span>     re-deal the hero world
  <span class="y">clear</span>      wipe the buffer`;

export default function Term() {
  return (
    <>
<div className="seam" id="s-term" data-w="term" data-label="ENTERING — W·04 TERMINAL" aria-hidden="true">
  <div className="s-kick" style={{color:'#2ea355'}}>THE WALK — GATE 04/07</div>
  <h3>$ loading world_04: terminal — the machine room</h3>
  <div className="load"><i></i></div>
  <div className="pct">MOUNTING /house-of-every-style … SCROLL TO COMPLETE</div>
</div>

<section className="world" id="w-term" data-w="term" data-label="W·04 — TERMINAL / SYSTEMS" aria-labelledby="term-title">
  <span className="wtag ea">W·04 / TERMINAL — THE MACHINE ROOM. IT TALKS BACK.</span>
  <h2 className="ea" id="term-title">ask the site how it works</h2>
  <div className="win ea">
    <div className="bar"><i></i><i></i><i></i><span>visitor@the1o1 — /house-of-every-style — zsh</span></div>
    <div className="body">
      <div id="cliout" role="log" aria-live="polite" aria-relevant="additions"><pre dangerouslySetInnerHTML={{ __html: CLI_INITIAL }} /></div>
      <form className="cliline" id="cliform"><span aria-hidden="true">$</span><label className="sr-only" htmlFor="cliin">Terminal command</label><input id="cliin" type="text" autoComplete="off" spellCheck="false" placeholder="type help and press enter"/><button type="submit">RUN</button></form>
    </div>
  </div>
  <div className="hint ea">KEYBOARD AND TOUCH READY. THE REST OF THE SITE WORKS WITHOUT JAVASCRIPT — THIS TOY DOESN&apos;T.</div>
  <Specimen world="term" variant={SPECIMEN_VARIANTS.term} />
</section>
    </>
  );
}
