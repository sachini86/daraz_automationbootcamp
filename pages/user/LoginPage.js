import { test, expect } from '@playwright/test';


class LoginPage {
    constructor(page) {
        this.page = page;
        this.logginTrigger = page.getByRole('link', { name: 'Login' })
        this.emailInput = page.locator('input[type="text"]');
        this.passwordInput = page.getByRole('textbox', { name: 'Please enter your password' });
        this.loginbtn  = page.getByRole('button', { name: 'LOGIN' });
    
    }
async openLoginModal(){
    await this.logginTrigger.click();
}

 async submitCredentials(email, password) {
    await this.openLoginModal();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }


}








module.exports = { LoginPage };