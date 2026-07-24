import { expect, test } from "@playwright/test";

test("runs Relay console commands through the form", async ({ page }) => {
  await page.goto("/?w=term#w-term");
  const input = page.getByLabel("Relay command");
  await input.fill("guardrails");
  await page.getByRole("button", { name: "RUN" }).click();

  await expect(page.getByRole("log")).toContainText("no recommendation without sources");
  await expect(input).toBeFocused();
});
