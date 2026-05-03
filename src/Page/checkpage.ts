import { Page, expect } from '@playwright/test';

export class CheckoutPage {
    constructor(private page: Page) {}

    async verifyItemInCart(itemName: string) {
        await expect(this.page.locator('[data-test="inventory-item-name"]')).toHaveText(itemName);
    }

    async checkout(first: string, last: string, zip: string) {
        await this.page.locator('[data-test="checkout"]').click();
        await this.page.locator('[data-test="firstName"]').fill(first);
        await this.page.locator('[data-test="lastName"]').fill(last);
        await this.page.locator('[data-test="postalCode"]').fill(zip);
        await this.page.locator('[data-test="continue"]').click();
        await this.page.locator('[data-test="finish"]').click();
    }

    async verifySuccess() {
        const message = this.page.locator('[data-test="complete-header"]');
        await expect(message).toHaveText('Thank you for your order!');
    }
}