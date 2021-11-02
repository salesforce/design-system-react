/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

import Day from './day';

import DateUtil from '../../../utilities/date';

const DatepickerWeek = (props) => {
	const days = [];
	let date = props.firstDayOfWeek;

	// eslint-disable-next-line fp/no-loops
	for (let i = 0; i < 7; i += 1) {
		// eslint-disable-next-line fp/no-mutating-methods
		days.push(
			<Day
				calendarHasFocus={props.calendarHasFocus}
				date={date}
				disabled={props.dateDisabled({ date })}
				focusedDate={props.focusedDate}
				initialDateForCalendarRender={props.initialDateForCalendarRender}
				key={date.toString()}
				onKeyboardNavigateToNextDay={props.onKeyboardNavigateToNextDay}
				onKeyboardNavigateToNextWeek={props.onKeyboardNavigateToNextWeek}
				onKeyboardNavigateToPreviousDay={props.onKeyboardNavigateToPreviousDay}
				onKeyboardNavigateToPreviousWeek={
					props.onKeyboardNavigateToPreviousWeek
				}
				onCalendarBlur={props.onCalendarBlur}
				onRequestInternalFocusDate={props.onRequestInternalFocusDate}
				onSelectDate={props.onSelectDate}
				selectedDate={props.selectedDate}
				selectedDateRef={props.selectedDateRef}
				todayLabel={props.todayLabel}
			/>
		);
		date = DateUtil.addDays(date, 1);
	}

	return (
		<tr className="week" key={days[0].toString()}>
			{days}
		</tr>
	);
};

DatepickerWeek.propTypes = {
	/**
	 * Date used to create calendar that is displayed. This is typically the initial day focused when using the keyboard navigation. Focus will be set to this date if available.
	 */
	initialDateForCalendarRender: PropTypes.instanceOf(Date).isRequired,
	/**
	 * Is true if calendar day has focus.
	 */
	calendarHasFocus: PropTypes.bool.isRequired,
	/**
	 * dateDisabled() takes a date as input argument, returns true if given date should be disabled, otherwise returns false.
	 */
	dateDisabled: PropTypes.func,
	/**
	 * First day of week.
	 */
	firstDayOfWeek: PropTypes.instanceOf(Date).isRequired,
	/**
	 * Date that has focus.
	 */
	focusedDate: PropTypes.instanceOf(Date).isRequired,
	/**
	 * Triggered when the keyboard moves focus off the calendar.
	 */
	onCalendarBlur: PropTypes.func.isRequired,
	/**
	 * For keyboard navigation. Changes the focus to the next day on the calendar. Triggered when right arrow button is pressed.
	 */
	onKeyboardNavigateToNextDay: PropTypes.func.isRequired,
	/**
	 * For keyboard navigation. Changes the focus to the same day in the next week on the calendar. Triggered when down arrow button is pressed.
	 */
	onKeyboardNavigateToNextWeek: PropTypes.func.isRequired,
	/**
	 * For keyboard navigation. Changes the focus to the previous day on the calendar. Triggered when left arrow button is pressed.
	 */
	onKeyboardNavigateToPreviousDay: PropTypes.func.isRequired,
	/**
	 * For keyboard navigation. Changes the focus to the same day in the previous week on the calendar. Triggered when up arrow button is pressed.
	 */
	onKeyboardNavigateToPreviousWeek: PropTypes.func.isRequired,
	/**
	 * Triggered when the user wants to focus on a new day witht he keyboard. It returns the keyboard event a data object with the shape: `{date: [Date object]}`. Keyboard event is ommited if a new month is rendered.  _Tested with Mocha framework._
	 */
	onRequestInternalFocusDate: PropTypes.func.isRequired,
	/**
	 * Triggered when a date on the calendar is clicked.
	 */
	onSelectDate: PropTypes.func.isRequired,
	/**
	 * Currently selected date. This should be present in the input field.
	 */
	selectedDate: PropTypes.instanceOf(Date).isRequired,
	/**
	 * Component reference / DOM node for selected day.
	 */
	selectedDateRef: PropTypes.func.isRequired,
	/**
	 * Label of shortcut to jump to today within the calendar. Also used for assistive text for the current day.
	 */
	todayLabel: PropTypes.string.isRequired,
};

DatepickerWeek.displayName = 'SLDSDatepickerWeek';

export default DatepickerWeek;
