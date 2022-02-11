"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sunsetProperty = _interopRequireDefault(require("../../utilities/warning/sunset-property"));

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

    (0, _sunsetProperty.default)(COMPONENT, props.iconCategory, 'iconCategory', "Use `Icon` instead. ".concat(createDocUrl('icon')));
    (0, _sunsetProperty.default)(COMPONENT, props.iconName, 'iconName', "Use `Icon` instead. ".concat(createDocUrl('icon')));
    (0, _sunsetProperty.default)(COMPONENT, props.content, 'content', "Use `labels.heading` and `labels.headingLink` instead. ".concat(createDocUrl('labels')));
    (0, _sunsetProperty.default)(COMPONENT, props.isOpen, 'isOpen', "Use a conditional outside of alert. ".concat(createDocUrl()));
    (0, _sunsetProperty.default)(COMPONENT, props.isOpen, 'onDismiss', "Use `onRequestClose` instead. ".concat(createDocUrl('onRequestClose')));
    (0, _sunsetProperty.default)(COMPONENT, props.texture, 'texture', createDocUrl());
    (0, _sunsetProperty.default)(COMPONENT, props.theme, 'theme', "Use `variant` instead. ".concat(createDocUrl('variant')));
  };
}

var _default = checkProps;
exports.default = _default;