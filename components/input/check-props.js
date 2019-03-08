"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _deprecatedProperty = require("../../utilities/warning/deprecated-property");

var _deprecatedProperty2 = _interopRequireDefault(_deprecatedProperty);

var _sunsetProperty = require("../../utilities/warning/sunset-property");

var _sunsetProperty2 = _interopRequireDefault(_sunsetProperty);

var _onlyOneOfProperties = require("../../utilities/warning/only-one-of-properties");

var _onlyOneOfProperties2 = _interopRequireDefault(_onlyOneOfProperties);

var _getComponentDoc = require("../../utilities/get-component-doc");

var _getComponentDoc2 = _interopRequireDefault(_getComponentDoc);

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

/* eslint-disable max-len */
// import oneOfRequiredProperty from '../../../utilities/warning/one-of-required-property';
var checkProps = function checkProps() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkProps(COMPONENT, props, jsonDoc) {
    var createDocUrl = (0, _getComponentDoc2.default)(jsonDoc);

    if (COMPONENT === _constants.INPUT) {
      var iconDeprecatedMessage = "Please use `iconLeft` and `iconRight` to pass in a customized <Icon> component. ".concat(createDocUrl()); // Deprecated and changed to another property

      (0, _deprecatedProperty2.default)(COMPONENT, props.assistiveText.fieldLevelHelpButton, 'assistiveText.fieldLevelHelpButton', undefined, "Please pass a `Tooltip` component into `fieldLevelHelpTooltip` with `assistiveText.triggerLearnMoreIcon`.");
      (0, _deprecatedProperty2.default)(COMPONENT, props.iconCategory, 'iconCategory', undefined, iconDeprecatedMessage);
      (0, _deprecatedProperty2.default)(COMPONENT, props.iconName, 'iconName', undefined, iconDeprecatedMessage);
      (0, _deprecatedProperty2.default)(COMPONENT, props.iconPosition, 'iconPosition', undefined, iconDeprecatedMessage);
      (0, _deprecatedProperty2.default)(COMPONENT, props.iconAssistiveText, 'iconAssistiveText', undefined, iconDeprecatedMessage);
      (0, _deprecatedProperty2.default)(COMPONENT, props.onIconClick, 'onIconClick', undefined, iconDeprecatedMessage);

      if (typeof props.assistiveText === 'string') {
        (0, _sunsetProperty2.default)(COMPONENT, props.assistiveText, 'assistiveText', "AssistiveText as a string has been deprecated and is now an object to allow for multiple uses in the component. Please use either assistiveText.label or assistiveText.spinner. ".concat(createDocUrl('assistiveText')));
      }

      (0, _onlyOneOfProperties2.default)(COMPONENT, {
        'assistiveText.label': props.assistiveText && props.assistiveText.label,
        label: props.label
      }, createDocUrl('assistiveText'));
      (0, _onlyOneOfProperties2.default)(COMPONENT, {
        fixedTextLeft: props.fixedTextLeft,
        fixedTextRight: props.fixedTextRight
      }, createDocUrl('assistiveText'));
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
    } else if (COMPONENT === _constants.SEARCH) {
      if (typeof props.assistiveText === 'string') {
        (0, _sunsetProperty2.default)(COMPONENT, props.assistiveText, 'assistiveText', "`assistiveText` as a string has been deprecated and is now an object to allow for multiple uses in the component. Please use `assistiveText.label` instead. ".concat(createDocUrl('assistiveText')));
      }
    }
  };
}

exports.default = checkProps;