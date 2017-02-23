// tests/tests_bundle.js

// require all modules ending in ".test.js" or ".test.jsx" from the
// current directory and all subdirectories
const testsContext = require.context('.', true, /.\.test\.jsx?$/);
testsContext.keys().forEach(testsContext);

// require all `src/components/**/index.js`
const componentsContext = require.context('../components/', true, /index\.js$/);
 
componentsContext.keys().forEach(componentsContext);
