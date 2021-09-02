"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _componentIsDeprecated = _interopRequireDefault(require("../../utilities/warning/component-is-deprecated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */
var checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkPropsFunction(COMPONENT, props) {
    (0, _componentIsDeprecated.default)(COMPONENT, props, 'Please use an read-only Combobox instead. It is more accessible and closer aligned to SLDS.');
  };
}

var _default = checkProps;
exports.default = _default;