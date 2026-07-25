import { EVIDENCE } from "@/content/evidence";

export default function ProofPath() {
  return (
    <section id="proof" className="proof" aria-labelledby="proof-title">
      <header className="proof-head">
        <p className="proof-kick">THE EVIDENCE ROOM / PUBLIC WORK</p>
        <h2 id="proof-title">Range gets attention.<br /><span>Judgment earns trust.</span></h2>
        <p className="proof-lede">
          The worlds below this prove range. These prove it shipped. Public, inspectable work — no
          invented clients, no borrowed logos. Client-approved case records will join them only when
          the evidence can be shown honestly.
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
        <div><span>01</span><h3>Find the register</h3><p>The question worth answering, the audience it must convince, and the visual language the problem actually deserves.</p></div>
        <div><span>02</span><h3>Make it real</h3><p>Identity, interface, interaction, motion — and a working build strong enough to test the premise rather than describe it.</p></div>
        <div><span>03</span><h3>Ship it honestly</h3><p>A production surface with budgets enforced, accessibility respected, and every claim on it true.</p></div>
      </div>

      <div className="proof-actions">
        <a href="#inquiry">Bring the hard problem ↘</a>
        <a href="#walk">Or walk all seven worlds →</a>
      </div>
    </section>
  );
}
