import { creationofUser } from '../../utils/Api_Account_Creation';
import { AddContact } from '../../utils/Api_Contact_Creation';
import { DeleteContact, InvalidContactDeletion } from '../../utils/Api_Delete_Contact';
import apiData from '../../test_data/api_test_data.json'
import ContactListPage from '../../pages/contact_list_page' 
import { initializeHook } from '../../hooks/web-hooks';
import '../../hooks/setup'
import ReusableHelpers from '../../utils/reusable_scripts';
import apiloadTestData from '../../utils/apitestDataUtil'

const helpers = new ReusableHelpers();
const testData = apiloadTestData();

describe('Delete Contact via API @APIDelete @ALLAPI', () => {
    let userId, token, contact_user_id, email;

    beforeEach(async () => {
        // This will run once before all tests in this suite
        const user = await creationofUser();
        userId = user.userId;
        token = user.token;
        email = user.email;
        const user_id = await AddContact(token)
        contact_user_id = user_id
    });

    it('Successful Contact Deletion @apideletecontact', async () => {
        console.log(`User created with ID: ${contact_user_id, token}`);
        await DeleteContact(token, contact_user_id);
        await initializeHook({ page: browser });     
        await helpers.LoginAndValidate(email, testData.Credential.password)
        await ContactListPage.validateHeader()
    });

    it('Unsuccessful Contact Deletion @apiinvaliddeletecontact', async () => {
        console.log(`User created with ID: ${contact_user_id, token}`);
        await InvalidContactDeletion(token, testData.InvalidContactID.ContactID);
    });
});