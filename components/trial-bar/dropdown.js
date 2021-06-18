"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _menuDropdown = _interopRequireDefault(require("../menu-dropdown"));

var _buttonTrigger = _interopRequireDefault(require("../menu-dropdown/button-trigger"));

var _menuDropdown2 = _interopRequireDefault(require("../menu-dropdown/menu-dropdown"));

var _button = _interopRequireDefault(require("../button"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// This component accepts the same props as MenuDropdown.
// eslint-disable-next-line react/forbid-foreign-prop-types
var propTypes = _menuDropdown2.default.propTypes;
/**
 *  A [Dropdown](/components/menu-dropdowns/) within the Trial Bar.
 */

var TrialBarDropdown = function TrialBarDropdown(props) {
  var label = props.label,
      rest = _objectWithoutProperties(props, ["label"]);

  return /*#__PURE__*/_react.default.createElement(_menuDropdown.default, _extends({}, rest, {
    inverse: true
  }), /*#__PURE__*/_react.default.createElement(_buttonTrigger.default, {
    triggerClassName: "slds-grid"
  }, /*#__PURE__*/_react.default.createElement(_button.default, {
    inverse: true,
    style: {
      border: 0,
      height: '100%',
      padding: 0
    },
    iconCategory: "utility",
    iconName: "right",
    iconPosition: "left",
    label: label
  })));
};

TrialBarDropdown.propTypes = propTypes;
TrialBarDropdown.displayName = _constants.TRIAL_BAR_DROPDOWN;
var _default = TrialBarDropdown;
exports.default = _default;