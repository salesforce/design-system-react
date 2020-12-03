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
// # Global Header Search Component
// ## Dependencies
// ### React
// ## Constants

/**
 * The GlobalHeaderSearch component is used for application wide search. The form element is implemented as a `Combobox`.
 */
var GlobalHeaderSearch = function GlobalHeaderSearch(props) {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-global-header__item slds-global-header__item_search"
  }, props.combobox);
};

GlobalHeaderSearch.displayName = _constants.GLOBAL_HEADER_SEARCH;
GlobalHeaderSearch.propTypes = {
  /**
   * A required `Combobox` component. The props from this combobox will be merged and override any default props.
   */
  combobox: _propTypes.default.node.isRequired
};
var _default = GlobalHeaderSearch;
exports.default = _default;