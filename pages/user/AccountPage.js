// pages/user/AccountPage.js
const { BasePage } = require('../BasePage');
const { Header } = require('../common/Header');
const { expect } = require('@playwright/test');

// AccountPage.js
class AccountPage {
  constructor(page) {
    this.page = page;
    this.accountMenu = page.getByTestId('account-menu'); // adjust to real locator
    this.logoutLink = page.getByRole('link', { name: /logout/i });
    this.loginCta = page.getByRole('link', { name: /login|sign in/i });
  }

  async logout() {
    // Fail fast with a clear message if session wasn't actually authenticated
    await expect(this.accountMenu).toBeVisible({ timeout: 10000 });
    await this.accountMenu.click();
    await this.logoutLink.click();
  }

  async expectGuestState() {
    await expect(this.loginCta).toBeVisible({ timeout: 10000 });
  }
}

module.exports = { AccountPage };
