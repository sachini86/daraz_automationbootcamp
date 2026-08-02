// pages/BasePage.js
const { expect } = require('@playwright/test');
const { TIMEOUTS } = require('../common/constants');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path);
    await this.page.waitForLoadState('networkidle').catch(() => {});
    await this.closePopup();
  }

  async waitForPageReady() {
    await this.page.waitForLoadState('load');
  }

  // Daraz often shows a promo/app-download popup on first load.
  // We try to close it, but never fail the test if it isn't there.
  async closePopup() {
    try {
      const closeBtn = this.page.locator('.popup-close, .close-btn, [aria-label="Close"]').first();
      if (await closeBtn.isVisible({ timeout: 5000 })) {
        await closeBtn.click();
      }
    } catch {
      // No popup to dismiss - safe to ignore
    }
  }

  async expectVisible(locator, options = {}) {
    await expect(locator).toBeVisible({ timeout: TIMEOUTS.default, ...options });
  }

  async expectURLContains(pattern) {
    await expect(this.page).toHaveURL(pattern);
  }
}

module.exports = { BasePage };
