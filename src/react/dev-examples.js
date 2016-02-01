/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

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
import pills from './pills/examples/site-example';
import popover from './popover/examples/site-example';
import radio from './radio/examples/site-example';
import spinner from './spinner/examples/site-example';
import tooltip from './tooltip/examples/site-example';
import tree from './tree/examples/site-example';
import dataTable from './data-table/examples/site-example';

ReactDOM.render(React.createElement(badge), document.querySelector('#badge-react-control'));
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
ReactDOM.render(React.createElement(pills), document.querySelector('#pills-react-control'));
ReactDOM.render(React.createElement(popover), document.querySelector('#popover-react-control'));
ReactDOM.render(React.createElement(radio), document.querySelector('#radio-react-control'));
ReactDOM.render(React.createElement(spinner), document.querySelector('#spinner-react-control'));
ReactDOM.render(React.createElement(tree), document.querySelector('#tree-react-control'));
ReactDOM.render(React.createElement(tooltip), document.querySelector('#tooltip-react-control'));
ReactDOM.render(React.createElement(dataTable), document.querySelector('#data-table-react-control'));
