"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _button = _interopRequireDefault(require("../button"));

var _icon = _interopRequireDefault(require("../icon"));

var _menuDropdown = _interopRequireDefault(require("../menu-dropdown"));

var _buttonTrigger = _interopRequireDefault(require("../menu-dropdown/button-trigger"));

var _menuDropdown2 = _interopRequireDefault(require("../menu-dropdown/menu-dropdown"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// This component accepts the same props as MenuDropdown.
// eslint-disable-next-line react/forbid-foreign-prop-types
var propTypes = _menuDropdown2.default.propTypes;
/**
 * A dropdown within the navigation section of the header.
 */

var BuilderHeaderNavDropdown = function BuilderHeaderNavDropdown(props) {
  // Separate props we care about in order to pass others along passively to the dropdown component
  var iconCategory = props.iconCategory,
      iconName = props.iconName,
      label = props.label,
      assistiveText = props.assistiveText,
      rest = _objectWithoutProperties(props, ["iconCategory", "iconName", "label", "assistiveText"]);

  return /*#__PURE__*/_react.default.createElement(_menuDropdown.default, rest, /*#__PURE__*/_react.default.createElement(_buttonTrigger.default, null, /*#__PURE__*/_react.default.createElement(_button.default, {
    className: "slds-builder-header__item-action slds-media slds-media_center",
    variant: "base"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "slds-media__figure"
  }, /*#__PURE__*/_react.default.createElement(_icon.default, {
    assistiveText: {
      label: assistiveText && assistiveText.icon
    },
    category: iconCategory,
    containerClassName: "slds-icon_container slds-icon-utility-page slds-current-color",
    name: iconName,
    size: "x-small"
  })), /*#__PURE__*/_react.default.createElement("span", {
    className: "slds-media__body"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "slds-truncate",
    title: label
  }, label), /*#__PURE__*/_react.default.createElement(_icon.default, {
    category: "utility",
    containerClassName: "slds-icon_container slds-icon-utility-chevrondown slds-current-color slds-m-left_small",
    name: "chevrondown",
    size: "x-small"
  })))));
};

BuilderHeaderNavDropdown.displayName = _constants.BUILDER_HEADER_NAV_DROPDOWN;
BuilderHeaderNavDropdown.propTypes = propTypes;
var _default = BuilderHeaderNavDropdown;
exports.default = _default;