"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _componentIsDeprecated = _interopRequireDefault(require("../../utilities/warning/component-is-deprecated"));

var _deprecatedProperty = _interopRequireDefault(require("../../utilities/warning/deprecated-property"));

var _getComponentDoc = _interopRequireDefault(require("../../utilities/get-component-doc"));

var _sunsetProperty = _interopRequireDefault(require("../../utilities/warning/sunset-property"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */
// ## Constants
var checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
    if (COMPONENT === _constants.GLOBAL_HEADER_BUTTON || COMPONENT === _constants.GLOBAL_HEADER_DROPDOWN) {
      (0, _componentIsDeprecated.default)(COMPONENT, props, "".concat(COMPONENT, " has been deprecated in favor of more-specific global header subcomponents. Please see docs for updated examples."));
    }

    if (COMPONENT === _constants.GLOBAL_HEADER_PROFILE) {
      var popoverExtraMessage = 'Use the `popover` attribute to provide a `Popover` component with content inside the `body` prop instead.';
      (0, _sunsetProperty.default)(COMPONENT, props.align, 'align');
      (0, _sunsetProperty.default)(COMPONENT, props.children, 'children', popoverExtraMessage);
      (0, _sunsetProperty.default)(COMPONENT, props.nubbinPosition, 'nubbinPosition');
      (0, _sunsetProperty.default)(COMPONENT, props.offset, 'offset');
      (0, _sunsetProperty.default)(COMPONENT, props.onSelect, 'onSelect');
      (0, _sunsetProperty.default)(COMPONENT, props.options, 'options', popoverExtraMessage);
    }

    var createDocUrl = (0, _getComponentDoc.default)(jsonDoc);
    (0, _deprecatedProperty.default)(COMPONENT, props.skipToContentAssistiveText, 'skipToContentAssistiveText', "assistiveText['skipToContent']", createDocUrl('assistiveText'));
    (0, _deprecatedProperty.default)(COMPONENT, props.skipToNavAssistiveText, 'skipToNavAssistiveText', "assistiveText['skipToNav']", createDocUrl('assistiveText'));
  };
}

var _default = checkProps;
exports.default = _default;