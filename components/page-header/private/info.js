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
   * Optional class name
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Contents of info section
   */
  content: _propTypes.default.node,

  /**
   * Variant passed down from page header
   */
  variant: _propTypes.default.string
};

var Info = function Info(props) {
  if (!props.content) return null;
  var classes = (0, _classnames.default)({
    'slds-page-header__name-meta': props.variant === 'base',
    'slds-page-header__meta-text': props.variant === 'object-home' || props.variant === 'objectHome' || props.variant === 'related-list' || props.variant === 'relatedList'
  }, props.className);

  if (typeof props.content === 'string') {
    return /*#__PURE__*/_react.default.createElement("p", {
      className: classes
    }, props.content);
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    className: classes
  }, props.content);
};

Info.displayName = displayName;
Info.propTypes = propTypes;
var _default = Info;
exports.default = _default;