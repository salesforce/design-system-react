var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function () {
  return {
    entry: {
      demo: [
        './demo/index.js'
      ]
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
      publicPath: 'http://localhost:3001/assets/bundle'
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      new ExtractTextPlugin('[name].css', {
        allChunks: true
      })
    ],
    resolve: {
      extensions: ['', '.js', '.jsx'],
      alias: {
        'design-system-react': __dirname + '/components',
        'components': __dirname + '/components',
        'demo': __dirname + '/demo',
        'docs': __dirname + '/demo/docs'
      }
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loaders: ['babel'],
          include: [
            path.join(__dirname, 'demo'),
            path.join(__dirname, 'components')
          ]
        },
        {
          test: /\.(js|jsx)?$/,
          loaders: ['babel'],
          include: [
            path.join(__dirname, 'tests')
          ]
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style-loader', 'raw-loader')
        },
        {
          test: /\.(woff|woff2|svg)$/,
          loader: 'url-loader?limit=100000'
        },
        {
          test: /Samples.js/,
          //for using fs to compile component example files into strings for codemirror demos
          loader: 'transform?brfs'
        }
      ]
    },
    node: { fs: 'empty' }
  }
};
