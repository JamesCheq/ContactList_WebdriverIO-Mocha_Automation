import { creationofUser } from '../../utils/Api_Account_Creation';
import { AddContact } from '../../utils/Api_Contact_Creation';
import { EditContact, InvalidContactUpdate } from '../../utils/Api_Edit_Contact';
import apiData from '../../test_data/api_test_data.json'
import ReusableHelpers from '../../utils/reusable_scripts';
const helpers = new ReusableHelpers();
import { initializeHook } from '../../hooks/web-hooks';
import ContactListPage from '../../pages/contact_list_page'
import apiloadTestData from '../../utils/apitestDataUtil'
const testData = apiloadTestData();

import '../../hooks/setup'
describe('Edit Contact via API @APIEdit @ALLAPI', () => {
    let userId, token, contact_user_id, email;

    beforeEach(async () => {
        // This will run once before all tests in this suite
        const user = await creationofUser();
        userId = user.userId;
        token = user.token;
        email = user.email
        const user_id = await AddContact(token)
        contact_user_id = user_id
    });
   
    it('Successful Update of Contact @apieditcontact', async () => {
        console.log(`User created with ID: ${contact_user_id, token}`);
        await EditContact(token, contact_user_id)
        await initializeHook({ page: browser });   

        await helpers.LoginAndValidate(email, testData.Credential.password)
        await ContactListPage.validateHeader()

    });

    it('Unsuccessful Update of Contact @apiinvalideditcontact', async () => {      
        for (const invalidData of testData.EditContactInvalidData) {
            await InvalidContactUpdate(token, contact_user_id, invalidData)
        }
    });

});