/* `webpack.heroku.config` is an alias of `webpack.config.site-build`. It is needed by the Heroku build pack located at https://github.com/tweettypography/heroku-buildpack-webpack */

const config = require('./webpack.config.site-build');
module.exports = config;
