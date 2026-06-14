import {expect } from '@playwright/test';
const {BasePage} = require('../../pages/BasePage');


class HomePage extends BasePage {
    constructor(page) {
        this.page = page;
        super(page);
        this.loginTrigger = page.locator(SELECTORS.loginTrigger);
    }

    async open(){
        await this.goto('/');
        await this.waitForPageReady();
    }

    async expectationHomePageLanded(){
        await expect(this.page).toHaveURL(/daraz\.lk/);
        await expect(this.page).toHaveTitle(/Daraz/i);
    }
}


module.exports = { HomePage };