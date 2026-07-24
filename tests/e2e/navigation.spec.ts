import { expect, test } from "@playwright/test";

test("tracks one active chapter and exposes it to assistive technology", async ({ page }) => {
  await page.goto("/?w=swiss");
  await page.locator("#w-maison").scrollIntoViewIfNeeded();

  await expect(page.locator("#dial [aria-current='location']")).toHaveCount(1);
  await expect(page.locator("#dial a[href='#w-maison']")).toHaveAttribute("aria-current", "location");
  await expect(page.locator("html")).toHaveAttribute("data-active-world", "maison");
});

test("keeps chapter navigation available without horizontal page overflow", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/?w=swiss");

  await expect(page.getByRole("navigation", { name: "World chapters" })).toBeVisible();
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
  expect(dimensions.scrollWidth).toBe(dimensions.clientWidth);
});
