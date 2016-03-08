/* `webpack.config.dist` should be used to statically build the distributed library files. */

const coreConfig = require('design-system-facades/webpack.config.dist')

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const packageJson = require('./package.json');
const header = packageJson.humanReadableName + '\n' + 'v' + packageJson.version + '\n';
const license = fs.readFileSync('./LICENSE', 'utf8');

const config = coreConfig;

config.entry = {
	'facades-react': ['./src/dist.js']
};


config.externals = {
	react: { amd: 'react', commonjs: 'react', commonjs2: 'react', root: 'React' },
	'react-dom': { amd: 'react-dom', commonjs: 'react-dom', commonjs2: 'react-dom', root: 'ReactDOM' }
};

config.resolve.alias = {
	'slds-for-js-core/components': path.join(__dirname, 'node_modules/design-system-facades/src/core'),
	'slds-for-js-core/utilities': path.join(__dirname, 'node_modules/design-system-facades/utilities/main'),
	'slds-for-js-core': path.join(__dirname, 'node_modules/design-system-facades/src')
};

config.module.loaders[0].include.push(path.join(__dirname, 'node_modules/design-system-facades'));
config.module.loaders[0].include.push(path.join(__dirname, 'src'));

config.module.loaders[0].loaders = ['babel', StringReplacePlugin.replace({
	replacements: [{
		pattern: /__VERSION__/g,
		replacement: function (match, p1, offset, string) {
			return packageJson.version;
		}
	}]
})];

config.plugins = [
	new StringReplacePlugin(),
	new webpack.BannerPlugin(header + license)
];

module.exports = config;

