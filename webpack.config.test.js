/* `webpack.config.test` should be used to run unit tests. */
var path = require('path');
const webpack = require('webpack');

var config = { // kind of a copy of your webpack config
	devtool: 'inline-source-map', // just do inline source maps instead of the default
	module: {
		loaders: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/,
		}]
	}
};

module.exports = config;
