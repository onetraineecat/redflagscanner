import { test, expect } from "@playwright/test";

test.describe("Legal Red Flag Scanner E2E", () => {
  test("should load app, upload demo PDF, show risks, and highlight on click", async ({
    page,
  }) => {
    // Navigate to app
    await page.goto("/");

    // Verify page loads
    await expect(page.locator("h1")).toContainText("Legal Red Flag Scanner");

    // Click "Load Demo Contract" button
    await page.click('button:has-text("Load Demo Contract")');

    // Wait for analysis to complete (look for risk list or summary)
    await page.waitForSelector('text=Human Summary', { timeout: 30000 });

    // Verify risks are displayed
    const riskPanel = page.locator('text=/Risks & Suggestions/i');
    await expect(riskPanel).toBeVisible();

    // Wait for risk cards to appear
    await page.waitForSelector('[class*="border-l-4"]', { timeout: 10000 });

    // Get first risk card and click it
    const firstRisk = page.locator('[class*="border-l-4"]').first();
    await expect(firstRisk).toBeVisible();
    await firstRisk.click();

    // Wait a bit for highlighting to occur
    await page.waitForTimeout(500);

    // Verify PDF viewer is present and page changed (check for page number or highlight)
    const pdfViewer = page.locator('[class*="react-pdf"]');
    await expect(pdfViewer.first()).toBeVisible({ timeout: 5000 });

    // Check for highlight element (either .pdf-highlight or .pdf-highlight-fallback)
    const highlight = page.locator(".pdf-highlight, .pdf-highlight-fallback").first();
    
    // Highlight may not always succeed, so we check for either highlight or fallback label
    const hasHighlight = (await highlight.count()) > 0;
    const hasFallbackLabel = (await page.locator('text=Highlight fallback used').count()) > 0;
    
    expect(hasHighlight || hasFallbackLabel).toBe(true);
  });
});
