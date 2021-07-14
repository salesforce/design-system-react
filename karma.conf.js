/* eslint-env node */
/* eslint-disable import/no-extraneous-dependencies */
const karmaWebpack = require('karma-webpack');
const karmaMocha = require('karma-mocha');
const karmaChaiSinon = require('karma-chai-sinon');
const karmaSourcemapLoader = require('karma-sourcemap-loader');
const karmaChromeLauncher = require('karma-chrome-launcher');
const karmaSpecReporter = require('karma-spec-reporter');
const karmaCoverage = require('karma-coverage');
const webpackConfig = require('./webpack.config');
process.env.CHROME_BIN = require('puppeteer').executablePath();

webpackConfig.devtool = 'inline-source-map';
webpackConfig.externals = {
	'react/lib/ReactContext': true,
	'react/lib/ExecutionEnvironment': true,
	'react/addons': true,
	cheerio: 'window',
};

// Karma configuration
const configExport = function configExportFunction(config) {
	config.set({
		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',

		// needed for TravisCI
		customLaunchers: {
			ChromeHeadlessNoSandbox: {
				base: 'ChromeHeadless',
				flags: ['--no-sandbox'],
			},
		},

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha', 'chai-sinon'],

		// list of files / patterns to load in the browser
		files: [
			'tests/browser-tests.js',
			{
				pattern:
					'./node_modules/@salesforce-ux/design-system/assets/images/**/*.jpg',
				watched: false,
				included: false,
				served: true,
				nocache: false,
			},
			{
				pattern:
					'./node_modules/@salesforce-ux/design-system/assets/images/**/*.png',
				watched: false,
				included: false,
				served: true,
				nocache: false,
			},
			{
				pattern: './node_modules/@salesforce-ux/design-system/assets/**/*.svg',
				watched: false,
				included: false,
				served: true,
				nocache: false,
			},
			{
				pattern: './assets/**/*.svg',
				watched: false,
				included: false,
				served: true,
				nocache: false,
			},
		],
		proxies: {
			'/assets/images/global-header/logo.svg':
				'http://localhost:9876/base/assets/images/global-header/logo.svg',
			'/assets/images/illustrations/empty-state-no-access.svg':
				'http://localhost:9876/base/assets/images/illustrations/empty-state-no-access.svg',
			'/assets/':
				'http://localhost:9876/base/node_modules/@salesforce-ux/design-system/assets/',
		},

		// list of files to exclude
		exclude: [],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'tests/browser-tests.js': ['webpack', 'sourcemap'],
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['spec', 'coverage'],

		specReporter: {
			suppressPassed: true, // do not print information about passed tests
			failFast: true, // test will finish with error when a first fail occurs.
		},

		coverageReporter: {
			reporters: [{ type: 'text' }],
		},

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['ChromeHeadlessNoSandbox'],

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,

		webpack: webpackConfig,

		webpackMiddleware: {
			stats: 'errors-only', // Do not show webpack build
		},

		plugins: [
			karmaWebpack,
			karmaMocha,
			karmaChaiSinon,
			karmaSourcemapLoader,
			karmaChromeLauncher,
			karmaSpecReporter,
			karmaCoverage,
		],
	});
};

module.exports = configExport;
