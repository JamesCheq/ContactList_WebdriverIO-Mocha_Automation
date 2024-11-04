//import { expect } from 'chai';
import { initializeHook, teardownHook } from '../../hooks/web-hooks';
//import testData from '../../test_data/ui_test_data.json'
import ReusableHelpers from '../../utils/reusable_scripts';
import LoginPage from '../../pages/login_page';
import SignUpPage from '../../pages/sign_up_page';
import { describe, it, beforeEach } from 'mocha';
import uiloadTestData from '../../utils/uitestDataUtil'
const uitestData = uiloadTestData();

import '../../hooks/setup';

const helpers = new ReusableHelpers();


describe('Account Creation via UI @UICreation @ALLUI', () => {
    // beforeEach(async function () {
    //     await initializeHook({ page: browser }); // Pass `browser` as the `page` equivalent
    // });

    it('Successful Account Creation @uiaccountcreation', async () => {
        await helpers.SignUpAndLogin()
    });

    uitestData.InvalidUserCreation.forEach((testdata, index) => {
        const { firstName, lastName, email, password } = testdata;
        const iterationIndex = `Iteration_${index + 1}`;
        const testTitle = `Unsuccessful Account Creation Fails Due to Invalid Data @uiinvalidaccountcreation - ${iterationIndex}`;
        console.log(firstName, lastName, email, password)
        
        it(testTitle, async () => {
            await LoginPage.clickSignUP();
            await SignUpPage.enterFirstName(firstName)
            await SignUpPage.enterLastName(lastName)
            await SignUpPage.enterEmail(email)
            await SignUpPage.enterPassword(password)
            await SignUpPage.clicksubmitButton()
        });
    })
});