export class afterRegistration{

    webLocators = {
        successMesage : "h1"
    }
    verifySuccessMessage (messageText){
        cy.get(this.webLocators.successMesage).should('be.visible').and('have.text',messageText)
    }
}