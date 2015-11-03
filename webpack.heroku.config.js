var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var path = require('path');
var node_modules_dir = path.join(__dirname, 'node_modules');

var config = {
	entry: {
		react: ['./src/react/examples'],
		jquery: ['./src/jquery/examples']
	},
	resolve: {
		modulesDirectories: [
			'scss',
			'node_modules',
			'web_modules',
			'other'
		],
		extensions: [
			'',
			'.webpack.js',
			'.web.js',
			'.js',
			'.scss'
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
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!sass-loader")
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("style.css", {
			allChunks: true
		})
	]
};

module.exports = config;
