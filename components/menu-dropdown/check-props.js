"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _oneOfRequiredProperty = _interopRequireDefault(require("../../utilities/warning/one-of-required-property"));

var _sunsetProperty = _interopRequireDefault(require("../../utilities/warning/sunset-property"));

var _deprecatedProperty = _interopRequireDefault(require("../../utilities/warning/deprecated-property"));

var _getComponentDoc = _interopRequireDefault(require("../../utilities/get-component-doc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */
var checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkPropsFunction(COMPONENT, props, jsonDoc) {
    var createDocUrl = (0, _getComponentDoc.default)(jsonDoc);
    (0, _sunsetProperty.default)(COMPONENT, props.forceOpen, 'forceOpen', "Please use `isOpen` instead. It provides a consistent prop that aligns with other componenents. ".concat(createDocUrl('isOpen')));
    (0, _sunsetProperty.default)(COMPONENT, props.tooltip, 'tooltip', createDocUrl());
    (0, _deprecatedProperty.default)(COMPONENT, props.offset, 'offset', undefined, "The manual setting of positional offset of dialog components has been deemed unreliable. Position logic has been re-written to deliver better and more reliable positioning. Please create an issue if you have an edge case not covered by the built-in logic. ".concat(createDocUrl()));
    (0, _oneOfRequiredProperty.default)(COMPONENT, {
      options: props.options,
      children: props.children
    }, createDocUrl());
    (0, _deprecatedProperty.default)(COMPONENT, props.isInline, 'isInline', 'menuPosition="relative"', createDocUrl('menuPosition'));
  };
}

var _default = checkProps;
exports.default = _default;