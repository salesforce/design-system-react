/* `webpack.config` is the default webpack configuration and should be used for development and contributing. */

const baseConfig = require('./webpack.config.site-build');

const packageJson = require('./package.json');
const path = require('path');
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
	new ExtractTextPlugin("[name].css"),
	new webpack.optimize.OccurenceOrderPlugin(),
  // Webpack 2.0 fixed this mispelling
  // new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
]

module.exports = config;