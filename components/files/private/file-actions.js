"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _constants = require("../../../utilities/constants");

var _button = _interopRequireDefault(require("../../button"));

var _icon = _interopRequireDefault(require("../../icon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// # FileActions Component
// Implements the [FileActions design pattern](https://www.lightningdesignsystem.com/components/files/) in React.

/**
 * A carousel allows multiple pieces of featured content to occupy an allocated amount of space.
 */
var FileActions = function FileActions(props) {
  var actions = /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-file__actions-menu"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-button-group",
    role: "group"
  }, typeof props.onClickDownload === 'function' ? /*#__PURE__*/_react.default.createElement(_button.default, {
    type: "button",
    variant: "icon",
    iconSize: "x-small",
    onClick: props.onClickDownload,
    title: "Download",
    className: "slds-button_icon-inverse"
  }, /*#__PURE__*/_react.default.createElement(_icon.default, {
    assistiveText: {
      label: props.assistiveText.download
    },
    category: "utility",
    name: "download",
    size: "xx-small",
    inverse: props.hasNoVisibleTitle
  })) : null, props.moreActionsDropdown ? /*#__PURE__*/_react.default.cloneElement(props.moreActionsDropdown, {
    assistiveText: {
      icon: props.assistiveText.moreActions
    },
    overlay: false,
    buttonVariant: 'icon',
    buttonInverse: props.hasNoVisibleTitle,
    className: 'dsr-file__more-actions-dropdown ',
    triggerClassName: 'dsr-file__more-actions'
  }) : null));

  if (typeof props.onClickDownload === 'function' || props.moreActionsDropdown) {
    if (!props.hasNoVisibleTitle) {
      return actions;
    }

    return /*#__PURE__*/_react.default.createElement("div", {
      className: "slds-file__title slds-file__title_scrim"
    }, actions);
  }

  return null;
};

FileActions.displayName = _constants.FILES_ACTIONS;
FileActions.propTypes = {
  /**
   *  Action to be done on clicking download button; doesnt show download button if empty
   */
  onClickDownload: _propTypes.default.func,

  /**
   *  Dropdown for More Actions; doesn't show More actions button if empty
   */
  moreActionsDropdown: _propTypes.default.node,

  /**
   *  Labels for the file component
   */
  hasNoVisibleTitle: _propTypes.default.bool
};
var _default = FileActions;
exports.default = _default;