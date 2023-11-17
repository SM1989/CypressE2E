// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', function(userName,password){
    cy.viewport(990,760)
    cy.visit('')
    cy.get('#input-email').type(userName)
    cy.get('#input-password').type(password)
    cy.get('form > .btn').click()
})

Cypress.Commands.add('getAPI', function(path_param,api_headers){
    cy.request({
        method : 'GET',
        url : Cypress.env('api_baseUrl')+path_param,
        headers : api_headers,
        failOnStatusCode: false
    })
})
Cypress.Commands.add('postAPI',function(path_param,api_headers,payload){
    cy.request({
        method : 'POST',
        url : Cypress.env('api_baseUrl')+path_param,
        headers : api_headers,
        body : payload,
        failOnStatusCode: false
    })
})
Cypress.Commands.add('putAPI', function(path_param,api_headers,payload){
    cy.request({
        method : 'PUT',
        url : Cypress.env('api_baseUrl')+path_param,
        body : payload,
        headers : api_headers,
        failOnStatusCode: false
    })
})
Cypress.Commands.add('deleteAPI', function(path_param,api_headers){
    cy.request({
        method : 'DELETE',
        url : Cypress.env('api_baseUrl')+path_param,
        headers : api_headers,
        failOnStatusCode: false
    })
})