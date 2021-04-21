"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// ### React
var CardFooter = function CardFooter(props) {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-card__footer"
  }, props.children);
};

CardFooter.displayName = _constants.CARD_FOOTER;
CardFooter.propTypes = {
  /**
   * Elements to place in the footer.
   */
  children: _propTypes.default.node
};
var _default = CardFooter;
exports.default = _default;