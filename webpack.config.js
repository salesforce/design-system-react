/* `webpack.config` is the default webpack configuration and should be used for development and contributing. */

const baseConfig = require('./webpack.config.dist');

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
const config = baseConfig;

// config.entry['facades-demo-styles'].push(hotMiddlewareScript);
// config.entry['demo-site-examples-react'].push(hotMiddlewareScript);
// config.entry['demo-site-examples-jquery'].push(hotMiddlewareScript);
// config.entry['dev-examples-styles'].push(hotMiddlewareScript);
// config.entry['dev-examples-react'].push(hotMiddlewareScript);
// config.entry['dev-examples-jquery'].push(hotMiddlewareScript);


config.entry = {
	'facades-demo-styles': ['./site/assets/shared/scripts/styles.js', './site/assets/demo-site/scripts/styles.js', hotMiddlewareScript],
	'demo-site-examples-react': ['./site/src/demo-site-examples-react', hotMiddlewareScript],
	'demo-site-examples-jquery': ['./site/src/demo-site-examples-jquery', hotMiddlewareScript],
	'dev-examples-styles': ['./site/assets/facades/scripts/styles.js', hotMiddlewareScript],
	'dev-examples-react': ['./src/react/dev-examples.js', hotMiddlewareScript],
	'dev-examples-jquery': ['./src/jquery/dev-examples.js', hotMiddlewareScript]
};

config.externals = {};

config.resolve.extensions.push('.scss');
config.resolve.alias = {
	'design-system-jquery': path.join(__dirname, 'src/jquery/dist.js'),
	'design-system-react': path.join(__dirname, 'src/react/dist.js'),
	'design-system-utilities': path.join(__dirname, 'utilities/main.js'),
	'design-system-utilities-react': path.join(__dirname, 'utilities/main.js'),
	'design-system-utilities-jquery': path.join(__dirname, 'utilities/main.js')
};
config.devtool = 'eval-source-map';
config.output = {
	path: __dirname + '/build/',
	publicPath: '/build/',
	filename: '[name].bundle.js'
};

config.module.loaders.push({
	test: /\.(js|jsx)?$/,
	loaders: ['babel'],
	include: ['./src']
});

// Additional loaders
config.module.loaders.push({
	test: /\.css$/,
	loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap')
});
config.module.loaders.push({
	test: /\.scss$/,
	loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!sass-loader')
});
config.module.loaders.push({
	test: /\.(png)$/,
	loader: ExtractTextPlugin.extract('url-loader?limit=30000000&mimetype=image/png&name=../public/assets/facades/images/[name].[ext]')
});
config.module.loaders.push({
	test: /\.(svg|jpg)$/,
	loader: ExtractTextPlugin.extract('url-loader?limit=3000000&name=../public/assets/facades/images/[name].[ext]')
});
config.module.loaders.push({
	test: /\.(eot|woff|woff2|ttf)$/,
	loader: ExtractTextPlugin.extract('url-loader?limit=30&name=/examples/[path][name].[ext]')
});

// Additional preloaders
config.module.loaders.push({
	test: /\.css$/,
	loader: StringReplacePlugin.replace({
		replacements: [{
			pattern: /assets\/fonts\/webfonts/g,
			replacement: function (match, p1, offset, string) {
				return 'assets/design-system/fonts/webfonts';
			}
		},
		{
			pattern: /assets\/images\/landing/g,
			replacement: function (match, p1, offset, string) {
				return 'assets/design-system/images/landing';
			}
		}]
	})
});
config.module.loaders.push({
	test: /\.scss$/,
	loader: StringReplacePlugin.replace({
		replacements: [{
			pattern: /assets\/images\/landing/g,
			replacement: function (match, p1, offset, string) {
				return 'assets/demo-site/images/landing';
			}
		}]
	})
});

config.plugins = [
	new webpack.DefinePlugin({
		'process.env': { NODE_ENV: JSON.stringify('development') }
	}),
	new StringReplacePlugin(),
	new ExtractTextPlugin("[name].css"),
	new webpack.optimize.OccurenceOrderPlugin(),
  // Webpack 2.0 fixed this mispelling
  // new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
]

module.exports = config;