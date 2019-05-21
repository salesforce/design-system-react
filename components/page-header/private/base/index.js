"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _mediaObject = _interopRequireDefault(require("../../../media-object"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
var displayName = 'PageHeaderBase';
var propTypes = {
  /**
   * Icon node passed by PageHeader
   */
  icon: _propTypes.default.node,

  /**
   * Title node passed by PageHeader
   */
  title: _propTypes.default.node,

  /**
   * Info node passed by PageHeader
   */
  info: _propTypes.default.node,

  /**
   * Nav content which appears in the upper right hand corner.
   * 'navRight' prop will be deprecated soon, instaed use 'onRenderControls'
   */
  navRight: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element])
};

var Base = function Base(props) {
  return _react.default.createElement("div", {
    className: "slds-grid slds-page-header__row"
  }, _react.default.createElement("div", {
    className: "slds-col slds-page-header__col-title"
  }, _react.default.createElement(_mediaObject.default, {
    body: _react.default.createElement("div", null, props.title, props.info),
    className: "slds-no-space slds-grow",
    figure: props.icon
  })), _react.default.createElement("div", {
    className: "slds-col slds-no-flex slds-grid slds-align-top"
  }, props.onRenderControls ? props.onRenderControls : props.navRight));
};

Base.displayName = displayName;
Base.propTypes = propTypes;
var _default = Base;
exports.default = _default;