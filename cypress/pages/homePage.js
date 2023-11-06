export class homePage{

    webLocators = {
        "searchbox" : ".form-control",
        "searchButton" : ".input-group-btn > .btn",
        "addToCart" : 'Add to Cart',
        "successMessage" : ".alert"
    }

    addToCartProduct(productName){
        cy.get(this.webLocators.searchbox).type(productName)
        cy.get(this.webLocators.searchButton).click()
        cy.contains(this.webLocators.addToCart).first().click()
    }
    verifySuccessMessage(){
        return cy.get(this.webLocators.successMessage)
    }
}