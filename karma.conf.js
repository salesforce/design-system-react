/* eslint-env node */
const webpackConfig = require('./webpack.config');
const path = require('path');
const karmaWebpack = require('karma-webpack');
const karmaMocha = require('karma-mocha');
const karmaChaiSinon = require('karma-chai-sinon');
const karmaSourcemapLoader = require('karma-sourcemap-loader');
const karmaPhantomjsLauncher = require('karma-phantomjs-launcher');
const karmaChromeLauncher = require('karma-chrome-launcher');
const karmaSpecReporter = require('karma-spec-reporter');
const karmaCoverage = require('karma-coverage');

webpackConfig.devtool = 'inline-source-map';
webpackConfig.externals = {
	'react/lib/ReactContext': true,
	'react/lib/ExecutionEnvironment': true,
	'react/addons': true,
	cheerio: 'window'
};

webpackConfig.module.preLoaders = webpackConfig.module.preLoaders || [];
const ispartaPreLoaderWebpackConfig = [
	// Transpile and instrument only testing sources with Isparta instrumenting.
	{
		test: /\.jsx?$/,
		include: [
			path.resolve('components/')
		],
		loader: 'isparta'
	}
];

webpackConfig.module.preLoaders = webpackConfig.module.preLoaders.concat(ispartaPreLoaderWebpackConfig);

// istanbul settings
webpackConfig.isparta = {
	embedSource: true,
	noAutoWrap: true
};

// Karma configuration
const configExport = function (config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha', 'chai-sinon'],

		// list of files / patterns to load in the browser
		files: [
			'tests/fixtures/phantomjs-shims.js',
			'tests/tests-bundle.js'
		],

		// list of files to exclude
		exclude: [
		],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'tests/tests-bundle.js': ['webpack', 'sourcemap']
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['spec', 'coverage'],

		coverageReporter: {
			reporters: [
				{ type: 'html', dir: 'coverage/' },
				{ type: 'text' }
			]
		},

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['PhantomJS'],

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,

		webpack: webpackConfig,

		plugins: [
			karmaWebpack,
			karmaMocha,
			karmaChaiSinon,
			karmaSourcemapLoader,
			karmaPhantomjsLauncher,
			karmaChromeLauncher,
			karmaSpecReporter,
			karmaCoverage
		]
	});
};

module.exports = configExport;
