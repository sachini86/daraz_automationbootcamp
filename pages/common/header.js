const { expect } = require('@playwright/test');


class Header {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Search in Daraz');
    this.loginLink = page.getByRole('link', { name: 'Login', exact: true });
    this.cartIcon = page.locator('a[href*="cart.daraz.lk"]').first();
    this.cartBadge = this.cartIcon;
    this.logo = page.getByAltText('Daraz Logo');
    this.languageSwitcher = page.getByText(/භාෂාව තෝරන්න|change language/i);
  }

  async searchFor(term) {
    await this.searchInput.fill(term);
    await this.searchInput.press('Enter');
  }

  async getSuggestions() {
    return this.page.locator('.search-suggestion-item, [role="option"]');
  }

  async openLogin() {
    await this.loginLink.click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async getCartBadgeText() {
    try {
      const text = (await this.cartBadge.textContent({ timeout: 3000 })) || '';
      const match = text.trim().match(/\d+/);
      return match ? match[0] : '';
    } catch {
      return '';
    }
  }

  async expectCartIconPresent() {
  await expect(this.cartIcon).toBeAttached({ timeout: 10000 });
}

// Header.js
async switchLanguage(optionText) {
  await this.languageSwitcher.click();
  await this.page.getByText(optionText, { exact: true }).click();
  await this.page.waitForLoadState('load').catch(() => {});
}
}

module.exports = { Header };