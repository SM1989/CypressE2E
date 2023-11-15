///<reference types = "cypress"/>
import usersPayload from '../../../fixtures/API/Payloads/usersPayload.json'
import updateUserPayload from '../../../fixtures/API/Payloads/updateUserPayload.json'
var userId

describe('Delete Method Validation & API Chaining', function () {
    it('End To End Users Flow - GET/POST/PUT/DELETE', function () {
        cy.generateRandomEmail().then(function (randomEmail) {
            usersPayload.email = randomEmail
            cy.request({
                method: 'POST',
                url: "https://gorest.co.in/public/v2/users/",
                body: usersPayload,
                headers: {
                    Authorization: "Bearer 9e7289d307e7922656c2b954b3dcb0826f79583af1b6a8f0606bb462d2bafd5f"
                }
            }).then(function (response) {
                userId = response.body.id
                cy.log(userId)
                expect(response.status).to.be.equal(201)
                cy.log('User Created')
                cy.request({
                    method: 'PUT',
                    url: "https://gorest.co.in/public/v2/users/" + userId,
                    body: updateUserPayload,
                    headers: {
                        Authorization: "Bearer 9e7289d307e7922656c2b954b3dcb0826f79583af1b6a8f0606bb462d2bafd5f"
                    }
                }).then(function (response) {
                    expect(response.status).to.be.equal(200)
                    cy.log('User Updated')
                    expect(response.body).to.have.property('name', updateUserPayload.name)
                    ////NEW-STARTS
                    cy.request({
                        method: 'GET',
                        url: "https://gorest.co.in/public/v2/users/" + userId,
                        headers: {
                            Authorization: "Bearer 9e7289d307e7922656c2b954b3dcb0826f79583af1b6a8f0606bb462d2bafd5f"
                        }
                    }).then(function (response) {
                        expect(response.status).to.be.equal(200)
                        cy.log('User updation verified')
                        expect(response.body).to.have.property('email', randomEmail)
                        expect(response.body).to.have.property('id', userId)
                        cy.request({
                            method: 'DELETE',
                            url: "https://gorest.co.in/public/v2/users/" + userId,
                            headers: {
                                Authorization: "Bearer 9e7289d307e7922656c2b954b3dcb0826f79583af1b6a8f0606bb462d2bafd5f"
                            }
                        }).then(function (response) {
                            expect(response.status).to.be.equal(204)
                            cy.log('User Deleted')
                            cy.request({
                                method: 'GET',
                                url: "https://gorest.co.in/public/v2/users/" + userId,
                                headers: {
                                    Authorization: "Bearer 9e7289d307e7922656c2b954b3dcb0826f79583af1b6a8f0606bb462d2bafd5f"
                                },
                                failOnStatusCode: false
                            }).then(function (response) {
                                expect(response.status).to.be.equal(404)
                                cy.log('User Deletion Verified')
                                expect(response.body).to.have.property('message', 'Resource not found')
                            })
                        })
                    })
                })
            })
        })
    })
})