import { homePage } from "../../../pages/homePage"
import testData from "../../../fixtures/testData.json"
const homePageObj = new homePage()

describe ('Add To Cart Functionality', function(){

    before(function(){
        cy.login(testData.login.userName, testData.login.password)
    })

    it('Add To Cart', function(){
        homePageObj.addToCartProduct(testData.product)
        homePageObj.verifySuccessMessage().should('contain',(testData.successMessage))
    })
})