/* eslint-disable indent */
'use strict';

const fs = require('fs');
const webpack = require('webpack');

const packageJson = require('./package.json');
const header = packageJson.name + '\n' + 'v' + packageJson.version + '\n';
const license = fs.readFileSync('./LICENSE', 'utf8');

const baseConfig = require('./webpack.config');

const config = Object.assign({}, baseConfig, {
	externals: {
		react: { amd: 'react', commonjs: 'react', commonjs2: 'react', root: 'React' },
		'react/addons': { amd: 'react', commonjs: 'react', commonjs2: 'react', root: 'React' },
		'react-dom': { amd: 'react-dom', commonjs: 'react-dom', commonjs2: 'react-dom', root: 'ReactDOM' }
	}
});

let FILENAME = '[name].js';
if (process.env.MINIFY) {
	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			mangle: {
				except: ['$', 'exports', 'require']
			}
		})
	);
	FILENAME = '[name].min.js';
}

config.output.filename = FILENAME;
config.output.library = '[name]';
config.output.libraryTarget = 'umd';

config.plugins.push(new webpack.BannerPlugin(header + license));
config.plugins.push(new webpack.DefinePlugin({
	'process.env': { NODE_ENV: JSON.stringify('production') }
}));

module.exports = config;
