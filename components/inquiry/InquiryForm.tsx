"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitInquiry } from "@/app/actions/inquiry";
import { INITIAL_INQUIRY_STATE } from "@/lib/inquiry";

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending} aria-disabled={pending}>{pending ? "SENDING…" : "SEND THE BRIEF ↗"}</button>;
}

export default function InquiryForm() {
  const [state, action] = useActionState(submitInquiry, INITIAL_INQUIRY_STATE);
  const error = (field: string) => state.errors[field];

  return (
    <form className="inquiry-form" action={action} noValidate key={state.revision}>
      <div className="inquiry-field">
        <label htmlFor="inquiry-name">Name *</label>
        <input id="inquiry-name" name="name" defaultValue={state.values.name} autoComplete="name" required aria-invalid={Boolean(error("name"))} aria-describedby={error("name") ? "inquiry-name-error" : undefined} />
        {error("name") && <p id="inquiry-name-error" className="field-error">{error("name")}</p>}
      </div>
      <div className="inquiry-field">
        <label htmlFor="inquiry-email">Work email *</label>
        <input id="inquiry-email" name="email" defaultValue={state.values.email} type="email" autoComplete="email" required aria-invalid={Boolean(error("email"))} aria-describedby={error("email") ? "inquiry-email-error" : undefined} />
        {error("email") && <p id="inquiry-email-error" className="field-error">{error("email")}</p>}
      </div>
      <div className="inquiry-field">
        <label htmlFor="inquiry-company">Company or product</label>
        <input id="inquiry-company" name="company" defaultValue={state.values.company} autoComplete="organization" />
      </div>
      <div className="inquiry-field">
        <label htmlFor="inquiry-situation">Current situation</label>
        <select id="inquiry-situation" name="situation" defaultValue={state.values.situation}>
          <option value="">Choose one</option>
          <option value="new-product">A new product or venture</option>
          <option value="repositioning">A product that needs repositioning</option>
          <option value="prototype">A difficult idea that needs a prototype</option>
          <option value="system">A digital system that needs clarity</option>
          <option value="other">Something else</option>
        </select>
      </div>
      <div className="inquiry-field full">
        <label htmlFor="inquiry-brief">What are you trying to decide, build, or launch? *</label>
        <textarea id="inquiry-brief" name="brief" defaultValue={state.values.brief} rows={6} maxLength={3000} required aria-invalid={Boolean(error("brief"))} aria-describedby={error("brief") ? "inquiry-brief-error" : "inquiry-brief-hint"} />
        <p id="inquiry-brief-hint" className="field-hint">The useful context: what is uncertain, what is at stake, and what already exists.</p>
        {error("brief") && <p id="inquiry-brief-error" className="field-error">{error("brief")}</p>}
      </div>
      <div className="inquiry-field">
        <label htmlFor="inquiry-timing">Timing</label>
        <select id="inquiry-timing" name="timing" defaultValue={state.values.timing}>
          <option value="">Not decided</option>
          <option value="now">Ready now</option>
          <option value="this-quarter">This quarter</option>
          <option value="next-quarter">Next quarter</option>
          <option value="exploring">Still exploring</option>
        </select>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="inquiry-website">Website</label>
        <input id="inquiry-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>
      <div className="inquiry-submit">
        <SubmitButton />
        <p className={`form-status ${state.status}`} role="status" aria-live="polite">{state.message}</p>
      </div>
    </form>
  );
}
