var path = require('path');
var webpack = require('webpack');
var BASE_DIR = process.cwd();
var COMPONENT_FILE = 'design-system-react';
var COMPONENT_NAME = 'design-system-react';
var plugins = [];

function getPackageMain() {
  return require(path.resolve(BASE_DIR, 'package.json')).main;
}

if (process.env.MINIFY) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
  COMPONENT_FILE += '.min';
}

module.exports = {
  entry: path.resolve(BASE_DIR, 'lib'),
  output: {
    filename: path.resolve(BASE_DIR, 'dist/' + COMPONENT_FILE + '.js'),
    library: COMPONENT_NAME,
    libraryTarget: 'umd'
  },
  externals: {
    'react': 'React',
    'react/addons': 'React'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: path.resolve(BASE_DIR, 'node_modules/babel-loader')
      },
      {
        test: /Samples.js/,
        loader: "transform?brfs" //for using fs to compile component example files into strings for codemirror demos
      },
    ]
  },
  plugins: plugins
};
