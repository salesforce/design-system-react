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

var _checkProps = _interopRequireDefault(require("./check-props"));

var _constants = require("../../utilities/constants");

var _getAriaProps = _interopRequireDefault(require("../../utilities/get-aria-props"));

var _component = _interopRequireDefault(require("./component.json"));

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

/**
 * A multi-line plain-text editing control.
 */
var Textarea = /*#__PURE__*/function (_React$Component) {
  _inherits(Textarea, _React$Component);

  var _super = _createSuper(Textarea);

  function Textarea(props) {
    var _this;

    _classCallCheck(this, Textarea);

    _this = _super.call(this, props); // `checkProps` issues warnings to developers about properties (similar to React's built in development tools)

    _defineProperty(_assertThisInitialized(_this), "getId", function () {
      return _this.props.id || _this.generatedId;
    });

    _defineProperty(_assertThisInitialized(_this), "getErrorId", function () {
      return _this.props['aria-describedby'] || _this.generatedErrorId;
    });

    (0, _checkProps.default)(_constants.TEXTAREA, props, _component.default);
    _this.generatedId = _shortid.default.generate();

    if (props.errorText) {
      _this.generatedErrorId = _shortid.default.generate();
    }

    return _this;
  }

  _createClass(Textarea, [{
    key: "render",
    value: // ### Render
    function render() {
      var _this$props = this.props,
          autoFocus = _this$props.autoFocus,
          children = _this$props.children,
          className = _this$props.className,
          classNameContainer = _this$props.classNameContainer,
          disabled = _this$props.disabled,
          errorText = _this$props.errorText,
          textareaRef = _this$props.textareaRef,
          label = _this$props.label,
          onBlur = _this$props.onBlur,
          onChange = _this$props.onChange,
          onClick = _this$props.onClick,
          onFocus = _this$props.onFocus,
          onInput = _this$props.onInput,
          onInvalid = _this$props.onInvalid,
          onKeyDown = _this$props.onKeyDown,
          onKeyPress = _this$props.onKeyPress,
          onKeyUp = _this$props.onKeyUp,
          onSelect = _this$props.onSelect,
          onSubmit = _this$props.onSubmit,
          maxLength = _this$props.maxLength,
          name = _this$props.name,
          placeholder = _this$props.placeholder,
          required = _this$props.required,
          role = _this$props.role,
          value = _this$props.value,
          defaultValue = _this$props.defaultValue,
          wrap = _this$props.wrap;
      var ariaProps = (0, _getAriaProps.default)(this.props);
      var assistiveTextLabel = typeof this.props.assistiveText === 'string' ? this.props.assistiveText : _objectSpread({}, this.props.assistiveText).label;
      var labelText = label || assistiveTextLabel; // One of these is required to pass accessibility tests

      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-form-element', {
          'slds-has-error': errorText
        }, classNameContainer)
      }, labelText && /*#__PURE__*/_react.default.createElement("label", {
        className: (0, _classnames.default)('slds-form-element__label', {
          'slds-assistive-text': assistiveTextLabel && !label
        }),
        htmlFor: this.getId()
      }, required && /*#__PURE__*/_react.default.createElement("abbr", {
        className: "slds-required",
        title: "required"
      }, '*'), labelText), /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-form-element__control')
      }, /*#__PURE__*/_react.default.createElement("textarea", _extends({
        className: (0, _classnames.default)('slds-textarea', className),
        autoFocus: autoFocus,
        disabled: disabled,
        id: this.getId(),
        maxLength: maxLength,
        name: name,
        onBlur: onBlur,
        onChange: onChange,
        onClick: onClick,
        onFocus: onFocus,
        onInput: onInput,
        onInvalid: onInvalid,
        onKeyDown: onKeyDown,
        onKeyPress: onKeyPress,
        onKeyUp: onKeyUp,
        onSelect: onSelect,
        onSubmit: onSubmit,
        placeholder: placeholder,
        ref: textareaRef,
        role: role,
        required: required,
        wrap: wrap,
        value: value,
        defaultValue: defaultValue
      }, ariaProps))), errorText && /*#__PURE__*/_react.default.createElement("div", {
        id: this.getErrorId(),
        className: "slds-form-element__help"
      }, errorText), children);
    }
  }]);

  return Textarea;
}(_react.default.Component);

_defineProperty(Textarea, "displayName", _constants.TEXTAREA);

_defineProperty(Textarea, "propTypes", {
  /**
   * **Assistive text for accessibility.**
   * * `label`: If present, the label associated with this `textarea` is overwritten by this text and is visually not shown.
   */
  assistiveText: _propTypes.default.shape({
    label: _propTypes.default.string
  }),

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
   * Specifies is the textarea should automatically get focus when the page loads. This is typically a poor user experience.
   */
  autoFocus: _propTypes.default.bool,

  /**
   * Elements are added after the `textarea`.
   */
  children: _propTypes.default.node,

  /**
   * Class names to be added to the textarea component.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /** Allows for ability to apply classNames to outer textarea div.
   */
  classNameContainer: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Disables the textarea and prevents editing the contents.
   */
  disabled: _propTypes.default.bool,

  /**
   * Message to display when the textarea is in an error state. When this is present, also visually highlights the component as in error.
   */
  errorText: _propTypes.default.string,

  /**
   * Every textarea must have a unique ID in order to support keyboard navigation and ARIA support.
   */
  id: _propTypes.default.string,

  /**
   * This callback exposes the textarea reference / DOM node to parent components. `<Parent textareaRef={(textareaComponent) => this.textarea = textareaComponent} />
   */
  textareaRef: _propTypes.default.func,

  /**
   * This label appears above the textarea.
   */
  label: _propTypes.default.string,

  /**
   * Triggered when focus is removed.
   */
  onBlur: _propTypes.default.func,

  /**
   * This callback fires when the textarea changes. The synthetic React event will be the first parameter to the callback. You will probably want to reference `event.target.value` in your callback. No custom data object is provided.
   */
  onChange: _propTypes.default.func,

  /**
   * This event fires when the textarea is clicked.
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
   * Triggered when a submittable <input> element is invalid.
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
   * Maximum number of characters allowed.
   */
  maxLength: _propTypes.default.string,

  /**
   * Name of the submitted form parameter.
   */
  name: _propTypes.default.string,

  /**
   * Text that will appear in an empty textarea.
   */
  placeholder: _propTypes.default.string,

  /**
   * Highlights the textarea as a required field (does not perform any validation).
   */
  required: _propTypes.default.bool,

  /**
   * The textarea is a controlled component, and will always display this value.
   */
  value: _propTypes.default.string,

  /**
   * The textarea is a uncontrolled component, and this will be the initial value.
   */
  defaultValue: _propTypes.default.string,

  /**
   * Specifies how the text in a text area is to be wrapped when submitted in a form.
   */
  wrap: _propTypes.default.oneOf(['soft', 'hard'])
});

var _default = Textarea;
exports.default = _default;