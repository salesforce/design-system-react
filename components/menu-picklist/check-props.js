'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _componentIsDeprecated = require('../../utilities/warning/component-is-deprecated');

var _componentIsDeprecated2 = _interopRequireDefault(_componentIsDeprecated);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkProps = function checkProps() {}; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkProps(COMPONENT) {
		(0, _componentIsDeprecated2.default)(COMPONENT, 'Please use an read-only Combobox instead. It is more accessible and closer aligned to SLDS.');
	};
}

exports.default = checkProps;