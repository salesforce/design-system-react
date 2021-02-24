"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _button = _interopRequireDefault(require("../../../components/button"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// ### React

/**
 *  AutoplayButton is used to start/pause the autoplay iteration of the carousel
 */
var AutoplayButton = function AutoplayButton(props) {
  return /*#__PURE__*/_react.default.createElement("span", {
    className: "slds-carousel__autoplay",
    style: {
      left: '66px'
    }
  }, /*#__PURE__*/_react.default.createElement(_button.default, {
    assistiveText: {
      icon: props.assistiveText
    },
    className: "slds-button_icon",
    disabled: props.isDisabled,
    iconCategory: "utility",
    iconName: props.isAutoplayOn ? 'pause' : 'play',
    iconVariant: "border-filled",
    iconSize: "x-small",
    onClick: props.onClick,
    variant: "icon"
  }));
};

AutoplayButton.displayName = _constants.CAROUSEL_AUTOPLAY_BUTTON; // ### Prop Types

AutoplayButton.propTypes = {
  /**
   * Description of the start/pause autoplay button for screen-readers.
   */
  assistiveText: _propTypes.default.string,

  /**
   * Indicates whether autoplay is enabled
   */
  isAutoplayOn: _propTypes.default.bool,

  /**
   * Triggered when the autoplay button is clicked.
   */
  onClick: _propTypes.default.func
};
AutoplayButton.defaultProps = {
  isAutoplayOn: false
};
var _default = AutoplayButton;
exports.default = _default;