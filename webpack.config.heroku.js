var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config')();

config.output.path = path.resolve(__dirname, 'server/public/assets/bundle');

config.plugins.push(
  new webpack.optimize.UglifyJsPlugin()
);

module.exports = config;
