import { test, expect, chromium } from '@playwright/test';
import { getSignInLink, authorize } from '../utils/googleAuth';
import * as dotenv from 'dotenv';
import { timeout } from '../playwright.config';

dotenv.config();
test.describe.serial('Login Test Suite', () => {
    let browser;
    let context;
    let page;
  test('should login successfully', async ()=> {
    browser = await chromium.launch({ headless: true });
    context = await browser.newContext(); 
    page = await context.newPage();
    await page.goto("https://app.composio.dev");
    await page.fill('input[type="email"]', process.env.USER_EMAIL);
    await page.click("//button[.='Continue with email']"); 
    const client = await authorize();
    const signInLink = await getSignInLink(client);
    await page.goto(signInLink);
    await page.waitForLoadState("networkidle");
    expect(page.url()).toContain('https://app.composio.dev/dashboard'); 
  });

  test('create github integration', async ()=>{
    await page.click('a[href="/apps"]');
    await page.fill('input[placeholder="Search apps"]', 'github');
    await page.click('a[href="/app/github"]');
    await page.click('//div[text()="Category"]/../following-sibling::div');
    await page.click('button:has-text("Create Integration")');
  })
});
