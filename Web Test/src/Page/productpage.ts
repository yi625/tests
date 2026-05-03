import { Page, expect } from '@playwright/test';

export class ProductsPage {
    constructor(private page: Page) {}

    // Stable selector for the cart badge 
    readonly cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');

    async verifyPageLoaded() {
        await expect(this.page.locator('.title')).toHaveText('Products'); 
        await expect(this.page).toHaveURL(/inventory.html/); 
    }

    async addItemToCart(productName: string) {
        const selector = `[data-test="add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}"]`;
        await this.page.locator(selector).click();
    }

    async verifyCartCount(expectedCount: string) {
    if (expectedCount === '0') {
        await expect(this.cartBadge).toBeHidden();
    } else {
        await expect(this.cartBadge).toBeVisible();
        await expect(this.cartBadge).toHaveText(expectedCount);
    }
    }

    async removeItemFromCart(productName: string) {
        const selector = `[data-test="remove-${productName.toLowerCase().replace(/\s+/g, '-')}"]`;
        await this.page.locator(selector).click();
    }

    async openCart() {
        await this.page.locator('[data-test="shopping-cart-link"]').click();
    }
}