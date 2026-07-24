import { expect, test } from "@playwright/test";

test("keeps the full walk static and skips enhanced motion modules", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?w=swiss");
  await page.locator("#w-toy").scrollIntoViewIfNeeded();

  await expect(page.locator("html")).not.toHaveAttribute("data-motion", "gsap");
  const enhancementState = await page.evaluate(() => ({
    lenis: Boolean((window as Window & { __lenis?: unknown }).__lenis),
    toyPhysics: Boolean((window as Window & { __toyPhys?: boolean }).__toyPhys),
  }));
  expect(enhancementState).toEqual({ lenis: false, toyPhysics: false });
});

test("tears down heavy modules when reduced motion is enabled at runtime", async ({ page }) => {
  await page.goto("/?w=toy#w-toy");
  await page.locator("#w-toy").scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => Boolean((window as Window & { __toyPhys?: boolean }).__toyPhys))).toBe(true);

  await page.emulateMedia({ reducedMotion: "reduce" });

  await expect.poll(() => page.evaluate(() => Boolean((window as Window & { __toyPhys?: boolean }).__toyPhys))).toBe(false);
  await expect(page.locator("html")).not.toHaveAttribute("data-motion", "gsap");
});
