"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */

/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */
// Implements the [Progress Ring design pattern](https://lightningdesignsystem.com/components/progress-ring/) in React.
// Based on SLDS v2.4.5
var PROGRESS_RING_SHAPE = 'SLDSProgressRingShape';
var propTypes = {
  /**
   * HTML id for component.
   */
  id: _propTypes2.default.string,

  /**
   * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
   */
  className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

  /**
   * Decimal percentage drain of the ring [0.0 - 1.0]
   */
  fillPercentDecimal: _propTypes2.default.number
};
var defaultProps = {
  fillPercentDecimal: 0
};
/**
 * Generates the string for the D value of the SVG path
 * @param isLong {number} a binary flag if the arc should 'take the long path' (used for > 50% fill)
 * @param arcX {decimal} the arc's x position
 * @param arcY {decimal} the arc's y position
 */

var getD = function getD(isLong, arcX, arcY) {
  return "M 1 0 A 1 1 0 ".concat(isLong, " 1 ").concat(arcX, " ").concat(arcY, " L 0 0");
};
/**
 * Calculates the fill part of the ring
 * @param fillPercent {decimal} Decimal percentage that represents the amount of the ring which is filled with color.
 */


var calculateD = function calculateD(fillPercent) {
  var isLong = fillPercent > 0.5 ? 1 : 0;
  var arcX = Math.cos(2 * Math.PI * fillPercent);
  var arcY = Math.sin(2 * Math.PI * fillPercent);
  return getD(isLong, arcX, arcY);
};
/**
 * Displays the progress ring shape.
 */


var ProgressRingShape = function ProgressRingShape(props) {
  return _react2.default.createElement("div", {
    id: props.id,
    className: (0, _classnames2.default)('slds-progress-ring', props.className)
  }, _react2.default.createElement("div", {
    className: "slds-progress-ring__progress",
    role: "progressbar",
    "aria-valuemin": "0",
    "aria-valuemax": "100",
    "aria-valuenow": props.fillPercentDecimal * 100
  }, _react2.default.createElement("svg", {
    viewBox: "-1 -1 2 2"
  }, _react2.default.createElement("path", {
    className: "slds-progress-ring__path",
    d: calculateD(props.fillPercentDecimal)
  }))), _react2.default.createElement("div", {
    className: "slds-progress-ring__content"
  }, props.children));
};

ProgressRingShape.displayName = PROGRESS_RING_SHAPE;
ProgressRingShape.propTypes = propTypes;
ProgressRingShape.defaultProps = defaultProps;
exports.default = ProgressRingShape;