/* `webpack.config.test` should be used to run unit tests. */

const devConfig = require('./webpack.config');

var path = require('path');

// Build on top of core webpack config
const config = devConfig;

config.devtool = 'inline-source-map';

config.module.loaders[0].include.push( path.join(__dirname, 'test') );

module.exports = config;
