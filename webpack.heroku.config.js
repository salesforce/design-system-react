var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StringReplacePlugin = require('string-replace-webpack-plugin');

var path = require('path');
var node_modules_dir = path.join(__dirname, 'node_modules');
var packageJson = require('./package.json');

var config = {
	entry: {
		'source-examples-react': ['./src/react/examples'],
		'site-examples-react': ['./site/src/site-react'],
		'site-examples-jquery': ['./site/src/site-jquery'],
		'source-examples-jquery': ['./src/jquery/examples']
	},
	resolve: {
		modulesDirectories: [
			'scss',
			'node_modules',
			'web_modules',
			'other'
		],
		extensions: [
			'',
			'.webpack.js',
			'.web.js',
			'.js',
			'.scss'
		],
		alias: {
			'design-system-jquery': path.join(__dirname, 'src/jquery/dist.js'),
			'design-system-react': path.join(__dirname, 'src/react/dist.js'),
			'design-system-utilities': path.join(__dirname, 'utilities/main.js')
		}
	},
	devtool: 'source-map',
	output: {
		path: __dirname + '/build/',
		publicPath: '/build/',
		filename: '[name].bundle.js'
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
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader")
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!sass-loader")
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("style.css", {
			allChunks: true
		}),
		new StringReplacePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			mangle: {
				except: ['$', 'exports', 'require']
			}
		})
	]
};

module.exports = config;
