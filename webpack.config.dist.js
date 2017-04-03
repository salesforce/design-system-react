/* eslint-env node */
const fs = require('fs');
const webpack = require('webpack');
const packageJson = require('./package.json');
const StringReplacePlugin = require('string-replace-webpack-plugin');

const header = `${packageJson.name}\nv${packageJson.version}\n`;
const license = fs.readFileSync('./LICENSE.txt', 'utf8');

const baseConfig = require('./webpack.config');

const config = Object.assign({}, baseConfig, {
	externals: {
		react: { amd: 'react', commonjs: 'react', commonjs2: 'react', root: 'React' },
		'react/addons': { amd: 'react', commonjs: 'react', commonjs2: 'react', root: 'React' },
		'react-dom': { amd: 'react-dom', commonjs: 'react-dom', commonjs2: 'react-dom', root: 'ReactDOM' }
	}
});

let FILENAME = '[name].js';
if (process.env.MINIFY) {
	config.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
			mangle: {
				except: ['$', 'exports', 'require']
			}
		})
	);
	FILENAME = '[name].min.js';
}

config.output.filename = FILENAME;
config.output.library = '[name]';
config.output.libraryTarget = 'umd';

config.module.loaders[0].loaders = ['babel', StringReplacePlugin.replace({
	replacements: [{
		pattern: /__VERSION__/g,
		replacement: () => packageJson.version
	},
	// This string replacement includes icons in the bundle and affects `icons/**/index.js` which are built by `npm run icons`. The default condition is an equality comparison of two constants, `'__EXCLUDE_SLDS_ICONS__' === '__INCLUDE_SLDS_ICONS__'`, which will allow minification to remove the inline icons and save 100KBs in size when bundling for production. The following makes the condition equal.
	{
		pattern: /__EXCLUDE_SLDS_ICONS__/g,
		replacement: () => '__INCLUDE_SLDS_ICONS__'
	}]
})];

config.plugins.push(new webpack.BannerPlugin(header + license));
config.plugins.push(new webpack.DefinePlugin({
	'process.env': { NODE_ENV: JSON.stringify('production') }
}));

module.exports = config;
