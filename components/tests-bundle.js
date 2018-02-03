'use strict';

// tests/tests_bundle.js

// require all modules ending in ".browser-test.js" or ".browser-test.jsx" from the
// current directory and all subdirectories
var testsContext = require.context('.', true, /.\.browser-test\.jsx?$/);
testsContext.keys().forEach(testsContext);

// require all `src/components/**/index.js`
var componentsContext = require.context('../components/', true, /index\.js$/);

componentsContext.keys().forEach(componentsContext);