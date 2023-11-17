///<reference types = "cypress" />
import usersPayload from '../../../fixtures/API/Payloads/usersPayload.json'
import updateUserPaylod from '../../../fixtures/API/Payloads/updateUserPayload.json'
import changeUserStatus from '../../../fixtures/API/Payloads/changeUserStatus.json'
import successfulUserCreation from '../../../fixtures/API/Schemas/successfulUserCreation.json'
var userId

describe('API - PUT Method Validation', function(){
    it('Update the User',function(){
        const header = {
            Authorization : Cypress.env('Authorization')
        }
        cy.generateRandomEmail().then(function(randomEmail){
            usersPayload.email = randomEmail
            cy.postAPI('/',header,usersPayload).then(function(response){
                userId = response.body.id
                expect(response.status).to.be.equal(201)
                expect(response.body).to.have.property('email',randomEmail)
                cy.putAPI('/'+userId,header,changeUserStatus).then(function(response){
                    expect(response.status).to.be.equal(200)
                    cy.getAPI('/'+userId,header).then(function(response){
                        expect(response.status).to.be.equal(200)
                        expect(response.body).to.have.property('status',changeUserStatus.status)
                        cy.validateJsonSchema(response.body,successfulUserCreation).then(function(validation){
                            expect(validation).to.be.true
                        })
                    })
                })
            })
        })       
    })
})