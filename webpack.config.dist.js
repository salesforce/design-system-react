/* `webpack.config.dist` should be used to statically build the distributed library files. */

const coreConfig = require('design-system-facades/webpack.config.dist')

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

// `fs.realpathSync` is present to allow symlinked folders to work (such as when using `npm link`) 
const coreRealPath = fs.realpathSync(path.join(__dirname, 'node_modules/design-system-facades'));

// Build on top of core webpack config
const config = coreConfig;

config.entry = {
	'slds.bundle': ['./src/dist.js']
};

// Temporary aliases needed until design-system-facades is renamed
config.resolve.alias = {
	'slds-for-js-core/components': coreRealPath + '/src/core',
	'slds-for-js-core/utilities': coreRealPath + '/utilities/main',
	'slds-for-js-core': coreRealPath + '/src'
};

// Folders to check for ES6 modules
config.module.loaders[0].include = [
	coreRealPath,
	path.join(__dirname, 'src')
];

module.exports = config;

