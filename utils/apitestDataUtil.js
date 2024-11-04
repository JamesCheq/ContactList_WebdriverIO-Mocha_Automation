import fs from 'fs';
import path from 'path';
import ReporterUtil from './reporterUtil';
const apiloadTestData = () => {
    try {
        // Ensure correct path to the test_data.json file
        const dataPath = path.join(process.cwd(), 'test_data', 'api_test_data.json');
        console.log(`Loading test data from: ${dataPath}`);  // Log the file path for debugging
        
        // Check if the file exists
        if (!fs.existsSync(dataPath)) {
            throw new Error(`File not found at path: ${dataPath}`);
        }
        
        // Read the JSON file as a string
        const data = fs.readFileSync(dataPath, 'utf-8');
        
        // Parse the JSON string into a JavaScript object
        const testData = JSON.parse(data);
        
        return testData;
    } catch (error) {
        //ReporterUtil.report(exception_error_verify_element(selector, error), "error", suiteName, testName);
        console.error('Error loading test data:', error.message);
        return null;
    }
};

export default apiloadTestData;
