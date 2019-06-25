"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ifOneThenBothRequiredProperty = _interopRequireDefault(require("../../utilities/warning/if-one-then-both-required-property"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */
var checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkPropsFunction(COMPONENT, props) {
    /* eslint-disable max-len */
    // Deprecated and changed to another property
    (0, _ifOneThenBothRequiredProperty.default)(COMPONENT, props, {
      isSorted: props.isSorted,
      sortDirection: props.sortDirection
    });
    /* eslint-enable max-len */
  };
}

var _default = checkProps;
exports.default = _default;