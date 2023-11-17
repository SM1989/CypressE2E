///<reference types = "cypress" />
import usersPayload from '../../../fixtures/API/Payloads/usersPayload.json'
import successfulUserCreationSchema from '../../../fixtures/API/Schemas/successfulUserCreation.json'
import unsuccessfulUserCreationSchema from '../../../fixtures/API/Schemas/unsuccessfulUserCreation.json'
const ajv = require('ajv')
const ajvObj = new ajv()
describe('API - POST Method Validation', function(){
    it.skip('Create a User with hardcoded payload - Skipped Test Case', function(){
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

    it('Create a User and validate the Response Schema - Positive Scenario',function(){
        const header = {
            Authorization: Cypress.env('Authorization')
        }
        cy.generateRandomEmail().then(function(randomEmail){
            usersPayload.email = randomEmail
            cy.postAPI('/',header,usersPayload).then(function(response){
                expect(response.status).to.be.equal(201)
                expect(response.body).to.have.property('email',randomEmail)
                expect(response.body).to.have.property('name',usersPayload.name)
                cy.validateJsonSchema(response.body,successfulUserCreationSchema).then(function(validation){
                    expect(validation).to.be.true
                })
            })
        })
    })

    it('Create a User and validate the Response Schema - Negative Scenario',function(){
        const header = {
            Authorization : Cypress.env('Authorization')
        }
        cy.postAPI('/',header,usersPayload).then(function(response){
            expect(response.status).to.be.equal(422)
            cy.validateJsonSchema(response.body,unsuccessfulUserCreationSchema).then(function(validation){
                expect(validation).to.be.true
            })
        })
    })
})