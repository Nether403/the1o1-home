export default function Hero() {
  return (
    <>
<section id="hero" data-w="hero">
  <div className="hbg grid" aria-hidden="true"></div>
  <div className="hbg frame" aria-hidden="true"></div>
  <div className="hbg slabs" aria-hidden="true"></div>
  <div className="hbg scan" aria-hidden="true"></div>
  <div className="hbg blobs" aria-hidden="true">
    <i style={{width:'34vw',height:'34vw',background:'#FFD6E5',top:'-10%',right:'-8%'}}></i>
    <i style={{width:'16vw',height:'16vw',background:'#D3E9FF',bottom:'12%',right:'22%'}}></i>
    <i style={{width:'10vw',height:'10vw',background:'#FFF3BF',bottom:'-4%',left:'-3%'}}></i>
  </div>
  <div className="hbg grain" aria-hidden="true"></div>
  <div className="hbg spot" aria-hidden="true"></div>

  <div className="hx">
    <div className="hx-tag ea"><span>MARTIN VAN DEURSEN — DESIGN &amp; CONSULTANCY</span><span className="dealt" id="dealt">DEALT: —</span></div>
    <h1><span className="l1 ea">We don't have a style.</span><span className="l2 ea">We have a standard.</span></h1>
    <p className="hx-sub ea">Every visit, this site deals you one of six design worlds — typography, color, motion, even the cursor. Scroll to walk all of them. The work changes register; <b>the standard doesn't.</b></p>
    <div className="hx-meta ea"><span>DESIGN</span><span>DEVELOPMENT</span><span>RESEARCH</span><span>NL — AMSTERDAM</span></div>
    <div className="hx-actions ea">
      <button className="redeal" id="redeal">↻ REDEAL THE WORLD</button>
      <span className="hx-hint">OR SCROLL — ALL SIX ARE DOWN THERE</span>
    </div>
  </div>
  <div className="hero-cue"><span className="b"></span> THE WALK BEGINS ↓</div>
</section>
    </>
  );
}
