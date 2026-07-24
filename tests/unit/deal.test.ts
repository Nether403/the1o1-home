import { describe, expect, it } from "vitest";
import { getDealWorldIds } from "../../lib/deal";

describe("getDealWorldIds", () => {
  it("includes the active guest during its feature window", () => {
    expect(getDealWorldIds(new Date("2026-07-24T00:00:00Z"))).toContain("y2k");
  });

  it("removes the guest from random deals after its feature window", () => {
    expect(getDealWorldIds(new Date("2026-08-01T00:00:00Z"))).not.toContain("y2k");
  });
});
