"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sunsetProperty = _interopRequireDefault(require("../../utilities/warning/sunset-property"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

/* eslint-disable max-len */
var checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkPropsFunction(COMPONENT, props) {
    (0, _sunsetProperty.default)(COMPONENT, props.styleContainer, 'styleContainer');
    (0, _sunsetProperty.default)(COMPONENT, props.theme, 'theme');
  };
}

var _default = checkProps;
exports.default = _default;