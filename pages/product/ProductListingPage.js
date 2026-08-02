// pages/product/ProductListingPage.js
const { expect } = require('@playwright/test');
const { BasePage } = require('../BasePage');

class ProductListingPage extends BasePage {
  constructor(page) {
    super(page);
    // Product cards are <a href="/products/...html"> links; price text is a
    // sibling, not nested inside the link, so filter on href, not text.
    // .filter({ has: img }) dedupes the image-link + title-link pair per card.
    this.productCards = page.locator('a[href*="/products/"]').filter({ has: page.locator('img') });

    this.minPriceInput = page.getByPlaceholder('Min');
    this.maxPriceInput = page.getByPlaceholder('Max');
    this.applyPriceBtn = page.getByRole('button').nth(2); // consider a stable name/test-id if available

    this.brandCheckbox = (brand) => page.getByRole('checkbox', { name: brand, exact: true });
    this.noResultsMessage = page.getByText(/no results|not found/i);
  }

  async expectURLHasQueryParam(keyword) {
    await expect(this.page).toHaveURL(new RegExp(`q=.*${encodeURIComponent(keyword).replace(/%20/g, '.*')}`, 'i'))
      .catch(async () => {
        await expect(this.page).toHaveURL(new RegExp(keyword.split(' ')[0], 'i'));
      });
  }

  async expectResultsDisplayed() {
    await expect(this.productCards.first()).toBeVisible({ timeout: 15000 });
  }

  async expectZeroResults() {
    const count = await this.productCards.count();
    expect(count).toBe(0);
  }

  async filterByPriceRange(min, max) {
    await this.minPriceInput.fill(min);
    await this.maxPriceInput.fill(max);
    await this.applyPriceBtn.click();
  }

  async filterByBrand(brand) {
    await this.brandCheckbox(brand).check();
  }

  async getFirstProductCard() {
    return this.productCards.first();
  }

  async filterCardsByText(text) {
    return this.productCards.filter({ hasText: text });
  }

  async openFirstProduct() {
    await this.productCards.first().click();
  }
}

module.exports = { ProductListingPage };