var path = require('path');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('../webpack.config.dev');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  contentBase: path.resolve(__dirname,  '../server/__public'),
  hot: true,
  historyApiFallback: true,
  proxy: {
    '/assets/*': {
      target: 'http://localhost:3000',
      secure: false
    }
  }
}).listen(3001, 'localhost', function (err, result) {
  if (err) throw err;
  console.log('Webpack listening on port 3001');
});
