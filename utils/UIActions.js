// const LoginPage  = require('../pages/LoginPage');
const { getSignInLink, authorize } = require("./googleAuth");
const { chromium } = require('@playwright/test');
const { launchBrowser } = require('./browserSingleton');

   async function clickButton(page, locator) {
        try {
            await page.waitForSelector(locator, { state: 'visible' });
            await page.click(locator);
        } catch (error) {
            console.error(`Failed to click on the element with locator: ${locator}`, error);
            throw error;
        }
    }

    async function fillTextField(page, locator, text) {
        try {
            await page.waitForSelector(locator, { state: 'visible' });
            await page.fill(locator, text);
        } catch (error) {
            console.error(`Failed to fill the text field with locator: ${locator}`, error);
            throw error;
        }
    }

    async function waitForPageLoad(page) {
        try {
            await page.waitForLoadState('load');
        } catch (error) {
            console.error('Failed to wait for the page to load.', error);
            throw error;
        }
    }

    async function handleDialogAlert(page, my_input) {
        await page.on('dialog', async dialog => {
            if (dialog.type() === 'prompt') {
            await dialog.accept(my_input); 
            } else {
            await dialog.accept();
            }
        })
    }

    async function uploadFile(page, locator, filePath){
        try {
            await page.waitForSelector(locator);
            await page.setInputFiles(locator, filePath);
        } catch (error) {
            console.error(`Failed to upload file at locator: ${locator}`, error);
            throw error;
        }
    }

    async function waitForPopupToBeVisible(page, locator){
        try {
            await page.waitForSelector(locator, { state: 'visible', timeout: 30000 });
        } catch (error) {
            console.error(`Failed to wait for popup with locator: ${locator}`, error);
            throw error;
        }
    }

    async function getTextFromElement(page, locator){
        try {
            await page.waitForTimeout(1000);
            await page.waitForSelector(locator);
            return await page.textContent(locator);
        } catch (error) {
            console.error(`Failed to get text from element with locator: ${locator}`, error);
            throw error;
        }
    }    

    // async function performLogin() {
    //     const page = await launchBrowser();
    //     const APP_URL = "https://app.composio.dev";
        
    //     await page.goto(APP_URL);
    //     const loginPage = new LoginPage(page);
    //     await loginPage.enterUserMailAddress(process.env.USER_EMAIL);
    //     await loginPage.clickSendLogInLinkButton();
        
    //     await page.waitForLoadState('load');
    //     const client = await authorize();
    //     const signInLink = await getSignInLink(client);
    //     await page.goto(signInLink);
        
    //     return page;
    // }

    async function isElementVisible(page, locator) {
        try {
            const element = await page.$(locator);
            if (!element) {
                return false;
            }
            return await element.isVisible();
        } catch (error) {
            console.error(`Failed to check visibility of element with locator: ${locator}`, error);
            return false;
        }
    }

    async function selectElementByName(page, elementName, locator) {
    try {
        locator = locator.replace('elementName', elementName);
        await page.waitForSelector(locator);
        await page.click(locator);
    } catch (error) {
        console.error(`Failed to select element by name: ${elementName}`, error);
        throw error;
    }
    }

    async function handleNewTab(context, page, locator) {
        const [newPage] = await Promise.all([
            context.waitForEvent('page', { timeout: 3000 }),
            page.click(locator) // Click the button that opens the new tab
          ]);
        await page.waitForTimeout(5000);
        await newPage.waitForTimeout(3000);
        await newPage.waitForLoadState();
        return newPage;
    }
    
module.exports = { launchBrowser, handleNewTab, waitForPageLoad, fillTextField, clickButton, handleDialogAlert, uploadFile, waitForPopupToBeVisible, getTextFromElement, isElementVisible, selectElementByName }