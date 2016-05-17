/* eslint-disable indent */
"use strict";

const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const StringReplacePlugin = require('string-replace-webpack-plugin');

const packageJson = require('./package.json');
const header = packageJson.name + '\n' + 'v' + packageJson.version + '\n';
const license = fs.readFileSync('./LICENSE', 'utf8');

const plugins = [
	new StringReplacePlugin(),
	new webpack.BannerPlugin(header + license),
	new webpack.DefinePlugin({
		'process.env': { NODE_ENV: JSON.stringify('production') }
	})
];

let FILENAME = '[name].js';
if (process.env.MINIFY) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
			mangle: {
				except: ['$', 'exports', 'require']
			}
		})
  );
  FILENAME = '[name].min.js';
}

const config = {
	entry: {
		'design-system-react': ['./components']
	},
	resolve: {
		extensions: [
			'',
			'.js',
			'.jsx'
		],
		alias: {},
	},
	devtool: 'source-map',
	externals: {
		react: { amd: 'react', commonjs: 'react', commonjs2: 'react', root: 'React' },
		'react-dom': { amd: 'react-dom', commonjs: 'react-dom', commonjs2: 'react-dom', root: 'ReactDOM' },
		jquery: { amd: 'jquery', commonjs: 'jquery', commonjs2: 'jquery', root: 'jQuery' }
	},
	output: {
		filename: FILENAME,
		library: '[name]',
		libraryTarget: 'umd',
		path: './.tmp/',
		publicPath: '/.tmp/'
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)?$/,
				include: [
					path.join(__dirname, 'components'),
					path.join(__dirname, 'utilities')
				],
				loaders: ['babel', StringReplacePlugin.replace({
					replacements: [{
						pattern: /__VERSION__/g,
						replacement: () => packageJson.version
					}]
				})]
			}
		],
		preLoaders: []
	},
	plugins
};

module.exports = config;
