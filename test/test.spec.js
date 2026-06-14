// @ts-check
import { test, expect } from '@playwright/test';

test('daraz homepage title', async ({ page }) => {
  await page.goto('https://www.daraz.lk');

  await expect(page).toHaveTitle(/Daraz/i);

  page.pause(); // this opens the Inspector when run with --debug
});

test('daraz search bar visible', async ({ page }) => {
  await page.goto('https://www.daraz.lk');

  await expect(page.getByPlaceholder(/search/i)).toBeVisible();
});