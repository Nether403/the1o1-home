import { expect, test } from "@playwright/test";

test("renders a readable default hero without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  await page.goto("/");

  await expect(page.locator("html")).toHaveAttribute("data-hero", "swiss");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: /start a project/i })).toBeVisible();
  await context.close();
});
