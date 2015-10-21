var webpack = require('webpack');

var entries = ['webpack-dev-server/client?http://localhost:8080', 'webpack/hot/dev-server'];
var path = require('path');
var node_modules_dir = path.join(__dirname, 'node_modules');

var config = {
	entry: {
		// react: ['./src/react/examples.js'],
		jquery: ['./src/jquery/dist.js']
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
		path: __dirname + '/build/',
		publicPath: '/build/',
		filename: '[name].dist.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loaders: ['babel-loader?optional=runtime']
			},
			// {
			// 	test: /\.css$/,
			// 	loader: "style-loader!css-loader"
			// },
			// {
			// 	test: /\.scss$/,
			// 	loader: 'style!css!sass'
			// }, {
			// 	test: /\.less$/,
			// 	loader: "style!css!less"
			// }
		]
	},
	plugins: []
};

module.exports = config;
