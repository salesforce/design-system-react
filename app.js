var express = require('express');
var compression = require('compression');
var exphbs = require('express-handlebars');
var port = process.env.PORT || 3000;
var jQueryExamples = require('./site/examples/demo-components')('jquery');
var reactExamples = require('./site/examples/demo-components')('react');

// Create server
var app = express();

// Setup handlebars
app.engine('.hbs', exphbs({
	defaultLayout: false,
	extname: '.hbs',
	partialsDir: 'site/views/'
}));

app.set('views', 'site/views/');
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
app.get('/', function (req, res) {
	res.render('index');
});

// jQuery examples
var jQueryCode;
app.get('/jquery', function (req, res) {
	// needed for these examples until we make them more modular
	if (!jQueryCode) {
		jQueryCode = {};
		jQueryCode['components'] = [];
		jQueryExamples.forEach(function (example) {
			if (example) {
				var componentDisplayName = example.displayName;
				var componentName = example.name;
				jQueryCode[example.component.replace('-', '')] = example.code;
				jQueryCode['components'].push({
					'component': example.component,
					'componentName': componentName,
					'componentDisplayName': componentDisplayName,
					'code': example.code,
					'sampleData': example.sampleData
				});
			}
		});
	}
	res.render('jquery/index', jQueryCode);
});

// React examples
app.get('/react', function (req, res) {
	res.render('react/index', { examples: reactExamples });
});

// Serve up the built files
app.use('/dist', express.static(__dirname + '/dist'));
app.use('/build', express.static(__dirname + '/build', {'index': false}));
app.use('/docs', express.static(__dirname + '/public/docs', {'index': ['index.html']}));

// Listen
var server = app.listen(port, function() {
	console.log('server listening on port ' + server.address().port);
});
