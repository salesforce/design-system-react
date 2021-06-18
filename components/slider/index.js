"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash.isfunction"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shortid = _interopRequireDefault(require("shortid"));

var _constants = require("../../utilities/constants");

var _getAriaProps = _interopRequireDefault(require("../../utilities/get-aria-props"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propTypes = {
  /**
   * The `aria-describedby` attribute is used to indicate the IDs of the elements that describe the object. It is used to establish a relationship between widgets or groups and text that described them. This is very similar to aria-labelledby: a label describes the essence of an object, while a description provides more information that the user might need.
   */
  'aria-describedby': _propTypes.default.string,

  /**
   * Assistive text for accessibility**
   * `disabled`: Read by screen readers to indicate a disabled slider
   * `label`: Visually hidden label but read out loud by screen readers.
   */
  assistiveText: _propTypes.default.shape({
    disabled: _propTypes.default.string,
    label: _propTypes.default.string
  }),

  /**
   * Class names to be added to the outer container of the Slider.
   */
  classNameContainer: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * This is the initial value of an uncontrolled form element and is present
   * only to provide compatibility with hybrid framework applications that
   * are not entirely React. It should only be used in an application without
   * centralized state (Redux, Flux). "Controlled components" with centralized
   * state is highly recommended. See [Code Overview](https://github.com/salesforce/design-system-react/blob/master/docs/codebase-overview.md#controlled-and-uncontrolled-components) for more information.
   */
  defaultValue: _propTypes.default.number,

  /**
   * Disables the Slider and prevents clicking it. Only available on the horizontal view.
   */
  disabled: _propTypes.default.bool,

  /**
   * Message to display when the Slider is in an error state. When this is present, also visually highlights the component as in error.
   */
  errorText: _propTypes.default.string,

  /**
   * Set the HTML `id` of the slider.
   */
  id: _propTypes.default.string,

  /**
   * This label appears above the Slider.
   */
  label: _propTypes.default.string,

  /**
   * Maximum value of a specified range. Defaults to 100.
   */
  max: _propTypes.default.number,

  /**
   * Minimum value of a specified range. Defaults to 0.
   */
  min: _propTypes.default.number,

  /**
   * Name of the submitted form parameter.
   */
  name: _propTypes.default.string,

  /**
   * This event fires whenever the user has modified the data of the control. This callback recieves the following parameters `event, { value: [string] }`.
   */
  onChange: _propTypes.default.func,

  /**
   * This event fires when the value is committed. This callback recieves the following parameters `event, { value: [string] }`.
   */
  onInput: _propTypes.default.func,

  /**
   * Size of the slider.
   */
  size: _propTypes.default.oneOf(['x-small', 'small', 'medium', 'large']),

  /**
   * By default, the granularity is 1 and the value is always an integer. For example, If you need a value between 5 and 10, accurate to two decimal places, you should set the value of step to 0.01
   */
  step: _propTypes.default.number,

  /**
   * The Slider should be a controlled component, and will always display this value. This should always be used if you are using a Flux/Redux framework.
   */
  value: _propTypes.default.number,

  /**
   * Modifier that makes the slider vertical
   */
  vertical: _propTypes.default.bool
};
var defaultProps = {
  assistiveText: {
    disabled: 'Disabled'
  },
  min: 0,
  max: 100,
  step: 1
};
/**
 * The ability to style sliders with CSS varies across browsers. Using this component ensures sliders look the same everywhere.
 */

var Slider = /*#__PURE__*/function (_React$Component) {
  _inherits(Slider, _React$Component);

  var _super = _createSuper(Slider);

  function Slider(props) {
    var _this;

    _classCallCheck(this, Slider);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (event) {
      if ((0, _lodash.default)(_this.props.onChange)) {
        _this.props.onChange(event, {
          value: Number(event.target.value)
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleInput", function (event) {
      if ((0, _lodash.default)(_this.props.onInput)) {
        _this.props.onInput(event, {
          value: Number(event.target.value)
        });
      }
    });

    _this.generatedId = _shortid.default.generate();

    if (_this.props.errorText) {
      _this.generatedErrorId = _shortid.default.generate();
    }

    return _this;
  }

  _createClass(Slider, [{
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
  }, {
    key: "getErrorId",
    value: function getErrorId() {
      return this.props['aria-describedby'] || this.generatedErrorId;
    }
  }, {
    key: "render",
    value: function render() {
      var ariaProps = (0, _getAriaProps.default)(this.props);
      ariaProps['aria-describedby'] = this.getErrorId();

      var assistiveText = _objectSpread(_objectSpread({}, defaultProps.assistiveText), this.props.assistiveText);

      var labelText = this.props.label || this.props.assistiveText && this.props.assistiveText.label;
      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-form-element', {
          'slds-has-error': this.props.errorText
        }, this.props.classNameContainer)
      }, /*#__PURE__*/_react.default.createElement("label", {
        className: (0, _classnames.default)('slds-form-element__label', {
          'slds-assistive-text': this.props.assistiveText && !this.props.label
        }),
        htmlFor: this.getId()
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-slider-label"
      }, labelText ? /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-slider-label__label"
      }, labelText) : null, /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-slider-label__range"
      }, this.props.min, ' - ', this.props.max), this.props.disabled ? /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-assistive-text"
      }, ' ', assistiveText.disabled) : null)), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-form-element__control"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-slider', {
          'slds-slider_vertical': this.props.vertical,
          'slds-size_x-small': this.props.size === 'x-small',
          'slds-size_small': this.props.size === 'small',
          'slds-size_medium': this.props.size === 'medium',
          'slds-size_large': this.props.size === 'large'
        })
      }, /*#__PURE__*/_react.default.createElement("input", _extends({
        type: "range",
        id: this.getId(),
        name: this.props.name,
        className: "slds-slider__range",
        min: this.props.min,
        max: this.props.max,
        step: this.props.step,
        disabled: this.props.disabled,
        onChange: this.handleChange,
        onInput: this.handleInput
      }, ariaProps, this.props.value !== undefined ? {
        value: this.props.value
      } : {
        defaultValue: this.props.defaultValue
      })), /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-slider__value",
        "aria-hidden": "true"
      }, this.props.value || this.props.defaultValue || '0')), this.props.errorText ? /*#__PURE__*/_react.default.createElement("div", {
        id: this.getErrorId(),
        className: "slds-form-element__help"
      }, this.props.errorText) : null));
    }
  }]);

  return Slider;
}(_react.default.Component);

_defineProperty(Slider, "displayName", _constants.SLIDER);

_defineProperty(Slider, "propTypes", propTypes);

_defineProperty(Slider, "defaultProps", defaultProps);

var _default = Slider;
exports.default = _default;