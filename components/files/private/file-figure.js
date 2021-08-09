"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _constants = require("../../../utilities/constants");

var _spinner = _interopRequireDefault(require("../../spinner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// # FileFigure Component
// Implements the [FileFigure design pattern](https://www.lightningdesignsystem.com/components/files/) in React.

/**
 * A file can have a image, an icon or a loading animation as its thumbnail
 */
var FileFigure = function FileFigure(props) {
  if (props.isLoading) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
      className: "slds-assistive-text"
    }, props.assistiveText.link), /*#__PURE__*/_react.default.createElement(_spinner.default, {
      size: "medium",
      variant: "base",
      assistiveText: {
        label: props.assistiveText.loading
      },
      containerStyle: {
        zIndex: '1'
      }
    }));
  }

  if (props.image) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
      className: "slds-assistive-text"
    }, props.assistiveText.link), /*#__PURE__*/_react.default.createElement("img", {
      alt: props.assistiveText.image || props.labels.title,
      src: props.image
    }));
  }

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("span", {
    className: "slds-assistive-text"
  }, props.assistiveText.link), /*#__PURE__*/_react.default.createElement("span", {
    className: "slds-file__icon slds-icon_container",
    title: props.labels.title
  }, /*#__PURE__*/_react.default.cloneElement(props.icon, {
    size: null
  })));
};

FileFigure.displayName = _constants.FILES_FIGURE;
FileFigure.propTypes = {
  assistiveText: _propTypes.default.shape({
    image: _propTypes.default.string
  }),

  /**
   *  Whether the file figure is loading
   */
  isLoading: _propTypes.default.bool,

  /**
   *  Image/Figure for the file
   */
  image: _propTypes.default.string,

  /**
   *  Labels for the file figure component
   */
  labels: _propTypes.default.shape({
    title: _propTypes.default.string.isRequired
  })
};
FileFigure.defaultProps = {
  isLoading: false
};
var _default = FileFigure;
exports.default = _default;