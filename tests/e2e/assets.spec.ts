import { expect, test } from "@playwright/test";

test("keeps initial font transfer within its budget", async ({ page }) => {
  const fontResponses: Promise<number>[] = [];
  const fontUrls: string[] = [];
  page.on("response", (response) => {
    if (response.request().resourceType() !== "font") return;
    fontUrls.push(response.url());
    fontResponses.push(response.body().then((body) => body.byteLength));
  });

  await page.goto("/?w=swiss", { waitUntil: "networkidle" });
  const bytes = (await Promise.all(fontResponses)).reduce((total, size) => total + size, 0);

  expect(fontUrls).not.toEqual(expect.arrayContaining([expect.stringMatching(/fonts\.(googleapis|gstatic)\.com/)]));
  expect(fontUrls.length).toBeLessThanOrEqual(14);
  expect(bytes).toBeLessThanOrEqual(320 * 1024);
});
