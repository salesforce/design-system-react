/* `webpack.config.dist` should be used to statically build the distributed library files. */

/* `webpack.config.base` can be inherited by slds-for-react and slds-for-jquery. */

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const packageJson = require('./package.json');
const header = packageJson.humanReadableName + '\n' + 'v' + packageJson.version + '\n';
const license = fs.readFileSync('./LICENSE', 'utf8');

const config = {
	resolve: {
		extensions: [
			'',
			'.js',
			'.jsx'
		],
		alias: {},
	},
	devtool: 'source-map',
	externals: {
		react: { amd: 'react', commonjs: 'react', commonjs2: 'react', root: 'React' },
		'react-dom': { amd: 'react-dom', commonjs: 'react-dom', commonjs2: 'react-dom', root: 'ReactDOM' },
		jquery: { amd: 'jquery', commonjs: 'jquery', commonjs2: 'jquery', root: 'jQuery' }
	},
	output: {
		libraryTarget: 'umd',
		path: './.tmp/',
		publicPath: '/.tmp/',
		filename: '[name].js' // [name] is config.entry object keys
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)?$/,
				include: [],
				loaders: ['babel', StringReplacePlugin.replace({
					replacements: [{
						pattern: /__VERSION__/g,
						replacement: function (match, p1, offset, string) {
							return packageJson.version;
						}
					}]
				})]
			}
		],
		preLoaders: []
	},
	plugins: [
		new StringReplacePlugin(),
		new webpack.BannerPlugin(header + license)
	]
};


// `fs.realpathSync` is present to allow symlinked folders to work (such as when using `npm link`)
const coreRealPath = fs.realpathSync(path.join(__dirname, 'node_modules/slds-for-js-core'));

// Build on top of core webpack config
config.entry = {
	'slds.bundle': ['./components/dist.js'],
	'slds.utilities': ['./node_modules/slds-for-js-core/utilities/main.js']
};

// Folders to check for ES6 modules
config.module.loaders[0].include = [
	coreRealPath,
	path.join(__dirname, 'components')
];

module.exports = config;
