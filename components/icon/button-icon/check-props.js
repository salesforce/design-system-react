define(['exports', '../../../utilities/warning/sunset-property'], function (exports, _sunsetProperty) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _sunsetProperty2 = _interopRequireDefault(_sunsetProperty);

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
			(0, _sunsetProperty2.default)(COMPONENT, props.assistiveText, 'assistiveText', 'The wrapping span and assistive text has been removed from this component in order to make it a more pure "higher-level component" of `UtilityIcon`.');
		};
	}

	exports.default = checkProps;
});