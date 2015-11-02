var webpack = require('webpack');
var path = require('path');
var node_modules_dir = path.join(__dirname, 'node_modules');

var config = {
	entry: {
		react: ['./src/react/examples.js'],
		jquery: ['./src/jquery/examples.js']
	},
	resolve: {
		// root: [
		// 	node_modules
		// ],
		modulesDirectories: [
			'node_modules'
		],
		extensions: [
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
