var fs = require('fs');

var codeDir = './src/jquery/';
var exampleCode = {
	badge: fs.readFileSync(codeDir + 'badge/examples/site-example.js', 'utf8'),
	button: fs.readFileSync(codeDir + 'button/examples/site-example.js', 'utf8'),
	buttongroup: fs.readFileSync(codeDir + 'button-group/examples/site-example.js', 'utf8'),
	checkbox: fs.readFileSync(codeDir + 'checkbox/examples/site-example.js', 'utf8'),
	combobox: fs.readFileSync(codeDir + 'combobox/examples/site-example.js', 'utf8'),
	datepicker: fs.readFileSync(codeDir + 'datepicker/examples/site-example.js', 'utf8'),
	datatable: fs.readFileSync(codeDir + 'data-table/examples/site-example.js', 'utf8'),
	dropdown: fs.readFileSync(codeDir + 'dropdown/examples/site-example.js', 'utf8'),
	// lookup: fs.readFileSync(codeDir + 'lookup/examples/site-example.js', 'utf8'),
	modal: fs.readFileSync(codeDir + 'modal/examples/site-example.js', 'utf8'),
	notification: fs.readFileSync(codeDir + 'notification/examples/site-example.js', 'utf8'),
	picklist: fs.readFileSync(codeDir + 'picklist/examples/site-example.js', 'utf8'),
	pills: fs.readFileSync(codeDir + 'pills/examples/site-example.js', 'utf8'),
	popover: fs.readFileSync(codeDir + 'popover/examples/site-example.js', 'utf8'),
	spinner: fs.readFileSync(codeDir + 'spinner/examples/site-example.js', 'utf8'),
	tooltip: fs.readFileSync(codeDir + 'tooltip/examples/site-example.js', 'utf8'),
	tree: fs.readFileSync(codeDir + 'tree/examples/site-example.js', 'utf8')
};

module.exports = exampleCode;
