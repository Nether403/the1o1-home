import { EVIDENCE } from "@/content/evidence";

export default function ProofPath() {
  return (
    <section id="proof" className="proof" aria-labelledby="proof-title">
      <header className="proof-head">
        <p className="proof-kick">THE EVIDENCE ROOM / PUBLIC WORK</p>
        <h2 id="proof-title">Range gets attention.<br /><span>Judgment earns trust.</span></h2>
        <p className="proof-lede">
          For founders and product leaders working through an uncertain launch: clarify the bet, make it tangible,
          and build enough of the real thing to learn from it. These are public practice artifacts. Client-approved
          case records will join them only when the evidence can be shown honestly.
        </p>
      </header>

      <div className="proof-list">
        {EVIDENCE.map((item, index) => (
          <article className="proof-case" key={item.id}>
            <div className="proof-case-no">0{index + 1} / {item.disclosure.toUpperCase()}</div>
            <div>
              <p className="proof-context">{item.context}</p>
              <h3>{item.title}</h3>
            </div>
            <dl>
              <div><dt>The problem</dt><dd>{item.challenge}</dd></div>
              <div><dt>My role</dt><dd>{item.role}</dd></div>
              <div><dt>What exists</dt><dd>{item.shipped}</dd></div>
            </dl>
            {item.href && <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}>{item.evidenceLabel} ↗</a>}
          </article>
        ))}
      </div>

      <div className="proof-fit" id="fit">
        <p className="proof-kick">WHERE THE PRACTICE ENTERS</p>
        <div><span>01</span><h3>Clarify the bet</h3><p>Customer evidence, product thesis, positioning, constraints, and the question worth answering.</p></div>
        <div><span>02</span><h3>Make it tangible</h3><p>Product UX, identity, interaction, and a working prototype strong enough to test the premise.</p></div>
        <div><span>03</span><h3>Launch and learn</h3><p>A production surface, a coherent launch system, and a deliberate loop back to evidence.</p></div>
      </div>

      <div className="proof-actions">
        <a href="#inquiry">Bring a product question ↘</a>
        <a href="#walk">Or enter the seven-world launch →</a>
      </div>
    </section>
  );
}
