import InquiryForm from "./InquiryForm";

export default function InquirySection() {
  return (
    <section id="inquiry" className="inquiry" aria-labelledby="inquiry-title">
      <header>
        <p>START A PROJECT / THE USEFUL FIRST CONVERSATION</p>
        <h2 id="inquiry-title">Bring the decision<br />that will not resolve itself.</h2>
        <div className="inquiry-intro">
          <p>Share the product question, the uncertainty around it, and what is already real. No pitch deck required.</p>
          <p>Prefer your own email client? <a href="mailto:support@101dev.xyz?subject=Product%20inquiry">support@101dev.xyz</a></p>
        </div>
      </header>
      <InquiryForm />
    </section>
  );
}
