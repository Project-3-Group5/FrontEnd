import { test, expect } from "@playwright/test";

test("user can log in/homepage", async ({ page }) => {
    await page.goto("http://localhost:5173/login");

    await page.getByPlaceholder("Username").fill("John Doe");
    await page.getByPlaceholder("Password").fill("password123");

   // await page.getByRole("button", { name: "Sign In" }).click();
    await page.locator(".sign").click();
    await expect(page).toHaveURL(/home/);
    await expect(page.getByText("SkillSwap")).toBeVisible();
});