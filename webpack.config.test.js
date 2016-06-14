/* eslint-disable indent */
/* `webpack.config.test` can be used for contributing/developing and testing. */
const webpack = require('webpack');
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
const StringReplacePlugin = require('string-replace-webpack-plugin');
const config = require('./webpack.config');

config.entry = {
	tests: ['./tests/tests-bundle.js', hotMiddlewareScript]
};

// used by enzyme
config.externals = {
	'react/lib/ReactContext': true,
	'react/lib/ExecutionEnvironment': true,
	'react/addons': true,
	cheerio: 'window'
};

config.devtool = 'eval-cheap-module-source-map';

config.output = {
	libraryTarget: 'umd',
	path: `${__dirname}/test-build/`,
	publicPath: '/test-build/',
	// [name] is config.entry object keys
	filename: '[name].bundle.js'
};

config.plugins = [
	new webpack.DefinePlugin({
		'process.env': { NODE_ENV: JSON.stringify('development') }
	}),
	new StringReplacePlugin(),
	new webpack.HotModuleReplacementPlugin()
];

module.exports = config;
