/* `webpack.config` is the default webpack configuration and should be used for development and contributing. */

const fs = require('fs');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

// needed by dev config
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';

// needed by dist config
const packageJson = require('./package.json');
const header = packageJson.humanReadableName + '\n' + 'v' + packageJson.version + '\n';
const license = fs.readFileSync('./LICENSE', 'utf8');


// dist
const config = {
	resolve: {
		extensions: [
			'',
			'.js',
			'.jsx'
		],
		alias: {}
	},
	devtool: 'source-map',
	externals: {
		react: { amd: 'react', commonjs: 'react', commonjs2: 'react', root: 'React' },
		'react-dom': { amd: 'react-dom', commonjs: 'react-dom', commonjs2: 'react-dom', root: 'ReactDOM' },
		jquery: { amd: 'jquery', commonjs: 'jquery', commonjs2: 'jquery', root: 'jQuery' }
	},
	output: {
		libraryTarget: 'umd',
		path: './.tmp/',
		publicPath: '/.tmp/',
		filename: '[name].js' // [name] is config.entry object keys
	},
	module: {
		loaders: [
			{
				test: /\.(js|jsx)?$/,
				include: [],
				loaders: ['babel']
			}
		],
		preLoaders:[]
	},
	plugins: [
		new webpack.BannerPlugin(header + license)
	]
};


// Default and dev environment
config.entry = {
	'slds.bundle': ['./components/dist.js']
};

// Folders to check for ES6 modules
config.module.loaders[0].include = [
	path.join(__dirname, 'components'),
	path.join(__dirname, 'server/dev-examples')
];

config.entry = {
	'dev-examples': ['./server/dev-examples', hotMiddlewareScript],
	tests: ['./tests/tests_bundle.js', hotMiddlewareScript]
};

config.externals = {};

config.resolve.extensions.push('.scss');
config.resolve.extensions.push('.jsx');

config.resolve.alias = {
	'design-system-react': path.join(__dirname)
};

config.devtool = 'eval-cheap-module-source-map';

config.output = {
	libraryTarget: 'umd',
	path: `${__dirname}/dev-build/`,
	publicPath: '/dev-build/',
	filename: '[name].bundle.js'
};

// Add tests files
config.module.loaders[0].include.push(path.join(__dirname, 'test'));

config.plugins = [
	new webpack.DefinePlugin({
		'process.env': { NODE_ENV: JSON.stringify('development') }
	}),
	new ExtractTextPlugin('[name].css'),
	// When upgrading, Webpack 2.0 fixees the mispelling, OccurrenceOrderPlugin
	new webpack.optimize.OccurenceOrderPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin()
];

module.exports = config;
