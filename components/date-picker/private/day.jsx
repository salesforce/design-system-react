/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React, { PropTypes } from 'react';

import EventUtil from '../../../utilities/EventUtil';
import DateUtil from '../../../utilities/DateUtil';
import KEYS from '../../../utilities/KEYS';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

const handleClick = (event, { date, onSelectDate }) => {
	onSelectDate(event, { date });
};

const handleKeyDown = (event, {
	date,
	onCalendarBlur,
	onSelectDate,
	onKeyboardNavigateToPreviousDay,
	onKeyboardNavigateToNextDay,
	onKeyboardNavigateToPreviousWeek,
	onKeyboardNavigateToNextWeek
}) => {
	const keyDownCallbacks = {
		[KEYS.SPACE]: () => { onSelectDate(event, { date }); },
		[KEYS.ENTER]: () => { onSelectDate(event, { date }); },
		[KEYS.TAB]: () => { onCalendarBlur(event, { direction: 'next' }); },
		[KEYS.LEFT]: () => { onKeyboardNavigateToPreviousDay(event, { date }); },
		[KEYS.RIGHT]: () => { onKeyboardNavigateToNextDay(event, { date }); },
		[KEYS.UP]: () => { onKeyboardNavigateToPreviousWeek(event, { date }); },
		[KEYS.DOWN]: () => { onKeyboardNavigateToNextWeek(event, { date }); }
	};

	const shiftKeyDownCallbacks = {
		[KEYS.TAB]: () => { onCalendarBlur(event, { direction: 'previous' }); }
	};

	if (event.keyCode) {
		if (event.shiftKey && keyDownCallbacks[event.keyCode]) {
			EventUtil.trapEvent(event);
			shiftKeyDownCallbacks[event.keyCode]();
		} else if (keyDownCallbacks[event.keyCode]) {
			EventUtil.trapEvent(event);
			keyDownCallbacks[event.keyCode]();
		}
	}
};

const DatepickerCalendarDay = (props) => {
	const isCurrentMonth = DateUtil.isSameMonth(props.date, props.initialDateForCalendarRender);
	const isToday = DateUtil.isToday(props.date);
	const isSelectedDay = DateUtil.isSameDay(props.date, props.selectedDate);
	const isFirstDayOfMonth = DateUtil.isFirstDayOfMonth(props.date);

	return (
		<td
			aria-disabled={!isCurrentMonth}
			aria-selected={isSelectedDay}
			className={classNames({
				'slds-is-today': isToday,
				'slds-disabled-text': !isCurrentMonth,
				'slds-is-selected': isSelectedDay
			})}
			onClick={(event) => {
				handleClick(event, { date: props.date, onSelectDate: props.onSelectDate });
			}}
			onKeyDown={(event) => {
				handleKeyDown(event, {
					...props
				});
			}}
			ref={(component) => {
				if (isSelectedDay) {
					props.selectedDateRef(component);
				}

				if (props.calendarHasFocus
					&& DateUtil.isSameDay(props.focusedDate, props.date)
					&& isCurrentMonth) {
					props.onRequestInternalFocusDate(undefined, { date: props.date, ref: component });
				}
			}}
			role="gridcell"
			tabIndex={!props.calendarHasFocus && isFirstDayOfMonth && isCurrentMonth ? 0 : -1}
		>
			<span className="slds-day">
				{isToday
					? <span className="slds-assistive-text">{props.todayLabel}: </span>
					: null}
				{props.date.getDate()}
			</span>
		</td>
	);
};

DatepickerCalendarDay.displayName = 'SLDSDatepickerCalendarDay';

DatepickerCalendarDay.propTypes = {
	/**
	 * If elements within the calendar have focus. This is helpful for keyboard event trapping.
	 */
	calendarHasFocus: PropTypes.bool.isRequired,
	/**
	 * Date of day
	 */
	date: PropTypes.instanceOf(Date).isRequired,
	/**
   * Date used to create calendar that is displayed. This is typically the initial day focused when using the keyboard navigation. Focus will be set to this date if available.
   */
	initialDateForCalendarRender: PropTypes.instanceOf(Date).isRequired,
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
	 * Triggered when the calendar is cancelled.
	 */
	onRequestClose: PropTypes.func.isRequired,
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
	todayLabel: PropTypes.string.isRequired
};

module.exports = DatepickerCalendarDay;
