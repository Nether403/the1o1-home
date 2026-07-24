import { describe, expect, it } from "vitest";
import { INITIAL_INQUIRY_STATE, processInquiry, validateInquiry } from "../../lib/inquiry";

function formData(values: Record<string, string>) {
  const data = new FormData();
  Object.entries(values).forEach(([key, value]) => data.set(key, value));
  return data;
}

describe("validateInquiry", () => {
  it("accepts and normalizes a complete inquiry", () => {
    const result = validateInquiry(formData({
      name: "  Ada Lovelace  ",
      email: "ADA@example.com",
      company: "Analytical Engines",
      situation: "new-product",
      brief: "  We need to decide what the first release must prove.  ",
      timing: "this-quarter",
      website: "",
    }));

    expect(result).toEqual({
      ok: true,
      data: expect.objectContaining({
        name: "Ada Lovelace",
        email: "ada@example.com",
        brief: "We need to decide what the first release must prove.",
      }),
    });
  });

  it("returns field errors for an invalid submission", () => {
    const result = validateInquiry(formData({ name: "", email: "not-email", brief: "short" }));

    expect(result).toEqual({
      ok: false,
      errors: expect.objectContaining({ name: expect.any(String), email: expect.any(String), brief: expect.any(String) }),
      values: expect.objectContaining({ email: "not-email", brief: "short" }),
    });
  });

  it("silently identifies honeypot submissions", () => {
    const result = validateInquiry(formData({
      name: "Bot",
      email: "bot@example.com",
      brief: "This is long enough to otherwise pass validation.",
      website: "https://spam.example",
    }));

    expect(result).toEqual({ ok: false, spam: true, errors: {}, values: expect.objectContaining({ email: "bot@example.com" }) });
  });

  it("clears values after successful delivery", async () => {
    const result = await processInquiry(INITIAL_INQUIRY_STATE, formData({
      name: "Ada Lovelace",
      email: "ada@example.com",
      brief: "We need to decide what the first release must prove.",
    }), async () => {});

    expect(result.status).toBe("success");
    expect(result.values.name).toBe("");
  });

  it("preserves values after failed delivery", async () => {
    const result = await processInquiry(INITIAL_INQUIRY_STATE, formData({
      name: "Ada Lovelace",
      email: "ada@example.com",
      brief: "We need to decide what the first release must prove.",
    }), async () => { throw new Error("unavailable"); });

    expect(result.status).toBe("error");
    expect(result.values).toMatchObject({ name: "Ada Lovelace", email: "ada@example.com" });
  });
});
