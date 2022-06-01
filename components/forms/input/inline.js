"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _lodash = _interopRequireDefault(require("lodash.isfunction"));

var _button = _interopRequireDefault(require("../../button"));

var _index = _interopRequireDefault(require("../../input/index"));

var _inputIcon = _interopRequireDefault(require("../../icon/input-icon"));

var _keyCode = _interopRequireDefault(require("../../../utilities/key-code"));

var _inlineCheckProps = _interopRequireDefault(require("./inline-check-props"));

var _constants = require("../../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

// ### Prop Types
var propTypes = {
  /**
   * Class names to be added to the outer container of the input.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Name of the submitted form parameter.
   */
  name: _propTypes.default.string,

  /**
   * Disables the Inline Edit component and prevents editing the contents.
   */
  disabled: _propTypes.default.bool,

  /**
   * Every Inline Edit component must have a unique ID in order to support keyboard navigation and ARIA support.
   */
  id: _propTypes.default.string.isRequired,

  /**
   * This event fires when the input changes.
   */
  onChange: _propTypes.default.func,

  /**
   * Function will run when keyup during text edit
   */
  onKeyUp: _propTypes.default.func,

  /**
   * Function will run when we enter edit mode
   */
  onEnterEditMode: _propTypes.default.func,

  /**
   * Function will run when we leave edit mode
   */
  onLeaveEditMode: _propTypes.default.func,

  /**
   * Typically an Inline Edit component will be of the type text, but like the Input element it includes support for all HTML5 types.
   */
  type: _propTypes.default.oneOf(['text', 'password', 'datetime', 'datetime-local', 'date', 'month', 'time', 'week', 'number', 'email', 'url', 'search', 'tel', 'color']),

  /**
   * Inline Edit is a controlled component, and will always display this value.
   */
  value: _propTypes.default.string.isRequired
};
var defaultProps = {
  assistiveText: 'Edit text',
  type: 'text'
};
/**
 * An inline input is rendered as a label by default. When clicked (or tabbed in), it's rendered as an input. When the focus is lost, the current input value is saved and the input is rendered as a label again.
 */

var InlineEdit = /*#__PURE__*/function (_React$Component) {
  _inherits(InlineEdit, _React$Component);

  var _super = _createSuper(InlineEdit);

  function InlineEdit(props) {
    var _this;

    _classCallCheck(this, InlineEdit);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "endEditMode", function (option) {
      if (_this.willSave) {
        clearTimeout(_this.willSave); // eslint-disable-next-line fp/no-delete

        delete _this.willSave;
      }

      _this.setState({
        isEditing: false,
        value: null
      });

      if (_this.props.onLeaveEditMode && (0, _lodash.default)(_this.props.onLeaveEditMode)) {
        _this.props.onLeaveEditMode(undefined, option);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleBlur", function () {
      if (!_this.willSave) {
        _this.willSave = setTimeout(_this.saveEdits, 200);
      }

      if (_this.props.onLeaveEditMode && (0, _lodash.default)(_this.props.onLeaveEditMode)) {
        _this.props.onLeaveEditMode();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (event) {
      _this.setState({
        value: event.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyDown", function (event) {
      if (event.keyCode) {
        if (event.keyCode === _keyCode.default.ESCAPE) {
          _this.saveEdits({
            cancel: true
          });
        } else if (event.keyCode === _keyCode.default.ENTER) {
          _this.saveEdits();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyUp", function (event) {
      if (event.keyCode) {
        if (_this.props.onKeyUp && (0, _lodash.default)(_this.props.onKeyUp)) {
          _this.props.onKeyUp(event, {
            value: _this.state.value
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "saveEdits", function (option) {
      if (!(option && option.cancel === true)) {
        if ((0, _lodash.default)(_this.props.onChange)) {
          _this.props.onChange({
            value: _this.state.value
          });
        }
      }

      _this.endEditMode(option);
    });

    _defineProperty(_assertThisInitialized(_this), "triggerEditMode", function () {
      if (!_this.props.disabled) {
        _this.autoFocus = true;

        _this.setState({
          isEditing: true,
          value: _this.props.value
        });

        if ((0, _lodash.default)(_this.props.onEnterEditMode)) {
          _this.props.onEnterEditMode();
        }
      }
    });

    _this.state = {
      isEditing: false,
      value: null
    };
    (0, _inlineCheckProps.default)(_constants.FORMS_INLINE_EDIT, props);
    return _this;
  }

  _createClass(InlineEdit, [{
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
    value: // ### Render
    function render() {
      var _this2 = this;

      var _this$props = this.props,
          assistiveText = _this$props.assistiveText,
          disabled = _this$props.disabled,
          value = _this$props.value,
          name = _this$props.name,
          rest = _objectWithoutProperties(_this$props, ["assistiveText", "disabled", "value", "name"]);

      return /*#__PURE__*/_react.default.createElement(_index.default, _extends({}, rest, {
        iconRight: this.state.isEditing ? /*#__PURE__*/_react.default.createElement(_inputIcon.default, {
          category: "utility",
          name: "close",
          position: "right",
          onClick: this.endEditMode,
          tabIndex: "-1"
        }) : null,
        disabled: disabled,
        inlineEditTrigger: /*#__PURE__*/_react.default.createElement(_button.default, {
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
}(_react.default.Component);

InlineEdit.displayName = _constants.FORMS_INLINE_EDIT;
InlineEdit.propTypes = propTypes;
InlineEdit.defaultProps = defaultProps;
var _default = InlineEdit;
exports.default = _default;