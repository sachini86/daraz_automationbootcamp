const { BasePage } = require('../BasePage');
const { expect } = require('@playwright/test');

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.errorBanner = page.getByText("We're Sorry, an error has occurred");
    this.itemCountText = page.getByText(/Select All \(\d+ item/);

    // NOTE: site reuses id="shop-title-wrap" per seller group (invalid HTML,
    // but real). .first() targets the first seller's select-all checkbox.
    this.firstItemCheckbox = page.locator('#shop-title-wrap').getByLabel('').first();
    this.deleteBtn = page.getByText('Delete', { exact: true });
    this.confirmRemoveBtn = page.getByRole('button', { name: 'REMOVE' });
    this.continueShoppingBtn = page.getByRole('button', { name: 'CONTINUE SHOPPING' });
  }

  async open() {
    await this.page.goto('https://cart.daraz.lk/cart', { waitUntil: 'domcontentloaded' });

    if (await this.errorBanner.isVisible().catch(() => false)) {
      throw new Error(
        'Cart page returned an error page — check session/subdomain auth for cart.daraz.lk'
      );
    }

    await expect(this.itemCountText).toBeVisible({ timeout: 10000 });
  }

  async reload() {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
    await expect(this.itemCountText).toBeVisible({ timeout: 15000 });
  }

  async getItemCount() {
    const text = (await this.itemCountText.textContent()) || '';
    const match = text.match(/\((\d+) item/);
    return match ? parseInt(match[1], 10) : 0;
  }

  async removeFirstItem() {
    await this.firstItemCheckbox.click();
    await expect(this.firstItemCheckbox).toBeChecked({ timeout: 5000 });
    await this.deleteBtn.click();
    await this.confirmRemoveBtn.click();
    await this.continueShoppingBtn.click({ timeout: 5000 }).catch(() => {});
  }
}

module.exports = { CartPage };