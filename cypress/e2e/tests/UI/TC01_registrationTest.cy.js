import { registrationPage } from "../../../pages/registrationPage"
import { afterRegistration } from "../../../pages/afterRegistrationPage"
import registrationData from "../../../fixtures/UI/registrationData.json"

const registrationPageObj = new registrationPage()
const afterRegistrationObj = new afterRegistration()

describe ('UI - Registration Flow', function(){

    before(function(){
        registrationPageObj.openURL()
    })

    it ('Registration 1st Use Case', function(){
        cy.generateRandomEmail().then(function(email){
        registrationPageObj.enterFirstName(registrationData.firstName)
        registrationPageObj.enterLastName(registrationData.lastName)
        registrationPageObj.enterEmail(email)
        registrationPageObj.enterPhone(registrationData.phone)
        registrationPageObj.enterPassword(registrationData.password)
        registrationPageObj.checkPrivacyPolicy()
        registrationPageObj.clickContinue()
        afterRegistrationObj.verifySuccessMessage(registrationData.successMessage)
        })
    })
})