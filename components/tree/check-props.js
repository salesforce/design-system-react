'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _oneOfRequiredProperty = require('../../utilities/warning/one-of-required-property');

var _oneOfRequiredProperty2 = _interopRequireDefault(_oneOfRequiredProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkProps = function checkProps() {}; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkProps(COMPONENT, props) {
		/* eslint-disable max-len */
		(0, _oneOfRequiredProperty2.default)(COMPONENT, {
			assistiveText: props.assistiveText,
			heading: props.heading
		});
		/* eslint-enable max-len */
	};
}

exports.default = checkProps;