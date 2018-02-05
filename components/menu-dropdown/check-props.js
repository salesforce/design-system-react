define(['exports', '../../utilities/warning/one-of-required-property', '../../utilities/warning/has-children-without-display-name-of', '../../utilities/warning/sunset-property', '../../utilities/warning/deprecated-property', '../../utilities/constants'], function (exports, _oneOfRequiredProperty, _hasChildrenWithoutDisplayNameOf, _sunsetProperty, _deprecatedProperty, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _oneOfRequiredProperty2 = _interopRequireDefault(_oneOfRequiredProperty);

	var _hasChildrenWithoutDisplayNameOf2 = _interopRequireDefault(_hasChildrenWithoutDisplayNameOf);

	var _sunsetProperty2 = _interopRequireDefault(_sunsetProperty);

	var _deprecatedProperty2 = _interopRequireDefault(_deprecatedProperty);

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
			(0, _sunsetProperty2.default)(COMPONENT, props.forceOpen, 'forceOpen', 'Please use isOpen instead. It provides a consistent prop that aligns with other componenents.');

			(0, _oneOfRequiredProperty2.default)(COMPONENT, {
				options: props.options,
				children: props.children
			});

			if (!props.options) {
				(0, _hasChildrenWithoutDisplayNameOf2.default)(COMPONENT, props.children, _constants.MENU_DROPDOWN_TRIGGER);
			}

			(0, _deprecatedProperty2.default)(COMPONENT, props.isInline, 'isInline', 'menuPosition="relative"');
		};
	}

	exports.default = checkProps;
});