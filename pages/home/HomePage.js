class HomePage {
    constructor(page) {
        this.page = page;
        this.loginTrigger = page.locator(SELECTORS.loginTrigger);
    }
}








module.exports = { HomePage };