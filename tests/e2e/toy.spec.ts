import { expect, test } from "@playwright/test";

test("lets keyboard users toss a Toy chip", async ({ page }) => {
  await page.goto("/?w=toy#brief-builder");
  const chip = page.locator("#w-toy .chip").first();
  await chip.scrollIntoViewIfNeeded();
  await chip.focus();
  await page.keyboard.press("Space");

  await expect(chip).toBeFocused();
  await expect.poll(async () => chip.evaluate((element) => getComputedStyle(element).transform)).not.toBe("none");
});
