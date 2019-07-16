"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// Implements the [Trial Bar design pattern](https://lightningdesignsystem.com/components/trial-bar/) in React.
// Based on SLDS v2.4.5
var propTypes = {
  /**
   * Provide children of the types `<TrialBarButton />` or `<TrialBarDropdown />` to define the structure of the trial bar.
   * ```
   * <TrialBar>
   *   <TrialBarButton />
   *   <TrialBarDropdown />
   * </TrialBar>
   * ```
   */
  children: _propTypes.default.node,

  /**
   * CSS classes to be added to the component. Uses `classNames` [API](https://github.com/JedWatson/classnames).
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Renders the labels in the trial bar.
   */
  labels: _propTypes.default.shape({
    /** Amount of time left in trial, e.g. `30` */
    timeLeft: _propTypes.default.string,

    /** Unit of the amount of time left, e.g. `days` */
    timeLeftUnit: _propTypes.default.string
  }),

  /**
   * Renders the actions section of the trial bar.
   */
  onRenderActions: _propTypes.default.func,

  /**
   * Customs styles to be applied to the component.
   */
  style: _propTypes.default.object
};
/**
 * Trial bar components are used to provide an interactive and educational prospect experience for setup.
 */

var TrialBar = function TrialBar(props) {
  return _react.default.createElement("div", {
    className: (0, _classnames.default)('slds-trial-header slds-grid', props.className),
    style: props.style
  }, _react.default.createElement("div", {
    className: "slds-grid"
  }, props.children), _react.default.createElement("div", {
    className: "slds-grid slds-grid_vertical-align-center slds-col_bump-left"
  }, _react.default.createElement("span", {
    className: "slds-box slds-box_xx-small slds-theme_default"
  }, props.labels.timeLeft), _react.default.createElement("span", {
    className: "slds-m-horizontal_x-small"
  }, props.labels.timeLeftUnit, " left in trial"), props.onRenderActions()));
};

TrialBar.displayName = _constants.TRIAL_BAR;
TrialBar.propTypes = propTypes;
var _default = TrialBar;
exports.default = _default;