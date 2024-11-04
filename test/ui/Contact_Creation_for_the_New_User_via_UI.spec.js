import { expect } from 'chai';
import { initializeHook, setCurrentTestDetails  } from '../../hooks/web-hooks';
import LoginPage from '../../pages/login_page';
import testData from '../../test_data/ui_test_data.json'
import SignUpPage from '../../pages/sign_up_page';
const { faker, he } = require('@faker-js/faker');
import ContactListPage from '../../pages/contact_list_page'
import ReusableHelpers from '../../utils/reusable_scripts';
import contact_list_page from '../../pages/contact_list_page';
import AddContactPage from '../../pages/add_new_contact_page'
import '../../hooks/setup'
import uiloadTestData from '../../utils/uitestDataUtil'
const uitestData = uiloadTestData();

const helpers = new ReusableHelpers();

describe('Contact Creation for the New User via UI @UIContact @ALLUI', () => {

    // beforeEach(async function () {
    //     // Call the initializeHook before each test, passing the context if needed
    //     await initializeHook({ page: browser }); // Pass `browser` as the `page` equivalent
    // });

    it('Successful Contact Creation for the New User @uinewcontact', async () => {
        await helpers.SignUpAndLogin()
        await helpers.AddContactAndValidate()

    });

    it('Successful Multiple Creation of Contact for the New User @uimultiplecontact', async () => {
        await helpers.SignUpAndLogin()
        await helpers.AddContactAndValidate()
        await helpers.AddAnotherContactAndValidate()

    });

    uitestData.AddContactInvalidData.forEach((testdata, index) => {
        const { firstName, lastName, birthdate, email, phone, street1, street2, city, stateProvince, postalCode, country } = testdata;
        const iterationIndex = `Iteration_${index + 1}`;
        const testTitle = `Unsuccessful Contact Creation for the New User @uiinvalidcontact- ${iterationIndex}`;
        console.log(firstName, lastName, birthdate, email, phone, street1, street2, city, stateProvince, postalCode, country)
        
        it(testTitle, async () => {
            await helpers.SignUpAndLogin()
            await ContactListPage.clickAddContactButton()
            await AddContactPage.verifyHeader()

            await AddContactPage.enterFirstName(firstName)
            await AddContactPage.enterLastName(lastName)
            await AddContactPage.enterBirthdate(birthdate)
            await AddContactPage.enterEmail(email)
            await AddContactPage.enterPhoneNumber(phone)
            await AddContactPage.enterFirstAddress(street1)
            await AddContactPage.enterSecondAddress(street2)
            await AddContactPage.enterCity(city)
            await AddContactPage.enterState(stateProvince)
            await AddContactPage.enterPostsalCode(postalCode)
            await AddContactPage.enterCountry(country)
            await AddContactPage.clickSubmitButton()
        });
    })

    


});