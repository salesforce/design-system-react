/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-env commonjs */
/* eslint-disable global-require */

module.exports = function buildPreset() {
	return {
		presets: [
			require('babel-preset-env').default(null, {
				targets: {
					browsers: ['last 2 versions', 'ie 11'],
					node: '8.9.4',
				},
				modules: false,
			}),
			require('babel-preset-react'),
		],
		plugins: [
			require('babel-plugin-transform-object-rest-spread'),
			require('babel-plugin-transform-class-properties'),
			require('babel-plugin-transform-export-extensions'),
		],
	};
};
