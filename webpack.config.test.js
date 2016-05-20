/* `webpack.config.test` can be used for contributing/developing and testing. */

const fs = require('fs');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

const config = {
	entry: {
		'dev-examples': ['./server/dev-examples', hotMiddlewareScript],
		tests: ['./tests/tests_bundle.js', hotMiddlewareScript]
	},
	resolve: {
		extensions: [
			'',
			'.js',
			'.jsx'
		],
		alias: {
			'design-system-react': __dirname + '/components'
		}
	},
	devtool: 'eval-cheap-module-source-map',
	output: {
		libraryTarget: 'umd',
		path: `${__dirname}/dev-build/`,
		publicPath: '/dev-build/',
		// [name] is config.entry object keys
		filename: '[name].bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)?$/,
				loaders: ['babel'],
				include: [
					path.join(__dirname, 'components'),
					path.join(__dirname, 'server/dev-examples'),
					path.join(__dirname, 'test'),
					path.join(__dirname, 'utilities')
				]
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': { NODE_ENV: JSON.stringify('development') }
		}),
		new ExtractTextPlugin('[name].css'),
		// When upgrading, Webpack 2.0 fixees the mispelling, OccurrenceOrderPlugin
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin()
	]
};

module.exports = config;