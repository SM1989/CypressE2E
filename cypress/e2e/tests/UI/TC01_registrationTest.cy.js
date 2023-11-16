import { registrationPage } from "../../../pages/registrationPage"
import { afterRegistration } from "../../../pages/afterRegistrationPage"
import registrationData from "../../../fixtures/UI/registrationData.json"

const registrationPageObj = new registrationPage()
const afterRegistrationObj = new afterRegistration()

describe ('UI - Registration Flow', function(){

    function generateRandomEmail(){
        const randomString = Math.random().toString(36).substring(2,10);
        const email = randomString + "@gmail.com";
        return email;
    }

    it ('Registration 1st Use Case', function(){
        let email = generateRandomEmail();
        cy.log(email)
        registrationPageObj.openURL()
        registrationPageObj.enterFirstName(registrationData.firstName)
        registrationPageObj.enterLastName(registrationData.lastName)
        //registrationPageObj.enterEmail(registrationData.email)
        registrationPageObj.enterEmail(email)
        registrationPageObj.enterPhone(registrationData.phone)
        registrationPageObj.enterPassword(registrationData.password)
        registrationPageObj.checkPrivacyPolicy()
        registrationPageObj.clickContinue()
        afterRegistrationObj.verifySuccessMessage(registrationData.successMessage)
    })
})