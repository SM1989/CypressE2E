///<reference types = "cypress" />
import usersPayload from '../../../fixtures/API/Payloads/usersPayload.json'
import updateUserPaylod from '../../../fixtures/API/Payloads/updateUserPayload.json'
var userId

describe('API - PUT Method Validation', function(){
    
    it('Create User - POST', function(){
        cy.generateRandomEmail().then(function(randomEmail){
            usersPayload.email = randomEmail
            cy.request({
                method : 'POST',
                url : "https://gorest.co.in/public/v2/users",
                headers : {
                    Authorization : "Bearer 9e7289d307e7922656c2b954b3dcb0826f79583af1b6a8f0606bb462d2bafd5f"
                },
                body : usersPayload
            }).then(function(response){
                expect(response.status).to.be.equal(201)
                userId = response.body.id;
                cy.log(userId)
            })
        })
    })

    it('Update the User - PUT', function(){
        cy.request({
            method : 'PUT',
            url : "https://gorest.co.in/public/v2/users/" + userId,
            headers : {
                Authorization : "Bearer 9e7289d307e7922656c2b954b3dcb0826f79583af1b6a8f0606bb462d2bafd5f"
            },
            body : updateUserPaylod,
            failOnStatusCode : false
        }).then(function(response){
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.be.equal(200)
            expect(response.body).to.have.property('name',updateUserPaylod.name)
        })
    })

    it('Validate the User', function(){
        cy.request({
            method : 'GET',
            url : "https://gorest.co.in/public/v2/users/" + userId,
            headers : {
                Authorization : "Bearer 9e7289d307e7922656c2b954b3dcb0826f79583af1b6a8f0606bb462d2bafd5f"
            },
            failOnStatusCode : false,
        }).then(function(response){
            expect(response.status).to.be.equal(200)
            expect(response.body).to.have.property('name',updateUserPaylod.name)
            expect(response.body).to.have.property('status',updateUserPaylod.status)
        })
    })
})