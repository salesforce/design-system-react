var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");


module.exports = {
  devtool: 'eval',
  entry: [
    './demo/index'
  ],
  output: {
    path: path.join(__dirname, 'demo', 'static'),
    filename: 'bundle.js',
    publicPath: '/demo/static/'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("bundle.css", {
        allChunks: true
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'ui': '/src/ui'
    }
  },
  module: {
    loaders: [{
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: [path.join(__dirname, 'demo'),path.join(__dirname, 'components')]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      { 
        test: /\.coffee$/, 
        loader: "coffee-loader"
      },
      {
        test: /\.(coffee\.md|litcoffee)$/, 
        loader: "coffee-loader?literate"
      },
      { 
        test: /\.cjsx$/, loader: "coffee-jsx-loader"
      },

/*
      {
        test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style-loader', 'css!sass')
      },
*/
      {
        test: /\.(woff|woff2|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },

};
