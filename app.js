var express = require('express');
var compression = require('compression');
var exphbs = require('express-handlebars');
var port = process.env.PORT || 3000;
var fs = require('fs');
var path = require('path');

// Create server
var app = express();

// Setup handlebars
app.engine('.hbs', exphbs({
	defaultLayout: false,
	extname: '.hbs',
	partialsDir: 'views'
}));
app.set('view engine', '.hbs');

// Compress all requests 
app.use(compression());

// Design system static directory
// - Necessary because of hardcoded `/assets` path in CSS
app.use('/assets', express.static(__dirname + '/node_modules/@salesforce-ux/design-system/assets'));
app.use('/assets/design-system', express.static(__dirname + '/node_modules/@salesforce-ux/design-system/assets'));

// Serve up public folder
app.use(express.static('public'));

// Third-party libraries
app.use('/vendor/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/vendor/prism', express.static(__dirname + '/node_modules/prismjs'));
app.use('/vendor/react', express.static(__dirname + '/node_modules/react/dist'));
app.use('/vendor/react', express.static(__dirname + '/node_modules/react-dom/dist'));
app.use('/vendor/require', express.static(__dirname + '/node_modules/requirejs'));

// Index
app.get('/', function(req, res) {
  res.render('index');
});

// jQuery examples
app.get('/jquery', function(req, res) {
  res.render('jquery/index');
});

// React examples
app.get('/react', function (req, res) {
	var locals = {};

	/* TODO: Make map function of directory */
	var codeDir = './src/react/';
	var controls = {
		checkbox: fs.readFileSync(codeDir + 'checkbox/example.js', 'utf8'),
		combobox: fs.readFileSync(codeDir + 'combobox/example.js', 'utf8'),
		datepicker: fs.readFileSync(codeDir + 'datepicker/example.js', 'utf8'),
		dataTable: fs.readFileSync(codeDir + 'data-table/example.js', 'utf8'),
		dropdown: fs.readFileSync(codeDir + 'dropdown/example.js', 'utf8'),
		lookup: fs.readFileSync(codeDir + 'lookup/example.js', 'utf8'),
		picklist: fs.readFileSync(codeDir + 'picklist/example.js', 'utf8'),
		pills: fs.readFileSync(codeDir + 'pillbox/example.js', 'utf8'),
		popover: fs.readFileSync(codeDir + 'popover/example.js', 'utf8'),
		tooltip: fs.readFileSync(codeDir + 'tooltip/example.js', 'utf8'),
		tree: fs.readFileSync(codeDir + 'tree/example.js', 'utf8')
	};

	res.render('react/', locals, function () {
		locals.code = controls;
		res.render('react/index', locals);
	});
});

// Serve up the built files
app.use('/dist', express.static(__dirname + '/dist'));
app.use('/build', express.static(__dirname + '/build', {'index': false}));
app.use('/docs', express.static(__dirname + '/public/docs', {'index': ['index.html']}));

// Listen
var server = app.listen(port, function() {
  console.log('server listening on port ' + server.address().port);
});
