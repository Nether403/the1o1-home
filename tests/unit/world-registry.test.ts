import { describe, expect, it } from "vitest";
import { CORE_WORLDS, GUEST_WORLDS, WORLDS, WORLD_ORDER } from "../../worlds";

describe("world registry", () => {
  it("defines six permanent worlds and one active guest", () => {
    expect(CORE_WORLDS).toHaveLength(6);
    expect(GUEST_WORLDS).toHaveLength(1);
    expect(GUEST_WORLDS[0].displayCode).toBe("G·01");
  });

  it("gives every walked world a unique position and section target", () => {
    const worlds = WORLD_ORDER.map((id) => WORLDS[id]);

    expect(new Set(worlds.map((world) => world.walkPosition)).size).toBe(worlds.length);
    expect(new Set(worlds.map((world) => world.sectionId)).size).toBe(worlds.length);
    expect(worlds.map((world) => world.walkPosition)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it("keeps implementation loaders out of server-safe metadata", () => {
    for (const world of Object.values(WORLDS)) {
      expect("module" in world).toBe(false);
    }
  });
});
