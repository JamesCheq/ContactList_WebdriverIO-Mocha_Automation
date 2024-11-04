import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';
import allureReporter from '@wdio/allure-reporter';
import { addAttachment } from '@wdio/allure-reporter'; // Import for adding screenshots to Allure

class ScreenshotUtil {
    static screenshotBasePath = path.join(process.cwd(), 'reports', 'screenshots');
    static executionFolder = null;
    static isInitialized = false;

    // Ensure the base screenshot directory exists
    static ensureScreenshotDirectory() {
        if (!fs.existsSync(this.screenshotBasePath)) {
            fs.mkdirSync(this.screenshotBasePath, { recursive: true });
            console.log(`Screenshot directory created: ${this.screenshotBasePath}`);
        }
    }

    // Method to initialize the folder for the current execution
    static initializeExecutionFolder() {
        const dateFolder = format(new Date(), 'yyyy-MM-dd_HH-mm-ss');
        this.executionFolder = path.join(this.screenshotBasePath, dateFolder);
        fs.mkdirSync(this.executionFolder, { recursive: true });
        console.log(`Execution folder created: ${this.executionFolder}`);
        this.isInitialized = true;
    }

    // Method to capture a screenshot and attach it to Allure
    static async captureScreenshot(scenario = 'default_scenario', testCase = 'default_case', iteration = '', takeScreenshot = 'Yes') {
        // Check if the screenshot should be taken
        if (takeScreenshot.toLowerCase() === 'no') {
            console.log('Screenshot capture is disabled.');
            return; // Exit the method if taking screenshots is disabled
        }

        this.ensureScreenshotDirectory();

        if (!this.isInitialized) {
            this.initializeExecutionFolder();
        }

        // Create subfolder for the test scenario
        const scenarioFolder = path.join(this.executionFolder, scenario);
        const testCaseFolder = path.join(scenarioFolder, testCase);

        // Create directories if they do not exist
        fs.mkdirSync(scenarioFolder, { recursive: true });
        fs.mkdirSync(testCaseFolder, { recursive: true });

        // Generate screenshot filename with timestamp and optional iteration
        const screenshotFileName = `${iteration ? `iteration_${iteration}_` : ''}${format(new Date(), 'yyyy-MM-dd_HH-mm-ss-SSS')}.png`;
        const screenshotPath = path.join(testCaseFolder, screenshotFileName);

        try {
            // Capture the screenshot using WebDriverIO
            await browser.saveScreenshot(screenshotPath);
            console.log(`Screenshot saved: ${screenshotPath}`);
        } catch (error) {
            console.error(`Failed to capture screenshot: ${error.message}`);
        }
    }
}

export default ScreenshotUtil;
