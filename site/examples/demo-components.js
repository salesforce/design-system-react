require('../../scripts/helpers/setup');
const fs = require('fs');
const path = require('path');

const rootPath = path.resolve.bind(path, __PATHS__.root);
// const packageJSON = JSON.parse(fs.readFileSync(rootPath('package.json')).toString());
const packageJSON = JSON.parse(fs.readFileSync(rootPath('package.json')));

function toTitleCase (str) {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}


// function toTitleCase (str) {
// 	function (match, p1, index, title) {
// 		if (index > 0 && title.charAt(index - 2) !== ":" && match.search(/^(a(nd?|s|t)?|b(ut|y)|en|for|i[fn]|o[fnr]|t(he|o)|vs?\.?|via)[ \-]/i) > -1) return match.toLowerCase();
// 		if (title.substring(index - 1, index + 1).search(/['"_{(\[]/) > -1) return match.charAt(0) + match.charAt(1).toUpperCase() + match.substr(2);
// 		if (match.substr(1).search(/[A-Z]+|&|[\w]+[._][\w]+/) > -1 || title.substring(index - 1, index + 1).search(/[\])}]/) > -1) return match;
// 		return match.charAt(0).toUpperCase() + match.substr(1);
// 	});
// 	return str.replace(/([\w&`'ÔÕ"Ò.@:\/\{\(\[<>_]+-? *)/g,
// };

module.exports = function (facade) {
	const codeDir = __PATHS__.source_files + '/' + facade;
	// console.log("[demo-components.js:28] codeDir:", codeDir);
	// const codeDir = './src/' + facade;
	var sampleCodeDir = __PATHS__.sample_data;
	if (facade === 'react') {
		sampleCodeDir += '-react';
	}
	// console.log("[demo-components.js:31] sampleCodeDir:", sampleCodeDir);
	// const sampleCodeDir = '../utilities/sample-data';

	return packageJSON.components.map(function (component) {
		try {
			return {
				component: component,
				name: component.split('-').join(' '),
				displayName: toTitleCase(component.split('-').join(' ')),
				// code: fs.readFileSync(codeDir + '/' + component + '/examples/site-example.js', 'utf8'),
				code: fs.readFileSync(path.resolve(codeDir, component + '/examples/site-example.js'), 'utf8'),
				sampleData: fs.readFileSync(path.resolve(sampleCodeDir, component + '.js'), 'utf8')
			};
		} catch (ex) {
			console.error(ex);
			return {
				component: component,
				name: component.split('-').join(' '),
				displayName: toTitleCase(component.split('-').join(' ')),
				// code: fs.readFileSync(codeDir + '/' + component + '/examples/site-example.js', 'utf8'),
				code: fs.readFileSync(path.resolve(codeDir, component + '/examples/site-example.js'), 'utf8')
			};
		}
	});
};
