var reactDocs = require('react-docgen');
var fs = require('fs');
var path = require('path');
var packageJSON = require('../package.json');
var resolver = require('./docgen/resolver');

var componentNames = packageJSON.components.react;
var output = {};

componentNames.forEach(function(componentName){
	var inputPath = path.join(__dirname,'..','src/react',componentName,componentName + '.js');
	
	try {
		var src = fs.readFileSync(inputPath,'utf8');
		var doc = reactDocs.parse(src, resolver);
		output[componentName] = doc;
	} catch (ex) {
		console.error('Unable to read API documentation from ', inputPath);
	}
});

var outputPath = path.join(__dirname,'..','site','examples','react-control-details.json');

fs.writeFile(outputPath, JSON.stringify(output,null, 4), function (err) {
	if (err) return console.log(err);
});
