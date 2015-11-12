var connect = require('connect');
var compression = require('compression');
var serveStatic = require('serve-static');

// Create server
var app = connect();

// Compress all requests 
app.use(compression());

// Serve up public folder
app.use(serveStatic(__dirname + '/public/examples', {'index': ['index.html', 'index.htm']}));
app.use(serveStatic(__dirname + '/public', {'index': false}));

// Serve up the built files
app.use('/build', serveStatic(__dirname + '/build', {'index': false}));
app.use('/docs', serveStatic(__dirname + '/public/docs', {'index': ['index.html']}));

// Listen
var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Connect server listening on port ' + server.address().port);
});
