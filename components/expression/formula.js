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

var _reactContenteditable = _interopRequireDefault(require("react-contenteditable"));

var _shortid = _interopRequireDefault(require("shortid"));

var _constants = require("../../utilities/constants");

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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var propTypes = {
  /**
   *  **Assistive text for accessibility.**
   * * `help`: Assistive text for help icon
   */
  assistiveText: _propTypes.default.shape({
    help: _propTypes.default.string
  }),

  /**
   * HTML id for component.
   */
  id: _propTypes.default.string,

  /**
   * CSS classes to be added to the element with class `.slds-form-element`. Uses `classNames` [API](https://github.com/JedWatson/classnames).
   */
  className: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.object, _propTypes.default.string]),

  /**
   * Callbacks for various expression formula events such as text editor change, check syntax etc
   */
  events: _propTypes.default.shape({
    onChangeTextEditor: _propTypes.default.func,
    onClickHelp: _propTypes.default.func,
    onClickCheckSyntax: _propTypes.default.func
  }),

  /**
   * **Text labels for internationalization**
   * This object is merged with the default props object on every render.
   * * `label`: Label for the Expression Formula group.Defaults to "Formula"
   * * `checkSyntax`: Label for the Check Syntax Button. Defaults to "Check Syntax"
   * * `textArea`: Label for the `triggerType` selector. Defaults to "Take Action When"
   */
  labels: _propTypes.default.shape({
    label: _propTypes.default.string,
    checkSyntax: _propTypes.default.string,
    textArea: _propTypes.default.string
  }),

  /**
   *  Accepts a single combobox component, to select resource in the expression formula editor
   */
  resourceCombobox: _propTypes.default.node,

  /**
   *  Accepts a single combobox component, to select function in the expression formula editor
   */
  functionCombobox: _propTypes.default.node,

  /**
   *  Accepts a single input component, to enter operator in the expression formula editor
   */
  operatorInput: _propTypes.default.node,

  /**
   *  Value for the text editor in expression formula editor
   */
  textEditorValue: _propTypes.default.node
};
var defaultProps = {
  assistiveText: {
    help: 'Help'
  },
  labels: {
    label: 'Formula',
    checkSyntax: 'Check Syntax',
    textArea: 'Text Area'
  }
};
/**
 * Expression Formula Component
 */

var ExpressionFormula = /*#__PURE__*/function (_React$Component) {
  _inherits(ExpressionFormula, _React$Component);

  var _super = _createSuper(ExpressionFormula);

  function ExpressionFormula() {
    var _this;

    _classCallCheck(this, ExpressionFormula);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "handleTextEditorChange", function (event) {
      var textEditorValue = event.target.value;

      if (_this.props.textEditorValue === undefined) {
        _this.setState({
          textEditorValue: textEditorValue
        });
      }

      if (_this.props.events && _this.props.events.onChangeTextEditor) {
        _this.props.events.onChangeTextEditor(event, {
          textEditorValue: textEditorValue
        });
      }
    });

    _this.textEditorRef = /*#__PURE__*/_react.default.createRef();
    _this.state = {
      textEditorValue: 'Compose formula...' // default is set here to preserve functionality if not controlled by props.textEditorValue

    };
    _this.generatedId = _shortid.default.generate();
    return _this;
  }
  /**
   * Get the Expression Condition's HTML id. Generate a new one if no ID present.
   */


  _createClass(ExpressionFormula, [{
    key: "getId",
    value: function getId() {
      return this.props.id || this.generatedId;
    }
  }, {
    key: "render",
    value: function render() {
      var assistiveText = (0, _lodash.default)({}, defaultProps.assistiveText, this.props.assistiveText);
      var labels = (0, _lodash.default)({}, defaultProps.labels, this.props.labels);
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
        id: this.getId(),
        className: (0, _classnames.default)("slds-expression_formula__rte", this.props.className)
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-form-element"
      }, /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-form-element__label"
      }, labels.label), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-form-element__control"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-rich-text-editor slds-grid slds-grid_vertical slds-nowrap"
      }, /*#__PURE__*/_react.default.createElement("div", {
        role: "toolbar",
        className: "slds-rich-text-editor__toolbar slds-shrink-none"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-rich-text-editor__col slds-rich-text-editor__col_grow"
      }, this.props.resourceCombobox), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-rich-text-editor__col slds-rich-text-editor__col_grow"
      }, this.props.functionCombobox), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-rich-text-editor__col slds-rich-text-editor__col_grow"
      }, this.props.operatorInput), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-rich-text-editor__col"
      }, /*#__PURE__*/_react.default.createElement(_button.default, {
        assistiveText: {
          icon: assistiveText.help
        },
        className: "slds-button_icon-container",
        id: "".concat(this.getId(), "-help-button"),
        variant: "icon",
        iconCategory: "utility",
        iconName: "help",
        onClick: this.props.events.onClickHelp,
        title: assistiveText.help
      }))), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-rich-text-editor__textarea slds-grid"
      }, /*#__PURE__*/_react.default.createElement(_reactContenteditable.default, {
        id: "".concat(this.getId(), "-content-editor"),
        "aria-label": this.props.labels.textArea,
        className: "slds-rich-text-area__content slds-text-color_weak slds-grow",
        innerRef: this.textEditorRef,
        html: this.props.textEditorValue !== undefined ? this.props.textEditorValue : this.state.textEditorValue,
        onChange: this.handleTextEditorChange,
        disabled: false
      })))))), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-m-top_small"
      }, /*#__PURE__*/_react.default.createElement(_button.default, {
        id: "".concat(this.getId(), "-check-syntax-button"),
        variant: "neutral",
        label: labels.checkSyntax,
        onClick: this.props.events.onClickCheckSyntax
      })));
    }
  }]);

  return ExpressionFormula;
}(_react.default.Component);

ExpressionFormula.displayName = _constants.EXPRESSION_FORMULA;
ExpressionFormula.propTypes = propTypes;
ExpressionFormula.defaultProps = defaultProps;
var _default = ExpressionFormula;
exports.default = _default;