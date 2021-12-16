"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// ### React

/**
 * Used internally, provides fixed cell rendering
 */
var CellFixed = function CellFixed(props) {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-cell-fixed",
    style: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      lineHeight: '2rem'
    }
  }, props.children);
};

var _default = CellFixed;
exports.default = _default;