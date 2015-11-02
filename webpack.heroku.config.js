var webpack = require('webpack');
var path = require('path');
var node_modules_dir = path.join(__dirname, 'node_modules');

var config = {
	entry: {
		react: ['./src/react/examples'],
		jquery: ['./src/jquery/examples']
	},
	resolve: {
		modulesDirectories: [
			'node_modules',
			'web_modules',
			'other'
		],
		extensions: [
			'',
			'.webpack.js',
			'.web.js',
			'.js'
		]
	},
	devtool: 'cheap-source-map',
	output: {
		path: __dirname + '/build/',
		publicPath: '/build/',
		filename: '[name].bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ['babel-loader?optional=runtime']
			}
		]
	},
	plugins: []
};

module.exports = config;
