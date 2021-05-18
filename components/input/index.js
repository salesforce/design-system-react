"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shortid = _interopRequireDefault(require("shortid"));

var _button = _interopRequireDefault(require("../button"));

var _inputIcon = _interopRequireDefault(require("../icon/input-icon"));

var _innerInput = _interopRequireDefault(require("./private/inner-input"));

var _label = _interopRequireDefault(require("../utilities/label"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _constants = require("../../utilities/constants");

var _component = _interopRequireDefault(require("./component.json"));

var _fieldLevelHelpTooltip = _interopRequireDefault(require("../tooltip/private/field-level-help-tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var COUNTER = 'counter';
var DECREMENT = 'Decrement';
var INCREMENT = 'Increment';
var defaultProps = {
  assistiveText: {
    decrement: "".concat(DECREMENT, " ").concat(COUNTER),
    increment: "".concat(INCREMENT, " ").concat(COUNTER)
  },
  type: 'text'
};
/**
 * The HTML `input` with a label and error messaging.
 */

var Input = /*#__PURE__*/function (_React$Component) {
  _inherits(Input, _React$Component);

  var _super = _createSuper(Input);

  function Input(props) {
    var _this;

    _classCallCheck(this, Input);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "getId", function () {
      return _this.props.id || _this.generatedId;
    });

    _defineProperty(_assertThisInitialized(_this), "getErrorId", function () {
      return _this.props['aria-describedby'] || _this.generatedErrorId;
    });

    _defineProperty(_assertThisInitialized(_this), "getValueAsNumber", function () {
      var value = 0;

      if (_this.props.value !== undefined) {
        value = Number(_this.props.value);
      } else if (_this.inputRef) {
        value = Number(_this.inputRef.value);
      }

      return value;
    });

    _defineProperty(_assertThisInitialized(_this), "getCounterButtonIcon", function (direction) {
      var value = _this.getValueAsNumber();

      var disabled = false;

      if (_this.props.disabled || direction === INCREMENT && _this.props.maxValue !== undefined && value >= _this.props.maxValue || direction === DECREMENT && _this.props.minValue !== undefined && value <= _this.props.minValue) {
        disabled = true;
      }

      return /*#__PURE__*/_react.default.createElement(_button.default, {
        assistiveText: {
          icon: _this.props.assistiveText[direction.toLowerCase()]
        },
        className: (0, _classnames.default)('slds-button_icon-small', "slds-input__button_".concat(direction.toLowerCase())),
        disabled: disabled,
        iconCategory: "utility",
        iconName: direction === DECREMENT ? 'ban' : 'new',
        onKeyDown: function onKeyDown(event) {
          if (event.keyCode === 13) {
            _this.performStep(direction, event);
          }
        },
        onKeyUp: _this.stopStepping,
        onMouseDown: function onMouseDown(event) {
          _this.performStep(direction, event);
        },
        onMouseLeave: _this.stopStepping,
        onMouseUp: _this.stopStepping,
        variant: "icon"
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getIconRender", function (position, iconPositionProp) {
      var icon; // Remove at next breaking change

      /* eslint-disable react/prop-types */

      var deprecatedProps = {
        assistiveText: {
          icon: _this.props[iconPositionProp] && _this.props[iconPositionProp].props.assistiveText || _this.props.iconAssistiveText
        },
        category: _this.props[iconPositionProp] && _this.props[iconPositionProp].props.category || _this.props.iconCategory,
        name: _this.props[iconPositionProp] && _this.props[iconPositionProp].props.name || _this.props.iconName,
        onClick: _this.props[iconPositionProp] && _this.props[iconPositionProp].props.onClick || _this.props.onIconClick
      };
      /* eslint-enable react/prop-types */

      if (_this.props[iconPositionProp] && position && _this.props[iconPositionProp]) {
        icon = /*#__PURE__*/_react.default.cloneElement(_this.props[iconPositionProp], {
          iconPosition: "".concat(position)
        });
      } else if (deprecatedProps.name) {
        icon = /*#__PURE__*/_react.default.createElement(_inputIcon.default, _extends({
          iconPosition: position
        }, deprecatedProps));
      }

      return icon;
    });

    _defineProperty(_assertThisInitialized(_this), "setInputRef", function (ref) {
      _this.inputRef = ref;

      if (_this.props.inputRef) {
        _this.props.inputRef(ref);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (event) {
      if (_this.props.onChange) {
        var data = {
          value: event.target.value
        };

        if (_this.props.variant === COUNTER) {
          data.number = Number(data.value);
        }

        _this.props.onChange(event, data);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "performStep", function (direction, event) {
      clearTimeout(_this.stepping.timeout);
      var maxValue = _this.props.maxValue;
      var minValue = _this.props.minValue;
      var step = _this.props.step !== undefined ? Number(_this.props.step) : 1;

      var value = _this.getValueAsNumber();

      var valueChanged = false;

      if (direction === DECREMENT && maxValue !== undefined && value > maxValue) {
        value = Number(maxValue);
        valueChanged = true;
      } else if (direction === INCREMENT && minValue !== undefined && value < minValue) {
        value = Number(minValue);
        valueChanged = true;
      } else {
        var decimalPlaces = String(step).search(/\./) >= 0 ? String(step).split('.')[1].length : 0;
        var minOverflow = 0;

        if (minValue !== undefined) {
          minOverflow = (value - minValue) % step;
        }

        if (minOverflow > 0) {
          // Default browser inputs of type number with a min attribute alter the value upon change as needed so
          // that with enough decrements it can reach the exact min value. This behavior is reflected here
          value = direction === DECREMENT ? value - minOverflow : value + (step - minOverflow);
        } else {
          value = direction === DECREMENT ? value - step : value + step;
        }

        value = Number(value.toFixed(decimalPlaces));

        if (!(maxValue !== undefined && value > maxValue) && !(minValue !== undefined && value < minValue)) {
          valueChanged = true;
        }
      }

      if (valueChanged) {
        /*
         * Use of `this.forceUpdate` is an anti-pattern. This code only executes if this `input` element is uncontrolled which this library believes is an anti-pattern, also. This code is only present to allow for the edge case of uncontrolled use of an `input`.
         */
        if (_this.props.value === undefined && _this.inputRef) {
          _this.inputRef.value = String(value);

          _this.forceUpdate();
        } else if (_this.props.onChange) {
          _this.props.onChange(event, {
            number: value,
            value: String(value)
          });
        }
      }

      if (direction === INCREMENT && maxValue !== undefined && value >= maxValue || direction === DECREMENT && minValue !== undefined && value <= minValue) {
        _this.stopStepping();
      } else {
        _this.stepping.timeout = setTimeout(function () {
          _this.stepping.currentDelay = _this.stepping.speedDelay;

          _this.performStep(direction);
        }, _this.stepping.currentDelay);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "stopStepping", function () {
      clearTimeout(_this.stepping.timeout);
      _this.stepping.currentDelay = _this.stepping.initialDelay;
    });

    _this.inputRef = null;
    _this.stepping = {
      currentDelay: 500,
      initialDelay: 500,
      speedDelay: 75,
      timeout: {}
    }; // `checkProps` issues warnings to developers about properties (similar to React's built in development tools)

    (0, _checkProps.default)(_constants.INPUT, props, _component.default);
    _this.generatedId = _shortid.default.generate();

    if (props.errorText) {
      _this.generatedErrorId = _shortid.default.generate();
    }

    return _this;
  }

  _createClass(Input, [{
    key: "render",
    value: function render() {
      var assistiveText = _objectSpread(_objectSpread({}, defaultProps.assistiveText), this.props.assistiveText);

      var inputRef = this.props.variant === COUNTER ? this.setInputRef : this.props.inputRef;
      var iconLeft = null;
      var iconRight = null;
      var hasRenderedLabel = this.props.label || assistiveText && assistiveText.label; // Remove at next breaking change
      // this is a hack to make left the default prop unless overwritten by `iconPosition="right"`

      if (!!this.props.iconLeft || (this.props.iconPosition === 'left' || this.props.iconPosition === undefined) && !!this.props.iconName) {
        iconLeft = this.getIconRender('left', 'iconLeft');
      } else if (this.props.variant === COUNTER && !this.props.isStatic && !this.props.readOnly) {
        iconLeft = this.getCounterButtonIcon(DECREMENT);
      }

      if (!!this.props.iconRight || this.props.iconPosition === 'right' && !!this.props.iconName) {
        iconRight = this.getIconRender('right', 'iconRight');
      } else if (this.props.variant === COUNTER && !this.props.isStatic && !this.props.readOnly) {
        iconRight = this.getCounterButtonIcon(INCREMENT);
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-form-element', {
          'slds-has-error': this.props.errorText
        }, this.props.className),
        style: this.props.styleContainer
      }, /*#__PURE__*/_react.default.createElement(_label.default, {
        assistiveText: assistiveText,
        htmlFor: this.props.isStatic ? undefined : this.getId(),
        label: this.props.label,
        required: this.props.required,
        variant: this.props.isStatic ? 'static' : 'base'
      }), this.props.fieldLevelHelpTooltip && hasRenderedLabel ? /*#__PURE__*/_react.default.createElement(_fieldLevelHelpTooltip.default, {
        assistiveText: {
          triggerLearnMoreIcon: assistiveText.fieldLevelHelpButton
        },
        fieldLevelHelpTooltip: this.props.fieldLevelHelpTooltip
      }) : null, /*#__PURE__*/_react.default.createElement(_innerInput.default, {
        "aria-activedescendant": this.props['aria-activedescendant'],
        "aria-autocomplete": this.props['aria-autocomplete'],
        "aria-controls": this.props['aria-controls'],
        "aria-labelledby": this.props['aria-labelledby'],
        "aria-describedby": this.getErrorId(),
        "aria-expanded": this.props['aria-expanded'],
        "aria-owns": this.props['aria-owns'],
        "aria-required": this.props['aria-required'],
        autoComplete: this.props.autoComplete,
        className: (0, _classnames.default)({
          'slds-input_counter': this.props.variant === COUNTER,
          'slds-p-horizontal_none': this.props.variant === COUNTER && this.props.readOnly
        }),
        containerProps: {
          className: 'slds-form-element__control'
        },
        defaultValue: this.props.defaultValue,
        disabled: this.props.disabled,
        fixedTextLeft: this.props.fixedTextLeft,
        fixedTextRight: this.props.fixedTextRight,
        hasSpinner: this.props.hasSpinner,
        id: this.getId(),
        iconLeft: iconLeft,
        iconRight: iconRight,
        inlineEditTrigger: this.props.inlineEditTrigger,
        isStatic: this.props.isStatic,
        minLength: this.props.minLength,
        minValue: this.props.minValue,
        maxLength: this.props.maxLength,
        maxValue: this.props.maxValue,
        name: this.props.name,
        onBlur: this.props.onBlur,
        onChange: this.handleChange,
        onClick: this.props.onClick,
        onFocus: this.props.onFocus,
        onInput: this.props.onInput,
        onInvalid: this.props.onInvalid,
        onKeyDown: this.props.onKeyDown,
        onKeyPress: this.props.onKeyPress,
        onKeyUp: this.props.onKeyUp,
        onSelect: this.props.onSelect,
        onSubmit: this.props.onSubmit,
        placeholder: this.props.placeholder,
        inputRef: inputRef,
        readOnly: this.props.readOnly,
        required: this.props.required,
        role: this.props.role,
        assistiveText: this.props.assistiveText,
        type: this.props.variant === COUNTER ? 'number' : this.props.type,
        value: this.props.value,
        variant: this.props.variant,
        step: this.props.step,
        style: this.props.styleInput
      }), this.props.inlineHelpText && /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-form-element__help"
      }, this.props.inlineHelpText), this.props.errorText && /*#__PURE__*/_react.default.createElement("div", {
        id: this.getErrorId(),
        className: "slds-form-element__help"
      }, this.props.errorText), this.props.children);
    }
  }]);

  return Input;
}(_react.default.Component);

_defineProperty(Input, "displayName", _constants.INPUT);

_defineProperty(Input, "propTypes", {
  /**
   * The aria-activedescendant attribute contains the ID of the currently active child object that is part of a composite widget within the Document Object Model. It makes do with the overhead of having all or more than one child focusable. As the name specifies, it helps in managing the current active child of the composite widget.
   */
  'aria-activedescendant': _propTypes.default.string,

  /**
   * Indicates if the suggestions in a composite widget are values that complete the current textbox input.
   */
  'aria-autocomplete': _propTypes.default.string,

  /**
   * An HTML ID that is shared with ARIA-supported devices with the
   * `aria-controls` attribute in order to relate the input with
   * another region of the page. An example would be a select box
   * that shows or hides a panel.
   */
  'aria-controls': _propTypes.default.string,

  /**
   * The `aria-describedby` attribute is used to indicate the IDs of the elements that describe the object. It is used to establish a relationship between widgets or groups and text that described them. This is very similar to aria-labelledby: a label describes the essence of an object, while a description provides more information that the user might need.
   */
  'aria-describedby': _propTypes.default.string,

  /**
   * Use the `aria-expanded` state to indicate whether regions of the content are collapsible, and to expose whether a region is currently expanded or collapsed.
   */
  'aria-expanded': _propTypes.default.bool,

  /**
   * Indicates that the element has a popup context menu or sub-level menu.
   */
  'aria-haspopup': _propTypes.default.bool,

  /**
   * The aria-labelledby attribute contains the element IDs of labels in objects such as input elements, widgets, and groups. The attribute establishes relationships between objects and their labels. Assistive technology, such as screen readers, use this attribute to catalog the objects in a document so that users can navigate between them. Without an element ID, the assistive technology cannot catalog the object.
   */
  'aria-labelledby': _propTypes.default.string,

  /**
   * An HTML ID that is shared with ARIA-supported devices with the
   * `aria-controls` attribute in order to relate the input with
   * another region of the page. An example would be a search field
   * that shows search results.
   */
  'aria-owns': _propTypes.default.string,

  /**
   * The `aria-required` attribute is used to indicate that user input is required on an element before a form can be submitted.
   */
  'aria-required': _propTypes.default.bool,

  /**
   * **Assistive text for accessibility**
   * * `label`: Visually hidden label but read out loud by screen readers.
   * * `spinner`: Text for loading spinner icon.
   */
  assistiveText: _propTypes.default.shape({
    label: _propTypes.default.string,
    spinner: _propTypes.default.string
  }),

  /**
   * Disabled brower's autocomplete when "off" is used.
   */
  autoComplete: _propTypes.default.string,

  /**
   * Elements are added after the `input`.
   */
  children: _propTypes.default.node,

  /**
   * Class names to be added to the outer container of the input.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * This is the initial value of an uncontrolled form element and
   * is present only to provide compatibility with hybrid framework
   * applications that are not entirely React. It should only be used
   * in an application without centralized state (Redux, Flux).
   * "Controlled components" with centralized state is highly recommended.
   * See [Code Overview](https://github.com/salesforce/design-system-react/blob/master/docs/codebase-overview.md#controlled-and-uncontrolled-components) for more information.
   */
  defaultValue: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * Disables the input and prevents editing the contents.
   */
  disabled: _propTypes.default.bool,

  /**
   * Message to display when the input is in an error state. When this is present, also visually highlights the component as in error.
   */
  errorText: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string]),

  /**
   * A [Tooltip](https://react.lightningdesignsystem.com/components/tooltips/) component that is displayed next to the label.
   */
  fieldLevelHelpTooltip: _propTypes.default.node,

  /**
   * Displays text or node to the left of the input. This follows the fixed text input UX pattern.
   */
  fixedTextLeft: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string]),

  /**
   * Displays text or node to the right of the input. This follows the fixed text input UX pattern.
   */
  fixedTextRight: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string]),

  /**
   * If true, loading spinner appears inside input on right hand side.
   */
  hasSpinner: _propTypes.default.bool,

  /**
   * Left aligned icon, must be instace of `design-system-react/components/icon/input-icon`
   */
  iconLeft: _propTypes.default.node,

  /**
   * Right aligned icon, must be instace of `design-system-react/components/icon/input-icon`
   */
  iconRight: _propTypes.default.node,

  /**
   * Every input must have a unique ID in order to support keyboard navigation and ARIA support.
   */
  id: _propTypes.default.string,

  /**
   * Displays help text under the input.
   */
  inlineHelpText: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.string]),

  /**
   * This callback exposes the input reference / DOM node to parent components. `<Parent inputRef={(inputComponent) => this.input = inputComponent} />
   */
  inputRef: _propTypes.default.func,

  /**
   * Displays the value of the input statically. This follows the static input UX pattern.
   */
  isStatic: _propTypes.default.bool,

  /**
   * This label appears above the input.
   */
  label: _propTypes.default.string,

  /**
   * Triggered when focus is removed.
   */
  onBlur: _propTypes.default.func,

  /**
   * This callback fires when the input changes. Passes in `event, { value }`.
   */
  onChange: _propTypes.default.func,

  /**
   * This event fires when the input is clicked.
   */
  onClick: _propTypes.default.func,

  /**
   * Triggered when component is focused.
   */
  onFocus: _propTypes.default.func,

  /**
   * Similar to `onchange`. Triggered when an element gets user input.
   */
  onInput: _propTypes.default.func,

  /**
   * Triggered when a submittable `<input>` element is invalid.
   */
  onInvalid: _propTypes.default.func,

  /**
   * Triggered when a key is pressed down
   */
  onKeyDown: _propTypes.default.func,

  /**
   * Triggered when a key is pressed and released
   */
  onKeyPress: _propTypes.default.func,

  /**
   * Triggered when a key is released
   */
  onKeyUp: _propTypes.default.func,

  /**
   * Triggered after some text has been selected in an element.
   */
  onSelect: _propTypes.default.func,

  /**
   * Fires when a form is submitted.
   */
  onSubmit: _propTypes.default.func,

  /**
   * Text that will appear in an empty input.
   */
  placeholder: _propTypes.default.string,

  /**
   * Sets the minimum number of characters that an `<input>` can accept.
   */
  minLength: _propTypes.default.string,

  /**
   * Specifies minimum accepted value for a counter input
   */
  minValue: _propTypes.default.number,

  /**
   * Sets the maximum number of characters that an `<input>` can accept.
   */
  maxLength: _propTypes.default.string,

  /**
   * Specifies maximum accepted value for a counter input
   */
  maxValue: _propTypes.default.number,

  /**
   * Name of the submitted form parameter.
   */
  name: _propTypes.default.string,

  /**
   * Displays the value of the input as read-only. This is used in the inline edit UX pattern.
   */
  readOnly: _propTypes.default.bool,

  /**
   * Highlights the input as a required field (does not perform any validation).
   */
  required: _propTypes.default.bool,

  /**
   * ARIA role
   */
  role: _propTypes.default.string,

  /**
   * Determines the step size upon increment or decrement. Can be set to decimal values.
   */
  step: _propTypes.default.number,

  /**
   * styles to be added to input
   */
  styleInput: _propTypes.default.object,

  /**
   * Custom styles to be passed to the component container
   */
  styleContainer: _propTypes.default.object,

  /**
   * The `<Input>` element includes support for all HTML5 types.
   */
  type: _propTypes.default.oneOf(['text', 'password', 'datetime', 'datetime-local', 'date', 'month', 'time', 'week', 'number', 'email', 'url', 'search', 'tel', 'color']),

  /**
   * The input is a controlled component, and will always display this value.
   */
  value: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),

  /**
   * Which UX pattern of input? The default is `base` while other option is `counter`
   */
  variant: _propTypes.default.oneOf(['base', COUNTER])
});

_defineProperty(Input, "defaultProps", defaultProps);

var _default = Input;
exports.default = _default;