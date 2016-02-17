/* `webpack.config.test` should be used to run unit tests. */

var path = require('path');
const baseConfig = require('./webpack.config');
const webpack = require('webpack');

const config = baseConfig;

config.entry = {
	tests: ['./tests/SLDSButton/button.test.jsx']
};

config.module.loaders = [{
	test: /\.jsx?$/,
	loaders: ['babel'],
	include: [
		path.join(__dirname, 'src')
	]
},
{
	test: /\.(js|jsx)?$/,
	loaders: ['babel'],
	include: [
		path.join(__dirname, 'tests')
	]
}];

// var webpack = require('webpack');
// // var config = require('./webpack.config');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');


// var port = process.env.WEBPACK_PORT || 8080;
// var path = require('path');
// var entries = ['webpack-dev-server/client?http://localhost:3001', 'webpack/hot/dev-server'];

// var config = {
// 	entry: {
// 		'dev-examples-react': entries.concat('./src/react/dev-examples.js'),
// 		'dev-examples-jquery': entries.concat('./src/jquery/dev-examples.js')
// 	},
// 	output: {
// 		path: path.join(__dirname, 'dist'),
// 		filename: '[name].js',
// 		publicPath: 'http://localhost:3001/assets/bundle'
// 	},
// 	plugins: [
// 		new webpack.NoErrorsPlugin(),
// 		new ExtractTextPlugin('[name].css', {
// 			allChunks: true
// 		})
// 	],
// 	resolve: {
// 		extensions: ['', '.js', '.jsx'],
// 		alias: {
// 			'design-system-jquery': path.join(__dirname, 'src/jquery/dist.js'),
// 			'design-system-react': path.join(__dirname, 'src/react/dist.js'),
// 			'design-system-react-utilities': path.join(__dirname, 'utilities/main.js'),
// 			'design-system-utilities': path.join(__dirname, 'utilities/main.js')
// 		}
// 	},
// 	module: {
// 		loaders: [
// 			{
// 				test: /\.js$/,
// 				exclude: /node_modules/,
// 				loaders: ['react-hot', 'babel']
// 			},
// 			{
// 				test: /\.css$/,
// 				loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap")
// 			},
// 			{
// 				test: /\.scss$/,
// 				loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!sass-loader")
// 			},
// 			{
// 				test: /\.(png)$/,
// 				loader: ExtractTextPlugin.extract('url-loader?limit=30000000&mimetype=image/png&name=../public/assets/facades/images/[name].[ext]')
// 				// loader: 'url-loader?limit=30000&name=/examples/[name].[ext]'
// 			},
// 			{
// 				test: /\.(svg|jpg)$/,
// 				loader: ExtractTextPlugin.extract('url-loader?limit=3000000&name=../public/assets/facades/images/[name].[ext]')
// 				// loader: 'url-loader?limit=30000&name=/examples/[name].[ext]'
// 			},
// 			{
// 				test: /\.(eot|woff|woff2|ttf)$/,
// 				loader: ExtractTextPlugin.extract('url-loader?limit=30&name=/examples/[path][name].[ext]')
// 				// loader: 'url-loader?limit=30000&name=/examples/[name].[ext]'
// 			}
// 		]
// 	},
// 	node: { fs: 'empty' }
// };


// config.devtool = 'eval';

config.plugins = [
	new webpack.HotModuleReplacementPlugin()
].concat(config.plugins);

// config.module.loaders = config.module.loaders.map(function (loader) {
// 	if (loader.test.test('.jsx')) {
// 		loader.loaders.unshift('react-hot');
// 	}
// 	return loader;
// });

module.exports = config;
