import React from 'react';
import ReactDOM from 'react-dom';

import badge from '../../src/react/badge/examples/site-example';
// import button from './button/example';
// import buttonGroup from './button-group/example';
// import checkbox from '../../src/react/checkbox/example';
// import combobox from '../../src/react/combobox/example';
import datepicker from '../../src/react/datepicker/examples/site-example';
import dropdown from '../../src/react/dropdown/example';
import lookup from '../../src/react/lookup/examples/site-example';
// import modal from '../../src/react/modal/example';
// import notification from '../../src/react/notification/example';
import picklist from '../../src/react/picklist/examples/site-example';
// 	// import picker from '../../src/react/picker/example';
import pillbox from '../../src/react/pillbox/example';
import popover from '../../src/react/popover/example';
// import radio from '../../src/react/radio/example';
// import spinner from '../../src/react/spinner/example';
import tooltip from '../../src/react/tooltip/example';
import tree from '../../src/react/tree/example';
import datatable from '../../src/react/data-table/example';

ReactDOM.render(React.createElement(badge), document.querySelector('.react .badge .site-example'));
// button();
// buttonGroup();
// checkbox();
// combobox();
datepicker();
dropdown();
lookup();
// modal();
// notification();
picklist();
// 	// picker();
pillbox();
popover();
// radio();
// spinner();
tree();
tooltip();
datatable();
