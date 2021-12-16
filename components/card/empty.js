"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// ### React
// React is an external dependency of the project.

/**
 * A default empty state for Cards.
 */
var CardEmpty = function CardEmpty(props) {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-p-horizontal_small"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-text-align_center slds-m-bottom_x-large"
  }, /*#__PURE__*/_react.default.createElement("h3", {
    className: "slds-text-heading_small slds-p-top_large slds-p-bottom_large"
  }, props.heading), props.children));
}; // ### Display Name
// Always use the canonical component name as the React display name.


CardEmpty.displayName = _constants.CARD_EMPTY; // ### Prop Types

CardEmpty.propTypes = {
  /**
   * Additional call to actions that will render under the heading. Often this is an "Add Item" button.
   */
  children: _propTypes.default.node,

  /**
   * Primary text for an Empty Card.
   */
  heading: _propTypes.default.string
};
CardEmpty.defaultProps = {
  heading: 'No Related Items'
};
var _default = CardEmpty;
exports.default = _default;