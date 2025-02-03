import { test, expect, chromium } from '@playwright/test';
import { getSignInLink } from '../utils/mailosaur';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe.serial('Regression test suite', () => {
    let browser;
    let context;
    let page;
    let baseURL = process.env.BASE_URL || 'https://app.composio.dev';
    const mailosaurApiKey = process.env.MAILOSAUR_API_KEY;
    const mailosaurServerId = process.env.MAILOSAUR_SERVER_ID;
    const sentToEmail = process.env.USER_EMAIL;

  test('checking application login functionality', async ()=> {
    browser = await chromium.launch({ headless: process.env.HEADLESS === 'true' || false });
    context = await browser.newContext(); 
    page = await context.newPage();
    console.log(`Running test on ${baseURL}`);
    await page.goto(baseURL);
    await page.fill('input[type="email"]', sentToEmail);
    await page.click("//button[.='Continue with email']"); 
    const signInLink = await getSignInLink(mailosaurApiKey, mailosaurServerId, sentToEmail);
    await page.goto(signInLink);
    console.log('logging into the application...');
    await page.waitForLoadState("networkidle");
    expect(page.url()).toMatch(/\/dashboard/);
  });
});