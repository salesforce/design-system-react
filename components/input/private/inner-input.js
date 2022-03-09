"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _spinner = _interopRequireDefault(require("../../../components/spinner"));

var _getAriaProps = _interopRequireDefault(require("../../../utilities/get-aria-props"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var COUNTER = 'counter';
var propTypes = {
  'aria-activedescendant': _propTypes.default.string,
  'aria-autocomplete': _propTypes.default.string,

  /**
   * An HTML ID that is shared with ARIA-supported devices with the
   * `aria-controls` attribute in order to relate the input with
   * another region of the page. An example would be a select box
   * that shows or hides a panel.
   */
  'aria-controls': _propTypes.default.string,
  'aria-describedby': _propTypes.default.string,
  'aria-expanded': _propTypes.default.bool,
  'aria-haspopup': _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string]),
  'aria-labelledby': _propTypes.default.string,

  /**
   * An HTML ID that is shared with ARIA-supported devices with the
   * `aria-controls` attribute in order to relate the input with
   * another region of the page. An example would be a search field
   * that shows search results.
   */
  'aria-owns': _propTypes.default.string,
  'aria-required': _propTypes.default.bool,

  /**
   * **Assistive text for accessibility.**
   * This object is merged with the default props object on every render.
   * * `spinner`: Assistive text on the spinner.
   */
  assistiveText: _propTypes.default.shape({
    spinner: _propTypes.default.string
  }),

  /**
   * Disabled brower's autocomplete when "off" is used.
   */
  autoComplete: _propTypes.default.string,

  /**
   * Class names to be added to the `input` element.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Class names to be added to the outer container `div` of the input.
   */
  containerClassName: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Props to be added to the outer container `div` of the input (excluding `containerClassName`).
   */
  containerProps: _propTypes.default.object,

  /**
   * Disables the input and prevents editing the contents.
   */
  disabled: _propTypes.default.bool,

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
   * Left aligned icon, must be instance of `design-system-react/components/icon/input-icon`
   */
  iconLeft: _propTypes.default.node,

  /**
   * Right aligned icon, must be instance of `design-system-react/components/icon/input-icon`
   */
  iconRight: _propTypes.default.node,

  /**
   * Every input must have a unique ID in order to support keyboard navigation and ARIA support.
   */
  id: _propTypes.default.string.isRequired,

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
  onBlur: _propTypes.default.func,

  /**
   * This callback fires when the input changes. The synthetic React event will be the first parameter to the callback. You will probably want to reference `event.target.value` in your callback. No custom data object is provided.
   */
  onChange: _propTypes.default.func,

  /**
   * This event fires when the input is clicked.
   */
  onClick: _propTypes.default.func,
  onFocus: _propTypes.default.func,
  onInput: _propTypes.default.func,
  onInvalid: _propTypes.default.func,
  onKeyDown: _propTypes.default.func,
  onKeyPress: _propTypes.default.func,
  onKeyUp: _propTypes.default.func,
  onSelect: _propTypes.default.func,
  onSubmit: _propTypes.default.func,

  /**
   * Text that will appear in an empty input.
   */
  placeholder: _propTypes.default.string,
  minLength: _propTypes.default.string,

  /**
   * Specifies minimum accepted value for an input of type "number"
   */
  minValue: _propTypes.default.number,
  maxLength: _propTypes.default.string,

  /**
   * Specifies maximum accepted value for an input of type "number"
   */
  maxValue: _propTypes.default.number,

  /**
   * Name of the submitted form parameter.
   */
  name: _propTypes.default.string,

  /**
   * Specifies `readOnly` for `input` node.
   */
  readOnly: _propTypes.default.bool,

  /**
   * Highlights the input as a required field (does not perform any validation).
   */
  required: _propTypes.default.bool,

  /**
   * `role` to be added to `input` node
   */
  role: _propTypes.default.string,

  /**
   * Determines the step size upon increment or decrement. Can be set to decimal values.
   */
  step: _propTypes.default.number,

  /**
   * Style object to be added to `input` node
   */
  style: _propTypes.default.object,

  /**
   * Specifies `tabIndex` for `input` node
   */
  tabIndex: _propTypes.default.string,

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
  variant: _propTypes.default.oneOf(['base', COUNTER]),

  /**
   * This is the initial value of an uncontrolled form element and is present only to provide
   * compatibility with hybrid framework applications that are not entirely React. It should only
   * be used in an application without centralized state (Redux, Flux). "Controlled components"
   * with centralized state is highly recommended.
   * See [Code Overview](https://github.com/salesforce/design-system-react/blob/master/docs/codebase-overview.md#controlled-and-uncontrolled-components) for more information.
   */
  defaultValue: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
};
var defaultProps = {
  assistiveText: {
    spinner: 'Loading ...'
  },
  type: 'text'
};
/*
 * This component was created to allow the DIV wrapped input to be used within other components such as combobox. This components API is not public.
 */

