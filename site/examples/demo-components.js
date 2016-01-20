var fs = require('fs');
var packageJson = require('../../package.json');

function toTitleCase(str) {
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

module.exports = function (facade) {
	var codeDir = './src/' + facade + '/';
	
	return packageJson.components.map(function (component) {
		try {
			return {
				component: component,
				name: toTitleCase(component.split('-').join(' ')),
				code: fs.readFileSync(codeDir + component + '/examples/site-example.js', 'utf8')
			}
		} catch (ex) {
			console.error(ex);
		}
	});
};
