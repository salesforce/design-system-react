/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import { type ReactElement, type SyntheticEvent } from 'react';

import Day from './day';

import DateUtil from '../../../utilities/date';

export interface WeekProps {
	/** Date used to create calendar that is displayed */
	initialDateForCalendarRender: Date;
	/** Is true if calendar day has focus */
	calendarHasFocus?: boolean;
	/** Function to determine if a date should be disabled */
	dateDisabled?: (data: { date: Date }) => boolean;
	/** First day of week */
	firstDayOfWeek: Date;
	/** Date that has focus */
	focusedDate: Date;
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
	/** Called when calendar should close */
	onRequestClose?: (
		event?: SyntheticEvent,
		data?: Record<string, unknown>
	) => void;
	/** Called when a date is selected */
	onSelectDate: (event: SyntheticEvent, data: { date: Date }) => void;
	/** Currently selected date */
	selectedDate?: Date;
	/** Ref callback for selected date cell */
	selectedDateRef?: (ref: HTMLElement | null) => void;
	/** Label for today shortcut */
	todayLabel: string;
}

const DatepickerWeek = (props: WeekProps) => {
	const days: ReactElement[] = [];
	let date = props.firstDayOfWeek;

	for (let i = 0; i < 7; i += 1) {
		days.push(
			<Day
				calendarHasFocus={props.calendarHasFocus}
				date={date}
				disabled={props.dateDisabled?.({ date })}
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

DatepickerWeek.displayName = 'SLDSDatepickerWeek';

export default DatepickerWeek;
