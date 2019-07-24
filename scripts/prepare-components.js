const glob = require('glob');
const path = require('path');
const fs = require('fs');

// Load copy of package.json
let packageJsonFile = fs.readFileSync(
	path.join(__dirname, '../package.json'),
	'utf8'
);
if (packageJsonFile) {
	packageJsonFile = JSON.parse(packageJsonFile);
	packageJsonFile.components = [];
}

// Get all component configuration files
const configFiles = glob.sync(
	`${path.join(__dirname, '../components')}/**/component.json`
);
configFiles.forEach((filePath, index) => {
	const data = fs.readFileSync(filePath, 'utf8');
	if (data) {
		configFiles[index] = JSON.parse(data.toString());
	} else {
		configFiles[index] = {};
	}
});

// Read index and storybook-stories files
let indexFile = fs.readFileSync(
	path.join(__dirname, '../components/index.js'),
	'utf8'
);
let storybookStoriesFile = fs.readFileSync(
	path.join(__dirname, '../components/storybook-stories.js'),
	'utf8'
);

// Create initial site-stories string
let siteStoriesFile = `// This object is imported into the documentation site. An example for the documentation site should be part of the pull request for the component. The object key is the component value listed in the component's component.json file. The following uses webpack's raw-loader plugin to get "text files" that will be eval()'d by CodeMirror within the documentation site on page load.

/* eslint-env node */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

const documentationSiteLiveExamples = {
`;

// Returns a regular expression that can be used to search for specific exports in files
const getExportRegExp = (line) => {
	let formattedLine = line.replace(/\//g, '\\/');
	formattedLine = formattedLine.replace(/\./g, '\\.');
	return new RegExp(`${formattedLine}\r?\n?`);
};

// Make sure components are listed in index.js
const checkIndex = indexFile
	? (config) => {
			let injectionIndex;
			let injectionString = '';
			let line;
			let match;

			// Component exports
			if (config.component && config.classKey) {
				// Check for SLDS-prefixed component export
				line = `export SLDS${config.classKey} from './${config.component}';`;
				match = indexFile.match(getExportRegExp(line));

				if (match) {
					injectionIndex = match.index + match[0].length;
				} else {
					injectionString += `${line}\n`;
				}

				// Check for non-prefixed component export
				line = `export ${config.classKey} from './${config.component}';`;
				match = indexFile.match(getExportRegExp(line));

				if (match) {
					injectionIndex = match.index + match[0].length;
				} else {
					injectionString += `${line}\n`;
				}
			}

			// Sub-component exports
			if (config.dependencies && config.dependencies.length > 0) {
				config.dependencies.forEach((dependency) => {
					if (config.component && dependency.component && dependency.classKey) {
						// Check for SLDS-prefixed sub-component export
						line = `export SLDS${dependency.classKey} from './${
							config.component
						}/${dependency.component}';`;
						match = indexFile.match(getExportRegExp(line));

						if (!match) {
							injectionString += `${line}\n`;
						}

						// Check for non-prefixed sub-component export
						line = `export ${dependency.classKey} from './${config.component}/${
							dependency.component
						}';`;
						match = indexFile.match(getExportRegExp(line));

						if (!match) {
							injectionString += `${line}\n`;
						}
					}
				});
			}

			// Add any missing parts
			if (injectionString) {
				if (!injectionIndex) {
					injectionIndex = indexFile.search(/$(?![\r\n])/);
				}
				injectionIndex =
					injectionIndex !== undefined ? injectionIndex : indexFile.length - 1;
				indexFile = `${indexFile.slice(
					0,
					injectionIndex
				)}${injectionString}\n${indexFile.slice(injectionIndex)}`;
			}
		}
	: () => {};

// Make sure components are listed in storybook-stories.js
const checkStorybookStories = storybookStoriesFile
	? (config) => {
			let line;
			let match;

			if (config.component && config.classKey) {
				// Check for component export
				line = `export ${config.classKey} from '../components/${
					config.component
				}/__docs__/storybook-stories.jsx';`;
				match = storybookStoriesFile.match(getExportRegExp(line));

				if (!match) {
					storybookStoriesFile += `${line}\n`;
				}
			}
		}
	: () => {};

// Add component to site-stories.js file
const generateSiteStoriesListings = (config) => {
	let additions = '';

	if (
		config.component &&
		config['site-stories'] &&
		config['site-stories'].length > 0
	) {
		additions = `\t'${config.component}': [\n`;

		config['site-stories'].forEach((storyPath) => {
			additions += `\t\trequire('raw-loader!@salesforce/design-system-react/components/${
				config.component
			}${storyPath}'),\n`;
		});

		additions += `\t],\n`;
	}

	siteStoriesFile += additions;
};

// Iterate over configFiles
configFiles.forEach((config) => {
	// Copy config over to package.json
	packageJsonFile.components.push(config);

	// Then run the other file updaters
	checkIndex(config);
	checkStorybookStories(config);
	generateSiteStoriesListings(config);
});

// Finalize site-stories file
siteStoriesFile += `};

module.exports = documentationSiteLiveExamples;
`;

// Update files
fs.writeFileSync(path.join(__dirname, '../components/index.js'), indexFile);
fs.writeFileSync(
	path.join(__dirname, '../components/site-stories.js'),
	siteStoriesFile
);
fs.writeFileSync(
	path.join(__dirname, '../components/storybook-stories.js'),
	storybookStoriesFile
);
fs.writeFileSync(
	path.join(__dirname, '../package.json'),
	JSON.stringify(packageJsonFile, null, '\t')
);
