import { test, expect } from '@playwright/test';

const {HomePage} = require('../../pages/home/HomePage');
const {LoginPage} = require('../../pages/user/LoginPage');
const user = require('../../data/user.json');

test("TC-01  -  Successful login with valid credentials", async ({ page }) => {
    let homePage = new HomePage(page);
    let loginPage = new LoginPage(page);

     const validUserData = user.valid;

    await homePage.open();
    await loginPage.login(validUserData.email, validUserData.password);
    await expect(loginPage.logginTrigger).toContainText(validUserData.displayName);

   

});