"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// ### React

/**
 * Used internally, provides fixed cell rendering
 */
var CellFixed = function CellFixed(props) {
  return _react2.default.createElement("div", {
    className: "slds-cell-fixed",
    style: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap'
    }
  }, props.children);
};

exports.default = CellFixed;