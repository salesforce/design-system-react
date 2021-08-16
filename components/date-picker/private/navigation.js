"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _yearPicklist = _interopRequireDefault(require("./year-picklist"));

var _button = _interopRequireDefault(require("../../button"));

var _date = _interopRequireDefault(require("../../../utilities/date"));

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

var DatepickerMonthNavigation = /*#__PURE__*/function (_React$Component) {
  _inherits(DatepickerMonthNavigation, _React$Component);

  var _super = _createSuper(DatepickerMonthNavigation);

  function DatepickerMonthNavigation() {
    var _this;

    _classCallCheck(this, DatepickerMonthNavigation);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "getMonthLabel", function () {
      return _this.props.monthLabels[new Date(_this.props.initialDateForCalendarRender).getMonth()];
    });

    _defineProperty(_assertThisInitialized(_this), "getYearLabel", function () {
      return new Date(_this.props.initialDateForCalendarRender).getFullYear();
    });

    _defineProperty(_assertThisInitialized(_this), "handleClick", function (event) {
      event.preventDefault();
      event.stopPropagation();
    });

    _defineProperty(_assertThisInitialized(_this), "handleYearSelect", function (initialDateForCalendarRender) {
      _this.props.onChangeMonth(undefined, initialDateForCalendarRender);
    });

    _defineProperty(_assertThisInitialized(_this), "previousMonthClicked", function () {
      _this.props.onChangeMonth(undefined, _date.default.addMonths(_this.props.initialDateForCalendarRender, -1));
    });

    _defineProperty(_assertThisInitialized(_this), "nextMonthClicked", function () {
      _this.props.onChangeMonth(undefined, _date.default.addMonths(_this.props.initialDateForCalendarRender, 1));
    });

    return _this;
  }

  _createClass(DatepickerMonthNavigation, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-datepicker__filter slds-grid"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-datepicker__filter_month slds-grid slds-grid_align-spread slds-grow",
        style: {
          flex: 1.75
        }
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-align-middle"
      }, /*#__PURE__*/_react.default.createElement(_button.default, {
        assistiveText: {
          icon: this.props.assistiveTextPreviousMonth
        },
        iconCategory: "utility",
        iconName: "left",
        iconVariant: "container",
        onKeyDown: this.props.onPreviousMonthKeyDown,
        onClick: this.previousMonthClicked,
        buttonRef: function buttonRef(component) {
          _this2.props.previousMonthRef(component);
        },
        variant: "icon",
        type: "button"
      })), /*#__PURE__*/_react.default.createElement("h2", {
        id: "".concat(this.props.id, "-month"),
        className: "slds-align-middle",
        "aria-live": "assertive",
        "aria-atomic": true
      }, this.getMonthLabel(), ' ', /*#__PURE__*/_react.default.createElement("span", {
        className: "slds-assistive-text"
      }, this.getYearLabel())), /*#__PURE__*/_react.default.createElement("div", {
        className: "slds-align-middle"
      }, /*#__PURE__*/_react.default.createElement(_button.default, {
        assistiveText: {
          icon: this.props.assistiveTextNextMonth
        },
        iconCategory: "utility",
        iconName: "right",
        iconVariant: "container",
        onClick: this.nextMonthClicked,
        variant: "icon",
        type: "button"
      }))), /*#__PURE__*/_react.default.createElement(_yearPicklist.default, {
        assistiveTextYear: this.props.assistiveTextYear,
        id: this.props.id,
        initialDateForCalendarRender: this.props.initialDateForCalendarRender,
        onChangeMonth: this.handleYearSelect,
        relativeYearFrom: this.props.relativeYearFrom,
        relativeYearTo: this.props.relativeYearTo
      }));
    }
  }]);

  return DatepickerMonthNavigation;
}(_react.default.Component);

_defineProperty(DatepickerMonthNavigation, "displayName", 'SLDSDatepickerMonthNavigation');

_defineProperty(DatepickerMonthNavigation, "propTypes", {
  /**
   * Label for button to go to the next month
   */
  assistiveTextNextMonth: _propTypes.default.string.isRequired,

  /**
   * Label for button to go to the previous month
   */
  assistiveTextPreviousMonth: _propTypes.default.string.isRequired,

  /**
   * Label for year picklist/combobox
   */
  assistiveTextYear: _propTypes.default.string.isRequired,

  /**
   * HTML id for component
   */
  id: _propTypes.default.string,

  /**
   * Date used to create calendar that is displayed. This is typically the initial day focused when using the keyboard navigation. Focus will be set to this date if available.
   */
  initialDateForCalendarRender: _propTypes.default.instanceOf(Date).isRequired,

  /**
   * Displayed calendar has changed or re-rendered
   */
  onChangeMonth: _propTypes.default.func.isRequired,

  /**
   * Names of the months
   */
  monthLabels: _propTypes.default.array.isRequired,

  /**
   * For keyboard navigation. In order to trap focus within the dialog, the first DOM node with a tab index should be listened to.
   */
  onPreviousMonthKeyDown: _propTypes.default.func,

  /**
   * Callback that passes in the DOM reference of the `<button>` DOM node within this component. Primary use is to allow `focus` to be called. You should still test if the node exists, since rendering is asynchronous.
   */
  previousMonthRef: _propTypes.default.func.isRequired,

  /**
   * Offset of year from current year that can be selected in the year selection dropdown. (2017 - 5 = 2012).
   */
  relativeYearFrom: _propTypes.default.number,

  /**
   * Offset of year from current year that can be selected in the year selection dropdown. (2017 + 5 = 2012).
   */
  relativeYearTo: _propTypes.default.number
});

var _default = DatepickerMonthNavigation;
exports.default = _default;