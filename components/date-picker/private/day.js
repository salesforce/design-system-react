'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _EventUtil = require('../../../utilities/EventUtil');

var _EventUtil2 = _interopRequireDefault(_EventUtil);

var _DateUtil = require('../../../utilities/DateUtil');

var _DateUtil2 = _interopRequireDefault(_DateUtil);

var _KEYS = require('../../../utilities/KEYS');

var _KEYS2 = _interopRequireDefault(_KEYS);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; } /*
                                                                                                                                                                                                                  Copyright (c) 2015, salesforce.com, inc. All rights reserved.
                                                                                                                                                                                                                  Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
                                                                                                                                                                                                                  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
                                                                                                                                                                                                                  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
                                                                                                                                                                                                                  Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
                                                                                                                                                                                                                  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
                                                                                                                                                                                                                  */

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."


var handleClick = function handleClick(event, _ref) {
	var date = _ref.date;
	var onSelectDate = _ref.onSelectDate;

	onSelectDate(event, { date: date });
};

var handleKeyDown = function handleKeyDown(event, _ref2) {
	var _keyDownCallbacks;

	var date = _ref2.date;
	var onCalendarBlur = _ref2.onCalendarBlur;
	var onSelectDate = _ref2.onSelectDate;
	var onKeyboardNavigateToPreviousDay = _ref2.onKeyboardNavigateToPreviousDay;
	var onKeyboardNavigateToNextDay = _ref2.onKeyboardNavigateToNextDay;
	var onKeyboardNavigateToPreviousWeek = _ref2.onKeyboardNavigateToPreviousWeek;
	var onKeyboardNavigateToNextWeek = _ref2.onKeyboardNavigateToNextWeek;

	var keyDownCallbacks = (_keyDownCallbacks = {}, _defineProperty(_keyDownCallbacks, _KEYS2.default.SPACE, function () {
		onSelectDate(event, { date: date });
	}), _defineProperty(_keyDownCallbacks, _KEYS2.default.ENTER, function () {
		onSelectDate(event, { date: date });
	}), _defineProperty(_keyDownCallbacks, _KEYS2.default.TAB, function () {
		onCalendarBlur(event, { direction: 'next' });
	}), _defineProperty(_keyDownCallbacks, _KEYS2.default.LEFT, function () {
		onKeyboardNavigateToPreviousDay(event, { date: date });
	}), _defineProperty(_keyDownCallbacks, _KEYS2.default.RIGHT, function () {
		onKeyboardNavigateToNextDay(event, { date: date });
	}), _defineProperty(_keyDownCallbacks, _KEYS2.default.UP, function () {
		onKeyboardNavigateToPreviousWeek(event, { date: date });
	}), _defineProperty(_keyDownCallbacks, _KEYS2.default.DOWN, function () {
		onKeyboardNavigateToNextWeek(event, { date: date });
	}), _keyDownCallbacks);

	var shiftKeyDownCallbacks = _defineProperty({}, _KEYS2.default.TAB, function () {
		onCalendarBlur(event, { direction: 'previous' });
	});

	if (event.keyCode) {
		if (event.shiftKey && keyDownCallbacks[event.keyCode]) {
			_EventUtil2.default.trapEvent(event);
			shiftKeyDownCallbacks[event.keyCode]();
		} else if (keyDownCallbacks[event.keyCode]) {
			_EventUtil2.default.trapEvent(event);
			keyDownCallbacks[event.keyCode]();
		}
	}
};

var DatepickerCalendarDay = function DatepickerCalendarDay(props) {
	var isCurrentMonth = _DateUtil2.default.isSameMonth(props.date, props.initialDateForCalendarRender);
	var isToday = _DateUtil2.default.isToday(props.date);
	var isSelectedDay = _DateUtil2.default.isSameDay(props.date, props.selectedDate);
	var isFirstDayOfMonth = _DateUtil2.default.isFirstDayOfMonth(props.date);

	return _react2.default.createElement(
		'td',
		{
			'aria-disabled': !isCurrentMonth,
			'aria-selected': isSelectedDay,
			className: (0, _classnames2.default)({
				'slds-is-today': isToday,
				'slds-disabled-text': !isCurrentMonth,
				'slds-is-selected': isSelectedDay
			}),
			onClick: function onClick(event) {
				handleClick(event, { date: props.date, onSelectDate: props.onSelectDate });
			},
			onKeyDown: function onKeyDown(event) {
				handleKeyDown(event, _extends({}, props));
			},
			ref: function ref(component) {
				if (isSelectedDay) {
					props.selectedDateRef(component);
				}

				if (props.calendarHasFocus && _DateUtil2.default.isSameDay(props.focusedDate, props.date) && isCurrentMonth) {
					props.onRequestInternalFocusDate(undefined, { date: props.date, ref: component });
				}
			},
			role: 'gridcell',
			tabIndex: !props.calendarHasFocus && isFirstDayOfMonth && isCurrentMonth ? 0 : -1
		},
		_react2.default.createElement(
			'span',
			{ className: 'slds-day' },
			isToday ? _react2.default.createElement(
				'span',
				{ className: 'slds-assistive-text' },
				props.todayLabel,
				': '
			) : null,
			props.date.getDate()
		)
	);
};

DatepickerCalendarDay.displayName = 'SLDSDatepickerCalendarDay';

DatepickerCalendarDay.propTypes = {
	/**
  * If elements within the calendar have focus. This is helpful for keyboard event trapping.
  */
	calendarHasFocus: _react.PropTypes.bool.isRequired,
	/**
  * Date of day
  */
	date: _react.PropTypes.instanceOf(Date).isRequired,
	/**
   * Date used to create calendar that is displayed. This is typically the initial day focused when using the keyboard navigation. Focus will be set to this date if available.
   */
	initialDateForCalendarRender: _react.PropTypes.instanceOf(Date).isRequired,
	/**
  * Triggered when the keyboard moves focus off the calendar.
  */
	onCalendarBlur: _react.PropTypes.func.isRequired,
	/**
  * For keyboard navigation. Changes the focus to the next day on the calendar. Triggered when right arrow button is pressed.
  */
	onKeyboardNavigateToNextDay: _react.PropTypes.func.isRequired,
	/**
  * For keyboard navigation. Changes the focus to the same day in the next week on the calendar. Triggered when down arrow button is pressed.
  */
	onKeyboardNavigateToNextWeek: _react.PropTypes.func.isRequired,
	/**
  * For keyboard navigation. Changes the focus to the previous day on the calendar. Triggered when left arrow button is pressed.
  */
	onKeyboardNavigateToPreviousDay: _react.PropTypes.func.isRequired,
	/**
  * For keyboard navigation. Changes the focus to the same day in the previous week on the calendar. Triggered when up arrow button is pressed.
  */
	onKeyboardNavigateToPreviousWeek: _react.PropTypes.func.isRequired,
	/**
  * Triggered when the calendar is cancelled.
  */
	onRequestClose: _react.PropTypes.func.isRequired,
	/**
  * Triggered when a date on the calendar is clicked.
  */
	onSelectDate: _react.PropTypes.func.isRequired,
	/**
  * Currently selected date. This should be present in the input field.
  */
	selectedDate: _react.PropTypes.instanceOf(Date).isRequired,
	/**
  * Component reference / DOM node for selected day.
  */
	selectedDateRef: _react.PropTypes.func.isRequired,
	/**
  * Label of shortcut to jump to today within the calendar. Also used for assistive text for the current day.
  */
	todayLabel: _react.PropTypes.string.isRequired
};

module.exports = DatepickerCalendarDay;