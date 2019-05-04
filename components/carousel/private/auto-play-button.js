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
 *  AutoPlayButton is used to start/pause the autoplay iteration of the carousel
 */
var AutoPlayButton = function AutoPlayButton(props) {
  return _react.default.createElement("span", {
    className: "slds-carousel__autoplay"
  }, _react.default.createElement(_button.default, {
    assistiveText: {
      icon: props.assistiveText
    },
    className: "slds-button_icon",
    disabled: props.isDisabled,
    iconCategory: "utility",
    iconName: props.isAutoPlayOn ? 'pause' : 'play',
    iconVariant: "border-filled",
    iconSize: "x-small",
    onClick: props.onClick,
    variant: "icon"
  }));
};

AutoPlayButton.displayName = _constants.CAROUSEL_AUTOPLAY_BUTTON; // ### Prop Types

AutoPlayButton.propTypes = {
  /**
   * Description of the start/pause autoplay button for screen-readers.
   */
  assistiveText: _propTypes.default.string,

  /**
   * Indicates whether autoPlay is enabled
   */
  isAutoPlayOn: _propTypes.default.bool,

  /**
   * Triggered when the autoplay button is clicked.
   */
  onClick: _propTypes.default.func
};
AutoPlayButton.defaultProps = {
  isAutoPlayOn: false
};
var _default = AutoPlayButton;
exports.default = _default;