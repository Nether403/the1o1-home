const CLI_INITIAL = `<span class="dim">the1o1 shell — this terminal is real. try a command.</span>
<span class="dim">──────────────────────────────────────────────</span>
<span class="p">$</span> <span class="c">help</span>
  <span class="y">whoami</span>     the person behind the worlds
  <span class="y">services</span>   what the consultancy does
  <span class="y">stack</span>      how this page holds six design systems
  <span class="y">worlds</span>     list the registers on this scroll
  <span class="y">brief</span>      print specimen brief_001.yaml   <span class="dim">(appearance 4/6)</span>
  <span class="y">contact</span>    open a channel
  <span class="y">redeal</span>     re-deal the hero world
  <span class="y">clear</span>      wipe the buffer`;

export default function Term() {
  return (
    <>
<div className="seam" id="s-term" data-w="term" data-label="ENTERING — W·04 TERMINAL" aria-hidden="true">
  <div className="s-kick" style={{color:'#2ea355'}}>THE WALK — GATE 04/06</div>
  <h3>$ loading world_04: terminal — the machine room</h3>
  <div className="load"><i></i></div>
  <div className="pct">MOUNTING /house-of-every-style … SCROLL TO COMPLETE</div>
</div>

<section className="world" id="w-term" data-w="term" data-label="W·04 — TERMINAL / SYSTEMS">
  <span className="wtag ea">W·04 / TERMINAL — THE MACHINE ROOM. IT TALKS BACK.</span>
  <h2 className="ea">ask the site how it works</h2>
  <div className="win ea">
    <div className="bar"><i></i><i></i><i></i><span>visitor@the1o1 — /house-of-every-style — zsh</span></div>
    <div className="body">
      <pre id="cliout" dangerouslySetInnerHTML={{ __html: CLI_INITIAL }} />
      <div className="cliline"><span>$</span><input id="cliin" type="text" autoComplete="off" spellCheck="false" aria-label="terminal input" placeholder="type help and hit enter"/></div>
    </div>
  </div>
  <div className="hint ea">FULL KEYBOARD SUPPORT. THE REST OF THE SITE WORKS WITHOUT JS — THIS TOY DOESN'T.</div>
</section>
    </>
  );
}
