var express = require('express');
var compression = require('compression');
var expressHandlebars = require('express-handlebars');
var helpers = require('./site/helpers/hbs-helpers');
var port = process.env.PORT || 8080;
var jQueryExamples = require('./site/examples/demo-components')('jquery');
var reactExamples = require('./site/examples/demo-components')('react');
var reactControlDetails = require('./site/examples/react-control-details');
var jqueryControlDetails = require('./site/examples/jquery-control-details');

var path = require('path');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

// Create server
var app = express();

// Read the webpack config
var webpackConfig = require('./webpack.config');
var compiler = webpack(webpackConfig);

if (process.env.NODE_ENV !== 'production') {
	// Use the webpack dev middleware if in development
	app.use(webpackDevMiddleware(compiler, {
		contentBase: path.join(__dirname, 'public/examples'),
		quiet: false,
		noInfo: false,
		filename: 'bundle.js',
		publicPath: webpackConfig.output.publicPath
	}));
	app.use(webpackHotMiddleware(compiler, {
		log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
	}));
}

// Setup handlebars
app.engine('.hbs', expressHandlebars({
	defaultLayout: 'main',
	layoutsDir: './site/views/layouts/',
	extname: '.hbs',
	helpers: helpers,
	partialsDir: 'site/views/'
}));

app.set('views', 'site/views/');
app.set('view engine', '.hbs');

// Compress all requests
app.use(compression());

// Design system static directory
// - Necessary because of hardcoded `/assets` path in CSS
app.use('/assets', express.static(__dirname + '/node_modules/@salesforce-ux/design-system/assets'));

// Serve up public folder
app.use(express.static('public'));

// Cache headers
const cacheOptions = {
	maxAge: '1d'
};

app.get('/', function (req, res) {
	res.render('examples/index', {});
});

// Serve up the built files
app.use('/build', express.static(__dirname + '/build', {'index': false}));

// Listen
var server = app.listen(port, function() {
	console.log('server listening on port ' + server.address().port);
});
