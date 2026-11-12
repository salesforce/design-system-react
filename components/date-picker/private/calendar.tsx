/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type ReactElement, type SyntheticEvent } from 'react';

import Week from './week';
import DateUtil from '../../../utilities/date';

export interface CalendarProps {
	/** Three letter abbreviations of the days of the week */
	abbreviatedWeekDayLabels: string[];
	/** Function to determine if a date should be disabled */
	dateDisabled?: (data: { date: Date }) => boolean;
	/** HTML id for component */
	id: string;
	/** Date used to create calendar that is displayed */
	initialDateForCalendarRender: Date;
	/** Makes Monday the first day of the week */
	isIsoWeekday?: boolean;
	/** Called when focus moves off calendar */
	onCalendarBlur: (event: SyntheticEvent, data: { direction: string }) => void;
	/** Called when month changes */
	onChangeMonth: (event: SyntheticEvent | undefined, date: Date) => void;
	/** Called when internal focus date requested */
	onRequestInternalFocusDate?: (
		event: SyntheticEvent | undefined,
		data: { date: Date; ref?: HTMLElement | null; triggerCallback?: boolean }
	) => void;
	/** Called when calendar should close */
	onRequestClose: (
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
	/** Called on last focusable node keydown */
	onLastFocusableNodeKeyDown?: (event: React.KeyboardEvent) => void;
	/** Ref callback for today link */
	todayRef?: (ref: HTMLAnchorElement | null) => void;
	/** Full names of the days of the week */
	weekDayLabels: string[];
}

interface CalendarState {
	focusedDate: Date;
	calendarHasFocus: boolean;
	todayFocus: boolean;
	selected?: Date;
}

class DatepickerCalendar extends React.Component<CalendarProps, CalendarState> {
	static displayName = 'SLDSDatepickerCalendar';

	state: CalendarState = {
		focusedDate: this.props.initialDateForCalendarRender,
		calendarHasFocus: true,
		todayFocus: false,
	};

	componentDidUpdate(prevProps: CalendarProps) {
		this.setCalendarRenderSeedDate(prevProps);
	}

	setCalendarRenderSeedDate = (prevProps: CalendarProps) => {
		// Set prop that sets focus in child component once it is rendered. This occurs when the month DOM has changed. This will trigger a re-render, but no DOM change will occur, just a DOM focus.
		if (
			!DateUtil.isEqual(
				this.props.initialDateForCalendarRender,
				prevProps.initialDateForCalendarRender
			)
		) {
			this.setState({ focusedDate: this.props.initialDateForCalendarRender });
			this.props.onRequestInternalFocusDate?.(undefined, {
				date: this.props.initialDateForCalendarRender,
				triggerCallback: true,
			});
		}
	};

	handleSelectDate = (event: SyntheticEvent, { date }: { date: Date }) => {
		if (!this.props.dateDisabled?.({ date })) {
			this.setState({ selected: date });
			this.props.onSelectDate(event, { date });
		}
	};

	handleRequestClose = (event?: SyntheticEvent) => {
		if (this.props.onRequestClose) {
			this.props.onRequestClose(event, {});
		}
	};

	handleKeyboardNavigateToPreviousDay = (
		event: SyntheticEvent,
		{ date }: { date: Date }
	) => {
		const prevDate = DateUtil.addDays(date, -1);
		if (!DateUtil.isSameMonth(prevDate, date)) {
			this.props.onChangeMonth(event, prevDate);
		} else {
			this.setState({ focusedDate: prevDate });
			this.props.onRequestInternalFocusDate?.(event, {
				date: prevDate,
				triggerCallback: true,
			});
		}
	};

	handleKeyboardNavigateToNextDay = (
		event: SyntheticEvent,
		{ date }: { date: Date }
	) => {
		const nextDate = DateUtil.addDays(date, 1);
		if (!DateUtil.isSameMonth(nextDate, date)) {
			this.props.onChangeMonth(event, nextDate);
		} else {
			this.setState({ focusedDate: nextDate });
			this.props.onRequestInternalFocusDate?.(event, {
				date: nextDate,
				triggerCallback: true,
			});
		}
	};

	handleKeyboardNavigateToPreviousWeek = (
		event: SyntheticEvent,
		{ date }: { date: Date }
	) => {
		const prevDate = DateUtil.addDays(date, -7);
		if (!DateUtil.isSameMonth(prevDate, date)) {
			this.props.onChangeMonth(event, prevDate);
		} else {
			this.setState({ focusedDate: prevDate });
			this.props.onRequestInternalFocusDate?.(event, {
				date: prevDate,
				triggerCallback: true,
			});
		}
	};

	handleKeyboardNavigateToNextWeek = (
		event: SyntheticEvent,
		{ date }: { date: Date }
	) => {
		const nextDate = DateUtil.addDays(date, 7);
		if (!DateUtil.isSameMonth(nextDate, date)) {
			this.props.onChangeMonth(event, nextDate);
		} else {
			this.setState({ focusedDate: nextDate });
			this.props.onRequestInternalFocusDate?.(event, {
				date: nextDate,
				triggerCallback: true,
			});
		}
	};

