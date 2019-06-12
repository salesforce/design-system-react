"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
var displayName = 'PageHeaderInfo';
var propTypes = {
  /**
   * Contents of info section
   */
  children: _propTypes.default.node,

  /**
   * Optional class name
   */
  className: _propTypes.default.string
};

var Info = function Info(props) {
  return _react.default.createElement("p", {
    className: (0, _classnames.default)('slds-text-body_small slds-line-height_reset', props.className)
  }, props.children);
};

Info.displayName = displayName;
Info.propTypes = propTypes;
var _default = Info;
exports.default = _default;