// require all modules ending in ".test.js" from the
// current directory and all subdirectories
var testsContext = require.context(".", true, /.test.(js)$/);
testsContext.keys().forEach(testsContext);