/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/*
 * Browser unit tests entry point (Mocha)
 *
 * Requires all modules ending in ".browser-test.js" or
 * ".browser-test.jsx" within `components` and `utilities`
 * folders and provides to `browser-tests-app.js` and
 * `webpack.config.test.js`.
 *
 * To view `npm start` and open `http://localhost:8001`.
 */

const browserTestsContext = require.context(
	'../components/',
	true,
	/.\.browser-test\.jsx?$/
);
browserTestsContext.keys().forEach(browserTestsContext);

const utilitiesTestsContext = require.context(
	'../utilities/',
	true,
	/.\.browser-test\.jsx?$/
);
utilitiesTestsContext.keys().forEach(utilitiesTestsContext);
