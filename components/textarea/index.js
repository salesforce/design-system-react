"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require("create-react-class");

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _shortid = require("shortid");

var _shortid2 = _interopRequireDefault(_shortid);

var _checkProps = require("./check-props");

var _checkProps2 = _interopRequireDefault(_checkProps);

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A multi-line plain-text editing control.
 */
var Textarea = (0, _createReactClass2.default)({
  displayName: _constants.FORMS_TEXTAREA,
  propTypes: {
    /**
     * The aria-activedescendant attribute contains the ID of the currently active child object that is part of a composite widget within the Document Object Model. It makes do with the overhead of having all or more than one child focusable. As the name specifies, it helps in managing the current active child of the composite widget.
     */
    'aria-activedescendant': _propTypes2.default.string,

    /**
     * Indicates if the suggestions in a composite widget are values that complete the current textbox input.
     */
    'aria-autocomplete': _propTypes2.default.string,

    /**
     * An HTML ID that is shared with ARIA-supported devices with the
     * `aria-controls` attribute in order to relate the input with
     * another region of the page. An example would be a select box
     * that shows or hides a panel.
     */
    'aria-controls': _propTypes2.default.string,

    /**
     * The `aria-describedby` attribute is used to indicate the IDs of the elements that describe the object. It is used to establish a relationship between widgets or groups and text that described them. This is very similar to aria-labelledby: a label describes the essence of an object, while a description provides more information that the user might need.
     */
    'aria-describedby': _propTypes2.default.string,

    /**
     * Use the `aria-expanded` state to indicate whether regions of the content are collapsible, and to expose whether a region is currently expanded or collapsed.
     */
    'aria-expanded': _propTypes2.default.bool,

    /**
     * Indicates that the element has a popup context menu or sub-level menu.
     */
    'aria-haspopup': _propTypes2.default.bool,

    /**
     * The aria-labelledby attribute contains the element IDs of labels in objects such as input elements, widgets, and groups. The attribute establishes relationships between objects and their labels. Assistive technology, such as screen readers, use this attribute to catalog the objects in a document so that users can navigate between them. Without an element ID, the assistive technology cannot catalog the object.
     */
    'aria-labelledby': _propTypes2.default.string,

    /**
     * An HTML ID that is shared with ARIA-supported devices with the
     * `aria-controls` attribute in order to relate the input with
     * another region of the page. An example would be a search field
     * that shows search results.
     */
    'aria-owns': _propTypes2.default.string,

    /**
     * The `aria-required` attribute is used to indicate that user input is required on an element before a form can be submitted.
     */
    'aria-required': _propTypes2.default.bool,

    /**
     * Specifies is the textarea should automatically get focus when the page loads. This is typically a poor user experience.
     */
    autoFocus: _propTypes2.default.bool,

    /**
     * **Assistive text for accessibility.**
     * * `label`: If present, the label associated with this `textarea` is overwritten by this text and is visually not shown.
     */
    assistiveText: _propTypes2.default.shape({
      label: _propTypes2.default.string
    }),

    /**
     * Elements are added after the `textarea`.
     */
    children: _propTypes2.default.node,

    /**
     * Class names to be added to the textarea component.
     */
    className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

    /** Allows for ability to apply classNames to outer textarea div.
     */
    classNameContainer: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

    /**
     * Disables the textarea and prevents editing the contents.
     */
    disabled: _propTypes2.default.bool,

    /**
     * Message to display when the textarea is in an error state. When this is present, also visually highlights the component as in error.
     */
    errorText: _propTypes2.default.string,

    /**
     * Every textarea must have a unique ID in order to support keyboard navigation and ARIA support.
     */
    id: _propTypes2.default.string,

    /**
     * This callback exposes the textarea reference / DOM node to parent components. `<Parent textareaRef={(textareaComponent) => this.textarea = textareaComponent} />
     */
    textareaRef: _propTypes2.default.func,

    /**
     * This label appears above the textarea.
     */
    label: _propTypes2.default.string,

    /**
     * Triggered when focus is removed.
     */
    onBlur: _propTypes2.default.func,

    /**
     * This callback fires when the textarea changes. The synthetic React event will be the first parameter to the callback. You will probably want to reference `event.target.value` in your callback. No custom data object is provided.
     */
    onChange: _propTypes2.default.func,

    /**
     * This event fires when the textarea is clicked.
     */
    onClick: _propTypes2.default.func,

    /**
     * Triggered when component is focused.
     */
    onFocus: _propTypes2.default.func,

    /**
     * Similar to `onchange`. Triggered when an element gets user input.
     */
    onInput: _propTypes2.default.func,

    /**
     * Triggered when a submittable <input> element is invalid.
     */
    onInvalid: _propTypes2.default.func,

    /**
     * Triggered when a key is pressed down
     */
    onKeyDown: _propTypes2.default.func,

    /**
     * Triggered when a key is pressed and released
     */
    onKeyPress: _propTypes2.default.func,

    /**
     * Triggered when a key is released
     */
    onKeyUp: _propTypes2.default.func,

    /**
     * Triggered after some text has been selected in an element.
     */
    onSelect: _propTypes2.default.func,

    /**
     * Fires when a form is submitted.
     */
    onSubmit: _propTypes2.default.func,

    /**
     * Maximum number of characters allowed.
     */
    maxLength: _propTypes2.default.string,

    /**
     * Name of the submitted form parameter.
     */
    name: _propTypes2.default.string,

    /**
     * Text that will appear in an empty textarea.
     */
    placeholder: _propTypes2.default.string,

    /**
     * Highlights the textarea as a required field (does not perform any validation).
     */
    required: _propTypes2.default.bool,

    /**
     * The textarea is a controlled component, and will always display this value.
     */
    value: _propTypes2.default.string,

    /**
     * The textarea is a uncontrolled component, and this will be the initial value.
     */
    defaultValue: _propTypes2.default.string,

    /**
     * Specifies how the text in a text area is to be wrapped when submitted in a form.
     */
    wrap: _propTypes2.default.oneOf(['soft', 'hard'])
  },
  componentWillMount: function componentWillMount() {
    // `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
    (0, _checkProps2.default)(_constants.FORMS_TEXTAREA, this.props);
    this.generatedId = _shortid2.default.generate();

    if (this.props.errorText) {
      this.generatedErrorId = _shortid2.default.generate();
    }
  },
  getId: function getId() {
    return this.props.id || this.generatedId;
  },
  getErrorId: function getErrorId() {
    return this.props['aria-describedby'] || this.generatedErrorId;
  },
  // ### Render
  render: function render() {
    var _props = this.props,
        autoFocus = _props.autoFocus,
        children = _props.children,
        className = _props.className,
        classNameContainer = _props.classNameContainer,
        disabled = _props.disabled,
        errorText = _props.errorText,
        textareaRef = _props.textareaRef,
        label = _props.label,
        onBlur = _props.onBlur,
        onChange = _props.onChange,
        onClick = _props.onClick,
        onFocus = _props.onFocus,
        onInput = _props.onInput,
        onInvalid = _props.onInvalid,
        onKeyDown = _props.onKeyDown,
        onKeyPress = _props.onKeyPress,
        onKeyUp = _props.onKeyUp,
        onSelect = _props.onSelect,
        onSubmit = _props.onSubmit,
        maxLength = _props.maxLength,
        name = _props.name,
        placeholder = _props.placeholder,
        required = _props.required,
        role = _props.role,
        value = _props.value,
        defaultValue = _props.defaultValue,
        wrap = _props.wrap;
    var assistiveText = typeof this.props.assistiveText === 'string' ? this.props.assistiveText : _objectSpread({}, this.props.assistiveText).label;
    var labelText = label || assistiveText; // One of these is required to pass accessibility tests

    return _react2.default.createElement("div", {
      className: (0, _classnames2.default)('slds-form-element', {
        'slds-has-error': errorText
      }, classNameContainer)
    }, labelText && _react2.default.createElement("label", {
      className: (0, _classnames2.default)('slds-form-element__label', {
        'slds-assistive-text': assistiveText && !label
      }),
      htmlFor: this.getId()
    }, required && _react2.default.createElement("abbr", {
      className: "slds-required",
      title: "required"
    }, "*"), labelText), _react2.default.createElement("div", {
      className: (0, _classnames2.default)('slds-form-element__control')
    }, _react2.default.createElement("textarea", {
      "aria-activedescendant": this.props['aria-activedescendant'],
      "aria-controls": this.props['aria-controls'],
      "aria-labelledby": this.props['aria-labelledby'],
      "aria-describedby": this.getErrorId(),
      "aria-expanded": this.props['aria-expanded'],
      "aria-owns": this.props['aria-owns'],
      "aria-required": this.props['aria-required'],
      className: (0, _classnames2.default)('slds-textarea', className),
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
    })), errorText && _react2.default.createElement("div", {
      id: this.getErrorId(),
      className: "slds-form-element__help"
    }, errorText), children);
  }
});
exports.default = Textarea;