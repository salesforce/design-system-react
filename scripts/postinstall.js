var webpack = require('webpack');
var webpackConfig = require('../webpack.config.heroku');

if (process.env.HEROKU) {
  console.log('Compiling webpack');
  webpack(webpackConfig, function (err, stats) {
    if (err) throw err;
  });
}
