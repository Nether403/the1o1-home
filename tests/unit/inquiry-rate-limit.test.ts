import { beforeEach, describe, expect, it } from "vitest";
import { resetInquiryRateLimit, takeInquirySlot } from "../../lib/inquiry-rate-limit";

describe("takeInquirySlot", () => {
  beforeEach(resetInquiryRateLimit);

  it("allows four inquiries in ten minutes and rejects the fifth", () => {
    expect([0, 1, 2, 3].map((offset) => takeInquirySlot("source", offset))).toEqual([true, true, true, true]);
    expect(takeInquirySlot("source", 4)).toBe(false);
  });

  it("opens a new window after ten minutes", () => {
    [0, 1, 2, 3].forEach((offset) => takeInquirySlot("source", offset));
    expect(takeInquirySlot("source", 10 * 60 * 1000 + 1)).toBe(true);
  });
});
