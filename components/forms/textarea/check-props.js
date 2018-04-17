'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _onlyOneOfProperties = require('../../../utilities/warning/only-one-of-properties');

var _onlyOneOfProperties2 = _interopRequireDefault(_onlyOneOfProperties);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkProps = function checkProps() {}; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable max-len */

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkProps(COMPONENT, props) {
		(0, _onlyOneOfProperties2.default)(COMPONENT, {
			assistiveText: props.assistiveText,
			label: props.label
		});
	};
}

exports.default = checkProps;