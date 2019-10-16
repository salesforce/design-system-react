/* eslint-env node */
const webpackConfig = require('../webpack.config');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config /*, mode */}) => {
	// `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
	// You can change the configuration based on that.
	// 'PRODUCTION' is used when building the static version of storybook.

	// Make whatever fine-grained changes you need to config
	config.mode = webpackConfig.mode;
	config.resolve = { ...config.resolve, ...webpackConfig.resolve };
	config.devtool = webpackConfig.devtool;
	config.module.rules = config.module.rules.concat(webpackConfig.module.rules);
	config.performance = webpackConfig.performance;
	config.plugins = config.plugins.concat(webpackConfig.plugins);

	// Return the altered config
	return config;
};
