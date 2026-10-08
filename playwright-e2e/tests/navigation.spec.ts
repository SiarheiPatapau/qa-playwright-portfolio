import { test, expect } from "@playwright/test";

test("url ends with /docs/intro", async ({ page }) => {
  await page.goto("https://playwright.dev");
  await page.getByRole("link", { name: "Get started" }).click();
  await expect(page).toHaveURL(/\/docs\/intro\/?$/);
});
