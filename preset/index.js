/* eslint-env commonjs */
/* eslint-disable global-require */
const assign = require('lodash.assign');

module.exports = function buildPreset (context, options) {
	return {
		presets: [
			require('babel-preset-env').default(null, {
				targets: {
					browsers: ['last 2 versions', 'ie 11'],
					node: '6.8'
				}
			}),
			require('babel-preset-react')
		],
		plugins: [
			require('babel-plugin-transform-object-rest-spread'),
			require('babel-plugin-transform-class-properties'),
			require('babel-plugin-transform-export-extensions')
		]
	};
};
