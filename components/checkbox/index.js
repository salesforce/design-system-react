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

var _docs = _interopRequireDefault(require("./docs.json"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
   * * `label`: This is used as a visually hidden label if, no `labels.label` is provided.
   */
  assistiveText: _propTypes.default.shape({
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
   * * `label`: Label for the _enabled_ state of the Toggle variant. Defaults to "Enabled".
   * * `toggleDisabled`: Label for the _disabled_ state of the Toggle variant. Defaults to "Disabled". Note that this uses SLDS language, and meaning, of "Enabled" and "Disabled"; referring to the state of whatever the checkbox is _toggling_, not whether the checkbox itself is enabled or disabled.
   * * `toggleEnabled`: Label for the _enabled_ state of the Toggle variant. Defaults to "Enabled".
   */
  labels: _propTypes.default.shape({
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
   * Displays the value of the input, but does not allow changes.
   */
  readOnly: _propTypes.default.bool,

  /**
   * Highlights the Checkbox as a required field (does not perform any validation).
   */
  required: _propTypes.default.bool,

  /**
   * The aria-role of the checkbox.
   */
  role: _propTypes.default.string,

  /**
   * Which UX pattern of checkbox? The default is `base` while other option is `toggle`. (**Note:** `toggle` variant does not support the `indeterminate` feature, because [SLDS does not support it](https://lightningdesignsystem.com/components/forms/#flavor-checkbox-toggle-checkbox-toggle).)
   */
  variant: _propTypes.default.oneOf(['base', 'toggle', 'button-group'])
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

var Checkbox =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Checkbox, _React$Component);

  function Checkbox() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Checkbox);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Checkbox)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "getId", function () {
      return _this.props.id || _this.generatedId;
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

    _defineProperty(_assertThisInitialized(_this), "renderButtonGroupVariant", function (props, assistiveText, labels) {
      return _react.default.createElement("span", {
        className: "slds-button slds-checkbox_button"
      }, _react.default.createElement("input", {
        "aria-controls": _this.props['aria-controls'],
        "aria-describedby": _this.props['aria-describedby'],
        "aria-owns": _this.props['aria-owns'],
        "aria-required": _this.props['aria-required'],
        disabled: props.disabled,
        checked: props.checked,
        defaultChecked: props.defaultChecked,
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
      }), _react.default.createElement("label", {
        className: "slds-checkbox_button__label",
        htmlFor: _this.getId()
      }, _react.default.createElement("span", {
        className: "slds-checkbox_faux"
      }, labels.label), assistiveText.label ? _react.default.createElement("span", {
        className: "slds-assistive-text"
      }, assistiveText.label) : null));
    });

    _defineProperty(_assertThisInitialized(_this), "renderBaseVariant", function (props, assistiveText, labels) {
      return _react.default.createElement("div", {
        className: (0, _classnames.default)('slds-form-element', {
          'is-required': props.required,
          'slds-has-error': props.errorText
        }, props.className)
      }, _react.default.createElement("div", {
        className: "slds-form-element__control"
      }, _react.default.createElement("span", {
        className: "slds-checkbox"
      }, props.required ? _react.default.createElement("abbr", {
        className: "slds-required",
        title: "required"
      }, "*") : null, _react.default.createElement("input", {
        "aria-controls": _this.props['aria-controls'],
        "aria-describedby": _this.props['aria-describedby'],
        "aria-owns": _this.props['aria-owns'],
        "aria-required": _this.props['aria-required'],
        disabled: props.disabled,
        checked: props.checked,
        defaultChecked: props.defaultChecked,
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
            component.indeterminate = props.indeterminate;
          }

          _this.input = component;
        },
        role: props.role,
        required: props.required,
        type: "checkbox"
      }), _react.default.createElement("label", {
        className: "slds-checkbox__label",
        htmlFor: _this.getId()
      }, _react.default.createElement("span", {
        className: "slds-checkbox_faux"
      }), labels.label ? _react.default.createElement("span", {
        className: "slds-form-element__label"
      }, labels.label) : null, assistiveText.label ? _react.default.createElement("span", {
        className: "slds-assistive-text"
      }, assistiveText.label) : null))), props.errorText ? _react.default.createElement("div", {
        className: "slds-form-element__help"
      }, props.errorText) : null);
    });

    _defineProperty(_assertThisInitialized(_this), "renderToggleVariant", function (props, assistiveText, labels) {
      return _react.default.createElement("div", {
        className: (0, _classnames.default)('slds-form-element', {
          'is-required': props.required,
          'slds-has-error': props.errorText
        }, props.className)
      }, _react.default.createElement("label", {
        className: "slds-checkbox_toggle slds-grid",
        htmlFor: _this.getId()
      }, props.required ? _react.default.createElement("abbr", {
        className: "slds-required",
        title: "required"
      }, "*") : null, labels.label ? _react.default.createElement("span", {
        className: "slds-form-element__label slds-m-bottom_none"
      }, labels.label) : null, assistiveText.label ? _react.default.createElement("span", {
        className: "slds-assistive-text"
      }, assistiveText.label) : null, _react.default.createElement("input", {
        "aria-controls": _this.props['aria-controls'],
        "aria-describedby": "".concat(_this.getId(), "-desc"),
        "aria-owns": _this.props['aria-owns'],
        "aria-required": _this.props['aria-required'],
        disabled: props.disabled,
        id: _this.getId(),
        checked: props.checked,
        defaultChecked: props.defaultChecked,
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
      }), _react.default.createElement("span", {
        id: "".concat(_this.getId(), "-desc"),
        className: "slds-checkbox_faux_container",
        "aria-live": "assertive"
      }, _react.default.createElement("span", {
        className: "slds-checkbox_faux"
      }), _react.default.createElement("span", {
        className: "slds-checkbox_on"
      }, labels.toggleEnabled), _react.default.createElement("span", {
        className: "slds-checkbox_off"
      }, labels.toggleDisabled))), props.errorText ? _react.default.createElement("div", {
        className: "slds-form-element__help"
      }, props.errorText) : null);
    });

    return _this;
  }

  _createClass(Checkbox, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      (0, _checkProps.default)(_constants.CHECKBOX, this.props, _docs.default);
      this.generatedId = _shortid.default.generate();
    }
  }, {
    key: "render",
    value: function render() {
      var assistiveText = _objectSpread({}, defaultProps.assistiveText, typeof this.props.assistiveText === 'string' ? {
        label: this.props.assistiveText
      } : {}, _typeof(this.props.assistiveText) === 'object' ? this.props.assistiveText : {});

      var labels = _objectSpread({}, defaultProps.labels, this.props.label ? {
        label: this.props.label
      } : {}, this.props.labels);

      var subRenders = {
        base: this.renderBaseVariant,
        'button-group': this.renderButtonGroupVariant,
        toggle: this.renderToggleVariant
      };
      var variantExists = subRenders[this.props.variant];
      return variantExists ? subRenders[this.props.variant](this.props, assistiveText, labels) : subRenders.base(this.props, assistiveText, labels);
    }
  }]);

  return Checkbox;
}(_react.default.Component);

Checkbox.displayName = _constants.CHECKBOX;
Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;
var _default = Checkbox;
exports.default = _default;