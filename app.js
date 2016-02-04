var express = require('express');
var compression = require('compression');
var exphbs = require('express-handlebars');
var port = process.env.PORT || 3000;
var jQueryExamples = require('./site/examples/demo-components')('jquery');
var reactExamples = require('./site/examples/demo-components')('react');
var reactControlDetails = require('./site/examples/react-control-details');
var jqueryControlDetails = require('./site/examples/jquery-control-details');

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

// jQuery examples
var jQueryCode;
app.get('/jquery', function (req, res) {
	// needed for these examples until we make them more modular
	var codeSandboxHTMLWrapper = {
		HTML: '<div class="slds-box">' +
					'	<div class="slds-section-title">' +
					'		<div class="slds-grid">' +
					'			<h3 class="slds-col | slds-has-flexi-truncate | slds-text-heading--small | section-heading">' + '</h3>' +
					'		</div>' +
					'	</div>' +
					'	</div>' +
					'</div>'
		};
	var codeSandboxHTML = '';
	var codepenData = {};
	var codepenJSON = '';

	if (!jQueryCode) {
		jQueryCode = {};
		jQueryCode['components'] = [];
		jQueryCode['facade'] = 'jquery';
		jQueryCode['facadeDisplayName'] = 'jQuery';
		jQueryCode['otherFacade'] = 'react';
		jQueryCode['otherFacadeDisplayName'] = 'React';
		jQueryExamples.forEach(function (example) {
			if (example) {
				var componentDisplayName = example.displayName;
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
					'			<h3 class="slds-col | slds-has-flexi-truncate | slds-text-heading--small | section-heading">' + componentDisplayName + '</h3>  \n' +
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
					description: 'A developer sandbox for Salesforce Lightning Design System Facades',
					editors: '101',
					html: codeSandboxHTML,
					html_pre_processor: 'none',
					html_classes: '',
					js: example.code,
					js_external: jsExternal.jquery.join(';'),
					js_pre_processor: 'babel',
					js_modernizr: false,
					js_library: '',
					title: componentDisplayName + ' :: Facades :: Salesforce Lightning Design System'
				};

				codepenJSON = JSON.stringify(codepenData).replace(/"/g, "&​quot;").replace(/'/g, "&apos;");

				jQueryCode['components'].push({
					'facade': 'jquery',
					'facadeDisplayName': 'jQuery',
					'otherFacade': 'react',
					'otherFacadeDisplayName': 'React',
					'component': example.component,
					'componentName': componentName,
					'componentDisplayName': componentDisplayName,
					'html': example.html,
					'devHtml': example.devHtml,
					'code': example.code,
					'codepenJSON': codepenJSON,
					'controlDetails': jqueryControlDetails[example.component]
				});
			}
		});
	}
	res.render('jquery/index', jQueryCode);
});

// React examples
var reactCode;
app.get('/react', function (req, res) {
	// needed for these examples until we make them more modular
	var codeSandboxHTMLWrapper = {
		HTML: '<div class="slds-box">' +
					'	<div class="slds-section-title">' +
					'		<div class="slds-grid">' +
					'			<h3 class="slds-col | slds-has-flexi-truncate | slds-text-heading--small | section-heading">' + '</h3>' +
					'		</div>' +
					'	</div>' +
					'	</div>' +
					'</div>'
		};
	var codeSandboxHTML = '';
	var codepenData = {};
	var codepenJSON = '';

	if (!reactCode) {
		reactCode = {};
		reactCode['components'] = [];
		reactCode['facade'] = 'react';
		reactCode['facadeDisplayName'] = 'React';
		reactCode['otherFacade'] = 'react';
		reactCode['otherFacadeDisplayName'] = 'React';
		reactExamples.forEach(function (example) {
			if (example) {
				var componentDisplayName = example.displayName;
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
					description: 'A developer sandbox for Salesforce Lightning Design System Facades',
					editors: '101',
					html: codeSandboxHTML,
					html_pre_processor: 'none',
					html_classes: '',
					js: example.code,
					js_external: jsExternal.react.join(';'),
					js_pre_processor: 'babel',
					js_modernizr: false,
					js_library: '',
					title: componentDisplayName + ' :: Facades :: Salesforce Lightning Design System'
				};

				codepenJSON = JSON.stringify(codepenData).replace(/"/g, "&​quot;").replace(/'/g, "&apos;");

				reactCode['components'].push({
					'facade': 'react',
					'facadeDisplayName': 'React',
					'otherFacade': 'jquery',
					'otherFacadeDisplayName': 'jQuery',
					'component': example.component,
					'componentName': componentName,
					'componentDisplayName': componentDisplayName,
					'code': example.code,
					'html': example.html,
					'codepenJSON': codepenJSON,
					'controlDetails': reactControlDetails[example.component]
				});
			}
		});
	}

	res.render('react/index', reactCode);
});

// Serve up the built files
app.use('/dist', express.static(__dirname + '/.dist'));
app.use('/build', express.static(__dirname + '/build', {'index': false}));
app.use('/docs', express.static(__dirname + '/public/docs', {'index': ['index.html']}));

// Listen
var server = app.listen(port, function() {
	console.log('server listening on port ' + server.address().port);
});
