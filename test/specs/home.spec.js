// tests/specs/home.spec.js
const { test } = require('@playwright/test');
const { HomePage } = require('../../pages/home/HomePage');

test.describe('Homepage @smoke @regression', () => {
  let home;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.open();
  });

  test('TC-10 Homepage loads with correct title and URL', async () => {
    await home.expectCorrectTitleAndURL();
  });

  test('TC-11 Key header elements visible (search, login, cart, language)', async () => {
    await home.expectKeyHeaderElementsVisible();
  });

  test('TC-12 Guest cart badge is empty or zero', async () => {
    await home.expectGuestCartBadgeEmptyOrZero();
  });

  test('TC-13 Logo navigates back to homepage from catalog', async ({ page }) => {
    await home.header.searchFor('shoes');
    await page.waitForLoadState('load');
    await home.clickLogo();
    await home.expectCorrectTitleAndURL();
  });
});
