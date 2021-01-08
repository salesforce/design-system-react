"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _componentIsDeprecated = _interopRequireDefault(require("../../../utilities/warning/component-is-deprecated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */

/* eslint-disable max-len */
var checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkPropsFunction(COMPONENT, props) {
    (0, _componentIsDeprecated.default)(COMPONENT, props, 'For a multiple input form, please use the pattern located at https://www.lightningdesignsystem.com/components/form-element/#Record-Detail that swaps out a read-only `Input` with a base `Input`. For a single input, please use a `Popover` paired with `<Button	category="utility" iconName="edit" variant="icon" />` as the trigger.');
  };
}

var _default = checkProps;
exports.default = _default;