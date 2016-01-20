var webpack = require('webpack');
var config = require('./webpack.config')();

config.devtool = 'eval';

config.entry.demo = [
  'webpack-dev-server/client?http://localhost:3001',
  'webpack/hot/only-dev-server'
].concat(config.entry.demo);

config.plugins = [
  new webpack.HotModuleReplacementPlugin()
].concat(config.plugins);

config.module.loaders = config.module.loaders.map(function (loader) {
  if (loader.test.test('.jsx')) {
    loader.loaders.unshift('react-hot');
  }
  return loader;
});

module.exports = config;
