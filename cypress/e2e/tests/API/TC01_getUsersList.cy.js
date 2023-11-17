import successfulUsersList from '../../../fixtures/API/Schemas/successfulUsersList.json'
describe('API - GET Users', function(){
    it('Get User Details', function(){
        const headers = {
            Authorization : Cypress.env('Authorization')
        } 
        cy.getAPI('/',headers).then(function(response){
            expect(response.status).to.be.equal(200)
            cy.log(JSON.stringify(response.body))
            cy.validateJsonSchema(response.body,successfulUsersList).then(function(validation){
                expect(validation).to.be.true
            })
        })
    })
})