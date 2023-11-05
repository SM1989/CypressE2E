export class registrationPage{

    webLocators = {
        firstName : "#input-firstname",
        lastName : "#input-lastname",
        email : "#input-email",
        phone : "#input-telephone",
        password : "#input-password",
        confirmPassword : "#input-confirm",
        policyCheckbox : 'input[type = "checkbox"]',
        continueButton : ".pull-right > .btn"
    }

    openURL(){
        cy.visit(Cypress.env("URL"))
    }

    enterFirstName(fname){
        cy.get(this.webLocators.firstName).type(fname)
    }
    enterLastName(lname){
        cy.get(this.webLocators.lastName).type(lname)
    }
    enterEmail(emailId){
        cy.get(this.webLocators.email).type(emailId)
    }
    enterPhone(phoneNumber){
        cy.get(this.webLocators.phone).type(phoneNumber)
    }
    enterPassword(passwordVal){
        cy.get(this.webLocators.password).type(passwordVal)
        cy.get(this.webLocators.confirmPassword).type(passwordVal)
    }
    checkPrivacyPolicy(){
        cy.get(this.webLocators.policyCheckbox).check()
    }
    clickContinue(){
        cy.get(this.webLocators.continueButton).click()
    }

    
}