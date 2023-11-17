const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter', //Mochaweome
  e2e: {
    baseUrl : "https://naveenautomationlabs.com/opencart/index.php?route=account/login",
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on); //Mochaweome
    },
  },
  env : {
    URL : "https://naveenautomationlabs.com/opencart/index.php?route=account/register",
    api_baseUrl : "https://gorest.co.in/public/v2/users",
    Authorization : 'Bearer 9e7289d307e7922656c2b954b3dcb0826f79583af1b6a8f0606bb462d2bafd5f',
  },
  "includeShadowDom" : true
});