'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ModalTrigger = {
	open: function open(cfg) {
		var el = document.createElement('span');
		el.setAttribute('data-slds-modal', true);
		document.body.appendChild(el);
		var comp = _react2.default.createElement(
			_index2.default,
			{ title: cfg.title, footer: cfg.footer, isOpen: true },
			cfg.content
		);
		_reactDom2.default.render(comp, el);
	}
}; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

exports.default = ModalTrigger;