/* eslint-env commonjs */
/* eslint-disable global-require */

module.exports = function buildPreset () {
	return {
		presets: [
			require('babel-preset-env').default(null, {
				targets: {
					browsers: ['last 2 versions', 'ie 11'],
					node: '8.9.4',
				},
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
