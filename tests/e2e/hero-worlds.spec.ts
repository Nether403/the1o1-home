import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const world of ["swiss", "maison", "brut", "term", "toy", "y2k", "noir"] as const) {
  test(`keeps the ${world} hero accessible`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/?w=${world}`);
    await expect(page.locator("html")).toHaveAttribute("data-hero", world);
    const results = await new AxeBuilder({ page })
      .include("#hero")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
  });
}
