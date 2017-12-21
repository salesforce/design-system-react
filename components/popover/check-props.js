define(['exports', '../../utilities/warning/one-of-required-property', '../../utilities/warning/one-of-component', '../../utilities/warning/deprecated-property'], function (exports, _oneOfRequiredProperty, _oneOfComponent, _deprecatedProperty) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _oneOfRequiredProperty2 = _interopRequireDefault(_oneOfRequiredProperty);

	var _oneOfComponent2 = _interopRequireDefault(_oneOfComponent);

	var _deprecatedProperty2 = _interopRequireDefault(_deprecatedProperty);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var checkProps = function checkProps() {}; /* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
	/* eslint-disable import/no-mutable-exports */
	/* eslint-disable max-len */

	if (process.env.NODE_ENV !== 'production') {
		checkProps = function checkProps(COMPONENT, props) {
			(0, _oneOfRequiredProperty2.default)(COMPONENT, {
				ariaLabelledby: props.ariaLabelledby,
				heading: props.heading
			});

			if (props.children !== undefined) {
				(0, _oneOfComponent2.default)(COMPONENT, props, 'children', ['SLDSButton', 'a', 'button']);
			}

			(0, _deprecatedProperty2.default)(COMPONENT, props.isInline, 'isInline', 'position="relative"');
		};
	}

	exports.default = checkProps;
});