var webpack = require('webpack');

var entries = [/*'webpack-dev-server/client?https://localhost:3001',*/ 'webpack/hot/dev-server'];
var path = require('path');
var config = {
  entry: {
    react: entries.concat('./src/react/examples.js'),
    jquery: entries.concat('./src/jquery/examples.js'),
    marionette: entries.concat('./src/jquery/examples.js'),
    tests: entries.concat('./test/tests.js')
  },
  devtool: 'eval',
  output: {
    path: __dirname,
    publicPath: '/build/',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('development')}
    })
  ]
};

module.exports = config;
