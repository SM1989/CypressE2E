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
    URL : "https://naveenautomationlabs.com/opencart/index.php?route=account/register"
  },
  "includeShadowDom" : true
});