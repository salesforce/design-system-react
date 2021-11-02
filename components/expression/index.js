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

var _group = _interopRequireDefault(require("./group"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
   * HTML id for component.
   */
  id: _propTypes.default.string,

  /**
   * `Expression` children, accepts `ExpressionCondition` & `ExpressionGroup`
   */
  children: _propTypes.default.node,

  /**
   * Callbacks for various expression events such as trigger change, add group etc
   */
  events: _propTypes.default.shape({
    onChangeTrigger: _propTypes.default.func,
    onAddGroup: _propTypes.default.func,
    onAddCondition: _propTypes.default.func,
    onChangeCustomLogicValue: _propTypes.default.func
  }),

  /**
   * **Text labels for internationalization**
   * This object is merged with the default props object on every render.
   * * `addCondition`: Label for the Add Condition Button. Defaults to "Add Condition"
   * * `addGroup`: Label for the Add Group Button. Defaults to "Add Group"
   * * `customLogic`: Label for the text box for inputting `customLogicValue`, if the `triggerType` is `custom`. Defaults to "Custom Logic"
   * * `takeAction`: Label for the `triggerType` selector. Defaults to "Take Action When"
   * * `title` : Title for the Expression. Defaults to "Conditions"
   * * `triggerAll`: Label for the `all` value within the trigger selector
   * * `triggerAlways`: Label for the `always` value within the trigger selector
   * * `triggerAny`: Label for the `any` value within the trigger selector
   * * `triggerCustom`: Label for the `custom` value within the trigger selector
   * * `triggerFormula`: Label for the `formula` value within the trigger selector
   */
  labels: _propTypes.default.shape({
    addCondition: _propTypes.default.string,
    addGroup: _propTypes.default.string,
    customLogic: _propTypes.default.string,
    takeAction: _propTypes.default.string,
    title: _propTypes.default.string,
    triggerAll: _propTypes.default.string,
    triggerAlways: _propTypes.default.string,
    triggerAny: _propTypes.default.string,
    triggerCustom: _propTypes.default.string,
    triggerFormula: _propTypes.default.string
  }),

  /**
   * CSS classes to be added to the element with class `.slds-expression`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Sets the trigger type for the expression.
   */
  triggerType: _propTypes.default.oneOf(['all', 'any', 'custom', 'always', 'formula']),

  /**
   * Sets the input for the custom logic value input box, shown if the `triggerType` is set to `custom`.
   */
  customLogicValue: _propTypes.default.string
};
var defaultProps = {
  labels: {
    title: 'Conditions'
  }
};
/**
 * Expression builders help users declaratively construct logical expressions.
 * These expressions can be used when querying for a filtered set of records,
 * creating rules to control when something executes, or any other conditional logic.
 */

var Expression = /*#__PURE__*/function (_React$Component) {
  _inherits(Expression, _React$Component);

  var _super = _createSuper(Expression);

  function Expression(props) {
    var _this;

    _classCallCheck(this, Expression);

    _this = _super.call(this, props);
    _this.generatedId = _shortid.default.generate();
    return _this;
  }
  /**
   * Get the Expression Group's HTML id. Generate a new one if no ID present.
   */


  _createClass(Expression, [{
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
  }, {
    key: "render",
    value: function render() {
      var labels = (0, _lodash.default)({}, defaultProps.labels, this.props.labels);
      return /*#__PURE__*/_react.default.createElement("div", {
        className: (0, _classnames.default)('slds-expression', this.props.className),
        id: this.getId()
      }, /*#__PURE__*/_react.default.createElement("h2", {
        className: "slds-expression__title"
      }, labels.title), /*#__PURE__*/_react.default.createElement(_group.default, {
        isRoot: true,
        id: "".concat(this.getId(), "-group"),
        events: this.props.events,
        labels: labels,
        customLogicValue: this.props.customLogicValue,
        triggerType: this.props.triggerType
      }, this.props.children));
    }
  }]);

  return Expression;
}(_react.default.Component);

Expression.displayName = _constants.EXPRESSION;
Expression.propTypes = propTypes;
Expression.defaultProps = defaultProps;
var _default = Expression;
exports.default = _default;