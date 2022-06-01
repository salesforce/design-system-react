"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TOGGLE_BUTTON_WIDTH = exports.DISPLAY_NAME = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _button = _interopRequireDefault(require("../../button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
var DISPLAY_NAME = 'SLDSSplitViewToggleButton';
exports.DISPLAY_NAME = DISPLAY_NAME;
var TOGGLE_BUTTON_WIDTH = '0.75rem';
exports.TOGGLE_BUTTON_WIDTH = TOGGLE_BUTTON_WIDTH;
var propsTypes = {
  /**
   * **Assistive text for accessibility**
   * * `toggleButtonOpen`: The button used to open the split view.
   * * `toggleButtonClose`: The button used to close the split view.
   */
  assistiveText: _propTypes.default.shape({
    toggleButtonOpen: _propTypes.default.string.isRequired,
    toggleButtonClose: _propTypes.default.string.isRequired
  }),

  /**
   * Unique html id placed on the button for aria-controls
   */
  ariaControls: _propTypes.default.string.isRequired,

  /**
   * Determines if the panel is open
   */
  isOpen: _propTypes.default.bool.isRequired,

  /**
   * **Event Callbacks**
   * * `onClick`: Called when the button is clicked.
   */
  events: _propTypes.default.shape({
    onClick: _propTypes.default.func.isRequired
  })
};
var defaultProps = {};

var SplitViewToggleButton = function SplitViewToggleButton(_ref) {
  var isOpen = _ref.isOpen,
      assistiveText = _ref.assistiveText,
      ariaControls = _ref.ariaControls,
      events = _ref.events;
  var toggleAssistiveText = isOpen ? assistiveText.toggleButtonOpen : assistiveText.toggleButtonClose;
  return /*#__PURE__*/_react.default.createElement(_button.default, {
    className: (0, _classnames.default)('slds-button slds-button_icon slds-split-view__toggle-button', {
      'slds-is-open': isOpen
    }),
    "aria-expanded": isOpen,
    "aria-controls": ariaControls,
    title: toggleAssistiveText,
    variant: "base",
    iconName: "left",
    iconCategory: "utility",
    iconSize: "x-small",
    onClick: events.onClick,
    assistiveText: {
      icon: toggleAssistiveText
    }
  });
};

SplitViewToggleButton.displayName = DISPLAY_NAME;
SplitViewToggleButton.propTypes = propsTypes;
SplitViewToggleButton.defaultProps = defaultProps;
var _default = SplitViewToggleButton;
exports.default = _default;