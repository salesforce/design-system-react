"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PortalSettingsContext = exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

/**
 * The Portal Settings component allows for the portal parent node to be specified in all child components and is recommended to be used at the root of the application. It's render function is `return this.props.children`, so it can only have one child node.
 *
 * **renderTo Selector**
 * Use this to specify the portal node using a string that is compatiable with document.querySelector
 * ie.
 * ```
 * <PortalSettings renderTo="#portal-destination">
 * ```
 * *
 */
var PortalSettings = function PortalSettings(_ref) {
  var renderTo = _ref.renderTo,
      children = _ref.children;
  return /*#__PURE__*/_react.default.createElement(PortalSettingsContext.Provider, {
    value: {
      renderTo: renderTo
    }
  }, children);
};

PortalSettings.displayName = _constants.PORTAL_SETTINGS;
PortalSettings.propTypes = {
  /**
   * Selector for the destination container for portal elements
   * example: `#portal-destination`
   */
  renderTo: _propTypes.default.string
};

var PortalSettingsContext = /*#__PURE__*/_react.default.createContext({});

exports.PortalSettingsContext = PortalSettingsContext;
var _default = PortalSettings;
exports.default = _default;