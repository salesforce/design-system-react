"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DISPLAY_NAME = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
var DISPLAY_NAME = 'SLDSSplitViewListItemContent';
exports.DISPLAY_NAME = DISPLAY_NAME;
var propTypes = {
  /**
   * **Item to be displayed**
   * * `label`: The main label displayed on the top left.
   * * `topRightText`: The text displayed on the top right.
   * * `bottomLeftText`: The text displayed on the bottom left.
   * * `bottomRightText`: The text displayed on the bottom right.
   */
  item: _propTypes.default.shape({
    label: _propTypes.default.string,
    topRightText: _propTypes.default.string,
    bottomLeftText: _propTypes.default.string,
    bottomRightText: _propTypes.default.string
  })
};
var defaultProps = {};

var SplitViewListItemContent = function SplitViewListItemContent(_ref) {
  var item = _ref.item;
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-grid slds-wrap"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "slds-truncate slds-text-body_regular slds-text-color_default",
    title: item.label
  }, item.label), /*#__PURE__*/_react.default.createElement("span", {
    className: "slds-truncate slds-col_bump-left",
    title: item.topRightText
  }, item.topRightText)), /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-grid slds-wrap"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "slds-truncate",
    title: item.bottomLeftText
  }, item.bottomLeftText), /*#__PURE__*/_react.default.createElement("span", {
    className: "slds-truncate slds-col_bump-left",
    title: item.bottomLeftText
  }, item.bottomRightText)));
};

SplitViewListItemContent.displayName = DISPLAY_NAME;
SplitViewListItemContent.propTypes = propTypes;
SplitViewListItemContent.defaultProps = defaultProps;
var _default = SplitViewListItemContent;
exports.default = _default;