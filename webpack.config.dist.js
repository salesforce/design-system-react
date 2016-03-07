/* `webpack.config.dist` should be used to statically build the distributed library files. */

const fs = require('fs');
const webpack = require('webpack');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const packageJson = require('./package.json');
const header = packageJson.humanReadableName + '\n' + 'v' + packageJson.version + '\n';
const license = fs.readFileSync('./LICENSE', 'utf8');
const path = require('path');

const config = {
	entry: {
		'facades-react': ['./src/dist.js']
	},
	resolve: {
		extensions: [
			'',
			'.js',
			'.jsx'
		],
		alias: {
			'slds-for-js-core': path.join(__dirname, 'node_modules/design-system-facades/src'),
			'slds-for-js-core-components': path.join(__dirname, 'node_modules/design-system-facades/src/core'),
			'utilities': path.join(__dirname, 'node_modules/design-system-facades/utilities/main.js')
		}
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
		filename: '[name].js'	// [name] is config.entry object keys
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				include: [
					path.join(__dirname, 'src'),
					path.join(__dirname, 'node_modules/design-system-facades')
				],
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

module.exports = config;
