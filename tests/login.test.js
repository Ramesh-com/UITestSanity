const { test, expect} = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const HomePage = require('../pages/HomePage');
const { authorize, getSignInLink } = require('../utils/googleAuth');
const { launchBrowser } = require('../utils/browserSingleton');


require('dotenv').config();
let page;
let homePage;
test.describe.configure({ mode: 'serial' });

// test.beforeAll("Lauch the empty Browser", async()=>{
//     await launchBrowser()
// })
async function performLogin() {
    page = await launchBrowser();
    const currentSize = page.viewportSize();
    await page.setViewportSize({ width: currentSize.width, height: currentSize.height });

    const APP_URL = "https://app.composio.dev";
    
    await page.goto(APP_URL);
    const loginPage = new LoginPage(page);
    await loginPage.enterUserMailAddress(process.env.USER_EMAIL);
    await loginPage.clickSendLogInLinkButton();
    
    await page.waitForLoadState('load');
    await page.waitForTimeout(5000);
    const client = await authorize();
    const signInLink = await getSignInLink(client);
    await page.goto(signInLink);
    
    return page;
}

test.beforeAll("Application-successfull-login-test", async () => {
    page = await performLogin();
    homePage = new HomePage(page);
})

test('login-test', async()=>{
    console.log('login was successful...');
    
})