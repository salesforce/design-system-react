"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sunsetProperty = _interopRequireDefault(require("../../../utilities/warning/sunset-property"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/* eslint-disable import/no-mutable-exports */
var checkProps = function checkPropsFunction() {};

if (process.env.NODE_ENV !== 'production') {
  checkProps = function checkPropsFunction(COMPONENT, props) {
    /* eslint-disable max-len */
    (0, _sunsetProperty.default)(COMPONENT, props.assistiveText, 'assistiveText', 'The wrapping span and assistive text has been removed from this component in order to make it a more pure "higher-level component" of `UtilityIcon`.');
  };
}

var _default = checkProps;
exports.default = _default;