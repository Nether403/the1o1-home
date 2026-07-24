import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("renders the main experience without browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("/?w=swiss");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("main")).toHaveCount(1);
  expect(errors).toEqual([]);
});

test("has no automatically detectable WCAG A or AA violations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?w=swiss");
  const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();

  expect(results.violations).toEqual([]);
});
