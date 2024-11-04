import { $ } from '@wdio/globals';
import BasePage from './base_page.js';

class AddContactPage extends BasePage {
    // Define locators for the Add Contact page elements
    get txtAddContactHeader() {
        return "div[class='main-content'] header h1";
    }

    get txtFirstName() { 
        return '#firstName';  
    }

    get txtLastName() {
        return '#lastName'; 
    }

    get txtBirthday() {
        return '#birthdate'; 
    }

    get txtPhoneNumber() {
        return '#phone';  
    }

    get txtEmail() {
        return '#email';  
    }

    get txtFirstAddress() {
        return '#street1';  
    }

    get txtSecondAddress() {
        return '#street2';  
    }

    get txtCity() {
        return '#city'; 
    }

    get txtState() {
        return '#stateProvince';  
    }

    get txtPostalCode() {
        return '#postalCode'; 
    }

    get txtCountry() {
        return '#country'; 
    }

    get cancelButton() {
        return $('button[type="button"]');  
    }

    get btnSubmit() {   
        return 'button[type="submit"]'; 
    }

    async verifyHeader(){
        await this.isElementVisible(this.txtFirstName)
        await this.attachScreenshot('verify Add Contact Page Header');
    }

    async enterFirstName(firstname){
        await this.fillData(this.txtFirstName, firstname)
        await this.attachScreenshot('enter First Name');
    }

    async enterLastName(lastname){
        await this.fillData(this.txtLastName, lastname)
        await this.attachScreenshot('enter Last Name');
    }

    async enterBirthdate(birthday){
        await this.fillData(this.txtBirthday, birthday)
        await this.attachScreenshot('enter Birthday');
    }

    async enterPhoneNumber(phone){
        await this.fillData(this.txtPhoneNumber, phone)
        await this.attachScreenshot('enter Phone');
    }

    async enterEmail(email){
        await this.fillData(this.txtEmail, email)
        await this.attachScreenshot('enter Email');
    }

    async enterFirstAddress(FirstAddress){
        await this.fillData(this.txtFirstAddress, FirstAddress)
        await this.attachScreenshot('enter First Address');
    }

    async enterSecondAddress(SecondAddress){
        await this.fillData(this.txtSecondAddress, SecondAddress)
        await this.attachScreenshot('enter Second Address');
    }

    async enterCity(city){
        await this.fillData(this.txtCity, city)
        await this.attachScreenshot('enter City');
    }

    async enterState(state){
        await this.fillData(this.txtState, state)
        await this.attachScreenshot('enter State');
    }

    async enterPostsalCode(postal){
        await this.fillData(this.txtPostalCode, postal)
        await this.attachScreenshot('enter Postal');
    }

    async enterCountry(country){
        await this.fillData(this.txtCountry, country)
        await this.attachScreenshot('enter Country');
    }

    async clickSubmitButton() {
        await this.clickElement(this.btnSubmit)
        await this.attachScreenshot('click Submit Button for Add new contact');
    }

}

export default new AddContactPage();
