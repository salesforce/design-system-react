/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type SyntheticEvent } from 'react';

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

export interface DayProps {
	/** If elements within the calendar have focus */
	calendarHasFocus?: boolean;
	/** Date of day */
	date: Date;
	/** If date is disabled */
	disabled?: boolean;
	/** Date used to create calendar that is displayed */
	initialDateForCalendarRender: Date;
	/** Date that has focus */
	focusedDate?: Date;
	/** Called when focus moves off calendar */
	onCalendarBlur: (event: SyntheticEvent, data: { direction: string }) => void;
	/** Called on next day keyboard navigation */
	onKeyboardNavigateToNextDay: (
		event: SyntheticEvent,
		data: { date: Date }
	) => void;
	/** Called on next week keyboard navigation */
	onKeyboardNavigateToNextWeek: (
		event: SyntheticEvent,
		data: { date: Date }
	) => void;
	/** Called on previous day keyboard navigation */
	onKeyboardNavigateToPreviousDay: (
		event: SyntheticEvent,
		data: { date: Date }
	) => void;
	/** Called on previous week keyboard navigation */
	onKeyboardNavigateToPreviousWeek: (
		event: SyntheticEvent,
		data: { date: Date }
	) => void;
	/** Called when internal focus date requested */
	onRequestInternalFocusDate?: (
		event: SyntheticEvent | undefined,
		data: { date: Date; ref?: HTMLElement | null; triggerCallback?: boolean }
	) => void;
	/** Called when a date is selected */
	onSelectDate: (event: SyntheticEvent, data: { date: Date }) => void;
	/** Currently selected date */
	selectedDate?: Date;
	/** Ref callback for selected date cell */
	selectedDateRef?: (ref: HTMLElement | null) => void;
	/** Label for today shortcut */
	todayLabel: string;
	/** Text direction */
	direction?: 'ltr' | 'rtl';
}

type DayHandlerProps = Pick<
	DayProps,
	| 'date'
	| 'onCalendarBlur'
	| 'onSelectDate'
	| 'onKeyboardNavigateToPreviousDay'
	| 'onKeyboardNavigateToNextDay'
	| 'onKeyboardNavigateToPreviousWeek'
	| 'onKeyboardNavigateToNextWeek'
	| 'direction'
>;

const handleClick = (
	event: SyntheticEvent,
	{ date, onSelectDate }: Pick<DayProps, 'date' | 'onSelectDate'>
) => {
	onSelectDate(event, { date });
};

const handleKeyDown = (
	event: React.KeyboardEvent,
	{
		date,
		onCalendarBlur,
		onSelectDate,
		onKeyboardNavigateToPreviousDay,
		onKeyboardNavigateToNextDay,
		onKeyboardNavigateToPreviousWeek,
		onKeyboardNavigateToNextWeek,
		direction,
	}: DayHandlerProps
) => {
	const keyDownCallbacks: Record<number, () => void> = {
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

	const shiftKeyDownCallbacks: Record<number, () => void> = {
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

const DatepickerCalendarDay = (props: DayProps) => {
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
					props.selectedDateRef?.(component);
				}

				if (
					props.calendarHasFocus &&
					DateUtil.isSameDay(props.focusedDate, props.date) &&
					isCurrentMonth
				) {
					props.onRequestInternalFocusDate?.(undefined, {
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

export default LanguageDirection(DatepickerCalendarDay);
