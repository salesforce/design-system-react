/* `webpack.config.dist` should be used to statically build the distributed library files. */

const coreConfig = require('design-system-facades/webpack.config.dist')

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const packageJson = require('./package.json');
const header = packageJson.humanReadableName + '\n' + 'v' + packageJson.version + '\n';
const license = fs.readFileSync('./LICENSE', 'utf8');

// `fs.realpathSync` is present to allow symlinked folders to work (such as when using `npm link`) 
const coreRealPath = fs.realpathSync(path.join(__dirname, 'node_modules/design-system-facades'));

// Build on top of core webpack config
const config = coreConfig;

config.entry = {
	'slds-for-react': ['./src/dist.js']
};

// Temporary aliases needed until design-system-facades is renamed
config.resolve.alias = {
	'slds-for-js-core/components': coreRealPath + '/src/core',
	'slds-for-js-core/utilities': coreRealPath + '/utilities/main',
	'slds-for-js-core': coreRealPath + '/src'
};

// Folders to check for ES6 modules
config.module.loaders[0].include.push(path.join(__dirname, 'node_modules/design-system-facades'));
config.module.loaders[0].include.push(path.join(__dirname, 'src'));

// Insert version number from package.json into library
config.module.loaders[0].loaders = ['babel', StringReplacePlugin.replace({
	replacements: [{
		pattern: /__VERSION__/g,
		replacement: function (match, p1, offset, string) {
			return packageJson.version;
		}
	}]
})];

// Add banner and license to built and bundled files
config.plugins = [
	new StringReplacePlugin(),
	new webpack.BannerPlugin(header + license)
];

module.exports = config;

