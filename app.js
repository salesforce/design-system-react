var finalhandler = require('finalhandler');
var http = require('http');
var serveStatic = require('serve-static');
var port = process.env.PORT || 3000;

// Serve up public folder
var serve = serveStatic('public', {'index': ['index.html', 'index.htm']});

// Create server
var server = http.createServer(function(req, res){
	var done = finalhandler(req, res);
	serve(req, res, done);
})

// Listen
console.log('Listening on port %s', port);
server.listen(port);
