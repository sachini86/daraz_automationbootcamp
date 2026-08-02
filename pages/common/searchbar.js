// pages/common/SearchBar.js
class SearchBar {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByRole('searchbox', { name: 'Search in Daraz' });
    this.searchButton = page.getByRole('link', { name: 'SEARCH' });
  }

  async typeKeyword(keyword) {
    await this.searchInput.click();
    await this.searchInput.fill(keyword); // fill() replaces content; confirmed by codegen, no concatenation
  }

  async searchAndSubmit(keyword) {
    await this.typeKeyword(keyword);
    await this.searchInput.press('Enter');
    await this.page.waitForURL(/[?&]q=/);
  }

  async isSuggestionListVisible() {
    // Suggestions are real links; check if at least one is visible
    return this.page.getByRole('link').filter({ hasText: /.+/ }).first().isVisible().catch(() => false);
  }

  async suggestionsContain(keyword) {
    const suggestionLinks = this.page.getByRole('link', { name: new RegExp(keyword, 'i') });
    return (await suggestionLinks.count()) > 0;
  }
}
module.exports = { SearchBar };