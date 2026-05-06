import { test, expect } from "@playwright/test";

test("skills", async ({ page }) => {
    await page.goto("http://localhost:5173/skills");

    await expect(page.getByRole("heading", { name: "Skills" })).toBeVisible();
});