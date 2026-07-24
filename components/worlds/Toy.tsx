import LaunchArtifact from "@/components/artifact/LaunchArtifact";
import { METER_WORLD_IDS, WORLDS } from "@/worlds";

export default function Toy() {
  return (
    <>
<div className="seam" id="s-toy" data-w="toy" data-label="ENTERING — W·05 TOY" aria-hidden="true">
  <svg className="wave" viewBox="0 0 1440 92" preserveAspectRatio="none"><path d="M0,0 L1440,0 L1440,28 C1180,92 980,10 720,46 C460,82 260,18 0,60 Z" fill="#050805"/></svg>
  <div className="s-kick">RELAY — CHAPTER 05 / FIRST-RUN EXPERIENCE</div>
  <h3><span className="c1">P</span><span className="c2">L</span><span className="c3">A</span><span className="c4">Y</span><span className="c5">T</span><span className="c1">I</span><span className="c2">M</span><span className="c3">E</span><span className="c4">.</span></h3>
</div>

<section className="world" id="w-toy" data-w="toy" data-label="W·05 — RELAY / FIRST-RUN EXPERIENCE" aria-labelledby="toy-title">
  <div className="blobs" aria-hidden="true">
    <i className="blob" style={{width:'30vw',height:'30vw',background:'#FFD6E5',top:'-8%',right:'-6%'}}></i>
    <i className="blob" style={{width:'14vw',height:'14vw',background:'#D3E9FF',bottom:'20%',right:'24%'}}></i>
    <i className="blob" style={{width:'11vw',height:'11vw',background:'#FFF3BF',bottom:'-3%',left:'-2%'}}></i>
    <i className="blob" style={{width:'8vw',height:'8vw',background:'#D3F9D8',top:'22%',left:'4%'}}></i>
  </div>
  <span className="wtag ea">W·05 / THE TOY BOX — ONBOARDING AS A CONCRETE MODEL</span>
  <h2 className="ea" id="toy-title"><span className="p1">Collect.</span> <span className="p2">Connect.</span><br/><span className="p3">Decide.</span></h2>
  <p className="lede ea">Relay begins with evidence people already understand. Add a source, move it into the decision space, and see how it affects the argument. <b>The physics is playful; the provenance is not.</b></p>
  <p className="chip-help" id="chip-help">Drag with a pointer. With a keyboard, focus a chip and use the arrow keys or Space to toss it.</p>
  <div className="chips" id="brief-builder" aria-describedby="chip-help">
    <button type="button" className="chip ea"><span className="dot" style={{background:'#FF6B9D'}}></span>USER INTERVIEWS</button>
    <button type="button" className="chip ea"><span className="dot" style={{background:'#4DABF7'}}></span>SUPPORT THEMES</button>
    <button type="button" className="chip ea"><span className="dot" style={{background:'#F59F00'}}></span>ACTIVATION DATA</button>
    <button type="button" className="chip ea"><span className="dot" style={{background:'#51CF66'}}></span>SALES NOTES</button>
    <button type="button" className="chip ea"><span className="dot" style={{background:'#9775FA'}}></span>TEAM JUDGMENT</button>
  </div>
  <div className="meter ea">
    <h3>Your walk so far</h3>
    <div className="bubbles" id="bubbles">
      {METER_WORLD_IDS.map((id) => <span className="bb" data-b={id} key={id}>{String(WORLDS[id].walkPosition).padStart(2, "0")}</span>)}
    </div>
    <p id="meterline" aria-live="polite">Worlds seen: <b>0/{METER_WORLD_IDS.length}</b> — keep walking.</p>
  </div>
  <div className="artifact-wrap ea"><LaunchArtifact world="toy" /></div>
</section>
    </>
  );
}
