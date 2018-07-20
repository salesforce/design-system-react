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

var _inputIcon = require("../icon/input-icon");

var _inputIcon2 = _interopRequireDefault(_inputIcon);

var _innerInput = require("./private/inner-input");

var _innerInput2 = _interopRequireDefault(_innerInput);

var _label = require("../utilities/label");

var _label2 = _interopRequireDefault(_label);

var _checkProps = require("./check-props");

var _checkProps2 = _interopRequireDefault(_checkProps);

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * The HTML `input` with a label and error messaging.
 */
var Input = (0, _createReactClass2.default)({
  displayName: _constants.FORMS_INPUT,
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
     * **Assistive text for accessibility**
     * * `label`: Visually hidden label but read out loud by screen readers.
     * * `spinner`: Text for loading spinner icon.
     */
    assistiveText: _propTypes2.default.shape({
      label: _propTypes2.default.string,
      spinner: _propTypes2.default.string
    }),

    /**
     * Elements are added after the `input`.
     */
    children: _propTypes2.default.node,

    /**
     * Class names to be added to the outer container of the input.
     */
    className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

    /**
     * This is the initial value of an uncontrolled form element and
     * is present only to provide compatibility with hybrid framework
     * applications that are not entirely React. It should only be used
     * in an application without centralized state (Redux, Flux).
     * "Controlled components" with centralized state is highly recommended.
     * See [Code Overview](https://github.com/salesforce/design-system-react/blob/master/docs/codebase-overview.md#controlled-and-uncontrolled-components) for more information.
     */
    defaultValue: _propTypes2.default.string,

    /**
     * Disables the input and prevents editing the contents.
     */
    disabled: _propTypes2.default.bool,

    /**
     * Message to display when the input is in an error state. When this is present, also visually highlights the component as in error.
     */
    errorText: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),

    /**
     * Displays text or node to the left of the input. This follows the fixed text input UX pattern.
     */
    fixedTextLeft: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),

    /**
     * Displays text or node to the right of the input. This follows the fixed text input UX pattern.
     */
    fixedTextRight: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.string]),

    /**
     * If true, loading spinner appears inside input on right hand side.
     */
    hasSpinner: _propTypes2.default.bool,

    /**
     * Left aligned icon, must be instace of `design-system-react/components/icon/input-icon`
     */
    iconLeft: _propTypes2.default.node,

    /**
     * Right aligned icon, must be instace of `design-system-react/components/icon/input-icon`
     */
    iconRight: _propTypes2.default.node,

    /**
     * Every input must have a unique ID in order to support keyboard navigation and ARIA support.
     */
    id: _propTypes2.default.string,

    /**
     * This callback exposes the input reference / DOM node to parent components. `<Parent inputRef={(inputComponent) => this.input = inputComponent} />
     */
    inputRef: _propTypes2.default.func,

    /**
     * Displays the value of the input statically. This follows the static input UX pattern.
     */
    isStatic: _propTypes2.default.bool,

    /**
     * This label appears above the input.
     */
    label: _propTypes2.default.string,

    /**
     * Triggered when focus is removed.
     */
    onBlur: _propTypes2.default.func,

    /**
     * This callback fires when the input changes. The synthetic React event will be the first parameter to the callback. You will probably want to reference `event.target.value` in your callback. No custom data object is provided.
     */
    onChange: _propTypes2.default.func,

    /**
     * This event fires when the input is clicked.
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
     * Triggered when a submittable `<input>` element is invalid.
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
     * Text that will appear in an empty input.
     */
    placeholder: _propTypes2.default.string,

    /**
     * Sets the minimum number of characters that an `<input>` can accept.
     */
    minLength: _propTypes2.default.string,

    /**
     * Sets the maximum number of characters that an `<input>` can accept.
     */
    maxLength: _propTypes2.default.string,

    /**
     * Name of the submitted form parameter.
     */
    name: _propTypes2.default.string,

    /**
     * Displays the value of the input as read-only. This is used in the inline edit UX pattern.
     */
    readOnly: _propTypes2.default.bool,

    /**
     * Highlights the input as a required field (does not perform any validation).
     */
    required: _propTypes2.default.bool,

    /**
     * ARIA role
     */
    role: _propTypes2.default.string,

    /**
     * The `<Input>` element includes support for all HTML5 types.
     */
    type: _propTypes2.default.oneOf(['text', 'password', 'datetime', 'datetime-local', 'date', 'month', 'time', 'week', 'number', 'email', 'url', 'search', 'tel', 'color']),

    /**
     * The input is a controlled component, and will always display this value.
     */
    value: _propTypes2.default.string
  },
  getDefaultProps: function getDefaultProps() {
    return {
      type: 'text'
    };
  },
  componentWillMount: function componentWillMount() {
    // `checkProps` issues warnings to developers about properties (similar to React's built in development tools)
    (0, _checkProps2.default)(_constants.FORMS_INPUT, this.props);
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
  // This is convuluted to maintain backwards compatibility. Please remove deprecatedProps on next breaking change.
  getIconRender: function getIconRender(position, iconPositionProp) {
    var icon; // Remove at next breaking change

    /* eslint-disable react/prop-types */

    var deprecatedProps = {
      assistiveText: {
        icon: this.props[iconPositionProp] && this.props[iconPositionProp].props.assistiveText || this.props.iconAssistiveText
      },
      category: this.props[iconPositionProp] && this.props[iconPositionProp].props.category || this.props.iconCategory,
      name: this.props[iconPositionProp] && this.props[iconPositionProp].props.name || this.props.iconName,
      onClick: this.props[iconPositionProp] && this.props[iconPositionProp].props.onClick || this.props.onIconClick
    };
    /* eslint-enable react/prop-types */

    if (this.props[iconPositionProp] && position && this.props[iconPositionProp]) {
      icon = _react2.default.cloneElement(this.props[iconPositionProp], {
        iconPosition: "".concat(position)
      });
    } else if (deprecatedProps.name) {
      icon = _react2.default.createElement(_inputIcon2.default, _extends({
        iconPosition: position
      }, deprecatedProps));
    }

    return icon;
  },
  render: function render() {
    // Remove at next breaking change
    // this is a hack to make left the default prop unless overwritten by `iconPosition="right"`
    var hasLeftIcon = !!this.props.iconLeft || (this.props.iconPosition === 'left' || this.props.iconPosition === undefined) && !!this.props.iconName;
    var hasRightIcon = !!this.props.iconRight || this.props.iconPosition === 'right' && !!this.props.iconName;
    return _react2.default.createElement("div", {
      className: (0, _classnames2.default)('slds-form-element', {
        'slds-has-error': this.props.errorText
      }, this.props.className)
    }, _react2.default.createElement(_label2.default, {
      assistiveText: this.props.assistiveText,
      htmlFor: this.props.isStatic ? undefined : this.getId(),
      label: this.props.label,
      required: this.props.required,
      variant: this.props.isStatic ? 'static' : 'base'
    }), _react2.default.createElement(_innerInput2.default, {
      "aria-activedescendant": this.props['aria-activedescendant'],
      "aria-autocomplete": this.props['aria-autocomplete'],
      "aria-controls": this.props['aria-controls'],
      "aria-labelledby": this.props['aria-labelledby'],
      "aria-describedby": this.getErrorId(),
      "aria-expanded": this.props['aria-expanded'],
      "aria-owns": this.props['aria-owns'],
      "aria-required": this.props['aria-required'],
      containerProps: {
        className: 'slds-form-element__control'
      },
      defaultValue: this.props.defaultValue,
      disabled: this.props.disabled,
      fixedTextLeft: this.props.fixedTextLeft,
      fixedTextRight: this.props.fixedTextRight,
      hasSpinner: this.props.hasSpinner,
      id: this.getId(),
      iconLeft: hasLeftIcon ? this.getIconRender('left', 'iconLeft') : null,
      iconRight: hasRightIcon ? this.getIconRender('right', 'iconRight') : null,
      inlineEditTrigger: this.props.inlineEditTrigger,
      isStatic: this.props.isStatic,
      minLength: this.props.minLength,
      maxLength: this.props.maxLength,
      name: this.props.name,
      onBlur: this.props.onBlur,
      onChange: this.props.onChange,
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
      inputRef: this.props.inputRef,
      readOnly: this.props.readOnly,
      required: this.props.required,
      role: this.props.role,
      assistiveText: this.props.assistiveText,
      type: this.props.type,
      value: this.props.value
    }), this.props.errorText && _react2.default.createElement("div", {
      id: this.getErrorId(),
      className: "slds-form-element__help"
    }, this.props.errorText), this.props.children);
  }
});
exports.default = Input;