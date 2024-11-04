import { format } from 'date-fns'; // Ensure date-fns is imported for date formatting
import LoggingUtility from './loggerUtil.js';
import ScreenshotUtil from './screenshotUtil.js';
import apiloadTestData from '../test_data/ui_test_data.json'

class ReporterUtil {
    static async report(logMessage, logLevel, testScenario, testCase) {
        // Log the message
        LoggingUtility.logMessage(logLevel, logMessage);

        await ScreenshotUtil.captureScreenshot(testScenario, testCase, '', apiloadTestData.Screenshot.ScreenshotSetting);

    }

}

export default ReporterUtil;
