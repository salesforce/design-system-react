"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _button = _interopRequireDefault(require("../../../button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// # Panel Filter Group Header
// Implements the [Panel design pattern](https://www.lightningdesignsystem.com/components/panels) in React.
// Based on SLDS v2.2.0-rc.1
// ## Dependencies
// ### React

/**
 * Header for a Filter Group within a Panel.
 */
var PanelFilterHeader = function PanelFilterHeader(_ref) {
  var assistiveText = _ref.assistiveText,
      cancelLabel = _ref.cancelLabel,
      heading = _ref.heading,
      modified = _ref.modified,
      onRequestCancel = _ref.onRequestCancel,
      onRequestClose = _ref.onRequestClose,
      onRequestSave = _ref.onRequestSave,
      saveLabel = _ref.saveLabel;
  return modified ? /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-filters__header slds-grid slds-has-divider_bottom-space slds-grid_align-spread"
  }, /*#__PURE__*/_react.default.createElement(_button.default, {
    label: cancelLabel,
    onClick: onRequestCancel,
    variant: "neutral"
  }), /*#__PURE__*/_react.default.createElement(_button.default, {
    label: saveLabel,
    onClick: onRequestSave,
    variant: "brand"
  })) : /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-filters__header slds-grid slds-has-divider_bottom-space"
  }, /*#__PURE__*/_react.default.createElement("h2", {
    className: "slds-align-middle slds-text-heading_small"
  }, heading), /*#__PURE__*/_react.default.createElement(_button.default, {
    className: "slds-col_bump-left",
    assistiveText: {
      icon: assistiveText.closeButton
    },
    iconCategory: "utility",
    iconName: "forward",
    iconVariant: "bare",
    iconSize: "small",
    onClick: onRequestClose,
    title: assistiveText.closeButton,
    variant: "icon"
  }));
};

PanelFilterHeader.displayName = 'SLDSPanelFilterHeader';
PanelFilterHeader.propTypes = {
  /**
   * **Assistive text for accessibility.**
   * This object is merged with the default props object on every render.
   * * `closeButton`: Localized description of the close button for the panel for screen readers
   */
  assistiveText: _propTypes.default.shape({
    closeButton: _propTypes.default.string
  }),

  /**
   * Label for button that cancels modified filters
   */
  cancelLabel: _propTypes.default.string,

  /**
   * The heading of the filtering panel
   */
  heading: _propTypes.default.node,

  /**
   * Shows confirmation heading. Please see `onRequestCancel` and `onRequestSave`.
   */
  modified: _propTypes.default.bool,

  /**
   * When the panel's cancel button is clicked in order to reset filter panel to previous state.
   */
  onRequestCancel: _propTypes.default.func,

  /**
   * When the panel's close button is clicked. Please place Panel within another element to control position and visibility.
   */
  onRequestClose: _propTypes.default.func,

  /**
   * When the panel's save button is clicked in order to confirm filter panel state.
   */
  onRequestSave: _propTypes.default.func,

  /**
   * Label for button that saves modified filters
   */
  saveLabel: _propTypes.default.string
};
var _default = PanelFilterHeader;
exports.default = _default;