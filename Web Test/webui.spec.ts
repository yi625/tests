import { test } from '@playwright/test';
import { LoginPage } from '../Web Test/src/page/loginpage';
import { ProductsPage } from '../Web Test/src/page/productpage';
import { CheckoutPage } from '../Web Test/src/page/checkpage';


test('1. verify login error', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('standard_user', 'asd123');
    await loginPage.verifyErrorMessage('Username and password do not match');
});

test('2. Verify cart count', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');

    //add 2 item
    await productsPage.addItemToCart('Sauce Labs Backpack');
    await productsPage.addItemToCart('Sauce Labs Bike Light');
    await productsPage.verifyCartCount('2');

    //remove
    await productsPage.removeItemFromCart('Sauce Labs Bike Light');
    await productsPage.verifyCartCount('1');

    await productsPage.removeItemFromCart('Sauce Labs Backpack');
    await productsPage.verifyCartCount('0');
});

test('3. Completethe purchase', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user', 'secret_sauce');
    
    await productsPage.verifyPageLoaded();
    await productsPage.addItemToCart('Sauce Labs Backpack');
    await productsPage.openCart();

    await checkoutPage.verifyItemInCart('Sauce Labs Backpack');
    await checkoutPage.checkout('AAA', 'BBB', '12345');
    await checkoutPage.verifySuccess();
});