var path = require('path');
var webpack = require('webpack');
var BASE_DIR = process.cwd();
var COMPONENT_FILE = 'design-system-react';
var COMPONENT_NAME = 'design-system-react';
var plugins = [];

function getPackageMain() {
  return require('./package.json').main;
}

if (process.env.MINIFY) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
  COMPONENT_FILE += '.min';
}

module.exports = {
  entry: path.resolve(__dirname, 'lib'),
  output: {
    filename: path.resolve(__dirname, 'dist/' + COMPONENT_FILE + '.js'),
    library: COMPONENT_NAME,
    libraryTarget: 'umd'
  },
  externals: {
    'react': 'React',
    'react/addons': 'React'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      "components": __dirname + '/components',
      "demo": __dirname + '/demo',
      "docs": __dirname + '/demo/docs',
      'ui': '/src/ui',
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  plugins: plugins
};
