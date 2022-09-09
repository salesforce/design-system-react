"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// ## Constants
var propTypes = {
  /**
   * Optional class name
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string])
};
/**
 * The PageHeaderControl component is used to wrap individual controls within PageHeader 'actions' and 'controls' sections.
 */

var Control = function Control(props) {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)('slds-page-header__control', props.className)
  }, props.children);
};

Control.displayName = _constants.PAGE_HEADER_CONTROL;
Control.propTypes = propTypes;
var _default = Control;
exports.default = _default;