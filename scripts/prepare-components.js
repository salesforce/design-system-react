const babel = require('@babel/core'); // eslint-disable-line import/no-extraneous-dependencies
const babelGenerator = require('babel-generator'); // eslint-disable-line import/no-extraneous-dependencies
const babelTypes = require('babel-types');
const glob = require('glob');
const path = require('path');
const fs = require('fs');

// Configure babel options
const babelRC = require('../babel.config.js');

delete babelRC.ignore;
delete babelRC.overrides;
const babelOpts = babel.loadOptions(babelRC);
babelOpts.ast = true;

// Load copy of package.json
let packageJsonFile = fs.readFileSync(
	path.join(__dirname, '../package.json'),
	'utf8'
);
if (packageJsonFile) {
	try {
		packageJsonFile = JSON.parse(packageJsonFile);
	} catch (err) {
		throw new Error(err.message);
	}

	// Empty the components array
	packageJsonFile.components = [];
} else {
	throw new Error(
		'The package.json file is missing or was not loaded correctly'
	);
}

// Get all component configuration files
const configFiles = glob.sync(
	`${path.join(__dirname, '../components')}/**/component.json`
);
configFiles.forEach((filePath, index) => {
	const data = fs.readFileSync(filePath, 'utf8');
	if (data) {
		try {
			configFiles[index] = JSON.parse(data.toString());
		} catch (err) {
			throw new Error(err.message);
		}
	} else {
		throw new Error(
			`The configuration file at ${filePath} is missing or was not loaded correctly.`
		);
	}
});

// Read index file
let indexFile = fs.readFileSync(path.join(__dirname, '../components/index.js'));
if (indexFile) {
	try {
		indexFile = babel.parse(indexFile.toString(), babelOpts);
	} catch (err) {
		throw new Error(err.message);
	}

	// Removing leading comments as they will be added in final output
	if (
		indexFile &&
		indexFile.program &&
		indexFile.program.body[0] &&
		indexFile.program.body[0].leadingComments
	) {
		delete indexFile.program.body[0].leadingComments;
	}
} else {
	throw new Error(
		'The "../components/index.js" file is missing or was not loaded correctly'
	);
}
// A list of required index file entries. This will be filled up from config files and compared against what's already in the index file later.
const indexFileRequirements = {};

// Create initial site-stories string
let siteStoriesFile = `/* eslint-disable max-lines */ // This object is imported into the documentation site. An example for the documentation site should be part of the pull request for the component. The object key is the component value listed in the component's component.json file. The following uses webpack's raw-loader plugin to get "text files" that will be eval()'d by CodeMirror within the documentation site on page load.

/* eslint-env node */
/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */

const documentationSiteLiveExamples = {
`;

// Add component to site-stories.js file
const generateSiteStoriesListings = (config) => {
	let additions = '';

	if (
		config.component &&
		config['site-stories'] &&
		config['site-stories'].length > 0
	) {
		additions = `\t${
			config.component.search(/-/g) >= 0
				? `'${config.component}'`
				: config.component
		}: [\n`;

		config['site-stories'].forEach((storyPath) => {
			additions += `\t\t{\n`;
			additions += `\t\t\theading: '${storyPath.heading}',\n`;
			additions += `\t\t\tpath: require('raw-loader!@salesforce/design-system-react/components/${
				config.component
			}${storyPath.path}'),\n`;
			additions += `\t\t},\n`;
		});

		additions += `\t],\n`;
	}

	siteStoriesFile += additions;
};

