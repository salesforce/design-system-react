var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StringReplacePlugin = require('string-replace-webpack-plugin');

var port = process.env.WEBPACK_PORT || 8080;
var entries = ['webpack-dev-server/client?http://localhost:' + port, 'webpack/hot/dev-server'];
var path = require('path');
var node_modules_dir = path.join(__dirname, 'node_modules');
var packageJson = require('./package.json');

var config = {
	entry: {
		'source-site-shared': entries.concat('./site/assets/facades/scripts/examples.js'),
		'source-examples-react': entries.concat('./src/react/examples.js'),
		'source-examples-jquery': entries.concat('./src/jquery/examples.js')
	},
	resolve: {
		// root: [
		// 	node_modules,
		// 	path.join(__dirname, 'scss')
		// ],
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
		]
	},
	devServer: {
		port: port
	},
	devtool: 'eval-source-map',
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
				loaders: ['react-hot', 'babel-loader?optional=runtime', StringReplacePlugin.replace({
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
			},
			{
				test: /\.(svg|png|jpg)$/,
				loader: ExtractTextPlugin.extract('url-loader?limit=30&name=/examples/[path][name].[ext]')
				// loader: 'url-loader?limit=30000&name=/examples/[name].[ext]'
			},
			{
				test: /\.(eot|woff|woff2|ttf)$/,
				loader: ExtractTextPlugin.extract('url-loader?limit=30&name=/examples/[path][name].[ext]')
				// loader: 'url-loader?limit=30000&name=/examples/[name].[ext]'
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
		new ExtractTextPlugin("style.css", {
			allChunks: true
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': {NODE_ENV: JSON.stringify('development')}
		}),
		new StringReplacePlugin()
	]
};

module.exports = config;
