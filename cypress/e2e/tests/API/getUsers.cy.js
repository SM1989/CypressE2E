describe('GET Users API', function(){
    var url_api = Cypress.config().baseUrl

    it('GET Users Response', function(){
        cy.log(Cypress.config().baseUrl)
        
        cy.request({
            method : 'GET',
            url : "https://gorest.co.in/public/v2/users/5707260",
            //url : url_api,
            headers : {
                Authorization : 'Bearer 9e7289d307e7922656c2b954b3dcb0826f79583af1b6a8f0606bb462d2bafd5f'
            },
            failOnStatusCode:false
        }).then((response)=>{
            expect(response.status).to.equal(200)
            cy.log(JSON.stringify(response.body))
            expect(response.body.id).to.equal(5707261)
            //Deliberately Failling the Test Case
            
        })
    })
})