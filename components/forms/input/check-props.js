'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _deprecatedProperty = require('../../../utilities/warning/deprecated-property');

var _deprecatedProperty2 = _interopRequireDefault(_deprecatedProperty);

var _sunsetProperty = require('../../../utilities/warning/sunset-property');

var _sunsetProperty2 = _interopRequireDefault(_sunsetProperty);

var _onlyOneOfProperties = require('../../../utilities/warning/only-one-of-properties');

var _onlyOneOfProperties2 = _interopRequireDefault(_onlyOneOfProperties);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkProps = function checkProps() {};
// import oneOfRequiredProperty from '../../../utilities/warning/one-of-required-property';
/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable max-len */

if (process.env.NODE_ENV !== 'production') {
	checkProps = function checkProps(COMPONENT, props) {
		// Deprecated and changed to another property
		(0, _deprecatedProperty2.default)(COMPONENT, props.iconCategory, 'iconCategory', undefined, 'Please use `iconLeft` and `iconRight` to pass in a customized <Icon> component.');
		(0, _deprecatedProperty2.default)(COMPONENT, props.iconName, 'iconName', undefined, 'Please use `iconLeft` and `iconRight` to pass in a customized <Icon> component');
		(0, _deprecatedProperty2.default)(COMPONENT, props.iconPosition, 'iconPosition', undefined, 'Please use `iconLeft` and `iconRight` to pass in a customized <Icon> component');
		(0, _deprecatedProperty2.default)(COMPONENT, props.iconAssistiveText, 'iconAssistiveText', undefined, 'Please use `iconLeft` and `iconRight` to pass in a customized <Icon> component');
		(0, _deprecatedProperty2.default)(COMPONENT, props.onIconClick, 'onIconClick', undefined, 'Please use `iconLeft` and `iconRight` to pass in a customized <Icon> component');

		if (typeof props.assistiveText === 'string') {
			(0, _sunsetProperty2.default)(COMPONENT, props.assistiveText, 'assistiveText', 'AssistiveText as a string has been deprecated and is now an object to allow for multiple uses in the component. Please use either assistiveText.label or assistiveText.spinner');
		}

		(0, _onlyOneOfProperties2.default)(COMPONENT, {
			assistiveText: props.assistiveText,
			label: props.label
		});

		(0, _onlyOneOfProperties2.default)(COMPONENT, {
			fixedTextLeft: props.fixedTextLeft,
			fixedTextRight: props.fixedTextRight
		});

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
	};
}

exports.default = checkProps;