// tests/specs/search.spec.js
const { test , expect} = require('@playwright/test');
const { HomePage } = require('../../pages/home/HomePage');
const { SearchBar } = require('../../pages/common/SearchBar');
const { ProductListingPage } = require('../../pages/product/ProductListingPage');
const products = require('../../data/products.json');

test.describe('Search Module @smoke @regression', () => {
  let home, searchBar, listing;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    searchBar = new SearchBar(page);
    listing = new ProductListingPage(page);
    await home.open();
  });

  test('TC-03 Product search by keyword', async () => {
    await searchBar.searchAndSubmit(products.validSearchTerm);
    await listing.expectResultsDisplayed();
  });

  test('TC-04 Search auto-suggestion visibility', async () => {
    await searchBar.typeKeyword(products.validSearchTerm);
    await expect(await searchBar.isSuggestionListVisible()).toBeTruthy();
  });

  test('TC-05 Price range filter (Min/Max)', async () => {
    await searchBar.searchAndSubmit(products.validSearchTerm);
    await listing.expectResultsDisplayed();
    await listing.filterByPriceRange(products.priceFilter.min, products.priceFilter.max);
    await listing.expectResultsDisplayed();
  });

  test('TC-06 Brand filter on search results', async () => {
    await searchBar.searchAndSubmit(products.validSearchTerm);
    await listing.expectResultsDisplayed();
    await listing.filterByBrand(products.brandFilter);
    await listing.expectResultsDisplayed();
  });

  test('TC-18 Search URL contains query parameter', async ({ page }) => {
    await searchBar.searchAndSubmit(products.validSearchTerm);
    await expect(page).toHaveURL(/[?&]q=/);
  });

  test('TC-19 Search results display product listing items', async () => {
    await searchBar.searchAndSubmit(products.validSearchTerm);
    const count = await listing.productCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('TC-20 Invalid search shows zero results', async () => {
    await searchBar.searchAndSubmit(products.invalidSearchTerm);
    await listing.expectZeroResults();
  });

  test('TC-21 Suggestion list includes typed keyword', async () => {
    await searchBar.typeKeyword(products.validSearchTerm);
    expect(await searchBar.suggestionsContain(products.validSearchTerm)).toBeTruthy();
  });

  test('TC-22 Run consecutive searches with different keywords', async () => {
    await searchBar.searchAndSubmit(products.validSearchTerm);
    await listing.expectResultsDisplayed();

    await searchBar.searchAndSubmit(products.secondSearchTerm);
    await listing.expectResultsDisplayed();
  });
});
