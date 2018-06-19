"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sunsetProperty = require("../../utilities/warning/sunset-property");

var _sunsetProperty2 = _interopRequireDefault(_sunsetProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */
var checkProps = function checkProps() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkProps(COMPONENT, props) {
    /* eslint-disable max-len */
    (0, _sunsetProperty2.default)(COMPONENT, props.iconCategory, 'iconCategory', 'Use `Icon` instead.');
    (0, _sunsetProperty2.default)(COMPONENT, props.iconName, 'iconName', 'Use `Icon` instead.');
    (0, _sunsetProperty2.default)(COMPONENT, props.content, 'content', 'Use `labels.heading` and `labels.headingLink` instead.');
    (0, _sunsetProperty2.default)(COMPONENT, props.duration, 'duration', 'Only Toasts can auto-hide.');
    (0, _sunsetProperty2.default)(COMPONENT, props.isOpen, 'isOpen', 'Use a conditional outside of alert.');
    (0, _sunsetProperty2.default)(COMPONENT, props.isOpen, 'onDismiss', 'Use `onRequestClose` instead');
    (0, _sunsetProperty2.default)(COMPONENT, props.texture, 'texture');
    (0, _sunsetProperty2.default)(COMPONENT, props.theme, 'theme', 'Use `variant` instead.');
  };
}

exports.default = checkProps;