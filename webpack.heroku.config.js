require('./scripts/helpers/setup');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StringReplacePlugin = require('string-replace-webpack-plugin');

var path = require('path');
var node_modules_dir = path.join(__dirname, 'node_modules');
var packageJson = require('./package.json');

var config = {
	entry: {
		'demo-site-examples-react-badge': ['./src/react/badge/examples/demo-page-example.js'],
		'demo-site-examples-react-button': ['./src/react/button/examples/demo-page-example.js'],
		'demo-site-examples-react-button-group': ['./src/react/button-group/examples/demo-page-example.js'],
		'demo-site-examples-react-checkbox': ['./src/react/checkbox/examples/demo-page-example.js'],
		'demo-site-examples-react-combobox': ['./src/react/combobox/examples/demo-page-example.js'],
		'demo-site-examples-react-data-table': ['./src/react/data-table/examples/demo-page-example.js'],
		'demo-site-examples-react-datepicker': ['./src/react/datepicker/examples/demo-page-example.js'],
		'demo-site-examples-react-dropdown': ['./src/react/dropdown/examples/demo-page-example.js'],
		'demo-site-examples-react-lookup': ['./src/react/lookup/examples/demo-page-example.js'],
		'demo-site-examples-react-modal': ['./src/react/modal/examples/demo-page-example.js'],
		'demo-site-examples-react-notification': ['./src/react/notification/examples/demo-page-example.js'],
		'demo-site-examples-react-picklist': ['./src/react/picklist/examples/demo-page-example.js'],
		'demo-site-examples-react-pills': ['./src/react/pills/examples/demo-page-example.js'],
		'demo-site-examples-react-popover': ['./src/react/popover/examples/demo-page-example.js'],
		'demo-site-examples-react-radio': ['./src/react/radio/examples/demo-page-example.js'],
		'demo-site-examples-react-spinner': ['./src/react/spinner/examples/demo-page-example.js'],
		'demo-site-examples-react-tooltip': ['./src/react/tooltip/examples/demo-page-example.js'],
		'demo-site-examples-react-tree': ['./src/react/tree/examples/demo-page-example.js'],
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