// Iterate over configFiles
configFiles.forEach((config) => {
	// Add config items to indexFileRequirements
	if (config.component && config.classKey) {
		indexFileRequirements[`${config.classKey}`] = `./${config.component}`;
		indexFileRequirements[`SLDS${config.classKey}`] = `./${config.component}`;
	}
	if (config.dependencies && config.dependencies.length > 0) {
		config.dependencies.forEach((dependency) => {
			if (config.component && dependency.component && dependency.classKey) {
				indexFileRequirements[`${dependency.classKey}`] = `./${
					config.component
				}/${dependency.component}`;
				indexFileRequirements[`SLDS${dependency.classKey}`] = `./${
					config.component
				}/${dependency.component}`;
			}
		});
	}

	if (!config['is-deprecated']) {
		// Copy config over to package.json
		packageJsonFile.components.push(config);

		// Add to site stories
		generateSiteStoriesListings(config);
	}
});

// Traverse over the parsed index file
babel.traverse(indexFile, {
	ExportNamedDeclaration(ePath) {
		if (ePath.parentPath.isProgram()) {
			const { node } = ePath;

			// Check if the export name is on the indexFileRequirements list
			if (
				node.specifiers[0] &&
				node.specifiers[0].exported &&
				node.specifiers[0].exported.name &&
				indexFileRequirements[node.specifiers[0].exported.name]
			) {
				// Remove the listing from indexFileRequirements since it's already in the file
				delete indexFileRequirements[node.specifiers[0].exported.name];
			}
		}
	},
});

// Iterate over indexFileRequirements and add missing listings to the indexFile program body
Object.keys(indexFileRequirements).forEach((key) => {
	const entry = babelTypes.exportNamedDeclaration(
		null,
		[],
		babelTypes.stringLiteral(indexFileRequirements[key])
	);

	entry.specifiers.push(
		babelTypes.exportDefaultSpecifier(babelTypes.identifier(key))
	);

	if (indexFile && indexFile.program && indexFile.program.body) {
		indexFile.program.body.push(entry);
	}
});

// Sort the indexFile exports
if (indexFile && indexFile.program && indexFile.program.body) {
	indexFile.program.body.sort((node1, node2) => {
		if (
			node1.type === 'ExportNamedDeclaration' &&
			node1.specifiers[0] &&
			node1.specifiers[0].exported &&
			node1.specifiers[0].exported.name &&
			node1.specifiers[0].type === 'ExportDefaultSpecifier' &&
			node2.type === 'ExportNamedDeclaration' &&
			node2.specifiers[0] &&
			node2.specifiers[0].exported &&
			node2.specifiers[0].exported.name &&
			node2.specifiers[0].type === 'ExportDefaultSpecifier'
		) {
			const matchSLDS = /^(SLDS)/;
			let node1name = node1.specifiers[0].exported.name;
			let node2name = node2.specifiers[0].exported.name;

			const isPrefixedNode1 = Boolean(node1name.search(matchSLDS) > -1);
			const isPrefixedNode2 = Boolean(node2name.search(matchSLDS) > -1);

			node1name = node1name.replace(matchSLDS, '');
			node2name = node2name.replace(matchSLDS, '');

			if (node1name === node2name) {
				if (!isPrefixedNode1 && isPrefixedNode2) {
					return -1;
				}
				if (isPrefixedNode1 && !isPrefixedNode2) {
					return 1;
				}
				return 0;
			}

			if (node1name < node2name) {
				return -1;
			}
			return 1;
		}
		return 0;
	});
}

// Convert indexFile back into a string and finalize with comments
indexFile = babelGenerator.default(indexFile, { quotes: 'single' }).code;
indexFile = `/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable camelcase */

${indexFile}
`;

// Finalize site-stories file
siteStoriesFile += `};

module.exports = documentationSiteLiveExamples;
`;

// Write updated files back to their source
try {
	fs.writeFileSync(path.join(__dirname, '../components/index.js'), indexFile);
	fs.writeFileSync(
		path.join(__dirname, '../components/site-stories.js'),
		siteStoriesFile
	);
	fs.writeFileSync(
		path.join(__dirname, '../package.json'),
		`${JSON.stringify(packageJsonFile, null, '\t')}\n`
	);
} catch (err) {
	throw new Error(err.message);
}
