/* `webpack.config` is the default webpack configuration and should be used for development and contributing. */

const baseConfig = require('./webpack.config.dist');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const webpack = require('webpack');

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
const config = baseConfig;

config.entry = {
	'slds-for-react-dev-examples-styles': ['./public/assets/scripts/styles.js', hotMiddlewareScript],
	'slds-for-react-dev-examples': ['./src/dev-examples', hotMiddlewareScript]
};

config.externals = {};

config.resolve.extensions.push('.scss');

config.devtool = 'inline-source-map';

config.output = {
	libraryTarget: 'umd',
	path: __dirname + '/dev-build/',
	publicPath: '/dev-build/',
	filename: '[name].bundle.js'
};

// Additional loaders
config.module.loaders.push({
	test: /\.css$/,
	loader: ExtractTextPlugin.extract('style-loader', 'css-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
});
config.module.loaders.push({
	test: /\.scss$/,
	loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
});
config.module.loaders.push({
	test: /\.(png)$/,
	loader: ExtractTextPlugin.extract('url-loader?limit=30000000&mimetype=image/png&name=../public/assets/facades/images/[name].[ext]')
});
config.module.loaders.push({
	test: /\.(eot|woff|woff2|ttf)$/,
	loader: ExtractTextPlugin.extract('url-loader?limit=30&name=/examples/[path][name].[ext]')
});

config.plugins = [
	new webpack.DefinePlugin({
		'process.env': { NODE_ENV: JSON.stringify('development') }
	}),
	new StringReplacePlugin(),
	new ExtractTextPlugin('[name].css'),
	// When upgrading, Webpack 2.0 fixees the mispelling, OccurrenceOrderPlugin
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
];

module.exports = config;
