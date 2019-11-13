"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _deprecatedProperty = _interopRequireDefault(require("../../utilities/warning/deprecated-property"));

var _oneOfRequiredProperty = _interopRequireDefault(require("../../utilities/warning/one-of-required-property"));

var _getComponentDoc = _interopRequireDefault(require("../../utilities/get-component-doc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */
var checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
    var createDocUrl = (0, _getComponentDoc.default)(jsonDoc);
    /* eslint-disable max-len */

    (0, _deprecatedProperty.default)(COMPONENT, props.isInline, 'isInline', 'menuPosition="relative"', createDocUrl('menuPosition'));
    (0, _deprecatedProperty.default)(COMPONENT, props.menuItem, 'menuItem', 'onRenderMenuItem', createDocUrl('onRenderItem'));
    (0, _deprecatedProperty.default)(COMPONENT, props.readOnlyMenuItemVisibleLength, 'readOnlyMenuItemVisibleLength', 'menuItemVisibleLength', createDocUrl('menuItemVisibleLength'));
    /* eslint-enable max-len */

    if (props.variant !== 'popover') {
      (0, _oneOfRequiredProperty.default)(COMPONENT, {
        options: props.options
      }, createDocUrl('options'));
    } else {
      (0, _oneOfRequiredProperty.default)(COMPONENT, {
        "assistiveText['popoverLabel']": props.assistiveText.popoverLabel
      }, createDocUrl('assistiveText'));
    }
  };
}

var _default = checkProps;
exports.default = _default;