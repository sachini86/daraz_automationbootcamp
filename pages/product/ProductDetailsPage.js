// pages/product/ProductDetailsPage.js
const { BasePage } = require('../BasePage');
const { expect } = require('@playwright/test');

class ProductDetailsPage extends BasePage {
  constructor(page) {
    super(page);
    this.addToCartBtn = page.getByRole('button', { name: 'Add to Cart' });
    this.buyNowBtn = page.getByRole('button', { name: 'Buy Now' });
    this.priceLabel = page.getByTestId('price').or(page.locator('.pdp-price'));
    this.addToCartConfirmation = page.getByText('Added to cart successfully!');
  }

  async expectURLIsProductPage() {
    await expect(this.page).toHaveURL(/\/products\//);
  }

  async expectAddToCartVisible() {
    await this.expectVisible(this.addToCartBtn);
  }

  async expectBuyNowVisible() {
    await this.expectVisible(this.buyNowBtn);
  }

  async addToCart() {
    await this.addToCartBtn.click();
    await expect(this.addToCartConfirmation).toBeVisible({ timeout: 10000 });
  }
}

module.exports = { ProductDetailsPage };
