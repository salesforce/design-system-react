define(['exports', '../../utilities/warning/deprecated-property', '../../utilities/warning/one-of-required-property', '../../utilities/warning/has-children-without-display-name-of', '../../utilities/warning/sunset-property', '../../utilities/constants'], function (exports, _deprecatedProperty, _oneOfRequiredProperty, _hasChildrenWithoutDisplayNameOf, _sunsetProperty, _constants) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _deprecatedProperty2 = _interopRequireDefault(_deprecatedProperty);

	var _oneOfRequiredProperty2 = _interopRequireDefault(_oneOfRequiredProperty);

	var _hasChildrenWithoutDisplayNameOf2 = _interopRequireDefault(_hasChildrenWithoutDisplayNameOf);

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
			// Deprecated and changed to another property
			(0, _deprecatedProperty2.default)(COMPONENT, props.modal, 'modal', 'isInline', 'In an effort to add clarity to the meaning of the modal prop and to make more props default to false, `isInline` has replaced `modal` and is the reverse of modal.');
			(0, _sunsetProperty2.default)(COMPONENT, props.forceOpen, 'forceOpen', 'Please use isOpen instead. It provides a consistent prop that aligns with other componenents.');

			(0, _oneOfRequiredProperty2.default)(COMPONENT, {
				options: props.options,
				children: props.children
			});

			if (!props.options) {
				(0, _hasChildrenWithoutDisplayNameOf2.default)(COMPONENT, props.children, _constants.MENU_DROPDOWN_TRIGGER);
			}
		};
	}

	exports.default = checkProps;
});