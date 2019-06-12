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

    if (typeof props.assistiveText === 'string') {
      (0, _sunsetProperty.default)(COMPONENT, props.assistiveText, 'assistiveText', "`assistiveText` as a string has been deprecated and is now an object to allow for multiple uses in the component. Please use `assistiveText.label` instead. ".concat(createDocUrl('assistiveText')));
    }
  };
}

var _default = checkProps;
exports.default = _default;