var InnerInput = function InnerInput(props) {
  var ariaProps = (0, _getAriaProps.default)(props);
  ariaProps['aria-describedby'] = props.hasSpinner ? "loading-status-icon ".concat(props['aria-describedby']) : props['aria-describedby'];

  var _props$containerProps = props.containerProps,
      containerClassName = _props$containerProps.className,
      containerProps = _objectWithoutProperties(_props$containerProps, ["className"]);

  var assistiveText = _objectSpread(_objectSpread({}, defaultProps.assistiveText), props.assistiveText);

  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: (0, _classnames.default)(containerClassName, {
      'slds-input-has-icon': props.variant !== COUNTER && (props.iconLeft || props.iconRight),
      'slds-input-has-icon_left': props.iconLeft && !props.iconRight,
      'slds-input-has-icon_right': !props.iconLeft && props.iconRight,
      'slds-input-has-icon_left-right': props.variant !== COUNTER && props.iconLeft && props.iconRight,
      'slds-input-has-fixed-addon': props.fixedTextLeft || props.fixedTextRight,
      'slds-has-divider_bottom': props.isStatic
    })
  }, containerProps), props.iconLeft && props.iconLeft, props.fixedTextLeft && /*#__PURE__*/_react.default.createElement("span", {
    className: "slds-form-element__addon"
  }, props.fixedTextLeft), !props.isStatic && /*#__PURE__*/_react.default.createElement("input", _extends({
    autoComplete: props.autoComplete,
    className: (0, _classnames.default)('slds-input', {
      'slds-text-align_left': props.variant === COUNTER && props.readOnly
    }, props.className),
    disabled: props.disabled,
    id: props.id,
    min: props.minValue,
    minLength: props.minLength,
    max: props.maxValue,
    maxLength: props.maxLength,
    name: props.name,
    onBlur: props.onBlur,
    onChange: props.onChange,
    onClick: props.onClick,
    onFocus: props.onFocus,
    onInput: props.onInput,
    onInvalid: props.onInvalid,
    onKeyDown: props.onKeyDown,
    onKeyPress: props.onKeyPress,
    onKeyUp: props.onKeyUp,
    onSelect: props.onSelect,
    onSubmit: props.onSubmit,
    placeholder: props.placeholder,
    readOnly: props.readOnly,
    ref: props.inputRef,
    required: props.required,
    role: props.role,
    step: props.step,
    style: props.style,
    tabIndex: props.tabIndex,
    type: props.type
  }, ariaProps, props.value !== undefined ? {
    value: props.value
  } : {
    defaultValue: props.defaultValue
  })), props.hasSpinner ? /*#__PURE__*/_react.default.createElement("div", {
    className: "slds-input__icon-group slds-input__icon-group_right"
  }, /*#__PURE__*/_react.default.createElement(_spinner.default, {
    assistiveText: {
      label: assistiveText.spinner
    },
    id: "loading-status-icon",
    isInput: true,
    size: "x-small",
    variant: "brand"
  }), props.iconRight && props.iconRight) : props.iconRight && props.iconRight, props.fixedTextRight && /*#__PURE__*/_react.default.createElement("span", {
    className: "slds-form-element__addon"
  }, props.fixedTextRight), props.isStatic && /*#__PURE__*/_react.default.createElement("span", {
    className: (0, _classnames.default)('slds-form-element__static', 'slds-grid', {
      'slds-grid_align-spread': props.variant !== COUNTER
    }),
    onClick: props.onClick
  }, props.value, props.inlineEditTrigger));
};

InnerInput.displayName = 'SLDSInnerInput';
InnerInput.propTypes = propTypes;
InnerInput.defaultProps = defaultProps;
var _default = InnerInput;
exports.default = _default;