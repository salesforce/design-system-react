// WARNING: Keep this here as it is required for examples.html to work with webpack-dev-server
// require('../../scss/index');
require('../../site/assets/facades/scss/index');
require('../../site/assets/demo-site/scss/index');

import React from 'react';
import ReactDOM from 'react-dom';

import badge from './badge/examples/dev-example';
import button from './button/examples/site-example';
import buttonGroup from './button-group/examples/site-example';
import combobox from './combobox/examples/dev-example';
import checkbox from './checkbox/examples/dev-example';
import datepicker from './datepicker/examples/site-example';
import dropdown from './dropdown/examples/site-example';
import lookup from './lookup/examples/site-example';
import modal from './modal/examples/site-example';
import notification from './notification/examples/site-example';
import picklist from './picklist/examples/site-example';
import pillbox from './pillbox/examples/site-example';
import popover from './popover/examples/site-example';
import radio from './radio/examples/site-example';
import spinner from './spinner/examples/site-example';
import tooltip from './tooltip/examples/site-example';
import tree from './tree/examples/site-example';
import datatable from './data-table/examples/site-example';

ReactDOM.render(React.createElement(badge), document.querySelector('.react .badge .site-example'));
ReactDOM.render(React.createElement(button), document.querySelector('#button-react-control'));
ReactDOM.render(React.createElement(buttonGroup), document.querySelector('#button-group-react-control'));
ReactDOM.render(React.createElement(combobox), document.querySelector('#combobox-react-control'));
ReactDOM.render(React.createElement(checkbox), document.querySelector('#checkbox-react-control'));
ReactDOM.render(React.createElement(datepicker), document.querySelector('#datepicker-react-control'));
ReactDOM.render(React.createElement(dropdown), document.querySelector('#dropdown-react-control'));
ReactDOM.render(React.createElement(lookup), document.querySelector('#lookup-react-control'));
ReactDOM.render(React.createElement(modal), document.querySelector('#modal-react-control'));
ReactDOM.render(React.createElement(notification), document.querySelector('#notification-react-control'));
ReactDOM.render(React.createElement(picklist), document.querySelector('#picklist-react-control'));
ReactDOM.render(React.createElement(pillbox), document.querySelector('#pillbox-react-control'));
ReactDOM.render(React.createElement(popover), document.querySelector('#popover-react-control'));
ReactDOM.render(React.createElement(radio), document.querySelector('#radio-react-control'));
ReactDOM.render(React.createElement(spinner), document.querySelector('#spinner-react-control'));
ReactDOM.render(React.createElement(tree), document.querySelector('#tree-react-control'));
ReactDOM.render(React.createElement(tooltip), document.querySelector('#tooltip-react-control'));
ReactDOM.render(React.createElement(datatable), document.querySelector('#data-table-react-control'));
