import { expect, test } from "@playwright/test";

test("server-validates the inquiry without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/#inquiry");
  await page.getByLabel("Name *").fill("A");
  await page.getByLabel("Work email *").fill("invalid");
  await page.getByLabel("What are you trying to decide, build, or launch? *").fill("Too short");
  const submission = page.waitForResponse((response) => response.request().method() === "POST" && response.url().startsWith("http://127.0.0.1:3000/"));
  await page.getByRole("button", { name: "SEND THE BRIEF" }).click({ force: true });
  await submission;
  await page.waitForLoadState("networkidle");

  await expect(page.getByText("Please check the highlighted fields.")).toBeVisible({ timeout: 10_000 });
  await context.close();
});
