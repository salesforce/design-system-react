"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

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
  id: _propTypes.default.string,

  /**
   * CSS class names to be added to the container element. `array`, `object`, or `string` are accepted.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Decimal percentage drain of the ring [0.0 - 1.0]
   */
  fillPercentDecimal: _propTypes.default.number,

  /**
   * Direction that the progress ring "flows." Default is counter-clockwise, or `drain`. For clockwise flow, use `fill`
   */
  flowDirection: _propTypes.default.oneOf(['drain', 'fill']),

  /**
   * Size of the progress ring. Default is 'medium'
   */
  size: _propTypes.default.oneOf(['medium', 'large'])
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
  var progressStyles = {
    height: props.size === 'large' ? '2rem' : '1.5rem'
  };

  if (props.flowDirection === 'fill') {
    progressStyles.transform = 'scaleX(1) rotate(-90deg)';
  }

  return /*#__PURE__*/_react.default.createElement("div", {
    id: props.id,
    className: (0, _classnames.default)('slds-progress-ring', props.className)
  }, /*#__PURE__*/_react.default.createElement("div", {
    "aria-valuemin": "0",
    "aria-valuemax": "100",
    "aria-valuenow": props.fillPercentDecimal * 100,
    className: "slds-progress-ring__progress",
    role: "progressbar",
    style: progressStyles
  }, /*#__PURE__*/_react.default.createElement("svg", {
    viewBox: "-1 -1 2 2"
  }, /*#__PURE__*/_react.default.createElement("path", {
    className: "slds-progress-ring__path",
    d: calculateD(props.fillPercentDecimal)
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-progress-ring__content"
  }, props.children));
};

ProgressRingShape.displayName = PROGRESS_RING_SHAPE;
ProgressRingShape.propTypes = propTypes;
ProgressRingShape.defaultProps = defaultProps;
var _default = ProgressRingShape;
exports.default = _default;