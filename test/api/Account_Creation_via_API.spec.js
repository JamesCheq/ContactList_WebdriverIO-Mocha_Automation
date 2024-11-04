import { creationofUser, InvalidCreationofUser } from '../../utils/Api_Account_Creation';
import apiData from '../../test_data/api_test_data.json'
import ContactListPage from '../../pages/contact_list_page'
import { initializeHook } from '../../hooks/web-hooks';
import { browser } from '@wdio/globals';
import '../../hooks/setup'
import ReusableHelpers from '../../utils/reusable_scripts';
const helpers = new ReusableHelpers();
import apiloadTestData from '../../utils/apitestDataUtil'
const testData = apiloadTestData();

describe('Account Creation via API @APICreation @ALLAPI', () => {
    it('Successful Account Creation @apiaccountcreation', async () => {
        const { user_id, token, email } = await creationofUser();
        console.log(`User created with ID: ${user_id, token, email}`);
        await initializeHook({ page: browser });

        await helpers.LoginAndValidate(email, testData.Credential.password)
        await ContactListPage.validateHeader()
    });

    it('Unsuccessful Account Creation Fails Due to Invalid Data @apifailedaccountcreation', async () => {
        for (const invalidData of testData.CreateAccountInvalidData) {
            console.log(`Test Data: ${JSON.stringify(invalidData)}`);
            await InvalidCreationofUser(invalidData);  // Pass test data for each iteration
        }
    });

});