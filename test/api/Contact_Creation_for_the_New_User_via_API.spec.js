import { creationofUser } from '../../utils/Api_Account_Creation';
import { AddContact, InvalidAddContact, AddMultipleContact } from '../../utils/Api_Contact_Creation';
import apiData from '../../test_data/api_test_data.json'
import ReusableHelpers from '../../utils/reusable_scripts';
import '../../hooks/setup'
import { initializeHook } from '../../hooks/web-hooks';
import ContactListPage from '../../pages/contact_list_page' 
import apiloadTestData from '../../utils/apitestDataUtil'

const testData = apiloadTestData();
const helpers = new ReusableHelpers();

describe('Contact Creation for the New User via API @APIContact @ALLAPI', () => {
    let userId, token, email;

    beforeEach(async function () {
         //This will run once before all tests in this suite
        const user = await creationofUser();
        userId = user.userId;
        token = user.token;
        email = user.email
    });
      
     it('Successful Contact Creation for the New User @apinewcontact', async () => {
         await AddContact(token);
         await initializeHook({ page: browser });     
         await helpers.LoginAndValidate(email, testData.Credential.password)
         await ContactListPage.validateHeader()
         await helpers.verifyContactAdded(testData.AddContact.firstName, testData.AddContact.lastName);
     });

    it('Successful Multiple Creation of Contact for the New User @apiadditionalcontact', async () => {
        await AddMultipleContact(token);
        await initializeHook({ page: browser });     
        await helpers.LoginAndValidate(email, testData.Credential.password)
        await ContactListPage.validateHeader()
        await helpers.verifyContactAdded(testData.AdditionalContact.firstName, testData.AdditionalContact.lastName);
    });

    it('Unsuccessful Contact Creation for the New User @apiinvalidcontact', async () => {
        for (const invalidData of testData.AddContactInvalidData) {
            await InvalidAddContact(token, invalidData);
        }
       
    });
});
