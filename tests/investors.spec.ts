import { test, expect } from "@playwright/test";
import { CommitmentsFixture, InvestorsFixture } from "./fixtures/investors";

test.describe("Investors", () => {
  test("index page shows list of all investors", async ({ page }) => {
    await page.route("**/api/investors", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(InvestorsFixture),
      });
    });

    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    await expect(page.locator("#__investors-title")).toBeVisible();
    await expect(page.locator("#__investor-row")).toHaveCount(4);
  });

  test("can navigate from investor list to investor page", async ({ page }) => {
    await page.route("**/api/investors", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(InvestorsFixture),
      });
    });

    await page.goto("http://localhost:3000");
    await page.waitForLoadState("networkidle");

    await expect(page.locator("#__investors-title")).toBeVisible();
    await expect(page.locator("#__investor-row")).toHaveCount(4);

    await page.route("**/api/investor/commitment/*/*", (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify(CommitmentsFixture),
      });
    });

    await page.locator("#__investor-id-link").nth(0).click();
    await page.waitForLoadState("networkidle");
    await page.waitForURL("http://localhost:3000/investors/2670");
    await page.waitForTimeout(200); // Needed for chromium to pass

    await expect(page.locator("#__investor-2670-title")).toBeVisible();
    await expect(page.locator("#__commitment-row")).toHaveCount(16);
  });
});
