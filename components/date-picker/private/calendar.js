"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _week = _interopRequireDefault(require("./week"));

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

var DatepickerCalendar = /*#__PURE__*/function (_React$Component) {
  _inherits(DatepickerCalendar, _React$Component);

  var _super = _createSuper(DatepickerCalendar);

  function DatepickerCalendar() {
    var _this;

    _classCallCheck(this, DatepickerCalendar);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      focusedDate: _this.props.initialDateForCalendarRender,
      calendarHasFocus: true,
      todayFocus: false
    });

    _defineProperty(_assertThisInitialized(_this), "setCalendarRenderSeedDate", function (prevProps) {
      // Set prop that sets focus in child component once it is rendered. This occurs when the month DOM has changed. This will trigger a re-render, but no DOM change will occur, just a DOM focus.
      if (!_date.default.isEqual(_this.props.initialDateForCalendarRender, prevProps.initialDateForCalendarRender)) {
        _this.setState({
          focusedDate: _this.props.initialDateForCalendarRender
        });

        _this.props.onRequestInternalFocusDate(undefined, {
          date: _this.props.initialDateForCalendarRender,
          triggerCallback: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelectDate", function (event, _ref) {
      var date = _ref.date;

      if (!_this.props.dateDisabled({
        date: date
      })) {
        _this.setState({
          selected: date
        });

        _this.props.onSelectDate(event, {
          date: date
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleRequestClose", function (event) {
      if (_this.props.onRequestClose) {
        _this.props.onRequestClose(event, {});
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyboardNavigateToPreviousDay", function (event, _ref2) {
      var date = _ref2.date;

      var prevDate = _date.default.addDays(date, -1);

      if (!_date.default.isSameMonth(prevDate, date)) {
        _this.props.onChangeMonth(event, prevDate);
      } else {
        _this.setState({
          focusedDate: prevDate
        });

        _this.props.onRequestInternalFocusDate(event, {
          date: prevDate,
          triggerCallback: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyboardNavigateToNextDay", function (event, _ref3) {
      var date = _ref3.date;

      var nextDate = _date.default.addDays(date, 1);

      if (!_date.default.isSameMonth(nextDate, date)) {
        _this.props.onChangeMonth(event, nextDate);
      } else {
        _this.setState({
          focusedDate: nextDate
        });

        _this.props.onRequestInternalFocusDate(event, {
          date: nextDate,
          triggerCallback: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyboardNavigateToPreviousWeek", function (event, _ref4) {
      var date = _ref4.date;

      var prevDate = _date.default.addDays(date, -7);

      if (!_date.default.isSameMonth(prevDate, date)) {
        _this.props.onChangeMonth(event, prevDate);
      } else {
        _this.setState({
          focusedDate: prevDate
        });

        _this.props.onRequestInternalFocusDate(event, {
          date: prevDate,
          triggerCallback: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyboardNavigateToNextWeek", function (event, _ref5) {
      var date = _ref5.date;

      var nextDate = _date.default.addDays(date, 7);

      if (!_date.default.isSameMonth(nextDate, date)) {
        _this.props.onChangeMonth(event, nextDate);
      } else {
        _this.setState({
          focusedDate: nextDate
        });

        _this.props.onRequestInternalFocusDate(event, {
          date: nextDate,
          triggerCallback: true
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderWeeks", function () {
      var firstDayOfWeekOffset = _this.props.isIsoWeekday ? 1 : 0;

      var firstDayOfMonth = _date.default.firstDayOfMonth(_this.props.initialDateForCalendarRender);

      var firstDayOfWeek;

      if (firstDayOfMonth.getDay() > firstDayOfWeekOffset || firstDayOfMonth.getDay() < firstDayOfWeekOffset) {
        var prevWeek = _date.default.addWeeks(firstDayOfMonth, -1);

        firstDayOfWeek = _date.default.nearestWeekDay(prevWeek, firstDayOfWeekOffset);
      } else {
        firstDayOfWeek = firstDayOfMonth;
      }

      var weeks = [];
      var done = false;
      var monthIndex = firstDayOfWeek.getMonth();
      var count = 0; // eslint-disable-next-line fp/no-loops

      while (!done) {
        // eslint-disable-next-line fp/no-mutating-methods
        weeks.push( /*#__PURE__*/_react.default.createElement(_week.default, {
          calendarHasFocus: _this.state.calendarHasFocus,
          dateDisabled: _this.props.dateDisabled,
          firstDayOfWeek: firstDayOfWeek,
          key: firstDayOfWeek.toString(),
          focusedDate: _this.state.focusedDate,
          initialDateForCalendarRender: _this.props.initialDateForCalendarRender,
          onCalendarBlur: _this.props.onCalendarBlur,
          onKeyboardNavigateToPreviousDay: _this.handleKeyboardNavigateToPreviousDay,
          onKeyboardNavigateToNextDay: _this.handleKeyboardNavigateToNextDay,
          onKeyboardNavigateToPreviousWeek: _this.handleKeyboardNavigateToPreviousWeek,
          onKeyboardNavigateToNextWeek: _this.handleKeyboardNavigateToNextWeek,
          onRequestClose: _this.handleRequestClose,
          onRequestInternalFocusDate: _this.props.onRequestInternalFocusDate,
          onSelectDate: _this.handleSelectDate,
          selectedDate: _this.props.selectedDate,
          selectedDateRef: _this.props.selectedDateRef,
          todayLabel: _this.props.todayLabel
        })); // create new weeks

        firstDayOfWeek = _date.default.addWeeks(firstDayOfWeek, 1);
        done = count > 2 && monthIndex !== firstDayOfWeek.getMonth();
        count += 1;
        monthIndex = firstDayOfWeek.getMonth();
      }

      var extraWeeks = 0; // eslint-disable-next-line fp/no-loops

      while (weeks.length < 6) {
        extraWeeks += 1; // eslint-disable-next-line fp/no-mutating-methods

        weeks.push( /*#__PURE__*/_react.default.createElement("tr", {
          key: "extra_".concat(extraWeeks),
          className: "week"
        }, /*#__PURE__*/_react.default.createElement("td", {
          "aria-disabled": "true",
          "aria-selected": "false",
          className: "slds-disabled-text"
        }, /*#__PURE__*/_react.default.createElement("span", {
          className: "slds-day "
        }, "\xA0"))));
      }

      return weeks;
    });

    return _this;
  }

  _createClass(DatepickerCalendar, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this.setCalendarRenderSeedDate(prevProps);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var sunday = /*#__PURE__*/_react.default.createElement("th", null, /*#__PURE__*/_react.default.createElement("abbr", {
        title: this.props.weekDayLabels[0]
      }, this.props.abbreviatedWeekDayLabels[0]));

      return /*#__PURE__*/_react.default.createElement("div", {
        className: "calendar"
      }, /*#__PURE__*/_react.default.createElement("table", {
        className: "datepicker__month",
        role: "grid",
        "aria-labelledby": "".concat(this.props.id, "-month")
      }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", null, this.props.isIsoWeekday ? null : sunday, /*#__PURE__*/_react.default.createElement("th", {
        scope: "col"
      }, /*#__PURE__*/_react.default.createElement("abbr", {
        title: this.props.weekDayLabels[1]
      }, this.props.abbreviatedWeekDayLabels[1])), /*#__PURE__*/_react.default.createElement("th", {
        scope: "col"
      }, /*#__PURE__*/_react.default.createElement("abbr", {
        title: this.props.weekDayLabels[2]
      }, this.props.abbreviatedWeekDayLabels[2])), /*#__PURE__*/_react.default.createElement("th", {
        scope: "col"
      }, /*#__PURE__*/_react.default.createElement("abbr", {
        title: this.props.weekDayLabels[3]
      }, this.props.abbreviatedWeekDayLabels[3])), /*#__PURE__*/_react.default.createElement("th", {
        scope: "col"
      }, /*#__PURE__*/_react.default.createElement("abbr", {
        title: this.props.weekDayLabels[4]
      }, this.props.abbreviatedWeekDayLabels[4])), /*#__PURE__*/_react.default.createElement("th", {
        scope: "col"
      }, /*#__PURE__*/_react.default.createElement("abbr", {
        title: this.props.weekDayLabels[5]
      }, this.props.abbreviatedWeekDayLabels[5])), /*#__PURE__*/_react.default.createElement("th", {
        scope: "col"
      }, /*#__PURE__*/_react.default.createElement("abbr", {
        title: this.props.weekDayLabels[6]
      }, this.props.abbreviatedWeekDayLabels[6])), this.props.isIsoWeekday && sunday)), /*#__PURE__*/_react.default.createElement("tbody", null, this.renderWeeks(), /*#__PURE__*/_react.default.createElement("tr", null, /*#__PURE__*/_react.default.createElement("td", {
        colSpan: "7",
        role: "gridcell"
      }, /*#__PURE__*/_react.default.createElement("a", {
        href: "#",
        tabIndex: "0",
        className: "slds-show_inline-block slds-p-bottom_x-small",
        onClick: function onClick(event) {
          event.preventDefault();

          _this2.handleSelectDate(event, {
            date: new Date()
          });
        },
        onKeyDown: this.props.onLastFocusableNodeKeyDown,
        ref: this.props.todayRef
      }, this.props.todayLabel))))));
    }
  }]);

  return DatepickerCalendar;
}(_react.default.Component);

_defineProperty(DatepickerCalendar, "displayName", 'SLDSDatepickerCalendar');

_defineProperty(DatepickerCalendar, "propTypes", {
  /**
   * Three letter abbreviations of the days of the week, starting on Sunday.
   */
  abbreviatedWeekDayLabels: _propTypes.default.array.isRequired,

  /**
   * dateDisabled() takes a date as input argument, returns true if given date should be disabled, otherwise returns false.
   */
  dateDisabled: _propTypes.default.func,

  /**
   * HTML id for component
   */
  id: _propTypes.default.string.isRequired,

  /**
   * Date used to create calendar that is displayed. This is typically the initial day focused when using the keyboard navigation. Focus will be set to this date if available.
   */
  initialDateForCalendarRender: _propTypes.default.instanceOf(Date).isRequired,

  /**
   * Makes Monday the first day of the week
   */
  isIsoWeekday: _propTypes.default.bool,

  /**
   * Triggered when the keyboard moves focus off the calendar.
   */
  onCalendarBlur: _propTypes.default.func.isRequired,

  /**
   * Displayed calendar has changed or re-rendered
   */
  onChangeMonth: _propTypes.default.func.isRequired,

  /**
   * Internal callback that will eventually trigger when the keyboard moves focus on the calendar. `{date: [Date object], formattedDate: [string]}`.
   */
  onRequestInternalFocusDate: _propTypes.default.func,

  /**
   * Triggered when the calendar is cancelled.
   */
  onRequestClose: _propTypes.default.func.isRequired,

  /**
   * Triggered when a date on the calendar is clicked.
   */
  onSelectDate: _propTypes.default.func.isRequired,

  /**
   * Currently selected date. This should be present in the input field.
   */
  selectedDate: _propTypes.default.instanceOf(Date),

  /**
   * Component reference / DOM node for selected day.
   */
  selectedDateRef: _propTypes.default.func,

  /**
   * Label of shortcut to jump to today within the calendar. This is also used for assistive text on today's date.
   */
  todayLabel: _propTypes.default.string.isRequired,

  /**
   * For keyboard navigation. Listens for key presses on the last focusable DOM Node, the "Today" link, so that dialog focus can be trapped.
   */
  onLastFocusableNodeKeyDown: _propTypes.default.func,

  /**
   * Callback that passes in the DOM reference of the Today `a` DOM node within this component. Primary use is to allow `focus` to be called. You should still test if the node exists, since rendering is asynchronous. `buttonRef={(component) => { if(component) console.log(component); }}`
   */
  todayRef: _propTypes.default.func,

  /**
   * Names of the seven days of the week, starting on Sunday.
   */
  weekDayLabels: _propTypes.default.array.isRequired
});

var _default = DatepickerCalendar;
exports.default = _default;