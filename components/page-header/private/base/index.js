"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mediaObject = require("../../../media-object");

var _mediaObject2 = _interopRequireDefault(_mediaObject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
var displayName = 'PageHeaderBase';
var propTypes = {
  /**
   * Icon node passed by PageHeader
   */
  icon: _propTypes2.default.node,

  /**
   * Title node passed by PageHeader
   */
  title: _propTypes2.default.node,

  /**
   * Info node passed by PageHeader
   */
  info: _propTypes2.default.node,

  /**
   * Nav content which appears in the upper right hand corner.
   */
  navRight: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element])
};

var Base = function Base(props) {
  return _react2.default.createElement("div", {
    className: "slds-grid slds-page-header__row"
  }, _react2.default.createElement("div", {
    className: "slds-col slds-page-header__col-title"
  }, _react2.default.createElement(_mediaObject2.default, {
    body: _react2.default.createElement("div", null, props.title, props.info),
    className: "slds-no-space slds-grow",
    figure: props.icon
  })), _react2.default.createElement("div", {
    className: "slds-col slds-no-flex slds-grid slds-align-top"
  }, props.navRight));
};

Base.displayName = displayName;
Base.propTypes = propTypes;
exports.default = Base;