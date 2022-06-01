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

var _component = _interopRequireDefault(require("./component.json"));

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
   * Accepts SetupAssistantStep components only as children.
   */
  children: _propTypes.default.node,

  /**
   * CSS classes to be added to tag with `.slds-progress-bar`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * HTML id for component.
   */
  id: _propTypes.default.string,

  /**
   * Dictates whether this setup assistant has card wrappings and styling
   */
  isCard: _propTypes.default.bool,

  /**
   * Function to handle opening / closing of steps when the step is expandable. Passes event object and step `index`, `isOpen`, and `step` props as data.
   */
  onStepToggleIsOpen: _propTypes.default.func,

  /**
   * Accepts a progress bar component, which will only be visible if `isCard` is enabled
   */
  progressBar: _propTypes.default.node
};
var defaultProps = {
  isCard: false
};
/**
 * Setup Assistant provides Administrators with a centralized list of tasks for
 * onboarding organizations, clouds, or features within the Salesforce Platform.
 */

var SetupAssistant = /*#__PURE__*/function (_React$Component) {
  _inherits(SetupAssistant, _React$Component);

  var _super = _createSuper(SetupAssistant);

  function SetupAssistant(props) {
    var _this;

    _classCallCheck(this, SetupAssistant);

    _this = _super.call(this, props);
    _this.generatedId = _shortid.default.generate();
    return _this;
  }

  _createClass(SetupAssistant, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      (0, _checkProps.default)(_constants.SETUP_ASSISTANT, this.props, _component.default);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      (0, _checkProps.default)(_constants.SETUP_ASSISTANT, this.props, _component.default);
    }
    /**
     * ID as a string
     * @returns {string} id
     */

  }, {
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var steps = /*#__PURE__*/_react.default.createElement("ol", {
        id: this.getId(),
        className: (0, _classnames.default)('slds-setup-assistant', this.props.className)
      }, _react.default.Children.map(this.props.children, function (child, i) {
        if (child.type.displayName !== _constants.SETUP_ASSISTANT_STEP) return null;
        return /*#__PURE__*/_react.default.cloneElement(child, _objectSpread({
          index: i,
          onToggleIsOpen: _this2.props.onStepToggleIsOpen,
          stepNumber: i + 1
        }, child.props));
      }));

      return this.props.isCard ? /*#__PURE__*/_react.default.createElement("section", {
        className: "slds-card"
      }, /*#__PURE__*/_react.default.createElement("header", {
        className: "slds-theme_shade slds-p-around_medium slds-m-bottom_small"
      }, this.props.progressBar), steps) : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, steps);
    }
  }]);

  return SetupAssistant;
}(_react.default.Component);

SetupAssistant.displayName = _constants.SETUP_ASSISTANT;
SetupAssistant.propTypes = propTypes;
SetupAssistant.defaultProps = defaultProps;
var _default = SetupAssistant;
exports.default = _default;