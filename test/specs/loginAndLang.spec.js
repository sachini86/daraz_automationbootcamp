const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../pages/home/HomePage');
const { LoginPage } = require('../../pages/user/LoginPage');
const { SettingsPage } = require('../../pages/user/SettingsPage');
const users = require('../../data/user.json');

test.describe('Login Module @smoke @regression', () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test('TC-01 Successful login with valid credentials', async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);

    await home.open();
    await home.header.openLogin();
    await login.expectFieldsVisible();
    await login.login(users.valid.email, users.valid.password);

    await expect(home.header.loginLink).toBeHidden({ timeout: 10000 });
  });

  test('TC-02 Multi-language UI (English/Sinhala)', async ({ page }) => {
    const home = new HomePage(page);
    const settings = new SettingsPage(page);

    await home.open();
    await home.expectVisible(home.header.searchInput);
    await settings.switchToSinhala();
    await settings.expectLanguageIs('si');
  });

  test('TC-17 Switch language to Sinhala and back to English', async ({ page }) => {
    const home = new HomePage(page);
    const settings = new SettingsPage(page);

    await home.open();
    await settings.switchToSinhala();
    await settings.expectLanguageIs('si');

    await settings.switchToEnglish();
    await settings.expectLanguageIs('en');
  });
});