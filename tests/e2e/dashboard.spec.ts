import { expect, test } from "@playwright/test";

test.describe("Dashboard Page - Smoke Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
  });

  test("page loads successfully", async ({ page }) => {
    await expect(page).toHaveTitle(/Zieglers/i);
    await expect(page.locator("h1")).toContainText("Dashboard");
  });

  test("renders summary cards", async ({ page }) => {
    await expect(page.getByText("Total Boards")).toBeVisible();
    await expect(page.getByText("Completed Tasks")).toBeVisible();
    await expect(page.getByText("Active Goals")).toBeVisible();
    await expect(page.getByText("Overall Progress")).toBeVisible();
  });

  test("renders chart section", async ({ page }) => {
    await expect(page.getByText("Your Progress Journey")).toBeVisible();
    await expect(page.getByText("Goal Progress")).toBeVisible();
    await expect(page.getByText("Status Distribution")).toBeVisible();
  });

  test("renders board cards", async ({ page }) => {
    await expect(page.getByText("Your Boards")).toBeVisible();
    await expect(page.getByText("2025 Career Goals")).toBeVisible();
    await expect(page.getByText("Health & Fitness")).toBeVisible();
    await expect(page.getByText("Learning Japanese")).toBeVisible();
    await expect(page.getByText("Create New Board")).toBeVisible();
  });

  test("sidebar is present with navigation", async ({ page }) => {
    const sidebar = page.locator('[data-slot="sidebar"]');
    await expect(sidebar).toBeVisible();
    await expect(page.getByText("Zieglers")).toBeVisible();
    await expect(page.getByRole("link", { name: "Dashboard" })).toBeVisible();
    await expect(page.getByRole("link", { name: "My Boards" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Popular" })).toBeVisible();
  });
});
