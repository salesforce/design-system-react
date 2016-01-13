var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './demo/index'
  ],
  output: {
    path: path.join(__dirname, 'demo/static'),
    filename: 'bundle.js',
    publicPath: '/demo/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin("bundle.css", {
        allChunks: true
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      "components": __dirname + '/components',
      "demo": __dirname + '/demo',
      "docs": __dirname + '/docs',
      'ui': '/src/ui',
    }
  },
  module: {
    noParse: [
      path.join(__dirname, "node_modules", "babel-core")
    ],
    loaders: [{
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: [path.join(__dirname, 'demo'),path.join(__dirname, 'components')]
      },
      //{
      //  test: /\.js$/,
      //  include: path.join(__dirname, "demo/pages"), //export code example file content as string for codemirror
      //  loader: "transform?brfs"
      //},
      {
          test: /\.(js|jsx)?$/,
          loaders: ['react-hot', 'babel'],
          include: [path.join(__dirname, 'tests')]
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
      },
      {
        test: /Samples.js/,
        loader: "transform?brfs" //for using fs to compile component example files into strings for codemirror demos
      },
    ]
  },
node: { fs: "empty" },
};
