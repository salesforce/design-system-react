"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _shortid = require("shortid");

var _shortid2 = _interopRequireDefault(_shortid);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _keyCode = require("../../utilities/key-code");

var _keyCode2 = _interopRequireDefault(_keyCode);

var _constants = require("../../utilities/constants");

var _getDataProps = require("../../utilities/get-data-props");

var _getDataProps2 = _interopRequireDefault(_getDataProps);

var _swatch = require("../../components/color-picker/private/swatch");

var _swatch2 = _interopRequireDefault(_swatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var propTypes = {
  /**
   * The ID of an element that describes this radio input. Often used for error messages.
   */
  'aria-describedby': _propTypes2.default.string,

  /**
   * This is a controlled component. This radio is checked according to this value.
   */
  checked: _propTypes2.default.bool,

  /**
   * Class name to be passed to radio input wrapper ( `span` element)
   */
  className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string])
  /**
  * This is the initial value of an uncontrolled form element and is present only to provide compatibility
  * with hybrid framework applications that are not entirely React. It should only be used in an application
  * without centralized state (Redux, Flux). "Controlled components" with centralized state is highly recommended.
  * See [Code Overview](https://github.com/salesforce/design-system-react/blob/master/docs/codebase-overview.md#controlled-and-uncontrolled-components) for more information.
  */
  ,
  defaultChecked: _propTypes2.default.bool,

  /**
   * Disable this radio input.
   */
  disabled: _propTypes2.default.bool,

  /**
   * A unique ID that is used to associating a label to the `input` element. This ID is added to the `input` element.
   */
  id: _propTypes2.default.string,

  /**
   * The string or element that is shown as both the title and the label for this radio input.
   */
  label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]).isRequired,

  /**
   * The name of the radio input group.
   */
  name: _propTypes2.default.string,

  /**
   * This event fires when the radio selection changes. Passes in `event, { checked }`.
   */
  onChange: _propTypes2.default.func,

  /**
   * The value of this radio input.
   */
  value: _propTypes2.default.string,

  /**
   * Variant of the Radio button. Base is the default and button-group makes the radio button look like a normal button (should be a child of <RadioButtonGroup>).
   */
  variant: _propTypes2.default.oneOf(['base', 'button-group', 'swatch']),

  /**
   * Ref callback that will pass in the radio's `input` tag
   */
  refs: _propTypes2.default.shape({
    input: _propTypes2.default.func
  })
};
var defaultProps = {
  variant: 'base'
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

    _this = _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).call(this, props));
    Object.defineProperty(_assertThisInitialized(_this), "handleChange", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event, preventDuplicateChangeEvent) {
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
      }
    });
    _this.generatedId = _shortid2.default.generate();
    _this.preventDuplicateChangeEvent = false;
    return _this;
  }

  _createClass(Radio, [{
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var dataProps = (0, _getDataProps2.default)(this.props);
      var radio;

      if (this.props.variant === 'swatch') {
        radio = _react2.default.createElement("label", {
          style: {
            border: '1px'
          },
          className: "slds-radio_button__label",
          htmlFor: this.getId()
        }, _react2.default.createElement("span", null, _react2.default.createElement(_swatch2.default, {
          label: this.props.label,
          style: this.props.style,
          color: this.props.value
        })));
      } else if (this.props.variant === 'button-group') radio = _react2.default.createElement("label", {
        className: "slds-radio_button__label",
        htmlFor: this.getId()
      }, _react2.default.createElement("span", {
        className: "slds-radio_faux"
      }, this.props.label));else {
        radio = _react2.default.createElement("label", {
          className: "slds-radio__label",
          htmlFor: this.getId()
        }, _react2.default.createElement("span", {
          className: "slds-radio_faux"
        }), _react2.default.createElement("span", {
          className: "slds-form-element__label"
        }, this.props.label));
      }

      return _react2.default.createElement("span", {
        className: (0, _classnames2.default)({
          'slds-radio': this.props.variant === 'base' || this.props.variant === 'swatch',
          'slds-button slds-radio_button': this.props.variant === 'button-group'
        }, this.props.className)
      }, _react2.default.createElement("input", _extends({
        type: "radio",
        id: this.getId(),
        name: this.props.name,
        value: this.props.value,
        checked: this.props.checked,
        defaultChecked: this.props.defaultChecked,
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

          if (charCode === _keyCode2.default.SPACE && _this2.props.checked && _this2.props.deselectable) {
            _this2.handleChange(event, true);
          } else if (charCode === _keyCode2.default.ENTER && _this2.props.checked && _this2.props.deselectable || !_this2.props.checked) {
            _this2.handleChange(event);
          }
        },
        "aria-describedby": this.props['aria-describedby'],
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
}(_react2.default.Component);

Radio.displayName = _constants.RADIO;
Radio.propTypes = propTypes;
Radio.defaultProps = defaultProps;
exports.default = Radio;