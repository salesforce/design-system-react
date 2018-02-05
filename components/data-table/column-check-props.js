define(['exports', '../../utilities/warning/if-one-then-both-required-property'], function (exports, _ifOneThenBothRequiredProperty) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _ifOneThenBothRequiredProperty2 = _interopRequireDefault(_ifOneThenBothRequiredProperty);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var checkProps = function checkProps() {}; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
	/* eslint-disable import/no-mutable-exports */

	if (process.env.NODE_ENV !== 'production') {
		checkProps = function checkProps(COMPONENT, props) {
			/* eslint-disable max-len */
			// Deprecated and changed to another property
			(0, _ifOneThenBothRequiredProperty2.default)(COMPONENT, props, {
				isSorted: props.isSorted,
				sortDirection: props.sortDirection
			});
			/* eslint-enable max-len */
		};
	}

	exports.default = checkProps;
});