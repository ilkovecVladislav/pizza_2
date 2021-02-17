/// <reference types="cypress" />
require('dotenv').config();
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  require('cypress-log-to-output').install(on);
  // console.log(2222, process.env.REACT_APP_API_URL);
  config.env.REACT_APP_API_URL = process.env.REACT_APP_API_URL;

  return config;
};