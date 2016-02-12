/* `webpack.config.site-build` should be used to statically build the website. */

const baseConfig = require('./webpack.config.dist');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StringReplacePlugin = require('string-replace-webpack-plugin');
const path = require('path');
const packageJson = require('./package.json');

const config = baseConfig;

config.entry = {
	'facades-demo-styles': ['./site/assets/shared/scripts/styles.js', './site/assets/demo-site/scripts/styles.js'],
	'dev-examples-styles': ['./site/assets/facades/scripts/styles.js'],
	'dev-examples-react': ['./src/react/dev-examples'],
	'demo-site-examples-react': ['./site/src/demo-site-examples-react'],
	'dev-examples-jquery': ['./src/jquery/dev-examples'],
	'demo-site-examples-jquery': ['./site/src/demo-site-examples-jquery']
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


config.module.loaders.push({
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


// config = {
// 	entry: {
		// 'facades-demo-styles': ['./site/assets/shared/scripts/styles.js', './site/assets/demo-site/scripts/styles.js'],
		// 'dev-examples-styles': ['./site/assets/facades/scripts/styles.js'],
		// 'dev-examples-react': ['./src/react/dev-examples'],
		// 'demo-site-examples-react': ['./site/src/demo-site-examples-react'],
		// 'dev-examples-jquery': ['./src/jquery/dev-examples'],
		// 'demo-site-examples-jquery': ['./site/src/demo-site-examples-jquery']
// 	},
// 	resolve: {
// 		extensions: [
// 			'',
// 			'.js',
// 			'.jsx',
// 			'.scss'
// 		],
// 		alias: {
// 			'design-system-jquery': path.join(__dirname, 'src/jquery/dist.js'),
// 			'design-system-react': path.join(__dirname, 'src/react/dist.js'),
// 			'design-system-utilities': path.join(__dirname, 'utilities/main.js'),
// 			'design-system-utilities-jquery': path.join(__dirname, 'utilities/jquery.js'),
// 			'design-system-utilities-react': path.join(__dirname, 'utilities/react.js')
// 		}
// 	},
// 	devtool: 'source-map',
// 	output: {
// 		path: __dirname + '/build/',
// 		publicPath: '/build/',
// 		filename: '[name].bundle.js',
// 		devtoolLineToLine: true
// 	},
// 	module: {
// 		loaders: []
// 	},

// 	// module: {
// 	// 	loaders: [
// 	// 		{
// 	// 			test: /\.js$/,
// 	// 			exclude: /node_modules/,
// 	// 			loaders: ['babel', StringReplacePlugin.replace({
// 	// 				replacements: [{
// 	// 					pattern: /__VERSION__/g,
// 	// 					replacement: function (match, p1, offset, string) {
// 	// 						return packageJson.version;
// 	// 					}
// 	// 				}]
// 	// 			})]
// 	// 		},
// 	// 		{
// 	// 			test: /\.css$/,
// 	// 			loader: ExtractTextPlugin.extract("style-loader", "css-loader")
// 	// 		},
// 	// 		{
// 	// 			test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
// 	// 			loader: 'url-loader?limit=30000000000000&name=/examples/[name]-[hash].[ext]'
// 	// 		},
// 	// 		{
// 	// 			test: /\.scss$/,
// 	// 			loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap!sass-loader")
// 	// 		}
// 	// 	],
// 	// 	preLoaders: [
// 	// 		{
// 	// 			test: /\.js$/,
// 	// 			loaders: ['eslint-loader', StringReplacePlugin.replace({
// 	// 				replacements: [{
// 	// 					pattern: /assets\/icons/g,
// 	// 					replacement: function (match, p1, offset, string) {
// 	// 						return 'assets/design-system/icons';
// 	// 					}
// 	// 				}]
// 	// 			})],
// 	// 			exclude: /node_modules|test\/tests|test\/tests-api|test\/tests-compiled|jquery-declarative|test\/compat/
// 	// 		},
// 	// 		{
// 	// 			test: /\.css$/,
// 	// 			loader: StringReplacePlugin.replace({
// 	// 				replacements: [{
// 	// 					pattern: /assets\/fonts\/webfonts/g,
// 	// 					replacement: function (match, p1, offset, string) {
// 	// 						return 'assets/design-system/fonts/webfonts';
// 	// 					}
// 	// 				},{
// 	// 					pattern: /assets\/images\/landing/g,
// 	// 					replacement: function (match, p1, offset, string) {
// 	// 						return 'assets/design-system/images/landing';
// 	// 					}
// 	// 				}]
// 	// 			})
// 	// 		},
// 	// 		{
// 	// 			test: /\.scss$/,
// 	// 			loader: StringReplacePlugin.replace({
// 	// 				replacements: [{
// 	// 					pattern: /assets\/images\/landing/g,
// 	// 					replacement: function (match, p1, offset, string) {
// 	// 						return 'assets/demo-site/images/landing';
// 	// 					}
// 	// 				}]
// 	// 			})
// 	// 		}
// 	// 	]
// 	// },
// 	plugins: [
// 		new ExtractTextPlugin('[name].css'),
// 		new StringReplacePlugin(),
// 		new webpack.optimize.UglifyJsPlugin({
// 			mangle: {
// 				except: ['$', 'exports', 'require']
// 			}
// 		})
// 	]
// };

config.plugins = [
	new StringReplacePlugin(),
	new ExtractTextPlugin("[name].css"),
	new webpack.optimize.UglifyJsPlugin({
		mangle: {
			except: ['$', 'exports', 'require']
		}
	})
];


module.exports = config;
