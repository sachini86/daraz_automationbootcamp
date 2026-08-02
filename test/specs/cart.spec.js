// tests/specs/cart.spec.js
const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../pages/home/HomePage');
const { SearchBar } = require('../../pages/common/SearchBar');
const { ProductListingPage } = require('../../pages/product/ProductListingPage');
const { ProductDetailsPage } = require('../../pages/product/ProductDetailsPage');
const { CartPage } = require('../../pages/cart/CartPage');
const products = require('../../data/products.json');
const { getCartBadgeExpectedCount } = require('../../utils/helpers');

// Cart flows require a logged-in session, saved once in tests/auth.setup.js
test.use({ storageState: 'test/.auth/user.json' });

test.describe('Cart Module @regression', () => {
  async function addProductToCart(page) {
    const home = new HomePage(page);
    const searchBar = new SearchBar(page);
    const listing = new ProductListingPage(page);
    const pdp = new ProductDetailsPage(page);

    await home.open();
    const beforeCount = await home.header.getCartBadgeText();

    await searchBar.searchAndSubmit(products.validSearchTerm);
    await listing.expectResultsDisplayed();
    await listing.openFirstProduct();
    await pdp.addToCart();

    return beforeCount;
  }

  test('TC-07 Add to cart and badge update', async ({ page }) => {
    const home = new HomePage(page);
    const beforeCount = await addProductToCart(page);

    const expectedCount = getCartBadgeExpectedCount(beforeCount, 1);
    await expect(home.header.cartBadge).toHaveText(expectedCount, { timeout: 10000 });
  });

  test('TC-08 Cart persistence after reload', async ({ page }) => {
    await addProductToCart(page);

    const cart = new CartPage(page);
    await cart.open();
    const countBefore = await cart.getItemCount();

    await cart.reload();
    const countAfter = await cart.getItemCount();
    expect(countAfter).toBe(countBefore);
  });

  test('TC-09 Remove item and badge update', async ({ page }) => {
    await addProductToCart(page);

    const cart = new CartPage(page);

    await cart.open();
    const countBefore = await cart.getItemCount();
    await cart.removeFirstItem();

    await expect(cart.itemCountText).toBeVisible({ timeout: 10000 });
    const countAfter = await cart.getItemCount();
    expect(countAfter).toBe(Math.max(countBefore - 1, 0));
  });

  test('TC-26 Cart badge increases after adding another product', async ({ page }) => {
    const home = new HomePage(page);

    await addProductToCart(page);
    const midCount = await home.header.getCartBadgeText();

    // add a second, different product
    const searchBar = new SearchBar(page);
    const listing = new ProductListingPage(page);
    const pdp = new ProductDetailsPage(page);

    await home.open();
    await searchBar.searchAndSubmit(products.secondSearchTerm);
    await listing.expectResultsDisplayed();
    await listing.openFirstProduct();
    await pdp.addToCart();

    const expectedCount = getCartBadgeExpectedCount(midCount, 1);
    await expect(home.header.cartBadge).toHaveText(expectedCount, { timeout: 10000 });
  });
});