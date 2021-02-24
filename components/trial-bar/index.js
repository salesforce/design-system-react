"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.assign"));

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
   * **Text labels for internationalization**
   * This object is merged with the default props object on every render.
   * * `learnMoreAfter`: Amount of time left in trial, e.g. `30`
   * * `learnMoreBefore`: Unit of the amount of time left, e.g. `days`
   * * `timeLeftUnitAfter`: String after `timeLeftUnit`
   */
  labels: _propTypes.default.shape({
    timeLeft: _propTypes.default.string,
    timeLeftUnit: _propTypes.default.string,
    timeLeftUnitAfter: _propTypes.default.string
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
var defaultProps = {
  labels: {
    timeLeftUnitAfter: 'left in trial'
  }
};
/**
 * Trial bar components are used to provide an interactive and educational prospect experience for setup.
 */

var TrialBar = function TrialBar(props) {
  var labels = (0, _lodash.default)({}, defaultProps.labels, props.labels);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: (0, _classnames.default)('slds-trial-header slds-grid', props.className),
    style: props.style
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-grid"
  }, props.children), /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-grid slds-grid_vertical-align-center slds-col_bump-left"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "slds-box slds-box_xx-small slds-theme_default"
  }, labels.timeLeft), /*#__PURE__*/_react.default.createElement("span", {
    className: "slds-m-horizontal_x-small"
  }, labels.timeLeftUnit, " ".concat(labels.timeLeftUnitAfter)), props.onRenderActions()));
};

TrialBar.displayName = _constants.TRIAL_BAR;
TrialBar.propTypes = propTypes;
TrialBar.defaultProps = defaultProps;
var _default = TrialBar;
exports.default = _default;