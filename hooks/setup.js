import envConfig from '../config/environment.json'; // Adjust the path as necessary
import { browser } from '@wdio/globals';
import { beforeEach, afterEach } from 'mocha';

// Choose the current environment, e.g., 'dev', 'staging', or 'prod'
const currentEnv = process.env.NODE_ENV || 'staging'; // Default to 'dev' if no environment is set
const { baseURL } = envConfig[currentEnv];

// Function to get describe and it names
function getTestInfo(testContext) {
    const testName = testContext.currentTest.title; // This will give the name of the 'it' block
    const suiteName = testContext.currentTest.parent.title; // This will give the name of the 'describe' block

    return { suiteName, testName };
}

// Global setup for your tests
beforeEach(async function() {
    // Log the suite and test names before each test
    const { suiteName, testName } = getTestInfo(this); // 'this' refers to the current test context
    console.log(`Running Test Suite: ${suiteName}`);
    console.log(`Running Test Case: ${testName}`);

    // Attach suiteName and testName to the global context
    global.suiteName = suiteName;
    global.testName = testName;

    // Call the initialize hook
    console.log("Running initialize hooks for environment:", currentEnv);
    await browser.url(baseURL);
});

afterEach(async function() {
    await browser.pause(1000);
    await browser.deleteAllCookies(); //Clean up

});
