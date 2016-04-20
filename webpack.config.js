/* `webpack.config` is the default webpack configuration and should be used for development and contributing. */

const baseConfig = require('./webpack.config.dist');
const fs = require('fs');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const webpack = require('webpack');

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
const config = baseConfig;

// `fs.realpathSync` is present to allow symlinked folders to work (such as when using `npm link`)
const coreRealPath = fs.realpathSync(path.join(__dirname, 'node_modules/slds-for-js-core'));

config.entry = {
	'dev-examples-styles': ['./public/assets/scripts/styles.js', hotMiddlewareScript],
	'dev-examples': ['./components/dev-examples', hotMiddlewareScript],
	'dev-example': ['./components/dev-example', hotMiddlewareScript],
	tests: ['./tests/dropdown/dropdown.test.js', hotMiddlewareScript]
};

config.externals = {};

config.resolve.extensions.push('.scss');
config.resolve.extensions.push('.jsx');

config.resolve.alias = {
	'slds-for-react': path.join(__dirname, 'components')
};

// Add alias to allow actual repository and not "tagged dist folder" to be used (such as when using `npm link`). The folder structure differs between them
if (coreRealPath !== path.join(__dirname, 'node_modules/slds-for-js-core')) {
	config.resolve.alias['slds-for-js-core'] = `${coreRealPath}/src`;
}

config.devtool = 'eval-cheap-module-source-map';

config.output = {
	libraryTarget: 'umd',
	path: `${__dirname}/dev-build/`,
	publicPath: '/dev-build/',
	filename: '[name].bundle.js'
};

config.module.loaders[0].include.push(path.join(__dirname, 'test'));

// Additional loaders
config.module.loaders.push({
	test: /\.css$/,
	loader: ExtractTextPlugin.extract(
		'style-loader',
		'css-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
	)
});
config.module.loaders.push({
	test: /\.scss$/,
	loader: ExtractTextPlugin.extract(
		'style-loader',
		'css-loader?sourceMap!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
	)
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
	new webpack.DefinePlugin({
		'process.env': { NODE_ENV: JSON.stringify('development') }
	}),
	new StringReplacePlugin(),
	new ExtractTextPlugin('[name].css'),
	// When upgrading, Webpack 2.0 fixees the mispelling, OccurrenceOrderPlugin
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
];

module.exports = config;
