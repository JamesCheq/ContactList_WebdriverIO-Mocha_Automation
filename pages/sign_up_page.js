import BasePage from './base_page'; // Adjust the import according to your project structure

class SignUpPage extends BasePage {
    // Define locators for input fields and buttons
    get txtFirstName() {
        return '#firstName'; // Update the selector if necessary
    }

    get txxtLastName() {
        return '#lastName'; // Update the selector if necessary
    }

    get txtEmail() {
        return '#email'; // Update the selector if necessary
    }

    get txtPassword() {
        return '#password'; // Update the selector if necessary
    }

    get submitButton() {
        return '#submit'; // Update the selector if necessary
    }

    // Method to set the First Name
    async enterFirstName(firstname) {

        await this.fillData(this.txtFirstName, firstname);
        await this.attachScreenshot('enter First Name');
    }

    // Method to set the Last Name
    async enterLastName(lastname) {
        await this.fillData(this.txxtLastName, lastname);
        await this.attachScreenshot('enter Last Name');
    }

    // Method to set the email
    async enterEmail(email) {
        await this.fillData(this.txtEmail, email);
        await this.attachScreenshot('enter Email');
    }

     // Method to set the email
     async enterPassword(password) {
        await this.fillData(this.txtPassword, password);
        await this.attachScreenshot('enter Password');
    }

    // Method to submit the form
    async clicksubmitButton() {
        await this.clickElement(this.submitButton);
        await this.attachScreenshot('click Submit Button');
    }
}

export default new SignUpPage(); // Export an instance of SignUpPage
