"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _event = _interopRequireDefault(require("../../../utilities/event"));

var _date = _interopRequireDefault(require("../../../utilities/date"));

var _keyCode = _interopRequireDefault(require("../../../utilities/key-code"));

var _UNSAFE_direction = require("../../utilities/UNSAFE_direction");

var _languageDirection = _interopRequireDefault(require("../../utilities/UNSAFE_direction/private/language-direction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var handleClick = function handleClick(event, _ref) {
  var date = _ref.date,
      onSelectDate = _ref.onSelectDate;
  onSelectDate(event, {
    date: date
  });
};

var handleKeyDown = function handleKeyDown(event, _ref2) {
  var _keyDownCallbacks;

  var date = _ref2.date,
      onCalendarBlur = _ref2.onCalendarBlur,
      onSelectDate = _ref2.onSelectDate,
      onKeyboardNavigateToPreviousDay = _ref2.onKeyboardNavigateToPreviousDay,
      onKeyboardNavigateToNextDay = _ref2.onKeyboardNavigateToNextDay,
      onKeyboardNavigateToPreviousWeek = _ref2.onKeyboardNavigateToPreviousWeek,
      onKeyboardNavigateToNextWeek = _ref2.onKeyboardNavigateToNextWeek,
      direction = _ref2.direction;
  var keyDownCallbacks = (_keyDownCallbacks = {}, _defineProperty(_keyDownCallbacks, _keyCode.default.SPACE, function () {
    onSelectDate(event, {
      date: date
    });
  }), _defineProperty(_keyDownCallbacks, _keyCode.default.ENTER, function () {
    onSelectDate(event, {
      date: date
    });
  }), _defineProperty(_keyDownCallbacks, _keyCode.default.TAB, function () {
    onCalendarBlur(event, {
      direction: 'next'
    });
  }), _defineProperty(_keyDownCallbacks, _keyCode.default.LEFT, function () {
    if (direction === _UNSAFE_direction.DIRECTIONS.RTL) {
      onKeyboardNavigateToNextDay(event, {
        date: date
      });
    } else {
      onKeyboardNavigateToPreviousDay(event, {
        date: date
      });
    }
  }), _defineProperty(_keyDownCallbacks, _keyCode.default.RIGHT, function () {
    if (direction === _UNSAFE_direction.DIRECTIONS.RTL) {
      onKeyboardNavigateToPreviousDay(event, {
        date: date
      });
    } else {
      onKeyboardNavigateToNextDay(event, {
        date: date
      });
    }
  }), _defineProperty(_keyDownCallbacks, _keyCode.default.UP, function () {
    onKeyboardNavigateToPreviousWeek(event, {
      date: date
    });
  }), _defineProperty(_keyDownCallbacks, _keyCode.default.DOWN, function () {
    onKeyboardNavigateToNextWeek(event, {
      date: date
    });
  }), _keyDownCallbacks);

  var shiftKeyDownCallbacks = _defineProperty({}, _keyCode.default.TAB, function () {
    onCalendarBlur(event, {
      direction: 'previous'
    });
  });

  if (event.keyCode) {
    if (event.shiftKey && keyDownCallbacks[event.keyCode]) {
      _event.default.trapEvent(event);

      shiftKeyDownCallbacks[event.keyCode]();
    } else if (keyDownCallbacks[event.keyCode]) {
      _event.default.trapEvent(event);

      keyDownCallbacks[event.keyCode]();
    }
  }
};

var DatepickerCalendarDay = function DatepickerCalendarDay(props) {
  var isCurrentMonth = _date.default.isSameMonth(props.date, props.initialDateForCalendarRender);

  var isToday = _date.default.isToday(props.date);

  var isSelectedDay = _date.default.isSameDay(props.date, props.selectedDate);

  var isFirstDayOfMonth = _date.default.isFirstDayOfMonth(props.date);

  var isDisabled = !isCurrentMonth || props.disabled;
  return (
    /*#__PURE__*/

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    _react.default.createElement("td", {
      "aria-disabled": isDisabled,
      "aria-selected": isSelectedDay,
      className: (0, _classnames.default)({
        'slds-is-today': isToday,
        'slds-disabled-text': isDisabled,
        'slds-is-selected': isSelectedDay
      }),
      onClick: function onClick(event) {
        handleClick(event, {
          date: props.date,
          onSelectDate: props.onSelectDate
        });
      },
      onKeyDown: function onKeyDown(event) {
        handleKeyDown(event, _objectSpread({}, props));
      },
      ref: function ref(component) {
        if (isSelectedDay) {
          props.selectedDateRef(component);
        }

        if (props.calendarHasFocus && _date.default.isSameDay(props.focusedDate, props.date) && isCurrentMonth) {
          props.onRequestInternalFocusDate(undefined, {
            date: props.date,
            ref: component
          });
        }
      },
      role: "gridcell",
      tabIndex: !props.calendarHasFocus && isFirstDayOfMonth && isCurrentMonth ? 0 : -1
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "slds-day"
    }, isToday ? /*#__PURE__*/_react.default.createElement("span", {
      className: "slds-assistive-text"
    }, "".concat(props.todayLabel, ": ")) : null, props.date.getDate()))
  );
};

DatepickerCalendarDay.displayName = 'SLDSDatepickerCalendarDay';
DatepickerCalendarDay.propTypes = {
  /**
   * If elements within the calendar have focus. This is helpful for keyboard event trapping.
   */
  calendarHasFocus: _propTypes.default.bool.isRequired,

  /**
   * Date of day
   */
  date: _propTypes.default.instanceOf(Date).isRequired,

  /**
   * If date is disabled
   */
  disabled: _propTypes.default.bool,

  /**
   * Date used to create calendar that is displayed. This is typically the initial day focused when using the keyboard navigation. Focus will be set to this date if available.
   */
  initialDateForCalendarRender: _propTypes.default.instanceOf(Date).isRequired,

  /**
   * Triggered when the keyboard moves focus off the calendar.
   */
  onCalendarBlur: _propTypes.default.func.isRequired,

  /**
   * For keyboard navigation. Changes the focus to the next day on the calendar. Triggered when right arrow button is pressed.
   */
  onKeyboardNavigateToNextDay: _propTypes.default.func.isRequired,

  /**
   * For keyboard navigation. Changes the focus to the same day in the next week on the calendar. Triggered when down arrow button is pressed.
   */
  onKeyboardNavigateToNextWeek: _propTypes.default.func.isRequired,

  /**
   * For keyboard navigation. Changes the focus to the previous day on the calendar. Triggered when left arrow button is pressed.
   */
  onKeyboardNavigateToPreviousDay: _propTypes.default.func.isRequired,

  /**
   * For keyboard navigation. Changes the focus to the same day in the previous week on the calendar. Triggered when up arrow button is pressed.
   */
  onKeyboardNavigateToPreviousWeek: _propTypes.default.func.isRequired,

  /**
   * Triggered when a date on the calendar is clicked.
   */
  onSelectDate: _propTypes.default.func.isRequired,

  /**
   * Currently selected date. This should be present in the input field.
   */
  selectedDate: _propTypes.default.instanceOf(Date).isRequired,

  /**
   * Component reference / DOM node for selected day.
   */
  selectedDateRef: _propTypes.default.func.isRequired,

  /**
   * Label of shortcut to jump to today within the calendar. Also used for assistive text for the current day.
   */
  todayLabel: _propTypes.default.string.isRequired,
  focusedDate: _propTypes.default.instanceOf(Date),
  onRequestInternalFocusDate: _propTypes.default.func
};

var _default = (0, _languageDirection.default)(DatepickerCalendarDay);

exports.default = _default;