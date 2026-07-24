import { expect, test } from "@playwright/test";

test("runs terminal commands through the form", async ({ page }) => {
  await page.goto("/?w=term#w-term");
  const input = page.getByLabel("Terminal command");
  await input.fill("stack");
  await page.getByRole("button", { name: "RUN" }).click();

  await expect(page.getByRole("log")).toContainText("shared registry");
  await expect(input).toBeFocused();
});

test("prints the specimen brief", async ({ page }) => {
  await page.goto("/?w=term#w-term");
  const input = page.getByLabel("Terminal command");
  await input.fill("brief");
  await page.getByRole("button", { name: "RUN" }).click();

  await expect(page.getByRole("log")).toContainText("make it impossible to ignore");
});
