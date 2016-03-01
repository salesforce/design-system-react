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

// Third-party libraries
app.use('/vendor/jquery', express.static(__dirname + '/node_modules/jquery/dist', cacheOptions));
app.use('/vendor/prism', express.static(__dirname + '/node_modules/prismjs', cacheOptions));

// Index
app.get('/', function (req, res) {
	res.render('index');
});

var jsExternal = {
	jquery: [
		'//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js',
		'//www.fuelcdn.com/design-system-facades/0/assets/scripts/facades-jquery.js',
		'//www.fuelcdn.com/design-system-facades/0/assets/scripts/facades-utilities.js'],
	react: [
		'//fb.me/react-with-addons-0.14.7.js',
		'//fb.me/react-dom-0.14.7.js',
		'//www.fuelcdn.com/design-system-facades/0/assets/scripts/facades-react.js',
		'//www.fuelcdn.com/design-system-facades/0/assets/scripts/facades-utilities.js']
};

var cssExternal = ['//www.fuelcdn.com/lightning-design-system/0.12.1/styles/salesforce-lightning-design-system.css'];


var codeSandboxHTMLWrapper = {
	HTML: `
		<div class="slds-box">
			<div class="slds-section-title">
				<div class="slds-grid">
					<h3 class="slds-col | slds-has-flexi-truncate | slds-text-heading--small | section-heading"></h3>
				</div>
			</div>
		</div>
`};


var codeSandboxHTML = '';
var codepenData = {};
var codepenJSON = '';

