import { expect, test } from "@playwright/test";

test("visitor can open the car browsing flow", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Browse Cars" }).first().click();
  await expect(page.getByRole("heading", { name: "Available Cars" })).toBeVisible();
});
