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
		if (props.variant === 'toggle' && props.indeterminate === true) {
			(0, _onlyOneOfProperties2.default)(COMPONENT, {
				variant: props.variant,
				indeterminate: props.indeterminate
			}, 'Currently SLDS does not support the `indeterminate` state in Checkbox Toggle. See SLDS documentation about [Checkbox Toggle](https://lightningdesignsystem.com/components/forms/#flavor-checkbox-toggle-checkbox-toggle) for more information.');
		}
	};
}

exports.default = checkProps;