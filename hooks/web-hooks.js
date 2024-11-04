import envConfig from '../config/environment.json'; // Adjust the path as necessary
import { browser } from '@wdio/globals';
import LoggingUtility from '../utils/loggerUtil'

// Choose the current environment, e.g., 'dev', 'staging', or 'prod'
const currentEnv = process.env.NODE_ENV || 'staging'; // Default to 'dev' if no environment is set
const { baseURL } = envConfig[currentEnv];


export const initializeHook = async ({ page }) => {
    console.log("Running initialize hooks for environment:", currentEnv);
    // Navigate to the base URL
    await browser.url(baseURL);

};

export const teardownHook = async ({ page }) => {
    await page.close();
};

