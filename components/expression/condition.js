"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _lodash = _interopRequireDefault(require("lodash.assign"));

var _shortid = _interopRequireDefault(require("shortid"));

var _constants = require("../../utilities/constants");

var _combobox = _interopRequireDefault(require("../combobox"));

var _input = _interopRequireDefault(require("../input"));

var _button = _interopRequireDefault(require("../button"));

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
   *  **Assistive text for accessibility.**
   * * `title`: For users of assistive technology, title for the condition fieldset. Defaults to 'Condition'
   * * `deleteIcon`: For users of assistive technology, assistive text for the Delete Condition button's icon. Defaults to 'Delete Condition'
   */
  assistiveText: _propTypes.default.shape({
    title: _propTypes.default.string,
    deleteIcon: _propTypes.default.string
  }),

  /**
   * HTML id for component.
   */
  id: _propTypes.default.string,

  /**
   * CSS classes to be added to the element with class `.slds-expression__row`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Callbacks for various expression condition events such as value change, delete etc
   */
  events: _propTypes.default.shape({
    onChangeResource: _propTypes.default.func,
    onChangeOperator: _propTypes.default.func,
    onChangeValue: _propTypes.default.func,
    onDelete: _propTypes.default.func
  }).isRequired,

  /**
   * If set to true, the component will focus on the first focusable input upon mounting. This is useful for accessibility when adding new conditions.
   */
  focusOnMount: _propTypes.default.bool,

  /**
   * **Text labels for internationalization**
   * This object is merged with the default props object on every
   * * `deleteCondition`: Title for the delete condition button. Defaults to "Delete Condition".
   * * `label`: Label for the condition, shown left-most in the row. Left empty on default.
   * * `operator`: Label for the operator selection dropdown. Defaults to "Operator"
   * * `resource`: Label for the resource selection dropdown. Defaults to "Resource"
   * * `value`: Label for the value input box. Defaults to "Value"
   */
  labels: _propTypes.default.shape({
    deleteCondition: _propTypes.default.string,
    label: _propTypes.default.string,
    operator: _propTypes.default.string,
    resource: _propTypes.default.string,
    value: _propTypes.default.string
  }),

  /**
   * Controls whether the condition is a sub-condition inside a ExpressionGroup
   */
  isSubCondition: _propTypes.default.bool,

  /**
   * **Array of item objects that are options in the resource selection dropdown menu.**
   * Each object can contain:
   * * `id`: A unique identifier string.
   * * `label`: A primary string of text for a menu item.
   * ```
   * {
   * 	id: '1',
   * 	label: 'Resource 1',
   * },
   * ```
   * Note: The dropdown uses the Combobox Component, and `resourcesList` is
   * passed as `options` props to it, and hence shall also support more
   * custom objects. Please refer to the Combobox documentation.
   */
  resourcesList: _propTypes.default.arrayOf(_propTypes.default.object),

  /**
   *  Accepts an object from the `resourcesList` which needs to be selected
   *  for the resource dropdown menu,
   */
  resourceSelected: _propTypes.default.object,

  /**
   * **Array of item objects that are options in the operator selection dropdown menu.**
   * Each object can contain:
   * * `id`: A unique identifier string.
   * * `label`: A primary string of text for a menu item.
   * ```
   * {
   * 	id: '1',
   * 	label: 'Operator 1',
   * },
   * ```
   * Note: The dropdown uses the Combobox Component, and `operatorList` is
   * passed as `options` props to it, and hence shall also support more
   * custom objects. Please refer to the Combobox documentation.
   */
  operatorsList: _propTypes.default.arrayOf(_propTypes.default.object),

  /**
   *  Accepts an object from the `operatorSelected` which needs to be selected
   *  for the operator dropdown menu,
   */
  operatorSelected: _propTypes.default.object,

  /**
   *  Sets the input value for the Value input field.
   */
  value: _propTypes.default.string
};
var defaultProps = {
  assistiveText: {
    title: 'Condition',
    deleteIcon: 'Delete Condition'
  },
  labels: {
    label: '',
    operator: 'Operator',
    resource: 'Resource',
    value: 'Value',
    deleteCondition: 'Delete Condition'
  },
  value: ''
};
/**
 * Expression Condition Component
 */

