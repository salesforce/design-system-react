var reactDocs = require('react-docgen');
var fs = require('fs');
var path = require('path');

var componentNames = [
  'data-table',
  'SLDSBreadCrumb',
  'SLDSButton',
  'SLDSButtonStateful',
  'SLDSButtonGroup',
  'SLDSIcon',
  'SLDSLookup',
  'SLDSMenuDropdown',
  'SLDSMenuPicklist',
  'SLDSModal',
  'SLDSNotification',
  'SLDSPageHeader',
  'SLDSPopoverTooltip',
  'SLDSDatepickerSingleSelect',
  'SLDSTimepicker',
  //'SLDSGrid',
  //'SLDSUtilityIcon',
];

var output = {};

componentNames.forEach(function(componentName){
  var inputPath = path.join(__dirname,'..','components',componentName,'index.jsx');
  var src = fs.readFileSync(inputPath,'utf8');
  var doc = reactDocs.parse(src);
  output[componentName] = doc;
});

var outputPath = path.join(__dirname,'..','demo','docs','components.json');

fs.writeFile(outputPath, JSON.stringify(output,null, 4), function (err) {
  if (err) return console.log(err);
});
