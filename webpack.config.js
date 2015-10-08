var webpack = require('webpack');

var entries = ['webpack-dev-server/client?http://localhost:8080', 'webpack/hot/dev-server'];
var path = require('path');
var config = {
	entry: {
		react: entries.concat('./src/react/examples.js'),
		jquery: entries.concat('./src/jquery/examples.js'),
		marionette: entries.concat('./src/jquery/examples.js'),
		tests: entries.concat('./test/tests.js')
	},
	devServer: {
		port: 8080
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
				loaders: ['react-hot', 'babel-loader?optional=runtime']
			},
			{
				test: /\.css$/,
				loader: "style-loader!css-loader"
			},
			{
				test: /\.scss$/,
				loader: 'style!css!sass'
			}, {
				test: /\.less$/,
				loader: "style!css!less"
			}, {
				test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
				loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
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
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			'process.env': {NODE_ENV: JSON.stringify('development')}
		})
	]
};

module.exports = config;
