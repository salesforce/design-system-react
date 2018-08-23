"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _onlyOneOfProperties = require("../../utilities/warning/only-one-of-properties");

var _onlyOneOfProperties2 = _interopRequireDefault(_onlyOneOfProperties);

var _sunsetProperty = require("../../utilities/warning/sunset-property");

var _sunsetProperty2 = _interopRequireDefault(_sunsetProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

/* eslint-disable max-len */
var checkProps = function checkProps() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkProps(COMPONENT, props) {
    (0, _onlyOneOfProperties2.default)(COMPONENT, {
      assistiveText: props.assistiveText,
      label: props.label
    });

    if (typeof props.assistiveText === 'string') {
      (0, _sunsetProperty2.default)(COMPONENT, props.assistiveText, 'assistiveText', '`assistiveText` as a string has been deprecated and is now an object to allow for multiple uses in the component. Please use `assistiveText.label` instead.');
    }
  };
}

exports.default = checkProps;