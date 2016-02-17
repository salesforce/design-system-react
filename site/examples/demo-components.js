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

function endsWith(str, suffix) {
	return str.indexOf(suffix, str.length - suffix.length) !== -1;
}


module.exports = function (facade) {
	var codeDir = __PATHS__.source_files + '/' + facade;
	var sampleCodeDir = __PATHS__.sample_data;
	// if (facade === 'react') {
	// 	sampleCodeDir += '-react';
	// }

	return packageJSON.components.map(function (component) {
		var sampleHTML;
		try {
			sampleHTML = fs.readFileSync(path.resolve(codeDir, component + '/examples/site-example.html'), 'utf8');
		} catch (ex) {
			sampleHTML = '';
		}
		var devHTML;
		try {
			devHTML = fs.readFileSync(path.resolve(codeDir, component + '/examples/dev-example.html'), 'utf8');
		} catch (ex) {
			devHTML = '';
		}

		var displayName = toTitleCase(component.split('-').join(' '));

		if (endsWith(displayName, 's') === false && endsWith(displayName, 'x') === false) {
			displayName = displayName + 's';
		}

		// This is ugly, but it works:
		//
		// The jQuery Radios component is really a wrapper around Radio, so its naming convention is unlike every other component.
		// TODO: Refactor to have a RadioGroup or something...?
		var componentGroupName = component;

		if (componentGroupName === 'radio' && facade === 'jquery') {
			componentGroupName = componentGroupName + 's';
		}

		try {
			return {
				component: component,
				componentGroupName: componentGroupName,
				name: component.split('-').join(' '),
				displayName: displayName,
				html: sampleHTML,
				devHtml: devHTML,
				code: fs.readFileSync(path.resolve(codeDir, component + '/examples/site-example.js'), 'utf8')
			};
		} catch (ex) {
			console.error(ex);
			return {
				component: component,
				componentGroupName: componentGroupName,
				name: component.split('-').join(' '),
				displayName: displayName,
				code: fs.readFileSync(path.resolve(codeDir, component + '/examples/site-example.js'), 'utf8'),
				html: sampleHTML,
				devHtml: devHTML
			};
		}
	});
};
