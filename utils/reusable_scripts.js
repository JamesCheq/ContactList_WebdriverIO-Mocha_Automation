import LoginPage from '../pages/login_page';
import testData from '../test_data/ui_test_data.json'
import SignUpPage from '../pages/sign_up_page';
const { faker } = require('@faker-js/faker');
import ContactListPage from '../pages/contact_list_page'
import AddContactPage from '../pages/add_new_contact_page'
import uiloadTestData from '../utils/uitestDataUtil'
const uitestData = uiloadTestData();

class ReusableHelpers{

    async SignUpAndLogin() {
        const randFirstName = faker.person.firstName()
        const randLastName = faker.person.lastName();
        const randEmail = faker.internet.email({ firstName: randFirstName, lastName: randLastName });

        await LoginPage.clickSignUP();
        await SignUpPage.enterFirstName(randFirstName)
        await SignUpPage.enterLastName(randLastName)
        await SignUpPage.enterEmail(randEmail)
        await SignUpPage.enterPassword(uitestData.Credential.password)
        await SignUpPage.clicksubmitButton()
        await ContactListPage.validateHeader()
    }

    async LoginAndValidate(username, password) {
        await LoginPage.enterUsername(username)
        await LoginPage.enterPassword(password)
        await LoginPage.clickloginButton()
        await ContactListPage.validateHeader()
    }

    async AddContactAndValidate() {
        const randFirstName = faker.person.firstName();
        const randLastName = faker.person.lastName();
        const randEmail = faker.internet.email({ firstName: randFirstName, lastName: randLastName });
        const randBirthDate = faker.date.birthdate({ min: 15, max: 50, mode: 'age' }).toISOString().split('T')[0]
        const randAddress1 = faker.location.streetAddress();
        const randAddress2 = faker.location.secondaryAddress();
        const randCity = faker.location.city();
        const randState = faker.location.state();
        const randPostalCode = faker.location.zipCode();
        const randCountry = faker.location.country();

        await ContactListPage.clickAddContactButton()
        await AddContactPage.verifyHeader()

        await AddContactPage.enterFirstName(randFirstName)
        await AddContactPage.enterLastName(randLastName)
        await AddContactPage.enterBirthdate(randBirthDate)
        await AddContactPage.enterEmail(randEmail)
        await AddContactPage.enterPhoneNumber(uitestData.ContactDetails.phone)
        await AddContactPage.enterFirstAddress(randAddress1)
        await AddContactPage.enterSecondAddress(randAddress2)
        await AddContactPage.enterCity(randCity)
        await AddContactPage.enterState(randState)
        await AddContactPage.enterPostsalCode(randPostalCode)
        await AddContactPage.enterCountry(randCountry)
        await AddContactPage.clickSubmitButton()

        await ContactListPage.validateHeader()
         // Validate that the contact has been added
         const isContactAdded = await this.verifyContactAdded(randFirstName, randLastName);
         if (isContactAdded) {
             console.log('Contact has been successfully added to the contact list.');
         } else {
             console.error('Failed to add the contact to the contact list.');
         }
        
    }

    async AddAnotherContactAndValidate() {
        const randFirstName = faker.person.firstName();
        const randLastName = faker.person.lastName();
        const randEmail = faker.internet.email({ firstName: randFirstName, lastName: randLastName });
        //const randPhone = faker.phone.number(11); // Adjust the format as needed
        const randBirthDate = faker.date.birthdate({ min: 15, max: 50, mode: 'age' }).toISOString().split('T')[0]
        const randAddress1 = faker.location.streetAddress();
        const randAddress2 = faker.location.secondaryAddress();
        const randCity = faker.location.city();
        const randState = faker.location.state();
        const randPostalCode = faker.location.zipCode();
        const randCountry = faker.location.country();

        await ContactListPage.clickAddContactButton()
        await AddContactPage.verifyHeader()

        await AddContactPage.enterFirstName(randFirstName)
        await AddContactPage.enterLastName(randLastName)
        await AddContactPage.enterBirthdate(randBirthDate)
        await AddContactPage.enterEmail(randEmail)
        await AddContactPage.enterPhoneNumber(uitestData.ContactDetails.phone)
        await AddContactPage.enterFirstAddress(randAddress1)
        await AddContactPage.enterSecondAddress(randAddress2)
        await AddContactPage.enterCity(randCity)
        await AddContactPage.enterState(randState)
        await AddContactPage.enterPostsalCode(randPostalCode)
        await AddContactPage.enterCountry(randCountry)
        await AddContactPage.clickSubmitButton()

        await ContactListPage.validateHeader()
         // Validate that the contact has been added
         const isContactAdded = await this.verifyContactAdded(randFirstName, randLastName);
         if (isContactAdded) {
             console.log('Contact has been successfully added to the contact list.');
         } else {
             console.error('Failed to add the contact to the contact list.');
         }     
    }

    // Method to verify that a contact has been added
    async verifyContactAdded(firstName, lastName) {
        // This combines first and last name as it appears in the table
        const fullName = `${firstName} ${lastName}`;
        const isContactInList = await ContactListPage.isContactInList(fullName);
        return isContactInList; // Returns true if found, false otherwise

    }
    
}
export default ReusableHelpers;