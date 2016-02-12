/* `webpack.config.dist` should be used to statically build the distributed library files. */

const fs = require('fs');
const webpack = require('webpack');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const packageJson = require('./package.json');
const header = packageJson.humanReadableName + '\n' + 'v' + packageJson.version + '\n';
const license = fs.readFileSync('./LICENSE', 'utf8');

const config = {
	entry: {
		'facades-react': ['./src/react/dist.js'],
		'facades-jquery': ['./src/jquery/dist.js'],
		'facades-utilities': ['./utilities/main.js']
	},
	resolve: {
		extensions: [
			'',
			'.js',
			'.jsx'
		]
	},
	devtool: 'source-map',
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM'
	},
	output: {
		path: './.tmp/',
		publicPath: '/.tmp/',
		filename: '[name].js'	// [name] is config.entry object keys
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)?$/,
				loaders: ['babel'],
				include: ['./src']
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
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
