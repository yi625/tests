import { Page, expect, Locator } from '@playwright/test';

export class ProductsPage {
    // 1. Declare the variable and its type
    readonly cartBadge: Locator;

    constructor(private page: Page) {
        this.cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');
    }

    async verifyPageLoaded() {
        await expect(this.page.locator('.title')).toHaveText('Products'); 
        await expect(this.page).toHaveURL(/inventory.html/); 
    }

    async addItemToCart(productName: string) {
        const selector = `[data-test="add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}"]`;
        await this.page.locator(selector).click();
    }

    async removeItemFromCart(productName: string) {
        const selector = `[data-test="remove-${productName.toLowerCase().replace(/\s+/g, '-')}"]`;
        await this.page.locator(selector).click();
    }

    async verifyCartCount(expectedCount: string) {
        if (expectedCount === '0') {
            // Checks the count is 0 didnt show any numbers
            await expect(this.cartBadge).toBeHidden();
        } else {
            await expect(this.cartBadge).toBeVisible();
            await expect(this.cartBadge).toHaveText(expectedCount);
        }
    }

    async openCart() {
        await this.page.locator('[data-test="shopping-cart-link"]').click();
    }
}