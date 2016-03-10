/* `webpack.config.dist` should be used to statically build the distributed library files. */

const coreConfig = require('slds-for-js-core/webpack.config.base');

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

// `fs.realpathSync` is present to allow symlinked folders to work (such as when using `npm link`) 
const coreRealPath = fs.realpathSync(path.join(__dirname, 'node_modules/slds-for-js-core'));

// Build on top of core webpack config
const config = coreConfig;

config.entry = {
	'slds.bundle': ['./src/dist.js']
};

// Folders to check for ES6 modules
config.module.loaders[0].include = [
	coreRealPath,
	path.join(__dirname, 'src')
];

module.exports = config;

