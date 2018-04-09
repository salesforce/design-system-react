'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _deprecatedProperty = require('../../utilities/warning/deprecated-property');

var _deprecatedProperty2 = _interopRequireDefault(_deprecatedProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkProps = function checkProps() {}; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkProps(COMPONENT, props) {
		(0, _deprecatedProperty2.default)(COMPONENT, props.isInline, 'isInline', 'menuPosition="relative"');
	};
}

exports.default = checkProps;