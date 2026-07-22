import { test, expect } from '@playwright/test';

test.describe('Auth E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/login');
  });

  test('Full login flow, nav links, logout + re-block', async ({ page }) => {
    // Attempt to access protected route before login
    await page.goto('http://localhost:5173/home');
    // Should be redirected to login
    await expect(page).toHaveURL('http://localhost:5173/login');

    // Login with valid credentials
    await page.fill('input[placeholder="Enter your username"]', 'sa');
    await page.fill('input[placeholder="••••••••"]', '1234');
    await page.click('button[type="submit"]');

    // Should be redirected to dashboard/home
    await expect(page).toHaveURL('http://localhost:5173/home');

    // Check nav links are visible (assuming Tickets link exists)
    await expect(page.locator('text=Tickets')).toBeVisible();

    // Navigate to Tickets page
    await page.click('text=Tickets');
    await expect(page).toHaveURL('http://localhost:5173/tickets');

    // Logout
    await page.click('button:has-text("Logout")');

    // Should be redirected to login
    await expect(page).toHaveURL('http://localhost:5173/login');

    // Try to go back to protected route, should be re-blocked
    await page.goto('http://localhost:5173/home');
    await expect(page).toHaveURL('http://localhost:5173/login');
  });

  test('bad credentials error', async ({ page }) => {
    await page.fill('input[placeholder="Enter your username"]', 'sa');
    await page.fill('input[placeholder="••••••••"]', 'wrongpassword');
    await page.click('button[type="submit"]');

    // Expect an error message
    await expect(page.locator('text=Invalid username or password')).toBeVisible();
    await expect(page).toHaveURL('http://localhost:5173/login');
  });
});
