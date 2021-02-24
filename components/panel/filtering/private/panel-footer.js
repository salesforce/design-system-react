"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _button = _interopRequireDefault(require("../../../button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// # Panel Filter Group Footer
// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1
// ## Dependencies
// ### React

/**
 * A filtering panel contextual filtering options.
 */
var PanelFilterFooter = function PanelFilterFooter(_ref) {
  var addFilterLabel = _ref.addFilterLabel,
      onClickAdd = _ref.onClickAdd,
      onClickRemoveAll = _ref.onClickRemoveAll,
      removeAllLabel = _ref.removeAllLabel;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-filters__footer slds-grid slds-shrink-none"
  }, /*#__PURE__*/_react.default.createElement(_button.default, {
    label: addFilterLabel,
    onClick: onClickAdd,
    variant: "link"
  }), /*#__PURE__*/_react.default.createElement(_button.default, {
    className: "slds-col_bump-left",
    label: removeAllLabel,
    onClick: onClickRemoveAll,
    variant: "link"
  }));
};

PanelFilterFooter.displayName = 'SLDSPanelFilterFooter';
PanelFilterFooter.propTypes = {
  /**
   * Localized description of the "Add Filter" button in the footer
   */
  addFilterLabel: _propTypes.default.node.isRequired,

  /**
   * Callback triggered when "Add Filter" is clicked. Recieves an `event`.
   */
  onClickAdd: _propTypes.default.func.isRequired,

  /**
   * Callback triggered when "Remove All" is clicked. Recieves an `event`.
   */
  onClickRemoveAll: _propTypes.default.func.isRequired,

  /**
   * Localized description of the "Remove All" button in the footer
   */
  removeAllLabel: _propTypes.default.node.isRequired
};
var _default = PanelFilterFooter;
exports.default = _default;