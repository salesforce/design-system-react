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
		],
		alias: {
			'design-system-jquery': path.join(__dirname, 'src/jquery/dist.js'),
			'design-system-react': path.join(__dirname, 'src/react/dist.js'),
			'design-system-utilities': path.join(__dirname, 'utilities/main.js')
		}
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
				test: /\.less$/,
				loader: 'style!css!less'
			},
			{
				test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
				loader: 'url-loader?limit=30000&name=/examples/[name]-[hash].[ext]'
			}
		],
		preLoaders: [
			{
				test: /\.js$/,
				loader: 'eslint-loader',
				exclude: /node_modules|test\/tests|test\/tests-api|test\/tests-compiled|jquery-declarative|test\/compat/
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
