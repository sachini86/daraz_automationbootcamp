// tests/specs/auth.spec.js
const { test ,expect} = require('@playwright/test');
const { HomePage } = require('../../pages/home/HomePage');
const { LoginPage } = require('../../pages/user/LoginPage');
const { AccountPage } = require('../../pages/user/AccountPage');
const users = require('../../data/user.json');

test.describe('Authentication @regression', () => {
  test('TC-14 Login modal shows email and password fields', async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);

    await home.open();
    await home.header.openLogin();
    await login.expectFieldsVisible();
  });

  test('TC-15 Invalid credentials do not log user in', async ({ page }) => {
    const home = new HomePage(page);
    const login = new LoginPage(page);

    await home.open();
    await home.header.openLogin();
    await login.login(users.invalid.email, users.invalid.password);
    await login.expectLoginFailed();
  });

// auth.spec.js
test('TC-16 Logout returns user to guest state', async ({ page }) => {
  const home = new HomePage(page);
  const account = new AccountPage(page);

  await home.open();
  // Guard: confirm session loaded correctly before testing logout
  await expect(page.getByTestId('account-menu')).toBeVisible({ timeout: 10000 });

  await account.logout();
  await account.expectGuestState();
});
  
});
