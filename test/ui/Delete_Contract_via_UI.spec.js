import { initializeHook } from '../../hooks/web-hooks';
import ContactListPage from '../../pages/contact_list_page'
import ReusableHelpers from '../../utils/reusable_scripts';
import ContactDetailsPage from '../../pages/contact_details.page'
import '../../hooks/setup'

const helpers = new ReusableHelpers();

describe('Contact Deletion via UI @UIDelete @ALLUI', () => {
    // beforeEach(async function () {
    //     await initializeHook({ page: browser });  // Pass `browser` as the `page` equivalent
    // });

    it('Successful Contact Deletion @uideletecontact', async () => {
        await helpers.SignUpAndLogin()
        await helpers.AddContactAndValidate()

        await ContactListPage.clickFirstRowName()
        await ContactDetailsPage.verifyHeaderContactDetails()
        await ContactDetailsPage.clickDeleteContact()
        await ContactListPage.validateHeader()
        await ContactListPage.verifyDataIsDeleted()
        
    });
    it('Unsuccessful Contact Deletion @uiinvaliddelete', async () => {
        await helpers.SignUpAndLogin()
        await helpers.AddContactAndValidate()

        await ContactListPage.clickFirstRowName()
        await ContactDetailsPage.verifyHeaderContactDetails()
        await ContactDetailsPage.clickDeleteContactCancel()
        await ContactDetailsPage.clickReturn()
        await ContactListPage.validateHeader()
        await ContactListPage.verifyDataIsNotDeleted()
        
    });
});