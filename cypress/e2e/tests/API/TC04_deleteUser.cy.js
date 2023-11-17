///<reference types = "cypress"/>
import usersPayload from '../../../fixtures/API/Payloads/usersPayload.json'
import updateUserPayload from '../../../fixtures/API/Payloads/updateUserPayload.json'
import apiMessages from '../../../fixtures/API/Validation_Data/apiMessages.json'
var userId

describe('API - Delete Method Validation & API Chaining', function () {
    it.only('End To End Users Flow - GET/POST/PUT/DELETE', function (){
        const header = {
            Authorization: Cypress.env('Authorization')
        }
        cy.generateRandomEmail().then(function(randomEmail) {
            usersPayload.email = randomEmail
            cy.postAPI('/', header, usersPayload).then(function (response) {
                cy.log(JSON.stringify(response.body))
                expect(response.status).to.be.equal(201)
                userId = response.body.id
                cy.putAPI('/' + userId, header, updateUserPayload).then(function (response) {
                    expect(response.status).to.be.equal(200)
                    expect(response.body).to.have.property('name', updateUserPayload.name)
                    cy.getAPI('/' + userId, header).then(function (response) {
                        expect(response.status).to.be.equal(200)
                        expect(response.body).to.have.property('name', updateUserPayload.name)
                        cy.deleteAPI('/' + userId, header).then(function (response) {
                            expect(response.status).to.be.equal(204)
                            cy.getAPI('/' + userId, header).then(function (response) {
                                expect(response.status).to.be.equal(404)
                                expect(response.body).to.have.property('message',apiMessages.userErrorMessage)
                            })
                        })
                    })
                })
            })
        })
    })
})