import { Page, expect } from '@playwright/test';

export class LoginPage {
    constructor(private page: Page) {}

    async navigate() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(user: string, pass: string) {
        await this.page.locator('[data-test="username"]').fill(user);
        await this.page.locator('[data-test="password"]').fill(pass);
        await this.page.locator('[data-test="login-button"]').click();
    }

  //verify eror msg with regex
    async verifyErrorMessage(expectedText: string) {
        const errorContainer = this.page.locator('[data-test="error"]');
        await expect(errorContainer).toBeVisible();
        await expect(errorContainer).toHaveText(new RegExp(expectedText));
    }
}