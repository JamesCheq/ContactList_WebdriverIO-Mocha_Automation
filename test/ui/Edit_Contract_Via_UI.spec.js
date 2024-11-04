import { initializeHook } from '../../hooks/web-hooks';
import testData from '../../test_data/ui_test_data.json'
import ContactListPage from '../../pages/contact_list_page'
import ReusableHelpers from '../../utils/reusable_scripts';
import EditContactPage from '../../pages/edit_contact_page'
import ContactDetailsPage from '../../pages/contact_details.page'
import '../../hooks/setup'
import uiloadTestData from '../../utils/uitestDataUtil'
const uitestData = uiloadTestData();

const helpers = new ReusableHelpers();

describe('Edit Contact via UI @UIEdit @ALLUI', () => {
    // beforeEach(async function () {
    //     await initializeHook({ page: browser }); // Pass `browser` as the `page` equivalent
    // });

    it('Successful Update of Contact @uieditcontact', async () => {
        await helpers.SignUpAndLogin()
        await helpers.AddContactAndValidate()

        await ContactListPage.clickFirstRowName()
        await ContactDetailsPage.verifyHeaderContactDetails()
        await ContactDetailsPage.clickEditContact()
        await EditContactPage.verifyEditContactHeader()
        await EditContactPage.editLastName(testData.EditContactDetails.lastName)
        await EditContactPage.clickSubmitButton()
        await ContactDetailsPage.verifyHeaderContactDetails()
    });

    uitestData.InvalidEditContactDetails.forEach((testdata, index) => {
        const { firstName, lastName, errorMsg } = testdata;
        const iterationIndex = `Iteration_${index + 1}`;
        const testTitle = `Unsuccessful Update of Contact @uiinvalidupdate- ${iterationIndex}`;
        console.log(firstName, lastName, )
        
        it(testTitle, async () => {
            await helpers.SignUpAndLogin()
            await helpers.AddContactAndValidate()

            await ContactListPage.clickFirstRowName()
            await ContactDetailsPage.verifyHeaderContactDetails()
            await ContactDetailsPage.clickEditContact()
            await EditContactPage.verifyEditContactHeader()
            await EditContactPage.editFirstName(firstName)
            await EditContactPage.editLastName(lastName)
            await EditContactPage.clickSubmitButton()
            await EditContactPage.isErrorMessageDisplayed()
        });
    })
});