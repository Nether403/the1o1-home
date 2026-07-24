import { describe, expect, it } from "vitest";
import { createInquiryEmail } from "../../lib/inquiry-email";

describe("createInquiryEmail", () => {
  it("uses the verified sender and fixed recipient while replying to the visitor", () => {
    const email = createInquiryEmail({
      name: "Ada Lovelace",
      email: "ada@example.com",
      company: "Analytical Engines",
      situation: "new-product",
      brief: "We need to decide what the first release must prove.",
      timing: "this-quarter",
    }, "the1o1.one <projects@the1o1.one>", "support@101dev.xyz");

    expect(email).toMatchObject({
      from: "the1o1.one <projects@the1o1.one>",
      to: ["support@101dev.xyz"],
      replyTo: "ada@example.com",
      subject: "Product inquiry from Ada Lovelace",
    });
    expect(email.text).toContain("We need to decide what the first release must prove.");
  });
});
