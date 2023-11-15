///<reference types = "cypress" />
import usersPayload from '../../../fixtures/API/Payloads/usersPayload.json'
import successfulUserCreationSchema from '../../../fixtures/API/Schemas/successfulUserCreation.json'
import unsuccessfulUserCreationSchema from '../../../fixtures/API/Schemas/unsuccessfulUserCreation.json'
const ajv = require('ajv')
const ajvObj = new ajv()
describe('POST Method Validation', function(){

    it('Create a User with hardcoded payload', function(){

        cy.generateRandomEmail().then(returnedEmail => {
            cy.request({
                method : 'POST',
                url : 'https://gorest.co.in/public/v2/users',
                headers : {
                    Authorization : 'Bearer 9e7289d307e7922656c2b954b3dcb0826f79583af1b6a8f0606bb462d2bafd5f'
                },
                body : {
                    'name':'Saurabh M', 
                    'gender':'male', 
                    'email' : returnedEmail,
                    'status':'active'
                },
                failOnStatusCode:false
            }).then(response =>{
                cy.log(JSON.stringify(response.body))
                expect(response.status).to.equal(201)
                expect(response.body).has.property('name','Saurabh M')
                expect(response.body).has.property('gender','male')
                expect(response.body).has.property('status','active')
                expect(response.body).has.property('email',returnedEmail)
            })
        })     
    })

    it('Create a User using payload from fixtures', function(){

        cy.generateRandomEmail().then(function(randomEmail){
            usersPayload.email = randomEmail
            cy.request({
                method: 'POST',
                url : "https://gorest.co.in/public/v2/users",
                headers : {
                    Authorization : "Bearer 9e7289d307e7922656c2b954b3dcb0826f79583af1b6a8f0606bb462d2bafd5f"
                },
                body : usersPayload
            }).then(function(response){
                expect(response.body).has.property('email',randomEmail)
                expect(response.body).has.property('gender',usersPayload.gender)
                expect(response.body).has.property('status',usersPayload.status)
                expect(response.body.id).is.not.null
            })
        })
    })

    it('Create a User and validate the Response Schema - Positive Scenario', function(){

        cy.generateRandomEmail().then(function(emailGenerated){
            usersPayload.email = emailGenerated
            cy.request({
                method : 'POST',
                url : 'https://gorest.co.in/public/v2/users',
                headers : {
                    Authorization : 'Bearer 9e7289d307e7922656c2b954b3dcb0826f79583af1b6a8f0606bb462d2bafd5f'
                },
                body : usersPayload
            }).then(function(response){
                expect(response.status).to.equal(201)
                cy.validateJsonSchema(response.body,successfulUserCreationSchema).then(function(schemaValidation){
                    expect(schemaValidation).to.be.true
                })
            })
        })
    })

    it('Validate the user creation failure - Negative Scenario', function(){
        cy.request({
            method : 'POST',
            url : 'https://gorest.co.in/public/v2/users',
            headers : {
                Authorization : "Bearer 9e7289d307e7922656c2b954b3dcb0826f79583af1b6a8f0606bb462d2bafd5f"
            },
            body : usersPayload,
            failOnStatusCode:false
        }).then(function(response){
            cy.log(response.body)
            expect(response.status).to.be.equal(422)
            cy.validateJsonSchema(response.body,unsuccessfulUserCreationSchema).then(function(schemaValidation){
                expect(schemaValidation).to.be.true
            })
        })
    })
})