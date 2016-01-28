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

module.exports = function (facade) {
	const codeDir = __PATHS__.source_files + '/' + facade;
	var sampleCodeDir = __PATHS__.sample_data;
	if (facade === 'react') {
		sampleCodeDir += '-react';
	}

	return packageJSON.components.map(function (component) {
		try {
			return {
				component: component,
				name: component.split('-').join(' '),
				displayName: toTitleCase(component.split('-').join(' ')),
				code: fs.readFileSync(path.resolve(codeDir, component + '/examples/site-example.js'), 'utf8'),
				sampleData: fs.readFileSync(path.resolve(sampleCodeDir, component + '.js'), 'utf8')
			};
		} catch (ex) {
			console.error(ex);
			return {
				component: component,
				name: component.split('-').join(' '),
				displayName: toTitleCase(component.split('-').join(' ')),
				code: fs.readFileSync(path.resolve(codeDir, component + '/examples/site-example.js'), 'utf8')
			};
		}
	});
};
