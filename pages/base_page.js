import { $, browser } from '@wdio/globals';
import fs from 'fs';
import os from 'os';
import path from 'path';
import ReporterUtil from '../utils/reporterUtil';
import allureReporter from '@wdio/allure-reporter';
import { 
    msg_click_element, 
    msg_verify_element, 
    msg_fill_data, 
    exception_error_click_element, 
    exception_error_verify_element, 
    exception_error_fill_data,
    msg_visible_element,
    exception_error_visible_element
} from '../utils/messagesUtil';

class BasePage {
    // Define locators for the page elements
    get lnkLogout() {
        return '#logout'; // Return the selector as a string
    }

    // Method to click on Logout
    async clickLogout() { 
            await this.clickElement(this.lnkLogout); // Use the string selector
    }

    async expectTextNotToBeVisible(text) {
        try {
            // Check if the text is present in the body of the page
            const bodyText = await $('body').getText();
            const isTextVisible = bodyText.includes(text);

            // Assert that the text is not visible
            await expect(isTextVisible).toBe(false);
            // ReporterUtil.report(`Text "${text}" is correctly not visible on the page.`, "info");
            // ReporterUtil.report(msg_verify_element(selector), "info", suiteName, testName);
        } catch (error) {
            ReporterUtil.report(exception_error_verify_element(selector, error), "error", suiteName, testName);
            throw error; // Rethrow the error after reporting
        }
    }

    // Method to verify if an element is visible
    async isElementVisible(selector) {
        try {
            const el = await $(selector);
            await el.waitForDisplayed({ timeout: 5000 });
            
            await el.isDisplayed();

            ReporterUtil.report(msg_verify_element(selector), "info", suiteName, testName);
            //await browser.pause(1000)
        } catch (error) {
            ReporterUtil.report(exception_error_verify_element(selector, error), "error", suiteName, testName);
            return false;
        }
    }

    // Method to check if an element exists
    async isElementExist(selector) {
        try {
            const el = await $(selector);

            const isVisible = await el.isDisplayed();

            // Use the message in your reporting
            ReporterUtil.report(msg_visible_element(selector), "info", suiteName, testName);
            return isVisible;
            
        } catch (error) {
            ReporterUtil.report(exception_error_visible_element(selector, error), "error", suiteName, testName);
            return false;
        }
    }

     // Method to click on an element with existence check and error handling
     async clickElement(selector) {

        try {
            const el = await $(selector);

            // Wait until the element is displayed
            await browser.waitUntil(async () => {
                return await el.isDisplayed(); // Check if the element is displayed
            }, { timeout: 10000, timeoutMsg: `Element ${selector} not displayed within 10 seconds` });

            if (await el.isExisting()) {
                await el.click();

                ReporterUtil.report(msg_click_element(selector), "info", suiteName, testName);
            }
        } catch (error) {
            // Log the error and capture a screenshot
            ReporterUtil.report(exception_error_click_element(selector, error), "error", suiteName, testName);
            throw error;
        }
    }

   // Method to fill data into an input field
   async fillData(selector, value) {
    try {
        if (await this.isElementExist(selector)) {
            const el = await $(selector);
            await el.setValue(value);

            // Log success and capture a screenshot
            ReporterUtil.report(msg_fill_data(selector), "info", suiteName, testName);
        } else {
            throw new Error(`Element ${selector} does not exist.`);
        }
    } catch (error) {
        // Log the error and capture a screenshot
        ReporterUtil.report(exception_error_fill_data(selector, error), "error", suiteName, testName);
        throw error;
    }
}

    async attachScreenshot(screenshotName) {
        allureReporter.startStep(`${screenshotName}`);
        const tempFilePath = path.join(os.tmpdir(), `${screenshotName}.png`);
        await browser.saveScreenshot(tempFilePath);
        const screenshot = fs.readFileSync(tempFilePath);
        allureReporter.addAttachment(screenshotName, screenshot, 'image/png');
        fs.unlinkSync(tempFilePath); // Clean up
        allureReporter.endStep("passed")
    }
    async clickDelete(deleteButtonSelector) {
        while (true) {
            const isButtonVisible = await $(deleteButtonSelector).isDisplayed();
            if (isButtonVisible) {
                console.log('Delete button is visible. Clicking it...');
                await $(deleteButtonSelector).click();
                
                const confirmationResult = await browser.execute(() => {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            if (window.confirm) {
                                window.confirm = () => true;
                                resolve(true);
                            } else {
                                resolve(false);
                            }
                        }, 200);
                    });
                });

                if (confirmationResult) {
                    console.log('Confirmation accepted.');
                } else {
                    console.log('No dialog or confirmation.');
                }
            } else {
                console.log('Delete button not visible. Exiting...');
                break;
            }
        }
    }
}

// Export the BasePage class
export default BasePage;
