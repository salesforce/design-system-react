"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require("lodash.isfunction");

var _lodash2 = _interopRequireDefault(_lodash);

var _button = require("../../button");

var _button2 = _interopRequireDefault(_button);

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

var _inputIcon = require("../../icon/input-icon");

var _inputIcon2 = _interopRequireDefault(_inputIcon);

var _keyCode = require("../../../utilities/key-code");

var _keyCode2 = _interopRequireDefault(_keyCode);

var _inlineCheckProps = require("./inline-check-props");

var _inlineCheckProps2 = _interopRequireDefault(_inlineCheckProps);

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

// ### Prop Types
var propTypes = {
  /**
   * Class names to be added to the outer container of the input.
   */
  className: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object, _propTypes2.default.string]),

  /**
   * Name of the submitted form parameter.
   */
  name: _propTypes2.default.string,

  /**
   * Disables the Inline Edit component and prevents editing the contents.
   */
  disabled: _propTypes2.default.bool,

  /**
   * Every Inline Edit component must have a unique ID in order to support keyboard navigation and ARIA support.
   */
  id: _propTypes2.default.string.isRequired,

  /**
   * This event fires when the input changes.
   */
  onChange: _propTypes2.default.func,

  /**
   * Function will run when keyup during text edit
   */
  onKeyUp: _propTypes2.default.func,

  /**
   * Function will run when we enter edit mode
   */
  onEnterEditMode: _propTypes2.default.func,

  /**
   * Function will run when we leave edit mode
   */
  onLeaveEditMode: _propTypes2.default.func,

  /**
   * Typically an Inline Edit component will be of the type text, but like the Input element it includes support for all HTML5 types.
   */
  type: _propTypes2.default.oneOf(['text', 'password', 'datetime', 'datetime-local', 'date', 'month', 'time', 'week', 'number', 'email', 'url', 'search', 'tel', 'color']),

  /**
   * Inline Edit is a controlled component, and will always display this value.
   */
  value: _propTypes2.default.string.isRequired
};
var defaultProps = {
  assistiveText: 'Edit text',
  type: 'text'
};
/**
 * An inline input is rendered as a label by default. When clicked (or tabbed in), it's rendered as an input. When the focus is lost, the current input value is saved and the input is rendered as a label again.
 */

var InlineEdit =
/*#__PURE__*/
function (_React$Component) {
  _inherits(InlineEdit, _React$Component);

  function InlineEdit(props) {
    var _this;

    _classCallCheck(this, InlineEdit);

    _this = _possibleConstructorReturn(this, (InlineEdit.__proto__ || Object.getPrototypeOf(InlineEdit)).call(this, props));
    Object.defineProperty(_assertThisInitialized(_this), "endEditMode", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(option) {
        if (_this.willSave) {
          clearTimeout(_this.willSave);
          delete _this.willSave;
        }

        _this.setState({
          isEditing: false,
          value: null
        });

        if (_this.props.onLeaveEditMode && (0, _lodash2.default)(_this.props.onLeaveEditMode)) {
          _this.props.onLeaveEditMode(undefined, option);
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "handleBlur", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        if (!_this.willSave) {
          _this.willSave = setTimeout(_this.saveEdits, 200);
        }

        if (_this.props.onLeaveEditMode && (0, _lodash2.default)(_this.props.onLeaveEditMode)) {
          _this.props.onLeaveEditMode();
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "handleChange", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        _this.setState({
          value: event.target.value
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "handleKeyDown", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        if (event.keyCode) {
          if (event.keyCode === _keyCode2.default.ESCAPE) {
            _this.saveEdits({
              cancel: true
            });
          } else if (event.keyCode === _keyCode2.default.ENTER) {
            _this.saveEdits();
          }
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "handleKeyUp", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        if (event.keyCode) {
          if (_this.props.onKeyUp && (0, _lodash2.default)(_this.props.onKeyUp)) {
            _this.props.onKeyUp(event, {
              value: _this.state.value
            });
          }
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "saveEdits", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(option) {
        if (!(option && option.cancel === true)) {
          if ((0, _lodash2.default)(_this.props.onChange)) {
            _this.props.onChange({
              value: _this.state.value
            });
          }
        }

        _this.endEditMode(option);
      }
    });
    Object.defineProperty(_assertThisInitialized(_this), "triggerEditMode", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        if (!_this.props.disabled) {
          _this.autoFocus = true;

          _this.setState({
            isEditing: true,
            value: _this.props.value
          });

          if ((0, _lodash2.default)(_this.props.onEnterEditMode)) {
            _this.props.onEnterEditMode();
          }
        }
      }
    });
    _this.state = {
      isEditing: false,
      value: null
    };
    return _this;
  }

  _createClass(InlineEdit, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      (0, _inlineCheckProps2.default)(_constants.FORMS_INLINE_EDIT, this.props);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.autoFocus) {
        if (this.inputNode) {
          this.inputNode.focus();
          this.inputNode.select();
        }

        this.autoFocus = false;
      }
    }
  }, {
    key: "render",
    // ### Render
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          assistiveText = _props.assistiveText,
          disabled = _props.disabled,
          value = _props.value,
          name = _props.name,
          rest = _objectWithoutProperties(_props, ["assistiveText", "disabled", "value", "name"]);

      return _react2.default.createElement(_index2.default, _extends({}, rest, {
        iconRight: this.state.isEditing ? _react2.default.createElement(_inputIcon2.default, {
          category: "utility",
          name: "close",
          position: "right",
          onClick: this.endEditMode,
          tabIndex: "-1"
        }) : null,
        disabled: disabled,
        inlineEditTrigger: _react2.default.createElement(_button2.default, {
          assistiveText: {
            icon: assistiveText
          },
          className: "slds-m-left_x-small",
          disabled: disabled,
          iconCategory: "utility",
          iconName: "edit",
          iconPosition: "right",
          iconSize: "small",
          variant: "icon"
        }),
        onBlur: this.handleBlur,
        onChange: this.handleChange,
        onClick: !this.state.isEditing ? this.triggerEditMode : null,
        onKeyDown: this.handleKeyDown,
        onKeyUp: this.handleKeyUp,
        isStatic: !this.state.isEditing,
        name: name,
        value: this.state.isEditing ? this.state.value : value,
        inputRef: function inputRef(input) {
          _this2.inputNode = input;
        }
      }));
    }
  }]);

  return InlineEdit;
}(_react2.default.Component);

InlineEdit.displayName = _constants.FORMS_INLINE_EDIT;
InlineEdit.propTypes = propTypes;
InlineEdit.defaultProps = defaultProps;
exports.default = InlineEdit;