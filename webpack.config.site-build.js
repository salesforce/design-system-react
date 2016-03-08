/* `webpack.config.site-build` should be used to statically build the website. */

const baseConfig = require('./webpack.config.dist');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const path = require('path');

const config = baseConfig;

config.entry = {
	'dev-examples-styles': ['./public/assets/scripts/styles.js'],
	'dev-examples-react': ['./src/dev-examples']
};

config.externals = {};

config.resolve.extensions.push('.scss');
config.resolve.alias['design-system-react'] = path.join(__dirname, 'src/dist.js');
config.resolve.alias['design-system-utilities'] = path.join(__dirname, 'node_modules/design-system-facades/utilities/main.js');
config.resolve.alias['utilities'] = path.join(__dirname, 'node_modules/design-system-facades/utilities/main.js');
config.resolve.alias['design-system-utilities-react'] = path.join(__dirname, 'node_modules/design-system-facades/utilities/main.js');

config.devtool = 'inline-source-map';

config.output = {
	libraryTarget: 'umd',
	path: __dirname + '/build/',
	publicPath: '/build/',
	filename: '[name].bundle.js'
};

// Additional loaders
config.module.loaders.push({
	test: /\.css$/,
	loader: ExtractTextPlugin.extract('style-loader', 'css-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
});
config.module.loaders.push({
	test: /\.scss$/,
	loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
});
config.module.loaders.push({
	test: /\.(png)$/,
	loader: ExtractTextPlugin.extract('url-loader?limit=30000000&mimetype=image/png&name=../public/assets/facades/images/[name].[ext]')
});
config.module.loaders.push({
	test: /\.(eot|woff|woff2|ttf)$/,
	loader: ExtractTextPlugin.extract('url-loader?limit=30&name=/examples/[path][name].[ext]')
});

config.plugins = [
	new StringReplacePlugin(),
	new webpack.optimize.UglifyJsPlugin({
		mangle: {
			except: ['$', 'exports', 'require']
		}
	}),
	new ExtractTextPlugin('[name].css?[hash]-stuff')
];

module.exports = config;
