const { test: setup } = require('@playwright/test');
const { HomePage } = require('../pages/home/HomePage');
const { LoginPage } = require('../pages/user/LoginPage');
const { logStep } = require('../utils/loggers');
const users = require('../data/user.json');

const STORAGE_STATE = 'test/.auth/user.json';

setup('authenticate once and save session', async ({ page }) => {
  const home = new HomePage(page);
  const login = new LoginPage(page);

  logStep('Opening homepage');
  await home.open();

  logStep('Opening login modal');
  await home.header.openLogin();

  logStep('Logging in with valid credentials');
  await login.login(users.valid.email, users.valid.password);

  await page.waitForTimeout(2000);
  await page.context().storageState({ path: STORAGE_STATE });
});