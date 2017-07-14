define(['exports', '../../../utilities/warning/deprecated-property', '../../../utilities/warning/only-one-of-properties'], function (exports, _deprecatedProperty, _onlyOneOfProperties) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _deprecatedProperty2 = _interopRequireDefault(_deprecatedProperty);

	var _onlyOneOfProperties2 = _interopRequireDefault(_onlyOneOfProperties);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
	/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
	/* eslint-disable import/no-mutable-exports */
	/* eslint-disable max-len */

	var checkProps = function checkProps() {};
	// import oneOfRequiredProperty from '../../../utilities/warning/one-of-required-property';


	if (process.env.NODE_ENV !== 'production') {
		checkProps = function checkProps(COMPONENT, props) {
			// Deprecated and changed to another property
			(0, _deprecatedProperty2.default)(COMPONENT, props.iconCategory, 'iconCategory', undefined, 'Please use `iconLeft` and `iconRight` to pass in a customized <Icon> component.');
			(0, _deprecatedProperty2.default)(COMPONENT, props.iconName, 'iconName', undefined, 'Please use `iconLeft` and `iconRight` to pass in a customized <Icon> component');
			(0, _deprecatedProperty2.default)(COMPONENT, props.iconPosition, 'iconPosition', undefined, 'Please use `iconLeft` and `iconRight` to pass in a customized <Icon> component');
			(0, _deprecatedProperty2.default)(COMPONENT, props.iconAssistiveText, 'iconAssistiveText', undefined, 'Please use `iconLeft` and `iconRight` to pass in a customized <Icon> component');
			(0, _deprecatedProperty2.default)(COMPONENT, props.onIconClick, 'onIconClick', undefined, 'Please use `iconLeft` and `iconRight` to pass in a customized <Icon> component');

			/*
    * Once we support horizontal labels, then I think we can enable this check
    *
   if (!props.inlineEditTrigger) {
   	oneOfRequiredProperty(COMPONENT, {
   		assistiveText: props.assistiveText,
   		label: props.label
   	});
   }
   */

			(0, _onlyOneOfProperties2.default)(COMPONENT, {
				assistiveText: props.assistiveText,
				label: props.label
			});
		};
	}

	exports.default = checkProps;
});