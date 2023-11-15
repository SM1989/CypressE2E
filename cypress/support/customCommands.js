//This is another customer commands file. We can separate the common commands here as well as in commands.js. We need to import this file in e2e.js
const ajv = require('ajv')
const ajvObj = new ajv()

Cypress.Commands.add('generateRandomEmail', function(){
    const randomNumber = Math.random().toString(36).substring(2,10)
    const email = randomNumber + "@gmail.com"
    cy.log(email)
    return cy.wrap(email)
})

Cypress.Commands.add('validateJsonSchema', function(responseBody,schema){
    const validate = ajvObj.compile(schema)
    const isValid = validate(responseBody)
    cy.log(isValid)
    return cy.wrap(isValid)
})

// Cypress.Commands.add('validateResponse',(response,responseCode,identifierName,identifierValue) =>{
//     if(
//     expect(response.status).to.equal(responseCode)
//     expect(response.body).has.property(identifierName,identifierValue)
//     return true;
//     )
//     else: 

// })