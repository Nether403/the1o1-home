import { expect, test } from "@playwright/test";

test("validates an inquiry on the server and keeps the email fallback available", async ({ page }) => {
  await page.goto("/?w=swiss#inquiry");
  await page.getByLabel("Name *").fill("A");
  await page.getByLabel("Work email *").fill("not-an-email");
  await page.getByLabel("What are you trying to decide, build, or launch? *").fill("Too short");
  await page.getByRole("button", { name: "SEND THE BRIEF" }).click();

  await expect(page.getByText("Please check the highlighted fields.")).toBeVisible();
  await expect(page.getByText("Please enter a valid email address.")).toBeVisible();
  await expect(page.locator("#inquiry").getByRole("link", { name: "support@101dev.xyz" })).toHaveAttribute("href", /mailto:support@101dev\.xyz/);
});

test("preserves a valid inquiry when delivery is unavailable", async ({ page }) => {
  await page.goto("/?w=swiss#inquiry");
  await page.getByLabel("Name *").fill("Ada Lovelace");
  await page.getByLabel("Work email *").fill("ada@example.com");
  await page.getByLabel("What are you trying to decide, build, or launch? *").fill("We need to decide what the first release must prove before committing to the build.");
  await page.getByRole("button", { name: "SEND THE BRIEF" }).click();

  await expect(page.getByText(/temporarily unavailable|could not be delivered/)).toBeVisible();
  await expect(page.getByLabel("Name *")).toHaveValue("Ada Lovelace");
  await expect(page.getByLabel("Work email *")).toHaveValue("ada@example.com");
});
