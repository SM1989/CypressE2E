///<reference types = 'cypress' />

describe('OAuth Feature APIs', function(){
    var accessToken;
    var userId;
    const url = Cypress.env('api_authURL')
    const body = Cypress.env('credentials')
    var headers = '';
    beforeEach('OAuth Token generation',function(){
        cy.postRequest(url,'/token','','form',body).then(function(response){
            expect(response.status).to.be.equal(200)
            accessToken = response.body.access_token
            cy.log(JSON.stringify(response.body))
            cy.log(accessToken)
        })
    })
    it('Fetch User Id using the access token', function(){
        headers = {Authorization : 'Bearer ' + accessToken}
        cy.getRequest(url,'/api/me',headers).then(function(response){
            expect(response.status).to.be.equal(200)
            userId = response.body.id
            cy.log(JSON.stringify(response.body))
            cy.log(userId)
        })
    })
    it('Final API Call using the user id and the access token', function(){
        cy.postRequest(url,'/api/'+userId+'/chickens-feed',headers,'','').then(function(response){
            cy.log(JSON.stringify(response.body))
            expect(response.status).to.be.equal(200)
            expect(response.body).to.have.property('success',true)
        })
    })
})