// tests/specs/product.spec.js
const { test } = require('@playwright/test');
const { HomePage } = require('../../pages/home/HomePage');
const { SearchBar } = require('../../pages/common/SearchBar');
const { ProductListingPage } = require('../../pages/product/ProductListingPage');
const { ProductDetailsPage } = require('../../pages/product/ProductDetailsPage');
const products = require('../../data/products.json');

test.describe('Product Details @regression', () => {
  test.beforeEach(async ({ page }) => {
    const home = new HomePage(page);
    const searchBar = new SearchBar(page);
    const listing = new ProductListingPage(page);

    await home.open();
    await searchBar.searchAndSubmit(products.validSearchTerm);
    await listing.expectResultsDisplayed();
    await listing.openFirstProduct();
  });

  test('TC-23 Product page shows Add to Cart button', async ({ page }) => {
    const pdp = new ProductDetailsPage(page);
    await pdp.expectAddToCartVisible();
  });

  test('TC-24 Navigating to product updates URL to /products/', async ({ page }) => {
    const pdp = new ProductDetailsPage(page);
    await pdp.expectURLIsProductPage();
  });

  test('TC-25 Product page shows Buy Now button', async ({ page }) => {
    const pdp = new ProductDetailsPage(page);
    await pdp.expectBuyNowVisible();
  });
});
