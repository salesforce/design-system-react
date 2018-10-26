"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// # List Item Label Component
// ## Dependencies
// ### React
// ## Constants

/**
 * Component description.
 */
var ListItemLabel = function ListItemLabel(props) {
  return _react2.default.createElement("span", {
    className: "slds-truncate"
  }, props.icon, props.label);
};

ListItemLabel.displayName = _constants.LIST_ITEM_LABEL;
ListItemLabel.propTypes = {
  data: _propTypes2.default.object,
  icon: _propTypes2.default.node,
  index: _propTypes2.default.number,
  inverted: _propTypes2.default.bool,
  isSelected: _propTypes2.default.bool,
  label: _propTypes2.default.string,
  value: _propTypes2.default.any
};
ListItemLabel.defaultProps = {
  data: {},
  index: 0,
  inverted: false,
  isSelected: false,
  label: '',
  value: null
};
exports.default = ListItemLabel;