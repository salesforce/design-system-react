var auth = require('basic-auth');
var compression = require('compression');
var express = require('express');

var port = process.env.PORT || 9001;

// Create server
var app = express();

if (process.env.NODE_ENV === 'production') {
	// Authentication
	app.use(function (req, res, next) {
	  var user = auth(req)
	  var username = process.env.AUTH_USERNAME;
	  var password = process.env.AUTH_PASSWORD;

	  var unauthorized = function () {
	    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
	    res.sendStatus(401);
	  }

	  if (!username || !password) return unauthorized();
	  if (!user || user.name !== username || user.pass !== password) {
	    return unauthorized();
	  }

	  next();
	});
}

// Compress all files
app.use(compression());

// Static directory
app.use(express.static(__dirname + '/storybook'));

// Listen
var server = app.listen(port, function() {
	console.log('Server listening on port ', server.address().port);
});
