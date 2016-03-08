/* `webpack.config.dist` should be used to statically build the distributed library files. */

const coreConfig = require('design-system-facades/webpack.config.dist')

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

const config = coreConfig;

config.entry = {
	'facades-react': ['./src/dist.js']
};

config.resolve.alias = {
	'slds-for-js-core/components': path.join(__dirname, 'node_modules/design-system-facades/src/core'),
	'slds-for-js-core/utilities': path.join(__dirname, 'node_modules/design-system-facades/utilities/main'),
	'slds-for-js-core': path.join(__dirname, 'node_modules/design-system-facades/src')
};

config.module.loaders[0].include.push(path.join(__dirname, 'node_modules/design-system-facades'));
config.module.loaders[0].include.push(path.join(__dirname, 'src'));

module.exports = config;

