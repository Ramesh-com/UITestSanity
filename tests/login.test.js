import { test, expect, chromium } from '@playwright/test';
import { getSignInLink, authorize } from '../utils/googleAuth';
import * as dotenv from 'dotenv';

dotenv.config();
test.describe.serial('Regression test suite', () => {
    let browser;
    let context;
    let page;
  test('checking application login functionality', async ()=> {
    browser = await chromium.launch({ headless: true });
    context = await browser.newContext(); 
    page = await context.newPage();
    await page.goto('/');
    await page.fill('input[type="email"]', process.env.USER_EMAIL);
    await page.click("//button[.='Continue with email']"); 
    const client = await authorize();
    const signInLink = await getSignInLink(client);
    await page.goto(signInLink);
    console.log('logging into the application...');
    await page.waitForLoadState("networkidle");
    expect(page.url()).toMatch(/\/dashboard/);
  });
});