var webpackConfig = require('./webpack.config.test');

// Karma configuration
module.exports = function (config) {
	config.set({
		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		// Using Chrome for the time being, until we can get promises in phantomjs working

		// For use with TravisCI
		browsers: [process.env.CONTINUOUS_INTEGRATION ? 'Firefox' : 'Chrome'],

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// list of files to exclude
		exclude: [],

		// list of files / patterns to load in the browser
		files: [
			{
				pattern: 'node_modules/@salesforce-ux/design-system/assets/**/*',
				watched: false,
				included: false,
				served: true,
				nocache: true
			},
			'tests/fixtures/phantomjs-shims.js',
			'tests/tests_bundle.js'
		],

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha', 'chai-sinon'],

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'tests/tests_bundle.js': ['webpack', 'sourcemap']
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress', 'spec'],

		plugins: [
			require('karma-webpack'),
			require('karma-mocha'),
			require('karma-chai-sinon'),
			require('karma-sourcemap-loader'),
			require('karma-phantomjs-launcher'),
			require('karma-chrome-launcher'),
			require('karma-spec-reporter')
		],

		// web server port
		port: 9876,

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: false,

		webpack: webpackConfig,
		webpackServer: {
			noInfo: true // please don't spam the console when running in karma!
		}
	});
};
