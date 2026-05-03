import { test, expect } from '@playwright/test';

test('1. navigate to the login page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  //confirm corect page and have correct url
  await expect(page).toHaveTitle(/Swag Labs/);
  await expect(page).toHaveURL(/saucedemo.com/);
  const loginLogo = page.locator('.login_logo');
  await expect(loginLogo).toBeVisible();
  await expect(loginLogo).toHaveText('Swag Labs');
});

test('2. should show error message with invalid password', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    
    //fill in wrong pass
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('asdasd');
    await page.locator('[data-test="login-button"]').click();

    const errorMessage = page.locator('[data-test="error"]');

    // Check error msg
    await expect(errorMessage).toBeVisible();
    
    //error msg
    await expect(errorMessage).toHaveText(/Epic sadface: Username and password do not match/);
  });


test('3. should login successfully with standard_user', async ({ page }) => {
  
  await page.goto('https://www.saucedemo.com/');

  //find field ,fillup and click login 
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  //check after login page
  const headerTitle = page.locator('.title');
  await expect(headerTitle).toHaveText('Products');
  await expect(page).toHaveURL(/inventory.html/);
});