var webpack = require('webpack');
var StringReplacePlugin = require('string-replace-webpack-plugin');

var entries = ['webpack-dev-server/client?http://localhost:8080', 'webpack/hot/dev-server'];
var path = require('path');
var node_modules_dir = path.join(__dirname, 'node_modules');
var packageJson = require('./package.json');

var config = {
	entry: {
		react: ['./src/react/dist.js'],
		jquery: ['./src/jquery/dist.js']
	},
	resolve: {
		modulesDirectories: [
			'scss',
			'node_modules',
			'web_modules',
			'other',
		],
		extensions: [
			'',
			'.webpack.js',
			'.web.js',
			'.js',
			'.scss',
		]
	},
	devtool: 'source-map',
	output: {
		libraryTarget: 'amd',
		path: __dirname + '/.tmp/',
		publicPath: '/.tmp/',
		filename: '[name].js'
	},
	externals: {
		react: 'react',
		'react-dom': 'react-dom'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ['babel-loader?optional=runtime', StringReplacePlugin.replace({
					replacements: [{
						pattern: /__VERSION__/g,
						replacement: function (match, p1, offset, string) {
							return packageJson.version;
						}
					}]
				})]
			}
		]
	},
	plugins: [
		new StringReplacePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			mangle: {
				except: ['$', 'exports', 'require']
			}
		})
	]
};

module.exports = config;
