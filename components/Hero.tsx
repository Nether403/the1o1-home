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
    <p className="hx-sub ea">Independent design and engineering for ambitious product launches, difficult digital systems, and ideas that have not found their form yet. <b>The register changes; the judgment doesn't.</b></p>
    <div className="hx-meta ea"><span>PRODUCT</span><span>DESIGN</span><span>ENGINEERING</span><span>NL — AMSTERDAM</span></div>
    <div className="hx-actions ea">
      <a className="hero-link primary" href="#proof">SEE THE EVIDENCE ↓</a>
      <a className="hero-link" href="#walk">EXPLORE THE HOUSE →</a>
      <button className="redeal" id="redeal">↻ REDEAL</button>
    </div>
  </div>
  <div className="hero-cue"><span className="b"></span> THE WALK BEGINS ↓</div>
</section>
    </>
  );
}
