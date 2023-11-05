import { registrationPage } from "../../pages/registrationPage"
import { afterRegistration } from "../../pages/afterRegistrationPage"
import registrationData from "../../../cypress/fixtures/registrationData.json"

const registrationPageObj = new registrationPage()
const afterRegistrationObj = new afterRegistration()

describe ('Registration Flow', function(){

    it ('Registration 1st Use Case', function(){
        registrationPageObj.openURL()
        registrationPageObj.enterFirstName(registrationData.firstName)
        registrationPageObj.enterLastName(registrationData.lastName)
        registrationPageObj.enterEmail(registrationData.email)
        registrationPageObj.enterPhone(registrationData.phone)
        registrationPageObj.enterPassword(registrationData.password)
        registrationPageObj.checkPrivacyPolicy()
        registrationPageObj.clickContinue()
        afterRegistrationObj.verifySuccessMessage(registrationData.successMessage)
    })
})