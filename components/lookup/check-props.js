'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _deprecatedProperty = require('../../utilities/warning/deprecated-property');

var _deprecatedProperty2 = _interopRequireDefault(_deprecatedProperty);

var _componentIsDeprecated = require('../../utilities/warning/component-is-deprecated');

var _componentIsDeprecated2 = _interopRequireDefault(_componentIsDeprecated);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

var checkProps = function checkProps() {};

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkProps(COMPONENT, props) {
		// Deprecated and changed to another property
		(0, _deprecatedProperty2.default)(COMPONENT, props.modal, 'modal', 'isInline', 'In an effort to add clarity to the meaning of the modal prop and to make more props default to false, `isInline` has replaced `modal` and is the reverse of modal.');
		(0, _componentIsDeprecated2.default)(COMPONENT, 'Please use an auto-complete Combobox instead. It is more accessible and closer aligned to SLDS.');
	};
}

exports.default = checkProps;