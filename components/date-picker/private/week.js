'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _day = require('./day');

var _day2 = _interopRequireDefault(_day);

var _date = require('../../../utilities/date');

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

var DatepickerWeek = function DatepickerWeek(props) {
	var days = [];
	var date = props.firstDayOfWeek;

	for (var i = 0; i < 7; i++) {
		days.push(_react2.default.createElement(_day2.default, {
			calendarHasFocus: props.calendarHasFocus,
			date: date,
			disabled: props.dateDisabled({ date: date }),
			focusedDate: props.focusedDate,
			initialDateForCalendarRender: props.initialDateForCalendarRender,
			key: date.toString(),
			onKeyboardNavigateToNextDay: props.onKeyboardNavigateToNextDay,
			onKeyboardNavigateToNextWeek: props.onKeyboardNavigateToNextWeek,
			onKeyboardNavigateToPreviousDay: props.onKeyboardNavigateToPreviousDay,
			onKeyboardNavigateToPreviousWeek: props.onKeyboardNavigateToPreviousWeek,
			onCalendarBlur: props.onCalendarBlur,
			onRequestClose: props.onRequestClose,
			onRequestInternalFocusDate: props.onRequestInternalFocusDate,
			onSelectDate: props.onSelectDate,
			selectedDate: props.selectedDate,
			selectedDateRef: props.selectedDateRef,
			todayLabel: props.todayLabel
		}));
		date = _date2.default.addDays(date, 1);
	}

	return _react2.default.createElement(
		'tr',
		{ className: 'week', key: days[0].toString() },
		days
	);
};

DatepickerWeek.propTypes = {
	/**
  * Date used to create calendar that is displayed. This is typically the initial day focused when using the keyboard navigation. Focus will be set to this date if available.
  */
	initialDateForCalendarRender: _propTypes2.default.instanceOf(Date).isRequired,
	/**
  * Is true if calendar day has focus.
  */
	calendarHasFocus: _propTypes2.default.bool.isRequired,
	/**
  * dateDisabled() takes a date as input argument, returns true if given date should be disabled, otherwise returns false.
  */
	dateDisabled: _propTypes2.default.func,
	/**
  * First day of week.
  */
	firstDayOfWeek: _propTypes2.default.instanceOf(Date).isRequired,
	/**
  * Date that has focus.
  */
	focusedDate: _propTypes2.default.instanceOf(Date).isRequired,
	/**
  * Triggered when the keyboard moves focus off the calendar.
  */
	onCalendarBlur: _propTypes2.default.func.isRequired,
	/**
  * For keyboard navigation. Changes the focus to the next day on the calendar. Triggered when right arrow button is pressed.
  */
	onKeyboardNavigateToNextDay: _propTypes2.default.func.isRequired,
	/**
  * For keyboard navigation. Changes the focus to the same day in the next week on the calendar. Triggered when down arrow button is pressed.
  */
	onKeyboardNavigateToNextWeek: _propTypes2.default.func.isRequired,
	/**
  * For keyboard navigation. Changes the focus to the previous day on the calendar. Triggered when left arrow button is pressed.
  */
	onKeyboardNavigateToPreviousDay: _propTypes2.default.func.isRequired,
	/**
  * For keyboard navigation. Changes the focus to the same day in the previous week on the calendar. Triggered when up arrow button is pressed.
  */
	onKeyboardNavigateToPreviousWeek: _propTypes2.default.func.isRequired,
	/**
  * Triggered when the calendar is cancelled.
  */
	onRequestClose: _propTypes2.default.func.isRequired,
	/**
  * Triggered when the user wants to focus on a new day witht he keyboard. It returns the keyboard event a data object with the shape: `{date: [Date object]}`. Keyboard event is ommited if a new month is rendered.  _Tested with Mocha framework._
  */
	onRequestInternalFocusDate: _propTypes2.default.func.isRequired,
	/**
  * Triggered when a date on the calendar is clicked.
  */
	onSelectDate: _propTypes2.default.func.isRequired,
	/**
  * Currently selected date. This should be present in the input field.
  */
	selectedDate: _propTypes2.default.instanceOf(Date).isRequired,
	/**
  * Component reference / DOM node for selected day.
  */
	selectedDateRef: _propTypes2.default.func.isRequired,
	/**
  * Label of shortcut to jump to today within the calendar. Also used for assistive text for the current day.
  */
	todayLabel: _propTypes2.default.string.isRequired
};

DatepickerWeek.displayName = 'SLDSDatepickerWeek';

exports.default = DatepickerWeek;