// WARNING: Keep this here as it is required for examples.html to work with webpack-dev-server
// require('../../scss/index');

import React from 'react';
import ReactDOM from 'react-dom';

import badge from './badge/examples/site-example';
import button from './button/example';
import buttonGroup from './button-group/example';
import combobox from './combobox/example';
import checkbox from './checkbox/example';
import datepicker from './datepicker/example';
import dropdown from './dropdown/example';
import lookup from './lookup/example';
import modal from './modal/example';
import notification from './notification/example';
import picklist from './picklist/example';
	// import picker from './picker/example';
import pillbox from './pillbox/example';
import popover from './popover/example';
import radio from './radio/example';
import spinner from './spinner/example';
import tooltip from './tooltip/example';
import tree from './tree/example';
import datatable from './data-table/example';

ReactDOM.render(React.createElement(badge), document.querySelector('.react .badge .site-example'));
button();
buttonGroup();
combobox();
checkbox();
datepicker();
dropdown();
lookup();
modal();
notification();
picklist();
	// picker();
pillbox();
popover();
radio();
spinner();
tree();
tooltip();
datatable();
