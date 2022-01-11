"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _button = _interopRequireDefault(require("../../../components/button"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * previousNextCarouselNavigator is used to display previous/next navigation items of the carousel
 */
var previousNextCarouselNavigator = function previousNextCarouselNavigator(props) {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-carousel__col-center slds-is-absolute",
    style: _objectSpread(_objectSpread({}, props.inlineStyle), {}, {
      margin: '-12px 0 0',
      top: '50%'
    })
  }, /*#__PURE__*/_react.default.createElement(_button.default, {
    assistiveText: {
      icon: props.assistiveText
    },
    className: "slds-button_icon slds-carousel__button",
    disabled: props.isDisabled,
    iconCategory: "utility",
    iconName: props.iconName,
    iconVariant: "border-filled",
    iconSize: "small",
    onClick: props.onClick,
    variant: "icon"
  }));
}; // /assets/icons/utility-sprite/svg/symbols.svg#right


previousNextCarouselNavigator.displayName = _constants.CAROUSEL_NAVIGATORS; // ### Prop Types

previousNextCarouselNavigator.propTypes = {
  /**
   * Description of the previous/next navigation icons for screen-readers.
   */
  assistiveText: _propTypes.default.string,

  /**
   * Name of icon displayed within the navigation button
   */
  iconName: _propTypes.default.oneOf(['chevronleft', 'chevronright']),

  /**
   * Determines where the navigator indicator has been disabled
   */
  isDisabled: _propTypes.default.bool,

  /**
   * Additional styles to be applied to the container
   */
  inlineStyle: _propTypes.default.object,

  /**
   * Triggered when the indicator is clicked.
   */
  onClick: _propTypes.default.func
};
var _default = previousNextCarouselNavigator;
exports.default = _default;