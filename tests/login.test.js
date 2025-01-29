import { test, expect, chromium } from '@playwright/test';
import { getSignInLink, authorize } from '../utils/googleAuth';
import * as dotenv from 'dotenv';

dotenv.config();
test.describe.serial('Login Test Suite', () => {
    let browser;
    let context;
    let page;
  test('should login successfully', async ()=> {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext(); 
    page = await context.newPage();
    await page.goto("https://app.composio.dev");
    // await page.fill('input[type="email"]', process.env.USER_EMAIL);
    // await page.click("//button[.='Continue with email']"); 
    // const client = await authorize();
    // const signInLink = await getSignInLink(client);
    // await page.goto(signInLink);
    // console.log('logging into the application...');
    // await page.waitForLoadState("networkidle");
    // expect(page.url()).toBe('https://app.composio.dev/dashboard'); 
  });

  // test('create github integration with OAuth2', async ()=>{
  //   await page.click('a[href="/apps"]');
  //   await page.fill('input[placeholder="Search apps"]', 'github');
  //   await page.click('a[href="/app/github"]');
  //   await page.click('//div[text()="Category"]/../following-sibling::div');
  //   await page.click('button:has-text("Create Integration")');
  //   console.log('Successfully created an github-integration with OAuth2.0');
  //   await page.waitForLoadState('networkidle');
  //   await page.click('//div[.="Connect an account"]/../following-sibling::button');
  //   await page.click("a[href='/integrations']");
  // })

  // test('create jira integration with API-key', async()=>{
  //   await page.click('a[href="/apps"]');
  //   await page.fill('input[placeholder="Search apps"]', 'jira');
  //   await page.click('a[href="/app/jira"]');
  //   await page.click('//div[text()="Category"]/../following-sibling::div');
  //   await page.click('button[value="API_KEY"]');
  //   await page.click('button:has-text("Create Integration")');
  //   console.log('Successfully created an jira-integration with API-key');
  //   await page.waitForLoadState('networkidle');
  //   await page.click('//div[.="Connect an account"]/../following-sibling::button');
  //   await page.click("a[href='/integrations']");
  // })

  // test('create trello integration with OAuth1', async()=>{
  //   await page.click('a[href="/apps"]');
  //   await page.fill('input[placeholder="Search apps"]', 'trello');
  //   await page.click('a[href="/app/trello"]');
  //   await page.click('//div[text()="Category"]/../following-sibling::div');
  //   await page.click('button[value="OAUTH1"]');
  //   await page.click('button:has-text("Create Integration")');
  //   console.log('Successfully created an trello-integration with OAuth1.0');
  //   await page.waitForLoadState('networkidle');
  //   await page.click('//div[.="Connect an account"]/../following-sibling::button');
  //   await page.click("a[href='/integrations']");
  // })

  // test('create slack integration for OAuth2 with Advanced options', async()=>{
  //   await page.click('a[href="/apps"]');
  //   await page.fill('input[placeholder="Search apps"]', 'slack');
  //   await page.click('a[href="/app/slack"]');
  //   await page.click('//div[text()="Category"]/../following-sibling::div');
  //   await page.click('button[value="OAUTH2"]');
  //   await page.click('button[role="switch"]');
  //   await page.fill('input[placeholder="Client id"]', 'slack-client-id');
  //   await page.fill('input[placeholder="Client secret"]', 'slack-client-secret');
  //   await page.fill('input[placeholder="Verification Token"]', 'slack-verification-token');
  //   await page.click('button:has-text("Create Integration")');
  //   console.log('Successfully created an slack-integration with OAuth2.0 with Advanced options');
  //   await page.waitForLoadState('networkidle');
  //   await page.click('//div[.="Connect an account"]/../following-sibling::button');
  //   await page.click("a[href='/integrations']");
  // })

  // test('create Discord integration with Bearer-token', async()=>{
  //   await page.click('a[href="/apps"]');
  //   await page.fill('input[placeholder="Search apps"]', 'discord');
  //   await page.click('a[href="/app/discord"]');
  //   await page.click('//div[text()="Category"]/../following-sibling::div');
  //   await page.click('button[value="BEARER_TOKEN"]');
  //   await page.click('button:has-text("Create Integration")');
  //   console.log('Successfully created an discord-integration with Bearer-Token');
  //   await page.waitForLoadState('networkidle');
  //   await page.click('//div[.="Connect an account"]/../following-sibling::button');
  //   await page.click("a[href='/integrations']");
  // })
});