var ExpressionCondition = /*#__PURE__*/function (_React$Component) {
  _inherits(ExpressionCondition, _React$Component);

  var _super = _createSuper(ExpressionCondition);

  function ExpressionCondition(props) {
    var _this;

    _classCallCheck(this, ExpressionCondition);

    _this = _super.call(this, props);
    _this.generatedId = _shortid.default.generate();
    return _this;
  }

  _createClass(ExpressionCondition, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.focusOnMount && this.rootNode) {
        var input = this.rootNode.querySelector('input');

        if (input) {
          input.focus();
        }
      }
    }
    /**
     * Get the Expression Condition's HTML id. Generate a new one if no ID present.
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

      var assistiveText = (0, _lodash.default)({}, defaultProps.assistiveText, this.props.assistiveText);
      var labels = (0, _lodash.default)({}, defaultProps.labels, this.props.labels);
      return /*#__PURE__*/_react.default.createElement("li", {
        className: (0, _classnames.default)("slds-expression__row", {
          'slds-expression__row_group': this.props.isSubCondition
        }, this.props.className),
        id: this.getId(),
        ref: function ref(rootNode) {
          _this2.rootNode = rootNode;
        }
      }, /*#__PURE__*/_react.default.createElement("fieldset", null, /*#__PURE__*/_react.default.createElement("legend", {
        className: "slds-expression__legend"
      }, /*#__PURE__*/_react.default.createElement("span", null, labels.label), /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-assistive-text"
      }, assistiveText.title)), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-grid slds-gutters_xx-small"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-col"
      }, /*#__PURE__*/_react.default.createElement(_combobox.default, {
        events: {
          onSelect: this.props.events.onChangeResource
        },
        id: "".concat(this.getId(), "-resource-selector"),
        multiple: false,
        variant: "readonly",
        labels: {
          label: labels.resource
        },
        options: this.props.resourcesList,
        selection: [this.props.resourceSelected]
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-col slds-grow-none"
      }, /*#__PURE__*/_react.default.createElement(_combobox.default, {
        events: {
          onSelect: this.props.events.onChangeOperator
        },
        id: "".concat(this.getId(), "-operator-selector"),
        multiple: false,
        variant: "readonly",
        labels: {
          label: labels.operator
        },
        options: this.props.operatorsList,
        selection: [this.props.operatorSelected],
        singleInputDisabled: !this.props.resourceSelected
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-col"
      }, /*#__PURE__*/_react.default.createElement(_input.default, {
        id: "".concat(this.getId(), "-input"),
        label: labels.value,
        value: this.props.value,
        onChange: this.props.events.onChangeValue,
        disabled: !this.props.resourceSelected
      })), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-col slds-grow-none"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-form-element"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-form-element__label"
      }, "\xA0"), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-form-element__control"
      }, /*#__PURE__*/_react.default.createElement(_button.default, {
        id: "".concat(this.getId(), "-delete-button"),
        variant: "outline-brand",
        iconCategory: "utility",
        iconName: "delete",
        iconVariant: "border-filled",
        onClick: this.props.events.onDelete,
        assistiveText: {
          icon: assistiveText.deleteIcon
        },
        title: labels.deleteCondition
      })))))));
    }
  }]);

  return ExpressionCondition;
}(_react.default.Component);

ExpressionCondition.displayName = _constants.EXPRESSION_CONDITION;
ExpressionCondition.propTypes = propTypes;
ExpressionCondition.defaultProps = defaultProps;
var _default = ExpressionCondition;
exports.default = _default;