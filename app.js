var express = require('express');
var compression = require('compression');
var exphbs = require('express-handlebars');
var port = process.env.PORT || 3000;

// Create server
var app = express();

// Setup handlebars
app.engine('.hbs', exphbs({ defaultLayout: false, extname: '.hbs', partialsDir: 'views' }));
app.set('view engine', '.hbs');

// Compress all requests 
app.use(compression());

// Serve up public folder
app.use(express.static('public'));

// design system static directory
// necessary because of hardcoded `/assets` path in CSS
app.use('/assets', express.static(__dirname + '/node_modules/@salesforce-ux/design-system/assets'));
app.use('/assets/design-system', express.static(__dirname + '/node_modules/@salesforce-ux/design-system/assets'));

// index
app.get('/', function(req, res) {
  res.render('index');
});

// jquery examples
app.get('/jquery', function(req, res) {
  res.render('jquery/index');
});

// react examples
app.get('/react', function(req, res) {
  res.render('react/index');
});

// Serve up the built files
app.use('/dist', express.static(__dirname + '/dist'));
app.use('/build', express.static(__dirname + '/build', {'index': false}));
app.use('/docs', express.static(__dirname + '/public/docs', {'index': ['index.html']}));

// Listen
var server = app.listen(port, function() {
  console.log('server listening on port ' + server.address().port);
});
