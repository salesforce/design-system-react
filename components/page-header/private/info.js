"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
var displayName = 'PageHeaderInfo';
var propTypes = {
  /**
   * Contents of info section
   */
  children: _propTypes2.default.node,

  /**
   * Optional class name
   */
  className: _propTypes2.default.string
};

var Info = function Info(props) {
  return _react2.default.createElement("p", {
    className: (0, _classnames2.default)('slds-page-header__info', props.className)
  }, props.children);
};

Info.displayName = displayName;
Info.propTypes = propTypes;
exports.default = Info;