/* `webpack.config` is the default webpack configuration and should be used for development and contributing. */

const baseConfig = require('./webpack.heroku.config');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
const config = baseConfig;

config.entry['facades-demo-styles'].push(hotMiddlewareScript);
config.entry['demo-site-examples-react'].push(hotMiddlewareScript);
config.entry['demo-site-examples-jquery'].push(hotMiddlewareScript);
config.entry['dev-examples-styles'].push(hotMiddlewareScript);
config.entry['dev-examples-react'].push(hotMiddlewareScript);
config.entry['dev-examples-jquery'].push(hotMiddlewareScript);

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
