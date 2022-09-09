"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _breadcrumb = _interopRequireDefault(require("../../breadcrumb"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
var displayName = 'PageHeaderLabel';
var propTypes = {
  /**
   * Contents of label section
   */
  content: _propTypes.default.node,

  /**
   * An array of react elements, presumably anchor <a> elements.
   */
  trail: _propTypes.default.array
};

var Label = function Label(props) {
  if (props.trail && props.trail.length > 0) {
    return /*#__PURE__*/_react.default.createElement(_breadcrumb.default, {
      styleContainer: props.style,
      trail: props.trail
    });
  }

  if (props.content) {
    if (typeof props.content === 'string') {
      return /*#__PURE__*/_react.default.createElement("span", null, props.content);
    }

    return props.content;
  }

  return null;
};

Label.displayName = displayName;
Label.propTypes = propTypes;
var _default = Label;
exports.default = _default;