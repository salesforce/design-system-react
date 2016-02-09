require('./scripts/helpers/setup');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StringReplacePlugin = require('string-replace-webpack-plugin');

var path = require('path');
var node_modules_dir = path.join(__dirname, 'node_modules');
var packageJson = require('./package.json');

var config = {
	entry: {
		'facades-demo-styles': ['./site/assets/shared/scripts/styles.js', './site/assets/demo-site/scripts/styles.js'],
		'dev-examples-styles': ['./site/assets/facades/scripts/styles.js'],
		'dev-examples-react': ['./src/react/dev-examples'],
		'demo-site-examples-react': ['./site/src/demo-site-examples-react'],
		'dev-examples-jquery': ['./src/jquery/dev-examples'],
		'demo-site-examples-jquery': ['./site/src/demo-site-examples-jquery']
	},
	resolve: {
		modulesDirectories: [
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
			'design-system-utilities': path.join(__dirname, 'utilities/main.js'),
			'design-system-react': path.join(__dirname, 'src/react/dist.js'),
			'design-system-utilities-jquery': path.join(__dirname, 'utilities/jquery.js'),
			'design-system-utilities-react': path.join(__dirname, 'utilities/react.js')
		}
	},
	devtool: 'source-map',
	output: {
		path: __dirname + '/build/',
		publicPath: '/build/',
		filename: '[name].bundle.js',
		devtoolLineToLine: true
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ['babel', StringReplacePlugin.replace({
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
				test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
				loader: 'url-loader?limit=30000000000000&name=/examples/[name]-[hash].[ext]'
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!sass-loader")
			}
		],
		preLoaders: [
			{
				test: /\.js$/,
				loaders: ['eslint-loader', StringReplacePlugin.replace({
					replacements: [{
						pattern: /assets\/icons/g,
						replacement: function (match, p1, offset, string) {
							return 'assets/design-system/icons';
						}
					}]
				})],
				exclude: /node_modules|test\/tests|test\/tests-api|test\/tests-compiled|jquery-declarative|test\/compat/
			},
			{
				test: /\.css$/,
				loader: StringReplacePlugin.replace({
					replacements: [{
						pattern: /assets\/fonts\/webfonts/g,
						replacement: function (match, p1, offset, string) {
							return 'assets/design-system/fonts/webfonts';
						}
					},{
						pattern: /assets\/images\/landing/g,
						replacement: function (match, p1, offset, string) {
							return 'assets/design-system/images/landing';
						}
					}]
				})
			},
			{
				test: /\.scss$/,
				loader: StringReplacePlugin.replace({
					replacements: [{
						pattern: /assets\/images\/landing/g,
						replacement: function (match, p1, offset, string) {
							return 'assets/demo-site/images/landing';
						}
					}]
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin("[name].css"),
		new StringReplacePlugin(),
		new webpack.optimize.UglifyJsPlugin({
			mangle: {
				except: ['$', 'exports', 'require']
			}
		})
	]
};

module.exports = config;
