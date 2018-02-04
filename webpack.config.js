/* eslint-env node */
const path = require('path');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const packageJson = require('./package.json');

const config = {
	entry: {
		'design-system-react': ['./components'],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, '.tmp'),
		filename: '[name].js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loaders: [
					'babel-loader',
					StringReplacePlugin.replace({
						replacements: [
							{
								pattern: /__VERSION__/g,
								replacement: () => packageJson.version,
							},
						],
					}),
				],
				include: [
					path.join(__dirname, 'components'),
					path.join(__dirname, 'css'),
					path.join(__dirname, 'icons'),
					path.join(__dirname, 'tests'),
					path.join(__dirname, 'utilities'),
				],
			},
			{
				test: /\.json$/,
				loader: 'json-loader',
			},
			{
				test: /\.css$/,
				loaders: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(svg|gif|jpe?g|png)$/,
				loader: 'file-loader?limit=10000',
			},
			{
				test: /\.(eot|woff|woff2|ttf)$/,
				loader: 'file-loader?limit=30&name=fonts/webfonts/[name].[ext]',
			},
		],
	},
	plugins: [new StringReplacePlugin()],
};

module.exports = config;
