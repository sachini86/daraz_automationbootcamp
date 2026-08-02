const { BasePage } = require('../BasePage');
const { Header } = require('../common/Header');
const { expect } = require('@playwright/test');

class SettingsPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = new Header(page);
  }

  async switchToSinhala() {
    await this.header.switchLanguage('SI / Sinhala');
  }

  async switchToEnglish() {
    await this.header.switchLanguage('EN / English');
  }

  async expectLanguageIs(lang) {
    const heading = this.page.getByRole('heading', { level: 1 });
    if (lang === 'si') {
      await expect(heading).toContainText('ලංකාවේ');
    } else {
      await expect(heading).toContainText('Sri Lanka');
    }
  }
}

module.exports = { SettingsPage };


