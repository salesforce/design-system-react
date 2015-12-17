var fs = require('fs');

var codeDir = './src/react/';
var exampleCode = {
	badge: {
		siteExample: fs.readFileSync(codeDir + 'badge/examples/site-example.js', 'utf8')
	},
	checkbox: fs.readFileSync(codeDir + 'checkbox/example.js', 'utf8'),
	combobox: fs.readFileSync(codeDir + 'combobox/examples/site-example.js', 'utf8'),
	datepicker: fs.readFileSync(codeDir + 'datepicker/examples/site-example.js', 'utf8'),
	dataTable: fs.readFileSync(codeDir + 'data-table/example.js', 'utf8'),
	dropdown: fs.readFileSync(codeDir + 'dropdown/example.js', 'utf8'),
	lookup: fs.readFileSync(codeDir + 'lookup/examples/site-example.js', 'utf8'),
	picklist: fs.readFileSync(codeDir + 'picklist/examples/site-example.js', 'utf8'),
	pills: fs.readFileSync(codeDir + 'pillbox/example.js', 'utf8'),
	popover: fs.readFileSync(codeDir + 'popover/example.js', 'utf8'),
	tooltip: fs.readFileSync(codeDir + 'tooltip/example.js', 'utf8'),
	tree: fs.readFileSync(codeDir + 'tree/example.js', 'utf8')
};

module.exports = exampleCode;
