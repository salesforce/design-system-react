var express = require('express');
var path = require('path');
var port = 8001;
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackConfig = require('../webpack.config.test');

var app = express();
var compiler = webpack(webpackConfig);

// // Use the webpack dev middleware for development
app.use(webpackDevMiddleware(compiler, {
	noInfo: true,
	publicPath: webpackConfig.output.publicPath
}));

app.use(webpackHotMiddleware(compiler, {
	log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
}));

// Provide access to Design System CSS
app.use('/assets', express.static(path.join(__dirname, '../node_modules/@salesforce-ux/design-system/assets')));

// Provide access to node_modules for JS libraries
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

// Needed for in browser testing
app.use(express.static(path.join(__dirname, '../tests')));
app.use('/base/node_modules', express.static(__dirname + '/node_modules'));

var server = app.listen(port, function() {
	console.log('In-browser unit test server listening on port ' + server.address().port);
});
