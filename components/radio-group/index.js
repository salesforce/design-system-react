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

var _lodash = _interopRequireDefault(require("lodash.assign"));

var _constants = require("../../utilities/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var propTypes = {
  /**
   * **Assistive text for accessibility**
   * * `label`: This label appears in the legend.
   * * `required`: Text to help identify the group as required
   */
  assistiveText: _propTypes.default.shape({
    label: _propTypes.default.string,
    required: _propTypes.default.string
  }),

  /**
   * Children are expected to be Radio components.
   */
  children: _propTypes.default.node.isRequired,

  /**
   * Custom CSS classes added to the node.
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * **Text labels for internationalization**
   * This object is merged with the default props object on every render.
   * * `error`: Message to display when any of Checkboxes are in an error state.
   * * `label`: This label appears above the radio group.
   */
  labels: _propTypes.default.shape({
    error: _propTypes.default.string,
    label: _propTypes.default.string
  }),

  /**
   * This event fires when the radio selection changes.
   */
  onChange: _propTypes.default.func,

  /**
   * Disable all radio inputs.
   */
  disabled: _propTypes.default.bool,

  /**
   * Adds an indicator that this field is required.
   */
  required: _propTypes.default.bool,

  /**
   * The name of this radio group.
   */
  name: _propTypes.default.string,

  /**
   * The ID of the error message, for linking to radio inputs with aria-describedby.
   */
  errorId: _propTypes.default.string,

  /**
   * Variants of radio groups such as Radio Button Group
   */
  variant: _propTypes.default.oneOf(['base', 'button-group'])
};
var defaultProps = {
  assistiveText: {
    required: 'Required'
  },
  labels: {},
  variant: 'base'
};
/**
 * A styled select list that can have a single entry checked at any one time.
 * The RadioGroup component wraps [Radio](/components/radios) components, which should be used as children.
 */

var RadioGroup = /*#__PURE__*/function (_React$Component) {
  _inherits(RadioGroup, _React$Component);

  var _super = _createSuper(RadioGroup);

  function RadioGroup(props) {
    var _this;

    _classCallCheck(this, RadioGroup);

    _this = _super.call(this, props);
    _this.generatedName = _shortid.default.generate();
    _this.generatedErrorId = _shortid.default.generate();
    return _this;
  }

  _createClass(RadioGroup, [{
    key: "getErrorId",
    value: function getErrorId() {
      if (this.hasError()) {
        return this.props.errorId || this.generatedErrorId;
      }

      return undefined;
    }
  }, {
    key: "getName",
    value: function getName() {
      return this.props.name || this.generatedName;
    }
  }, {
    key: "hasError",
    value: function hasError() {
      return !!this.labels.error;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      // Merge objects of strings with their default object
      this.labels = this.props.labels ? (0, _lodash.default)({}, defaultProps.labels, this.props.labels) : defaultProps.labels;

      var assistiveText = _objectSpread(_objectSpread({}, defaultProps.assistiveText), this.props.assistiveText);

      var children = _react.default.Children.map(this.props.children, function (child) {
        return /*#__PURE__*/_react.default.cloneElement(child, {
          name: _this2.getName(),
          onChange: _this2.props.onChange,
          'aria-describedby': _this2.getErrorId(),
          disabled: _this2.props.disabled || child.props.disabled
        });
      });

      return /*#__PURE__*/_react.default.createElement("fieldset", {
        className: (0, _classnames.default)('slds-form-element', {
          'slds-has-error': this.labels.error
        })
      }, /*#__PURE__*/_react.default.createElement("legend", {
        className: (0, _classnames.default)('slds-form-element__legend', 'slds-form-element__label', assistiveText.label ? 'slds-assistive-text' : '')
      }, this.props.required ? /*#__PURE__*/_react.default.createElement("abbr", {
        className: "slds-required",
        title: "required"
      }, '*', /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-assistive-text"
      }, assistiveText.required, ' ')) : null, assistiveText.label ? assistiveText.label : this.labels.label), /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-form-element__control', this.props.className)
      }, this.props.variant === 'button-group' ? /*#__PURE__*/_react.default.createElement("div", {
        style: this.props.style,
        className: "slds-radio_button-group"
      }, children) : children, this.labels.error ? /*#__PURE__*/_react.default.createElement("div", {
        id: this.getErrorId(),
        className: "slds-form-element__help"
      }, this.labels.error) : null));
    }
  }]);

  return RadioGroup;
}(_react.default.Component);

RadioGroup.displayName = _constants.RADIO_GROUP;
RadioGroup.propTypes = propTypes;
RadioGroup.defaultProps = defaultProps;
var _default = RadioGroup;
exports.default = _default;