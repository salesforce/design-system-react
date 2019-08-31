"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _shortid = _interopRequireDefault(require("shortid"));

var _classnames = _interopRequireDefault(require("classnames"));

var _keyCode = _interopRequireDefault(require("../../utilities/key-code"));

var _constants = require("../../utilities/constants");

var _getDataProps = _interopRequireDefault(require("../../utilities/get-data-props"));

var _swatch = _interopRequireDefault(require("../../components/color-picker/private/swatch"));

var _icon = _interopRequireDefault(require("../icon"));

var _checkProps = _interopRequireDefault(require("./check-props"));

var _component = _interopRequireDefault(require("./component.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
   * **Assistive text for accessibility**
   * This object is merged with the default props object on every render.
   * * `label`: This is used as a visually hidden label if, no `labels.label` is provided.
   */
  assistiveText: _propTypes.default.shape({
    label: _propTypes.default.string
  }),

  /**
   * The ID of an element that describes this radio input. Often used for error messages.
   */
  'aria-describedby': _propTypes.default.string,

  /**
   * The aria-labelledby attribute establishes relationships between objects and their label(s), and its value should be one or more element IDs, which refer to elements that have the text needed for labeling. List multiple element IDs in a space delimited fashion.
   */
  'aria-labelledby': _propTypes.default.string,

  /**
   * This is a controlled component. This radio is checked according to this value.
   */
  checked: _propTypes.default.bool,

  /**
   * Class name to be passed to radio input wrapper ( `span` element)
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string])
  /**
  * This is the initial value of an uncontrolled form element and is present only to provide compatibility
  * with hybrid framework applications that are not entirely React. It should only be used in an application
  * without centralized state (Redux, Flux). "Controlled components" with centralized state is highly recommended.
  * See [Code Overview](https://github.com/salesforce/design-system-react/blob/master/docs/codebase-overview.md#controlled-and-uncontrolled-components) for more information.
  */
  ,
  defaultChecked: _propTypes.default.bool,

  /**
   * Disable this radio input.
   */
  disabled: _propTypes.default.bool,

  /**
   * A unique ID that is used to associating a label to the `input` element. This ID is added to the `input` element.
   */
  id: _propTypes.default.string,

  /**
   * **Text labels for internationalization**
   * This object is merged with the default props object on every render.
   * * `heading`: Heading for the visual picker variant
   * * `label`: Label for the radio input
   */
  labels: _propTypes.default.shape({
    heading: _propTypes.default.string,
    label: _propTypes.default.string
  }),

  /**
   * The name of the radio input group.
   */
  name: _propTypes.default.string,

  /**
   * This event fires when the radio selection changes. Passes in `event, { checked }`.
   */
  onChange: _propTypes.default.func,

  /**
   * The value of this radio input.
   */
  value: _propTypes.default.string,

  /**
   * Variant of the Radio button. Base is the default and button-group makes the radio button look like a normal button (should be a child of <RadioButtonGroup>).
   */
  variant: _propTypes.default.oneOf(['base', 'button-group', 'swatch', 'visual-picker']),

  /**
   * Determines whether visual picker is coverable when selected (only for visual picker variant)
   */
  coverable: _propTypes.default.bool,

  /**
   * Determines whether the visual picker should be vertical or horizontal (only for visual picker variant)
   */
  vertical: _propTypes.default.bool,

  /**
   * Allows icon to shown if radio is not selected (only for non-coverable visual picker variant)
   */
  onRenderVisualPicker: _propTypes.default.func,

  /**
   * Allows icon to shown if radio is not selected (only for visual picker variant)
   */
  onRenderVisualPickerSelected: _propTypes.default.func,

  /**
   * Allows icon to shown if radio is not selected (only for visual picker variant)
   */
  onRenderVisualPickerNotSelected: _propTypes.default.func,

  /**
   * Shows description for radio option (only for visual picker variant)
   */
  description: _propTypes.default.string,

  /**
   * Allows icon to shown if radio is not selected (only for visual picker variant)
   */
  size: _propTypes.default.oneOf(['medium', 'large']),

  /**
   * Ref callback that will pass in the radio's `input` tag
   */
  refs: _propTypes.default.shape({
    input: _propTypes.default.func
  })
};
var defaultProps = {
  assistiveText: {},
  variant: 'base',
  coverable: false
};
/**
 * A radio input that can have a single input checked at any one time. Radios should be wrapped with
 * a [RadioGroup](/components/radio-group) or [RadioButtonGroup](/components/radio-button-group)
 */

var Radio =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Radio, _React$Component);

  function Radio(props) {
    var _this;

    _classCallCheck(this, Radio);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Radio).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (event, preventDuplicateChangeEvent) {
      if (!_this.preventDuplicateChangeEvent) {
        _this.preventDuplicateChangeEvent = Boolean(preventDuplicateChangeEvent);

        if (_this.props.onChange) {
          _this.props.onChange(event, {
            checked: !_this.props.checked
          });
        }
      } else {
        _this.preventDuplicateChangeEvent = false;
      }
    });

    _this.preventDuplicateChangeEvent = false;
    return _this;
  }

  _createClass(Radio, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      (0, _checkProps.default)(_constants.RADIO, this.props, _component.default);
      this.generatedId = _shortid.default.generate();
    }
  }, {
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var dataProps = (0, _getDataProps.default)(this.props);
      var radio;

      var labels = _objectSpread({}, defaultProps.labels, this.props.label ? {
        label: this.props.label
      } : {}, this.props.labels);

      if (this.props.variant === 'swatch') {
        radio = _react.default.createElement("label", {
          style: {
            border: '1px'
          },
          className: "slds-radio_button__label",
          htmlFor: this.getId()
        }, _react.default.createElement("span", null, _react.default.createElement(_swatch.default, {
          label: labels.label,
          style: this.props.style,
          color: this.props.value
        })));
      } else if (this.props.variant === 'button-group') {
        radio = _react.default.createElement("label", {
          className: "slds-radio_button__label",
          htmlFor: this.getId()
        }, _react.default.createElement("span", {
          className: "slds-radio_faux"
        }, labels.label));
      } else if (this.props.variant === 'visual-picker') {
        radio = _react.default.createElement("label", {
          htmlFor: this.getId()
        }, this.props.coverable ? _react.default.createElement("div", {
          className: "slds-visual-picker__figure slds-visual-picker__icon slds-align_absolute-center"
        }, _react.default.createElement("span", {
          className: "slds-is-selected"
        }, this.props.onRenderVisualPickerSelected()), _react.default.createElement("span", {
          className: "slds-is-not-selected"
        }, this.props.onRenderVisualPickerNotSelected())) : _react.default.createElement("span", {
          className: "slds-visual-picker__figure slds-visual-picker__text slds-align_absolute-center"
        }, this.props.onRenderVisualPicker()), !this.props.vertical ? _react.default.createElement("span", {
          className: "slds-visual-picker__body"
        }, labels.heading ? _react.default.createElement("span", {
          className: "slds-text-heading_small"
        }, labels.heading) : null, _react.default.createElement("span", {
          className: "slds-text-title"
        }, labels.label)) : null, !this.props.coverable ? _react.default.createElement("span", {
          className: "slds-icon_container slds-visual-picker__text-check"
        }, _react.default.createElement(_icon.default, {
          assistiveText: this.props.assistiveText,
          category: "utility",
          name: "check",
          colorVariant: "base",
          size: "x-small"
        })) : null);
      } else {
        radio = _react.default.createElement("label", {
          className: "slds-radio__label",
          htmlFor: this.getId(),
          id: this.props.labelId
        }, _react.default.createElement("span", {
          className: "slds-radio_faux"
        }), _react.default.createElement("span", {
          className: "slds-form-element__label"
        }, labels.label), this.props.assistiveText.label ? _react.default.createElement("span", {
          className: "slds-assistive-text"
        }, this.props.assistiveText.label) : null);
      }

      return _react.default.createElement("span", {
        className: (0, _classnames.default)(this.props.variant === 'visual-picker' ? "slds-visual-picker_".concat(this.props.size) : null, {
          'slds-radio': this.props.variant === 'base' || this.props.variant === 'swatch',
          'slds-button slds-radio_button': this.props.variant === 'button-group',
          'slds-visual-picker': this.props.variant === 'visual-picker',
          'slds-visual-picker_vertical': this.props.variant === 'visual-picker' && this.props.vertical
        }, this.props.className)
      }, _react.default.createElement("input", _extends({
        type: "radio",
        id: this.getId(),
        name: this.props.name,
        value: this.props.value
        /* A form element should not have both checked and defaultChecked props. */

      }, this.props.checked !== undefined ? {
        checked: this.props.checked
      } : {
        defaultChecked: this.props.defaultChecked
      }, {
        onChange: function onChange(event) {
          _this2.handleChange(event);
        },
        onClick: function onClick(event) {
          if (_this2.props.checked && _this2.props.deselectable) {
            _this2.handleChange(event);
          }
        },
        onKeyPress: function onKeyPress(event) {
          var charCode = event.charCode;

          if (charCode === _keyCode.default.SPACE && _this2.props.checked && _this2.props.deselectable) {
            _this2.handleChange(event, true);
          } else if (charCode === _keyCode.default.ENTER && _this2.props.checked && _this2.props.deselectable || !_this2.props.checked) {
            _this2.handleChange(event);
          }
        },
        "aria-describedby": this.props['aria-describedby'],
        "aria-labelledby": this.props['aria-labelledby'],
        disabled: this.props.disabled
      }, dataProps, {
        ref: function ref(input) {
          if (_this2.props.refs && _this2.props.refs.input) {
            _this2.props.refs.input(input);
          }
        }
      })), radio);
    }
  }]);

  return Radio;
}(_react.default.Component);

Radio.displayName = _constants.RADIO;
Radio.propTypes = propTypes;
Radio.defaultProps = defaultProps;
var _default = Radio;
exports.default = _default;