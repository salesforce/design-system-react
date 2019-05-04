"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _detailRow = _interopRequireDefault(require("../detail-row"));

var _mediaObject = _interopRequireDefault(require("../../../media-object"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
var displayName = 'PageHeaderRecordHome';
var propTypes = {
  /**
   * Content to appear on the right hand side of the page header
   * 'contentRight' prop will be deprecated soon, instead use 'onRenderActions'
   */
  contentRight: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.element]),

  /**
   * An array of detail blocks
   */
  details: _propTypes.default.array,

  /**
   * Icon node passed by PageHeader
   */
  icon: _propTypes.default.node,

  /**
   * Info node passed by PageHeader
   */
  info: _propTypes.default.node,

  /**
   * Heading above title
   */
  label: _propTypes.default.node,

  /**
   * Title node passed by PageHeader
   */
  title: _propTypes.default.node
};

var RecordHome = function RecordHome(props) {
  return _react.default.createElement("div", null, _react.default.createElement("div", {
    className: "slds-grid"
  }, _react.default.createElement("div", {
    className: "slds-col slds-has-flexi-truncate"
  }, _react.default.createElement(_mediaObject.default, {
    body: _react.default.createElement("div", null, props.label, props.title, props.info),
    className: "slds-no-space slds-grow",
    figure: props.icon
  })), _react.default.createElement("div", {
    className: "slds-col slds-no-flex slds-grid slds-align-top"
  }, props.onRenderActions ? props.onRenderActions : props.contentRight)), _react.default.createElement(_detailRow.default, {
    details: props.details
  }));
};

RecordHome.displayName = displayName;
RecordHome.propTypes = propTypes;
var _default = RecordHome;
exports.default = _default;