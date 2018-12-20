"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _yearPicklist = require("./year-picklist");

var _yearPicklist2 = _interopRequireDefault(_yearPicklist);

var _button = require("../../button");

var _button2 = _interopRequireDefault(_button);

var _date = require("../../../utilities/date");

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var DatepickerMonthNavigation =
/*#__PURE__*/
function (_React$Component) {
  _inherits(DatepickerMonthNavigation, _React$Component);

  function DatepickerMonthNavigation() {
    var _ref;

    var _temp, _this;

    _classCallCheck(this, DatepickerMonthNavigation);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_ref = DatepickerMonthNavigation.__proto__ || Object.getPrototypeOf(DatepickerMonthNavigation)).call.apply(_ref, [this].concat(args))), Object.defineProperty(_assertThisInitialized(_this), "getMonthLabel", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        return _this.props.monthLabels[new Date(_this.props.initialDateForCalendarRender).getMonth()];
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "getYearLabel", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        return new Date(_this.props.initialDateForCalendarRender).getFullYear();
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleClick", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(event) {
        event.preventDefault();
        event.stopPropagation();
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "handleYearSelect", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value(initialDateForCalendarRender) {
        _this.props.onChangeMonth(undefined, initialDateForCalendarRender);
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "previousMonthClicked", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.props.onChangeMonth(undefined, _date2.default.addMonths(_this.props.initialDateForCalendarRender, -1));
      }
    }), Object.defineProperty(_assertThisInitialized(_this), "nextMonthClicked", {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function value() {
        _this.props.onChangeMonth(undefined, _date2.default.addMonths(_this.props.initialDateForCalendarRender, 1));
      }
    }), _temp));
  }

  _createClass(DatepickerMonthNavigation, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement("div", {
        className: "slds-datepicker__filter slds-grid"
      }, _react2.default.createElement("div", {
        className: "slds-datepicker__filter_month slds-grid slds-grid_align-spread slds-grow",
        style: {
          flex: 1.75
        }
      }, _react2.default.createElement("div", {
        className: "slds-align-middle"
      }, _react2.default.createElement(_button2.default, {
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
      })), _react2.default.createElement("h2", {
        id: "".concat(this.props.id, "-month"),
        className: "slds-align-middle",
        "aria-live": "assertive",
        "aria-atomic": true
      }, this.getMonthLabel(), ' ', _react2.default.createElement("span", {
        className: "slds-assistive-text"
      }, this.getYearLabel())), _react2.default.createElement("div", {
        className: "slds-align-middle"
      }, _react2.default.createElement(_button2.default, {
        assistiveText: {
          icon: this.props.assistiveTextNextMonth
        },
        iconCategory: "utility",
        iconName: "right",
        iconVariant: "container",
        onClick: this.nextMonthClicked,
        variant: "icon",
        type: "button"
      }))), _react2.default.createElement(_yearPicklist2.default, {
        id: this.props.id,
        initialDateForCalendarRender: this.props.initialDateForCalendarRender,
        onChangeMonth: this.handleYearSelect,
        relativeYearFrom: this.props.relativeYearFrom,
        relativeYearTo: this.props.relativeYearTo
      }));
    }
  }]);

  return DatepickerMonthNavigation;
}(_react2.default.Component);

Object.defineProperty(DatepickerMonthNavigation, "displayName", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: 'SLDSDatepickerMonthNavigation'
});
Object.defineProperty(DatepickerMonthNavigation, "propTypes", {
  configurable: true,
  enumerable: true,
  writable: true,
  value: {
    /**
     * Label for button to go to the next month
     */
    assistiveTextNextMonth: _propTypes2.default.string.isRequired,

    /**
     * Label for button to go to the previous month
     */
    assistiveTextPreviousMonth: _propTypes2.default.string.isRequired,

    /**
     * HTML id for component
     */
    id: _propTypes2.default.string,

    /**
     * Date used to create calendar that is displayed. This is typically the initial day focused when using the keyboard navigation. Focus will be set to this date if available.
     */
    initialDateForCalendarRender: _propTypes2.default.instanceOf(Date).isRequired,

    /**
     * Displayed calendar has changed or re-rendered
     */
    onChangeMonth: _propTypes2.default.func.isRequired,

    /**
     * Names of the months
     */
    monthLabels: _propTypes2.default.array.isRequired,

    /**
     * For keyboard navigation. In order to trap focus within the dialog, the first DOM node with a tab index should be listened to.
     */
    onPreviousMonthKeyDown: _propTypes2.default.func,

    /**
     * Callback that passes in the DOM reference of the `<button>` DOM node within this component. Primary use is to allow `focus` to be called. You should still test if the node exists, since rendering is asynchronous.
     */
    previousMonthRef: _propTypes2.default.func.isRequired,

    /**
     * Offset of year from current year that can be selected in the year selection dropdown. (2017 - 5 = 2012).
     */
    relativeYearFrom: _propTypes2.default.number,

    /**
     * Offset of year from current year that can be selected in the year selection dropdown. (2017 + 5 = 2012).
     */
    relativeYearTo: _propTypes2.default.number
  }
});
exports.default = DatepickerMonthNavigation;