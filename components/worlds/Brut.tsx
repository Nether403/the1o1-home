import Specimen from "@/components/specimen/Specimen";
import { SPECIMEN_VARIANTS } from "@/content/specimen";

export default function Brut() {
  return (
    <>
<div className="seam" id="s-brut" data-w="brut" data-label="ENTERING — W·03 BRUT" aria-hidden="true">
  <div className="strip a"></div>
  <h3>NEXT: <em>THE WORK.</em><br/>NO DECORATION.</h3>
  <div className="strip b"></div>
</div>

<section className="world" id="w-brut" data-w="brut" data-label="W·03 — BRUT / THE WORK" aria-labelledby="brut-title">
  <span className="wtag ea">W·03 / BRUTALIST — THE WORK, NO DECORATION</span>
  <h2 className="ea" id="brut-title" style={{marginTop:'22px'}}>Where the<br/><span className="inv">worlds</span> live.</h2>
  <div className="marq" aria-hidden="true"><div className="inner" id="marq">&nbsp;EVERY STYLE IMAGINABLE — MADE HIGH-END — EVERY STYLE IMAGINABLE — MADE HIGH-END — EVERY STYLE IMAGINABLE — MADE HIGH-END — EVERY STYLE IMAGINABLE — MADE HIGH-END —&nbsp;</div></div>
  <div className="rows">
    <a className="row ea" href="https://portfolio.the1o1.one" target="_blank" rel="noopener noreferrer">
      <span className="rn">DEST/01</span><h3>The Design Portfolio</h3><p>MVD·TV — a portfolio staged as a broadcast band. Tune through the channels; every frequency is a real, running project.</p><span className="ar">↗</span>
    </a>
    <a className="row ea" href="https://github.com/Nether403" target="_blank" rel="noopener noreferrer">
      <span className="rn">DEST/02</span><h3>The Code</h3><p>GitHub / Nether403 — TypeScript-first. Tools, experiments, engines, and the repos behind these worlds.</p><span className="ar">↗</span>
    </a>
    <a className="row ea" href="https://twpf.online" target="_blank" rel="noopener noreferrer">
      <span className="rn">DEST/03</span><h3>The Research</h3><p>The Witness Protocol — independent AI-alignment work: transparency, corrigibility, and keeping humans in control.</p><span className="ar">↗</span>
    </a>
    <a className="row ea" href="https://101dev.xyz" target="_blank" rel="noopener noreferrer">
      <span className="rn">DEST/04</span><h3>The Umbrella</h3><p>101dev — the connective tissue. Story, practices, and the portfolio nexus that binds the landscape together.</p><span className="ar">↗</span>
    </a>
  </div>
  <div className="stamp ea">CASE DOSSIERS — ON REQUEST, IN CONVERSATION</div>
  <Specimen world="brut" variant={SPECIMEN_VARIANTS.brut} />
</section>
    </>
  );
}