	renderWeeks = () => {
		const firstDayOfWeekOffset = this.props.isIsoWeekday ? 1 : 0;

		const firstDayOfMonth = DateUtil.firstDayOfMonth(
			this.props.initialDateForCalendarRender
		);

		let firstDayOfWeek;
		if (
			firstDayOfMonth.getDay() > firstDayOfWeekOffset ||
			firstDayOfMonth.getDay() < firstDayOfWeekOffset
		) {
			const prevWeek = DateUtil.addWeeks(firstDayOfMonth, -1);
			firstDayOfWeek = DateUtil.nearestWeekDay(prevWeek, firstDayOfWeekOffset);
		} else {
			firstDayOfWeek = firstDayOfMonth;
		}

		const weeks: ReactElement[] = [];
		let done = false;

		let monthIndex = firstDayOfWeek.getMonth();
		let count = 0;

		while (!done) {
			weeks.push(
				<Week
					calendarHasFocus={this.state.calendarHasFocus}
					dateDisabled={this.props.dateDisabled}
					firstDayOfWeek={firstDayOfWeek}
					key={firstDayOfWeek.toString()}
					focusedDate={this.state.focusedDate}
					initialDateForCalendarRender={this.props.initialDateForCalendarRender}
					onCalendarBlur={this.props.onCalendarBlur}
					onKeyboardNavigateToPreviousDay={
						this.handleKeyboardNavigateToPreviousDay
					}
					onKeyboardNavigateToNextDay={this.handleKeyboardNavigateToNextDay}
					onKeyboardNavigateToPreviousWeek={
						this.handleKeyboardNavigateToPreviousWeek
					}
					onKeyboardNavigateToNextWeek={this.handleKeyboardNavigateToNextWeek}
					onRequestClose={this.handleRequestClose}
					onRequestInternalFocusDate={this.props.onRequestInternalFocusDate}
					onSelectDate={this.handleSelectDate}
					selectedDate={this.props.selectedDate}
					selectedDateRef={this.props.selectedDateRef}
					todayLabel={this.props.todayLabel}
				/>
			);

			// create new weeks
			firstDayOfWeek = DateUtil.addWeeks(firstDayOfWeek, 1);
			done = count > 2 && monthIndex !== firstDayOfWeek.getMonth();
			count += 1;
			monthIndex = firstDayOfWeek.getMonth();
		}
		let extraWeeks = 0;
		while (weeks.length < 6) {
			extraWeeks += 1;
			weeks.push(
				<tr key={`extra_${extraWeeks}`} className="week">
					<td
						aria-disabled="true"
						aria-selected="false"
						className="slds-disabled-text"
					>
						<span className="slds-day ">&nbsp;</span>
					</td>
				</tr>
			);
		}

		return weeks;
	};

	render() {
		const sunday = (
			<th>
				<abbr title={this.props.weekDayLabels[0]}>
					{this.props.abbreviatedWeekDayLabels[0]}
				</abbr>
			</th>
		);

		return (
			<div className="calendar">
				<table
					className="datepicker__month"
					role="grid"
					aria-labelledby={`${this.props.id}-month`}
				>
					<thead>
						<tr>
							{this.props.isIsoWeekday ? null : sunday}
							<th scope="col">
								<abbr title={this.props.weekDayLabels[1]}>
									{this.props.abbreviatedWeekDayLabels[1]}
								</abbr>
							</th>
							<th scope="col">
								<abbr title={this.props.weekDayLabels[2]}>
									{this.props.abbreviatedWeekDayLabels[2]}
								</abbr>
							</th>
							<th scope="col">
								<abbr title={this.props.weekDayLabels[3]}>
									{this.props.abbreviatedWeekDayLabels[3]}
								</abbr>
							</th>
							<th scope="col">
								<abbr title={this.props.weekDayLabels[4]}>
									{this.props.abbreviatedWeekDayLabels[4]}
								</abbr>
							</th>
							<th scope="col">
								<abbr title={this.props.weekDayLabels[5]}>
									{this.props.abbreviatedWeekDayLabels[5]}
								</abbr>
							</th>
							<th scope="col">
								<abbr title={this.props.weekDayLabels[6]}>
									{this.props.abbreviatedWeekDayLabels[6]}
								</abbr>
							</th>
							{this.props.isIsoWeekday && sunday}
						</tr>
					</thead>
					<tbody>
						{this.renderWeeks()}

						<tr>
							<td colSpan={7} role="gridcell">
								<a
									href="#"
									tabIndex={0}
									className="slds-show_inline-block slds-p-bottom_x-small"
									onClick={(event) => {
										event.preventDefault();
										this.handleSelectDate(event, { date: new Date() });
									}}
									onKeyDown={this.props.onLastFocusableNodeKeyDown}
									ref={this.props.todayRef}
								>
									{this.props.todayLabel}
								</a>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default DatepickerCalendar;
