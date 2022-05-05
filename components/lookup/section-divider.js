"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
var displayName = 'LookupDefaultSectionDivider';
var propTypes = {
  data: _propTypes.default.object
};

var DefaultSectionDivider = function DefaultSectionDivider(props) {
  return /*#__PURE__*/_react.default.createElement("li", {
    className: "slds-p-around_x-small slds-lookup__divider",
    tabIndex: "-1"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "slds-m-left_x-small"
  }, /*#__PURE__*/_react.default.createElement("strong", null, props.data.label)));
};

DefaultSectionDivider.displayName = displayName;
DefaultSectionDivider.propTypes = propTypes;
var _default = DefaultSectionDivider;
exports.default = _default;