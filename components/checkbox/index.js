"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _shortid = _interopRequireDefault(require("shortid"));

var _keyCode = _interopRequireDefault(require("../../utilities/key-code"));

var _event = _interopRequireDefault(require("../../utilities/event"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _component = _interopRequireDefault(require("./component.json"));

var _constants = require("../../utilities/constants");

var _icon = _interopRequireDefault(require("../icon"));

var _getAriaProps = _interopRequireDefault(require("../../utilities/get-aria-props"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var propTypes = {
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
   * The aria-labelledby attribute establishes relationships between objects and their label(s), and its value should be one or more element IDs, which refer to elements that have the text needed for labeling. List multiple element IDs in a space delimited fashion.
   */
  'aria-labelledby': _propTypes.default.string,

  /**
   * `aria-owns` indicate that an element depends on the current one when the relation can't be determined by the hierarchy structure.
   */
  'aria-owns': _propTypes.default.string,

  /**
   * The `aria-required` attribute is used to indicate that user input is required on an element before a form can be submitted.
   */
  'aria-required': _propTypes.default.bool,

  /**
   * **Assistive text for accessibility**
   * This object is merged with the default props object on every render.
   * * `heading`: This is used as a visually hidden label if, no `labels.heading` is provided.
   * * `label`: This is used as a visually hidden label if, no `labels.label` is provided.
   */
  assistiveText: _propTypes.default.shape({
    heading: _propTypes.default.string,
    label: _propTypes.default.string
  }),

  /**
   * The Checkbox should be a controlled component, and will always be in the state specified. If checked is not defined, the state of the uncontrolled native `input` component will be used.
   */
  checked: _propTypes.default.bool,

  /**
   * This is the initial value of an uncontrolled form element and is present only
   * to provide compatibility with hybrid framework applications that are not
   * entirely React. It should only be used in an application without centralized
   * state (Redux, Flux). "Controlled components" with centralized state is highly recommended. See [Code Overview](https://github.com/salesforce/design-system-react/blob/master/docs/codebase-overview.md#controlled-and-uncontrolled-components) for more information.
   */
  defaultChecked: _propTypes.default.bool,

  /**
   * Class names to be added to the outer container of the Checkbox.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Disables the Checkbox and prevents clicking it.
   */
  disabled: _propTypes.default.bool,

  /**
   * Message to display when the Checkbox is in an error state. When this is present, also visually highlights the component as in error.
   */
  errorText: _propTypes.default.string,

  /**
   * A unique ID is needed in order to support keyboard navigation and ARIA support. This ID is added to the `input` element
   */
  id: _propTypes.default.string,

  /**
   * The Checkbox will be indeterminate if its state can not be figured out or is partially checked. Once a checkbox is indeterminate, a click should cause it to be checked. Since a user cannot put a checkbox into an indeterminate state, it is assumed you are controlling the value of `checked` with the parent, also, and that this is a controlled component. **Note:** `indeterminate` proptype does nothing in the `toggle` variant, as [SLDS does not support it](https://lightningdesignsystem.com/components/forms/#flavor-checkbox-toggle-checkbox-toggle).
   */
  indeterminate: _propTypes.default.bool,

  /**
   * **Text labels for internationalization**
   * This object is merged with the default props object on every render.
   * * `heading`: Heading for the visual picker variant
   * * `label`: Label for the _enabled_ state of the Toggle variant. Defaults to "Enabled".
   * * `toggleDisabled`: Label for the _disabled_ state of the Toggle variant. Defaults to "Disabled". Note that this uses SLDS language, and meaning, of "Enabled" and "Disabled"; referring to the state of whatever the checkbox is _toggling_, not whether the checkbox itself is enabled or disabled.
   * * `toggleEnabled`: Label for the _enabled_ state of the Toggle variant. Defaults to "Enabled".
   */
  labels: _propTypes.default.shape({
    heading: _propTypes.default.string,
    label: _propTypes.default.string,
    toggleDisabled: _propTypes.default.string,
    toggleEnabled: _propTypes.default.string
  }),

  /**
   * Name of the submitted form parameter.
   */
  name: _propTypes.default.string,

  /**
   * This event fires when the Checkbox looses focus. It passes in `{ event }`.
   */
  onBlur: _propTypes.default.func,

  /**
   * This event fires when the Checkbox changes. Passes in `event, { checked }`. This used to be `checked, event, { checked }`.
   */
  onChange: _propTypes.default.func,

  /**
   * This event fires when the Checkbox is focused. It passes in `{ event }`.
   */
  onFocus: _propTypes.default.func,

  /**
   * This event fires when a key is pressed down. It passes in `{ event }`.
   */
  onKeyDown: _propTypes.default.func,

  /**
   * This event fires when a character is typed. See [this article](http://www.bloggingdeveloper.com/post/KeyPress-KeyDown-KeyUp-The-Difference-Between-Javascript-Key-Events.aspx) for more information. It passes in `{ event }`.
   */
  onKeyPress: _propTypes.default.func,

  /**
   * This event fires when a pressed key is released. It passes in `{ event }`.
   */
  onKeyUp: _propTypes.default.func,

  /**
   * Triggered to indicate that this component should receive focus.
   */
  onRequestFocus: _propTypes.default.func,

  /**
   * Displays the value of the input, but does not allow changes.
   */
  readOnly: _propTypes.default.bool,

  /**
   * If true, will trigger `onRequestFocus`.
   */
  requestFocus: _propTypes.default.bool,

  /**
   * Highlights the Checkbox as a required field (does not perform any validation).
   */
  required: _propTypes.default.bool,

  /**
   * The aria-role of the checkbox.
   */
  role: _propTypes.default.string,

  /**
   * Write <code>"-1"</code> if you don't want the user to tab to the button.
   */
  tabIndex: _propTypes.default.string,

  /**
   * Which UX pattern of checkbox? The default is `base` while other option is `toggle`. (**Note:** `toggle` variant does not support the `indeterminate` feature, because [SLDS does not support it](https://lightningdesignsystem.com/components/forms/#flavor-checkbox-toggle-checkbox-toggle).)
   */
  variant: _propTypes.default.oneOf(['base', 'toggle', 'button-group', 'visual-picker']),

  /**
   * Determines whether visual picker is coverable when selected (only for visual picker variant)
   */
  coverable: _propTypes.default.bool,

  /**
   * Determines whether the visual picker should be vertical or horizontal (only for visual picker variant)
   */
  vertical: _propTypes.default.bool,

  /**
   * Allows icon to shown with checkbox (only for non-coverable visual picker variant)
   */
  onRenderVisualPicker: _propTypes.default.func,

  /**
   * Allows icon to shown if checkbox is not selected (only for visual picker variant)
   */
  onRenderVisualPickerSelected: _propTypes.default.func,

  /**
   * Allows icon to shown if checkbox is not selected (only for visual picker variant)
   */
  onRenderVisualPickerNotSelected: _propTypes.default.func,

  /**
   * Size of checkbox in case of visual composer variant
   */
  size: _propTypes.default.oneOf(['medium', 'large'])
};
var defaultProps = {
  assistiveText: {},
  labels: {
    toggleDisabled: 'Disabled',
    toggleEnabled: 'Enabled'
  },
  variant: 'base'
};
/**
 * The ability to style checkboxes with CSS varies across browsers. Using this component ensures checkboxes look the same everywhere.
 */

var Checkbox = /*#__PURE__*/function (_React$Component) {
  _inherits(Checkbox, _React$Component);

  var _super = _createSuper(Checkbox);

  function Checkbox(_props) {
    var _this;

    _classCallCheck(this, Checkbox);

    _this = _super.call(this, _props);

    _defineProperty(_assertThisInitialized(_this), "getId", function () {
      return _this.props.id || _this.generatedId;
    });

    _defineProperty(_assertThisInitialized(_this), "getErrorId", function () {
      return _this.props.errorText ? "".concat(_this.getId(), "-error-text") : undefined;
    });

    _defineProperty(_assertThisInitialized(_this), "getAriaDescribedBy", function () {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$idArray = _ref.idArray,
          idArray = _ref$idArray === void 0 ? [] : _ref$idArray;

      return idArray.concat(_this.props['aria-describedby'], _this.getErrorId()).filter(Boolean).join(' ') || undefined;
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (event) {
      var _this$props = _this.props,
          checked = _this$props.checked,
          indeterminate = _this$props.indeterminate,
          onChange = _this$props.onChange;

      if (typeof onChange === 'function') {
        // `target.checked` is present twice to maintain backwards compatibility. Please remove first parameter `value` on the next breaking change or when `forms/checkbox` is removed.
        if (_this.props.oldEventParameterOrder) {
          onChange(event.target.checked, event, {
            checked: indeterminate ? true : !checked,
            indeterminate: false
          });
        } else {
          // NEW API
          onChange(event, {
            checked: indeterminate ? true : !checked,
            indeterminate: false
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (event) {
      if (event.keyCode) {
        if (event.keyCode === _keyCode.default.ENTER || event.keyCode === _keyCode.default.SPACE) {
          _event.default.trapImmediate(event);

          _this.handleChange(event);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderButtonGroupVariant", function (props, ariaProps, assistiveText, labels) {
      return /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-button slds-checkbox_button"
      }, /*#__PURE__*/_react.default.createElement("input", _extends({
        disabled: props.disabled
        /* A form element should not have both checked and defaultChecked props. */

      }, props.checked !== undefined ? {
        checked: props.checked
      } : {
        defaultChecked: props.defaultChecked
      }, {
        id: _this.getId(),
        name: props.name,
        onBlur: props.onBlur,
        onChange: _this.handleChange,
        onFocus: props.onFocus,
        onKeyDown: props.onKeyDown,
        onKeyPress: props.onKeyPress,
        onKeyUp: props.onKeyUp,
        ref: function ref(component) {
          _this.input = component;
        },
        role: props.role,
        required: props.required,
        type: "checkbox"
      }, ariaProps, {
        "aria-describedby": _this.getAriaDescribedBy()
      })), /*#__PURE__*/_react.default.createElement("label", {
        className: "slds-checkbox_button__label",
        htmlFor: _this.getId()
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-checkbox_faux"
      }, labels.label), assistiveText.label ? /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-assistive-text"
      }, assistiveText.label) : null));
    });

    _defineProperty(_assertThisInitialized(_this), "renderBaseVariant", function (props, ariaProps, assistiveText, labels) {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-form-element', {
          'is-required': props.required,
          'slds-has-error': props.errorText
        }, props.className)
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-form-element__control"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-checkbox"
      }, props.required ? /*#__PURE__*/_react.default.createElement("abbr", {
        className: "slds-required",
        title: "required"
      }, '*') : null, /*#__PURE__*/_react.default.createElement("input", _extends({
        disabled: props.disabled
        /* A form element should not have both checked and defaultChecked props. */

      }, props.checked !== undefined ? {
        checked: props.checked
      } : {
        defaultChecked: props.defaultChecked
      }, {
        id: _this.getId(),
        name: props.name,
        onBlur: props.onBlur,
        onChange: _this.handleChange,
        onFocus: props.onFocus,
        onKeyDown: props.onKeyDown,
        onKeyPress: props.onKeyPress,
        onKeyUp: props.onKeyUp,
        ref: function ref(component) {
          if (component) {
            // eslint-disable-next-line no-param-reassign
            component.indeterminate = props.indeterminate;

            if (_this.props.requestFocus && _this.props.onRequestFocus) {
              _this.props.onRequestFocus(component);
            }
          }

          _this.input = component;
        },
        role: props.role,
        required: props.required,
        tabIndex: props.tabIndex,
        type: "checkbox"
      }, ariaProps, {
        "aria-describedby": _this.getAriaDescribedBy()
      })), /*#__PURE__*/_react.default.createElement("label", {
        className: "slds-checkbox__label",
        htmlFor: _this.getId(),
        id: props.labelId
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-checkbox_faux"
      }), labels.label ? /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-form-element__label"
      }, labels.label) : null, assistiveText.label ? /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-assistive-text"
      }, assistiveText.label) : null))), props.errorText ? /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-form-element__help",
        id: _this.getErrorId()
      }, props.errorText) : null);
    });

    _defineProperty(_assertThisInitialized(_this), "renderToggleVariant", function (props, ariaProps, assistiveText, labels) {
      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-form-element', {
          'is-required': props.required,
          'slds-has-error': props.errorText
        }, props.className)
      }, /*#__PURE__*/_react.default.createElement("label", {
        className: "slds-checkbox_toggle slds-grid",
        htmlFor: _this.getId()
      }, props.required ? /*#__PURE__*/_react.default.createElement("abbr", {
        className: "slds-required",
        title: "required"
      }, '*') : null, labels.label ? /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-form-element__label slds-m-bottom_none"
      }, labels.label) : null, assistiveText.label ? /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-assistive-text"
      }, assistiveText.label) : null, /*#__PURE__*/_react.default.createElement("input", _extends({
        disabled: props.disabled,
        id: _this.getId()
        /* A form element should not have both checked and defaultChecked props. */

      }, props.checked !== undefined ? {
        checked: props.checked
      } : {
        defaultChecked: props.defaultChecked
      }, {
        name: props.name,
        onBlur: props.onBlur,
        onChange: _this.handleChange,
        onFocus: props.onFocus,
        onKeyDown: props.onKeyDown,
        onKeyPress: props.onKeyPress,
        onKeyUp: props.onKeyUp,
        ref: function ref(component) {
          _this.input = component;
        },
        role: props.role,
        required: props.required,
        type: "checkbox"
      }, ariaProps, {
        "aria-describedby": _this.getAriaDescribedBy({
          idArray: ["".concat(_this.getId(), "-desc")]
        })
      })), /*#__PURE__*/_react.default.createElement("span", {
        id: "".concat(_this.getId(), "-desc"),
        className: "slds-checkbox_faux_container",
        "aria-live": "assertive"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-checkbox_faux"
      }), /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-checkbox_on"
      }, labels.toggleEnabled), /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-checkbox_off"
      }, labels.toggleDisabled))), props.errorText ? /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-form-element__help",
        id: _this.getErrorId()
      }, props.errorText) : null);
    });

    _defineProperty(_assertThisInitialized(_this), "renderVisualPickerVariant", function (props, ariaProps, assistiveText) {
      return /*#__PURE__*/_react.default.createElement("span", {
        className: (0, _classnames.default)('slds-visual-picker', "slds-visual-picker_".concat(_this.props.size), _this.props.vertical ? 'slds-visual-picker_vertical' : null)
      }, /*#__PURE__*/_react.default.createElement("input", _extends({
        disabled: props.disabled
        /* A form element should not have both checked and defaultChecked props. */

      }, props.checked !== undefined ? {
        checked: props.checked
      } : {
        defaultChecked: props.defaultChecked
      }, {
        id: _this.getId(),
        name: props.name,
        onBlur: props.onBlur,
        onChange: _this.handleChange,
        onFocus: props.onFocus,
        onKeyDown: props.onKeyDown,
        onKeyPress: props.onKeyPress,
        onKeyUp: props.onKeyUp,
        ref: function ref(component) {
          _this.input = component;
        },
        role: props.role,
        required: props.required,
        type: "checkbox"
      }, ariaProps, {
        "aria-describedby": _this.getAriaDescribedBy()
      })), /*#__PURE__*/_react.default.createElement("label", {
        className: "slds-checkbox_button__label",
        htmlFor: _this.getId()
      }, _this.props.coverable ? /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-visual-picker__figure slds-visual-picker__icon slds-align_absolute-center"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-is-selected"
      }, _this.props.onRenderVisualPickerSelected()), /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-is-not-selected"
      }, _this.props.onRenderVisualPickerNotSelected())) : /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-visual-picker__figure slds-visual-picker__text slds-align_absolute-center"
      }, _this.props.onRenderVisualPicker()), !_this.props.vertical ? /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-visual-picker__body"
      }, _this.props.labels.heading ? /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-text-heading_small"
      }, _this.props.labels.heading) : null, /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-text-title"
      }, _this.props.labels.label), assistiveText.label || assistiveText.heading ? /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-assistive-text"
      }, assistiveText.label || assistiveText.heading) : null) : null, !_this.props.coverable ? /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-icon_container slds-visual-picker__text-check"
      }, /*#__PURE__*/_react.default.createElement(_icon.default, {
        assistiveText: _this.props.assistiveText,
        category: "utility",
        name: "check",
        colorVariant: "base",
        size: "x-small"
      })) : null));
    });

    (0, _checkProps.default)(_constants.CHECKBOX, _this.props, _component.default);
    _this.generatedId = _shortid.default.generate();
    return _this;
  }

  _createClass(Checkbox, [{
    key: "render",
    value: function render() {
      var ariaProps = (0, _getAriaProps.default)(this.props);

      if (this.props.variant === 'toggle') {
        ariaProps['aria-describedby'] = "".concat(this.getId(), "-desc");
      }

      var assistiveText = _objectSpread(_objectSpread(_objectSpread({}, defaultProps.assistiveText), typeof this.props.assistiveText === 'string' ? {
        label: this.props.assistiveText
      } : {}), _typeof(this.props.assistiveText) === 'object' ? this.props.assistiveText : {});

      var labels = _objectSpread(_objectSpread(_objectSpread({}, defaultProps.labels), this.props.label ? {
        label: this.props.label
      } : {}), this.props.labels);

      var subRenders = {
        base: this.renderBaseVariant,
        'button-group': this.renderButtonGroupVariant,
        toggle: this.renderToggleVariant,
        'visual-picker': this.renderVisualPickerVariant
      };
      var variantExists = subRenders[this.props.variant];
      return variantExists ? subRenders[this.props.variant](this.props, ariaProps, assistiveText, labels) : subRenders.base(this.props, ariaProps, assistiveText, labels);
    }
  }]);

  return Checkbox;
}(_react.default.Component);

Checkbox.displayName = _constants.CHECKBOX;
Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;
var _default = Checkbox;
exports.default = _default;