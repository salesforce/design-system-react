/* `webpack.config.test` should be used to run unit tests. */

const devConfig = require('./webpack.config');
const path = require('path');

// Build on top of core webpack config
const config = devConfig;

// remove tests from entries to prevent including twice
delete config.entry.tests;

config.module.loaders[0].include.push(path.join(__dirname, 'test'));

module.exports = config;
