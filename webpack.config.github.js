var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config')();

config.output.path = path.resolve(__dirname, 'dist');

module.exports = config;
