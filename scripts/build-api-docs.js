var reactDocs = require('react-docgen');
var fs = require('fs');
var path = require('path');
var packageJSON = require('../package.json');
// In the future, we will need a custom resolver.
// var resolver = require('./react-docgen/resolver');

var componentNames = packageJSON.components.react;
var output = {};

componentNames.forEach(function(componentName){
  var inputPath = path.join(__dirname,'..','src/react',componentName,componentName + '.js');
  var src = fs.readFileSync(inputPath,'utf8');
  var doc = reactDocs.parse(src);
  // In the future, we will need a custom resolver.
  // var doc = reactDocs.parse(src, resolver);
  output[componentName] = doc;
});

var outputPath = path.join(__dirname,'..','site','examples','react-control-details.json');

fs.writeFile(outputPath, JSON.stringify(output,null, 4), function (err) {
  if (err) return console.log(err);
});
