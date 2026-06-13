import { test, expect } from '@playwright/test';

class BasePage {
  constructor(page) {
    this.page = page;   // Initialize the page object
  }

// navigation path
async goto(path = '/') {
    await this.page.goto(path);
    await this.closePopup();
  }

  async waitForPageReady() {
    await this.page.waitForLoadState('load');
  }

  async closePopup() {
    try {
      const closeBtn = this.page.locator('.popup-close, .close-btn').first();
      
      if (await closeBtn.isVisible({ timeout: 5000 })) {
        await closeBtn.click();
        logInfo('Popup dismissed');
      } else {
        logInfo('No popup to dismiss');
      }
    } catch (error) {
      logInfo(`No popup to dismiss (${error.message})`);
    }
  }

  async expectVisible(locator, options = {}) {
    await expect(locator).toBeVisible({ timeout: TIMEOUTS.default, ...options });
  }
}

module.exports = { BasePage, SELECTORS, TIMEOUTS };







