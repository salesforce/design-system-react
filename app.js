var express = require('express');
var path = require('path');
var port = process.env.PORT || 8080;
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('./webpack.config');

var app = express();
var compiler = webpack(webpackConfig);

// Use the webpack dev middleware for development
app.use(webpackDevMiddleware(compiler, {
	contentBase: path.join(__dirname, 'public/'),
	quiet: false,
	noInfo: false,
	filename: 'bundle.js',
	publicPath: webpackConfig.output.publicPath
}));
app.use(webpackHotMiddleware(compiler, {
	log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));

// Design system static directory
app.use('/assets', express.static(__dirname + '/node_modules/@salesforce-ux/design-system/assets'));


app.use(express.static('public'));

// Serve up the built files
app.use('/dev-build', express.static(__dirname + '/dev-build'));

// Listen
var server = app.listen(port, function() {
	console.log('server listening on port ' + server.address().port);
});
