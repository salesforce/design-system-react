/* eslint-disable indent */
'use strict';

const path = require('path');
const StringReplacePlugin = require('string-replace-webpack-plugin');

module.exports = {
  entry: {
		'design-system-react': ['./components']
	},
	resolve: {
		extensions: [
			'',
			'.js',
			'.jsx'
		]
	},
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, '.tmp'),
		filename: '[name].js',
		publicPath: '/'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				loaders: ['babel', StringReplacePlugin.replace({
					replacements: [{
						pattern: /__VERSION__/g,
						replacement: () => packageJson.version
					}]
        })],
				include: [
					path.join(__dirname, 'components'),
          path.join(__dirname, 'utilities')
				]
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.css$/,
				loaders: ["style", "css?sourceMap"]
			},
			{
				test: /\.scss$/,
				loaders: ["style", "css?sourceMap", "sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true"]
			},
			{
				test: /\.(svg|gif|jpe?g|png)$/,
				loader: 'url-loader?limit=10000'
			},
			{
				test: /\.(eot|woff|woff2|ttf)$/,
				loader: 'url-loader?limit=30&name=assets/fonts/webfonts/[name].[ext]'
			}
		]
	},
	plugins: [
    new StringReplacePlugin()
	]
};
