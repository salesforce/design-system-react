var path = require('path');

module.exports = {
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
        loaders: ['style-loader', 'raw-loader']
      },
      {
        test: /\.(woff|woff2|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  node: { fs: 'empty' }
};
