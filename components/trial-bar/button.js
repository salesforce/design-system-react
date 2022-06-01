"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _button = _interopRequireDefault(require("../button"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

// This component accepts the same props as Button.
// eslint-disable-next-line react/forbid-foreign-prop-types
var propTypes = _button.default.propTypes;
/**
 *  A [Button](/components/buttons/) within the Trial Bar.
 */

var TrialBarButton = function TrialBarButton(props) {
  return /*#__PURE__*/_react.default.createElement(_button.default, _extends({}, props, {
    inverse: true,
    style: {
      border: 0,
      padding: 0
    },
    className: "slds-m-right_small"
  }));
};

TrialBarButton.propTypes = propTypes;
TrialBarButton.displayName = _constants.TRIAL_BAR_BUTTON;
var _default = TrialBarButton;
exports.default = _default;