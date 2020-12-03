/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

import EventUtil from '../../../utilities/event';
import DateUtil from '../../../utilities/date';
import KEYS from '../../../utilities/key-code';

import { DIRECTIONS } from '../../utilities/UNSAFE_direction';
import LanguageDirection from '../../utilities/UNSAFE_direction/private/language-direction';

const handleClick = (event, { date, onSelectDate }) => {
	onSelectDate(event, { date });
};

const handleKeyDown = (
	event,
	{
		date,
		onCalendarBlur,
		onSelectDate,
		onKeyboardNavigateToPreviousDay,
		onKeyboardNavigateToNextDay,
		onKeyboardNavigateToPreviousWeek,
		onKeyboardNavigateToNextWeek,
		direction,
	}
) => {
	const keyDownCallbacks = {
		[KEYS.SPACE]: () => {
			onSelectDate(event, { date });
		},
		[KEYS.ENTER]: () => {
			onSelectDate(event, { date });
		},
		[KEYS.TAB]: () => {
			onCalendarBlur(event, { direction: 'next' });
		},
		[KEYS.LEFT]: () => {
			if (direction === DIRECTIONS.RTL) {
				onKeyboardNavigateToNextDay(event, { date });
			} else {
				onKeyboardNavigateToPreviousDay(event, { date });
			}
		},
		[KEYS.RIGHT]: () => {
			if (direction === DIRECTIONS.RTL) {
				onKeyboardNavigateToPreviousDay(event, { date });
			} else {
				onKeyboardNavigateToNextDay(event, { date });
			}
		},
		[KEYS.UP]: () => {
			onKeyboardNavigateToPreviousWeek(event, { date });
		},
		[KEYS.DOWN]: () => {
			onKeyboardNavigateToNextWeek(event, { date });
		},
	};

	const shiftKeyDownCallbacks = {
		[KEYS.TAB]: () => {
			onCalendarBlur(event, { direction: 'previous' });
		},
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
	const isCurrentMonth = DateUtil.isSameMonth(
		props.date,
		props.initialDateForCalendarRender
	);
	const isToday = DateUtil.isToday(props.date);
	const isSelectedDay = DateUtil.isSameDay(props.date, props.selectedDate);
	const isFirstDayOfMonth = DateUtil.isFirstDayOfMonth(props.date);
	const isDisabled = !isCurrentMonth || props.disabled;

	return (
		/* eslint-disable jsx-a11y/no-static-element-interactions */
		<td
			aria-disabled={isDisabled}
			aria-selected={isSelectedDay}
			className={classNames({
				'slds-is-today': isToday,
				'slds-disabled-text': isDisabled,
				'slds-is-selected': isSelectedDay,
			})}
			onClick={(event) => {
				handleClick(event, {
					date: props.date,
					onSelectDate: props.onSelectDate,
				});
			}}
			onKeyDown={(event) => {
				handleKeyDown(event, {
					...props,
				});
			}}
			ref={(component) => {
				if (isSelectedDay) {
					props.selectedDateRef(component);
				}

				if (
					props.calendarHasFocus &&
					DateUtil.isSameDay(props.focusedDate, props.date) &&
					isCurrentMonth
				) {
					props.onRequestInternalFocusDate(undefined, {
						date: props.date,
						ref: component,
					});
				}
			}}
			role="gridcell"
			tabIndex={
				!props.calendarHasFocus && isFirstDayOfMonth && isCurrentMonth ? 0 : -1
			}
		>
			{/* eslint-enable jsx-a11y/no-static-element-interactions */}
			<span className="slds-day">
				{isToday ? (
					<span className="slds-assistive-text">{`${props.todayLabel}: `}</span>
				) : null}
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
	 * If date is disabled
	 */
	disabled: PropTypes.bool,
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
	focusedDate: PropTypes.instanceOf(Date),
	onRequestInternalFocusDate: PropTypes.func,
};

export default LanguageDirection(DatepickerCalendarDay);
