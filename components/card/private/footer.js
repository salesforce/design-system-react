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
// ### React
var CardFooter = function CardFooter(props) {
  return _react2.default.createElement("div", {
    className: "slds-card__footer"
  }, props.children);
};

CardFooter.displayName = _constants.CARD_FOOTER;
CardFooter.propTypes = {
  /**
   * Elements to place in the footer.
   */
  children: _propTypes2.default.node
};
exports.default = CardFooter;