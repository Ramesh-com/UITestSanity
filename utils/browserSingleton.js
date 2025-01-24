const { get } = require('http');
const { chromium } = require('playwright');

let browser;
let context;
let page;// Shared browser instance

async function getBrowser() {
    if (!browser) {
      const isHeadless = process.env.HEADLESS === 'true'; // Check the HEADLESS environment variable
      browser = await chromium.launch({ headless: isHeadless }); // Launch the browser based on HEADLESS value
    }
    return browser;
  }
  
  async function launchBrowser() {
    browser = await getBrowser(); // Ensure a single browser instance is reused
    context = await browser.newContext(); // Create a new browser context
    page = await context.newPage(); // Create a new page
    return page; // Return the page instance to interact with
  }

  async function getCurrentContext() {
    return context;
  }


async function closeBrowser() {
  if (browser) {
    await browser.close();
    browser = null;
  }
}

module.exports = { getBrowser, closeBrowser, launchBrowser, getCurrentContext };