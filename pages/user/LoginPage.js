const { BasePage } = require('../BasePage');
const { expect } = require('@playwright/test');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.emailInput = page.getByPlaceholder('Please enter your Phone or Email');
    this.passwordInput = page.getByPlaceholder('Please enter your password');
    this.submitBtn = page.getByRole('button', { name: 'LOGIN' });
    this.errorMessage = page.getByText(/incorrect|invalid|does not exist/i);
  }

  async expectFieldsVisible() {
    await this.expectVisible(this.emailInput);
    await this.expectVisible(this.passwordInput);
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitBtn.click();
  }

  async expectLoginFailed() {
    await expect(this.errorMessage).toBeVisible({ timeout: 10000 });
  }
}

module.exports = { LoginPage };