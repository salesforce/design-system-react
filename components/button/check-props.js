"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ifOneThenBothRequiredProperty = require("../../utilities/warning/if-one-then-both-required-property");

var _ifOneThenBothRequiredProperty2 = _interopRequireDefault(_ifOneThenBothRequiredProperty);

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
    // If iconName is set, iconCategory must also be set.
    (0, _ifOneThenBothRequiredProperty2.default)(COMPONENT, props, {
      iconName: props.iconName,
      iconCategory: props.iconCategory
    });

    if (typeof props.assistiveText === 'string') {
      (0, _sunsetProperty2.default)(COMPONENT, props.assistiveText, 'assistiveText', '`assistiveText` as a string has been deprecated and is now an object to allow for multiple uses in the component. Please use `assistiveText.icon` instead.');
    }
  };
}

exports.default = checkProps;