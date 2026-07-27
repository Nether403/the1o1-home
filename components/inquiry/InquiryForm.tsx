"use client";

import { useState, useRef } from "react";

interface FormState {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
  errors: Record<string, string>;
}

const INITIAL: FormState = { status: "idle", message: "", errors: {} };

export default function InquiryForm() {
  const [state, setState] = useState<FormState>(INITIAL);
  const formRef = useRef<HTMLFormElement>(null);

  const error = (field: string) => state.errors[field];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState({ status: "submitting", message: "", errors: {} });

    const form = e.currentTarget;
    const formData = new FormData(form);

    const body = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim(),
      situation: String(formData.get("situation") ?? ""),
      brief: String(formData.get("brief") ?? "").trim(),
      timing: String(formData.get("timing") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    try {
      const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/inquiry`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok && data.errors) {
        setState({ status: "error", message: data.message, errors: data.errors });
      } else if (!res.ok) {
        setState({ status: "error", message: data.message || "Something went wrong.", errors: {} });
      } else {
        setState({ status: "success", message: data.message, errors: {} });
        formRef.current?.reset();
      }
    } catch {
      setState({
        status: "error",
        message: "The message could not be delivered. Please use the email fallback.",
        errors: {},
      });
    }
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit} noValidate ref={formRef}>
      <div className="inquiry-field">
        <label htmlFor="inquiry-name">Name *</label>
        <input id="inquiry-name" name="name" autoComplete="name" required aria-invalid={Boolean(error("name"))} aria-describedby={error("name") ? "inquiry-name-error" : undefined} />
        {error("name") && <p id="inquiry-name-error" className="field-error">{error("name")}</p>}
      </div>
      <div className="inquiry-field">
        <label htmlFor="inquiry-email">Work email *</label>
        <input id="inquiry-email" name="email" type="email" autoComplete="email" required aria-invalid={Boolean(error("email"))} aria-describedby={error("email") ? "inquiry-email-error" : undefined} />
        {error("email") && <p id="inquiry-email-error" className="field-error">{error("email")}</p>}
      </div>
      <div className="inquiry-field">
        <label htmlFor="inquiry-company">Company or product</label>
        <input id="inquiry-company" name="company" autoComplete="organization" />
      </div>
      <div className="inquiry-field">
        <label htmlFor="inquiry-situation">Current situation</label>
        <select id="inquiry-situation" name="situation" defaultValue="">
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
        <textarea id="inquiry-brief" name="brief" rows={6} maxLength={3000} required aria-invalid={Boolean(error("brief"))} aria-describedby={error("brief") ? "inquiry-brief-error" : "inquiry-brief-hint"} />
        <p id="inquiry-brief-hint" className="field-hint">The useful context: what is uncertain, what is at stake, and what already exists.</p>
        {error("brief") && <p id="inquiry-brief-error" className="field-error">{error("brief")}</p>}
      </div>
      <div className="inquiry-field">
        <label htmlFor="inquiry-timing">Timing</label>
        <select id="inquiry-timing" name="timing" defaultValue="">
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
        <button type="submit" disabled={state.status === "submitting"} aria-disabled={state.status === "submitting"}>
          {state.status === "submitting" ? "SENDING…" : "SEND THE BRIEF ↗"}
        </button>
        <p className={`form-status ${state.status}`} role="status" aria-live="polite">{state.message}</p>
      </div>
    </form>
  );
}
