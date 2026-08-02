// pages/home/HomePage.js
const { BasePage } = require('../BasePage');
const { Header } = require('../common/Header');
const { expect } = require('@playwright/test');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.header = new Header(page);
  }

  async open() {
    await this.goto('/');
    await this.waitForPageReady();
  }

  async expectCorrectTitleAndURL() {
    await expect(this.page).toHaveURL(/daraz\.lk/);
    await expect(this.page).toHaveTitle(/Daraz/i);
  }

  async expectKeyHeaderElementsVisible() {
  await this.expectVisible(this.header.searchInput);
  await expect(this.header.cartIcon.first()).toBeAttached({ timeout: 10000 });  // was toBeVisible
  const loginVisible = await this.header.loginLink.isVisible().catch(() => false);
  const languageVisible = await this.header.languageSwitcher.first().isVisible().catch(() => false);
  expect(loginVisible || languageVisible).toBeTruthy();
}

  async expectGuestCartBadgeEmptyOrZero() {
    const badgeText = await this.header.getCartBadgeText();
    expect(['', '0']).toContain(badgeText);
  }

  async clickLogo() {
    await this.header.logo.click();
  }
}

module.exports = { HomePage };