if (!jQueryCode) {
	jQueryCode = {};
	jQueryCode['components'] = [];
	jQueryCode['componentData'] = new Map();
	jQueryCode['facade'] = 'jquery';
	jQueryCode['facadeDisplayName'] = 'jQuery';
	jQueryCode['otherFacade'] = 'react';
	jQueryCode['otherFacadeDisplayName'] = 'React';
	jQueryExamples.forEach(function (example) {
		if (example) {
			var componentDisplayName = example.displayName;
			var componentDisplayNamePlural = example.displayNamePlural;
			var componentName = example.name;
			if (typeof(example.html) === undefined) {
				example.html = '';
			}
			if (typeof(example.devHtml) === undefined) {
				example.devHtml = '';
			}
			if (typeof(example.code) !== undefined) {
				if (typeof String(example.code).split('// SAMPLE CONTROL CODE -->')[1] !== 'undefined') {
					if (typeof String(example.code).split('// SAMPLE CONTROL CODE -->')[1].split('// <-- SAMPLE CONTROL CODE')[0] !== 'undefined') {
						if (typeof String(example.code).split('// SAMPLE CONTROL CODE -->')[1].split('// <-- SAMPLE CONTROL CODE')[0].trim() !== 'undefined') {
							example.code = String(example.code).split('// SAMPLE CONTROL CODE -->')[1].split('// <-- SAMPLE CONTROL CODE')[0].trim();
						}
					}
				}
			}
			jQueryCode[example.component.replace('-', '')] = example.code;

			codeSandboxHTML =
				'<div class="slds-m-around--large"> \n' +
				'	<div class="slds-section-title"> \n' +
				'		<div class="slds-grid">  \n' +
				'			<h3 class="slds-col | slds-has-flexi-truncate | slds-text-heading--small | section-heading">' + componentDisplayNamePlural + '</h3>  \n' +
				'		</div>  \n' +
				'	</div>  \n' +
				'	<div class="slds-m-vertical--large">' +
						example.html +
				'	</div>\n' +
				'</div>';

			codepenData = {
				css: '',
				css_external: cssExternal.join(';'),
				css_pre_processor: 'none',
				css_starter: 'neither',
				css_prefix_free: false,
				description: 'A developer sandbox for SLDS for JavaScript',
				editors: '101',
				html: codeSandboxHTML,
				html_pre_processor: 'none',
				html_classes: '',
				js: example.code,
				js_external: jsExternal.jquery.join(';'),
				js_pre_processor: 'babel',
				js_modernizr: false,
				js_library: '',
				title: componentDisplayNamePlural + ' :: SLDS for jQuery'
			};

			codepenJSON = JSON.stringify(codepenData).replace(/"/g, "&​quot;").replace(/'/g, "&apos;");

			jQueryCode['componentData'].set(example.component, {
				'facade': 'jquery',
				'facadeDisplayName': 'jQuery',
				'otherFacade': 'react',
				'otherFacadeDisplayName': 'React',
				'component': example.component,
				'componentName': componentName,
				'componentGroupName': example.componentGroupName,
				'componentDisplayName': componentDisplayName,
				'componentDisplayNamePlural': componentDisplayNamePlural,
				'code': example.code,
				'html': example.html,
				'codepenJSON': codepenJSON,
				'controlDetails': jqueryControlDetails[example.component]
			});
			jQueryCode['components'].push({
				'facade': 'jquery',
				'facadeDisplayName': 'jQuery',
				'otherFacade': 'react',
				'otherFacadeDisplayName': 'React',
				'component': example.component,
				'componentName': componentName,
				'componentGroupName': example.componentGroupName,
				'componentDisplayName': componentDisplayName,
				'componentDisplayNamePlural': componentDisplayNamePlural,
				'html': example.html,
				'devHtml': example.devHtml,
				'code': example.code,
				'codepenJSON': codepenJSON,
				'controlDetails': jqueryControlDetails[example.component]
			});
		}
	});
}


// jQuery examples for development sandbox
var jQueryCodeMap = jQueryCode.componentData;
var jQueryCodeArray = JSON.parse(JSON.stringify([...jQueryCodeMap]));
var jQueryCodeObject = {};

jQueryCodeArray.forEach(function (element) {
	jQueryCodeObject[element[0]] = element[1];
});

app.get('/examples', function (req, res) {
	res.render('examples/index', jQueryCodeObject);
});


// jQuery examples on main site
var jQueryCode;
app.get('/jquery', function (req, res) {
	res.render('jquery/index', jQueryCode);
});

app.get('/jquery/:component', function (req, res) {
	var component = req.params['component'] || null;
	jQueryCode['thisComponent'] = component;
	jQueryCode['thisComponentData'] = [];
	jQueryCode['thisComponentData'].push(jQueryCode['componentData'].get(component));
	jQueryCode['thisComponentDisplayName'] = jQueryCode['thisComponentData'][0]['componentDisplayName'];
	res.render('jquery/component/index', jQueryCode);
});



// React examples
var reactCode;
var codeSandboxHTML = '';
var codepenData = {};
var codepenJSON = '';

if (!reactCode) {
	reactCode = {};
	reactCode['components'] = [];
	reactCode['componentData'] = new Map();
	reactCode['facade'] = 'react';
	reactCode['facadeDisplayName'] = 'React';
	reactCode['otherFacade'] = 'jquery';
	reactCode['otherFacadeDisplayName'] = 'jQuery';
	reactExamples.forEach(function (example) {
		if (example) {
			var componentDisplayName = example.displayName;
			var componentDisplayNamePlural = example.displayNamePlural;
			var componentName = example.name;
			if (typeof(example.html) === undefined) {
				example.html = '';
			}
			if (typeof(example.code) !== undefined) {
				if (typeof String(example.code).split('// SAMPLE CONTROL CODE -->')[1] !== 'undefined') {
					if (typeof String(example.code).split('// SAMPLE CONTROL CODE -->')[1].split('// <-- SAMPLE CONTROL CODE')[0] !== 'undefined') {
						if (typeof String(example.code).split('// SAMPLE CONTROL CODE -->')[1].split('// <-- SAMPLE CONTROL CODE')[0].trim() !== 'undefined') {
							example.code = String(example.code).split('// SAMPLE CONTROL CODE -->')[1].split('// <-- SAMPLE CONTROL CODE')[0].trim();
						}
					}
				}
			}

			example.code = example.code + '\n\nReactDOM.render(React.createElement(' + componentDisplayName + 'Example' + '), document.querySelector(\'#' + example.component + '-react-control\'));';

			reactCode[example.component.replace('-', '')] = example.code;

			codeSandboxHTML =
				'<div class="slds-m-around--large"> \n' +
				'	<div class="slds-section-title"> \n' +
				'		<div class="slds-grid">  \n' +
				'			<h3 class="slds-col | slds-has-flexi-truncate | slds-text-heading--small | section-heading">' + componentDisplayName + '</h3>  \n' +
				'		</div>  \n' +
				'	</div>  \n' +
				'	<div class="slds-m-vertical--large"> \n' +
						'<div id="' + example.component + '-react-control" class="slds-col | example"></div>' +
				'	</div>\n' +
				'</div>';

			codepenData = {
				css: '',
				css_external: cssExternal.join(';'),
				css_pre_processor: 'none',
				css_starter: 'neither',
				css_prefix_free: false,
				description: 'A developer sandbox for SLDS for JavaScript',
				editors: '101',
				html: codeSandboxHTML,
				html_pre_processor: 'none',
				html_classes: '',
				js: example.code,
				js_external: jsExternal.react.join(';'),
				js_pre_processor: 'babel',
				js_modernizr: false,
				js_library: '',
				title: componentDisplayName + ' :: SLDS for React'
			};

			codepenJSON = JSON.stringify(codepenData).replace(/"/g, "&​quot;").replace(/'/g, "&apos;");

			reactCode['componentData'].set(example.component, {
				'facade': 'react',
				'facadeDisplayName': 'React',
				'otherFacade': 'jquery',
				'otherFacadeDisplayName': 'jQuery',
				'component': example.component,
				'componentName': componentName,
				'componentGroupName': example.componentGroupName,
				'componentDisplayName': componentDisplayName,
				'componentDisplayNamePlural': componentDisplayNamePlural,
				'code': example.code,
				'html': example.html,
				'codepenJSON': codepenJSON,
				'controlDetails': reactControlDetails[example.component]
			});
			reactCode['components'].push({
				'facade': 'react',
				'facadeDisplayName': 'React',
				'otherFacade': 'jquery',
				'otherFacadeDisplayName': 'jQuery',
				'component': example.component,
				'componentName': componentName,
				'componentGroupName': example.componentGroupName,
				'componentDisplayName': componentDisplayName,
				'componentDisplayNamePlural': componentDisplayNamePlural,
				'code': example.code,
				'html': example.html,
				'codepenJSON': codepenJSON,
				'controlDetails': reactControlDetails[example.component]

			});
		}
	});
}

app.get('/react', function (req, res) {
	res.render('react/index', reactCode);
});

app.get('/react/:component', function (req, res) {
	var component = req.params['component'] || null;
	reactCode['thisComponent'] = component;
	reactCode['thisComponentData'] = [];
	reactCode['thisComponentData'].push(reactCode['componentData'].get(component));
	reactCode['thisComponentDisplayName'] = reactCode['thisComponentData'][0]['componentDisplayName'];
	res.render('react/component/index', reactCode);
});



// reactExamples.forEach(function (example) {
// 	if (example) {
// 		var componentName = example.name;
// 		console.log("[app.js:247] componentName:", componentName);
// 		app.get('/react/:component', function (req, res) {

// 			var component = req.params['component'] || null;
// 			res.render('react/component/index', reactCode);
// 		});
// 	}
// });


// Serve up the built files
app.use('/dist', express.static(__dirname + '/.dist'));
app.use('/build', express.static(__dirname + '/build', {'index': false}));
app.use('/documentation', express.static(__dirname + '/public/documentation', {'index': ['index.html']}));

// Listen
var server = app.listen(port, function() {
	console.log('server listening on port ' + server.address().port);
});
