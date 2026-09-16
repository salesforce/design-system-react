/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React, { type SyntheticEvent } from 'react';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

import Calendar, { type CalendarProps } from './calendar';
import CalendarNavigation from './navigation';

import EventUtil from '../../../utilities/event';
import KEYS from '../../../utilities/key-code';

export interface CalendarWrapperProps {
	/** Label for button to go to the next month */
	assistiveTextNextMonth: string;
	/** Label for button to go to the previous month */
	assistiveTextPreviousMonth: string;
	/** Label for year picklist/combobox */
	assistiveTextYear: string;
	/** One letter abbreviations of the days of the week, starting on Sunday */
	abbreviatedWeekDayLabels: string[];
	/** Whether or not the CalendarWrapper can steal focus from the main Input */
	canFocusCalendar: boolean;
	/** CSS classes for datepicker */
	className?: unknown[] | Record<string, unknown> | string;
	/** Function to determine if a date should be disabled */
	dateDisabled?: (date: Date) => boolean;
	/** HTML id for component */
	id?: string;
	/** Makes Monday the first day of the week */
	isIsoWeekday?: boolean;
	/** For use of datepicker outside of dropdown */
	isolated?: boolean;
	/** Names of the months */
	monthLabels: string[];
	/** Called when keyboard moves focus on calendar */
	onCalendarFocus?: (
		event: SyntheticEvent | null,
		data: { date?: Date; ref?: HTMLElement; direction?: string }
	) => void;
	/** Called when calendar should close */
	onRequestClose: (
		event?: SyntheticEvent,
		data?: Record<string, unknown>
	) => void;
	/** Called when a date is selected */
	onSelectDate: (event: SyntheticEvent, data: { date: Date }) => void;
	/** Years before current year in dropdown */
	relativeYearFrom: number;
	/** Years after current year in dropdown */
	relativeYearTo: number;
	/** Currently selected date */
	selectedDate?: Date;
	/** Ref callback for selected date cell */
	selectedDateRef?: (ref: HTMLElement | null) => void;
	/** Label for today shortcut */
	todayLabel: string;
	/** Full names of the days of the week */
	weekDayLabels: string[];
}

interface CalendarWrapperState {
	initialDateForCalendarRender: Date;
}

class DatepickerCalendarWrapper extends React.Component<
	CalendarWrapperProps,
	CalendarWrapperState
> {
	static displayName = 'DatepickerCalendarWrapper';

	static defaultProps = {
		selectedDate: new Date(),
		value: new Date(),
	};

	state: CalendarWrapperState = {
		initialDateForCalendarRender: this.props.selectedDate as Date,
	};

	previousMonthRef: HTMLButtonElement | null = null;

	todayRef: HTMLAnchorElement | null = null;

	handleCalendarBlur = (
		event: SyntheticEvent,
		{ direction }: { direction: string }
	) => {
		if (direction === 'next' && this.previousMonthRef) {
			if (this.props.onCalendarFocus) {
				this.props.onCalendarFocus(event, {
					direction,
					ref: this.previousMonthRef,
				});
			}
			this.previousMonthRef.focus();
		} else if (direction === 'previous' && this.todayRef) {
			if (this.props.onCalendarFocus) {
				this.props.onCalendarFocus(event, {
					direction,
					ref: this.todayRef,
				});
			}
			this.todayRef.focus();
		}
	};

	handleFirstFocusableNodeKeyDown = (event: React.KeyboardEvent) => {
		if (event.shiftKey && event.keyCode === KEYS.TAB) {
			EventUtil.trapEvent(event);
		}
	};

	handleInitialDateForCalendarRenderChange = (
		event: SyntheticEvent | undefined,
		initialDateForCalendarRender: Date
	) => {
		this.setState({ initialDateForCalendarRender });
	};

	handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.keyCode === KEYS.ESCAPE) {
			EventUtil.trapEvent(event);
			this.props.onRequestClose(event, {});
		}
	};

	handleLastFocusableNodeKeyDown = (event: React.KeyboardEvent) => {
		if (!event.shiftKey && event.keyCode === KEYS.TAB) {
			EventUtil.trapEvent(event);
			this.previousMonthRef?.focus();
		}
	};

	handleRequestClose = (event?: SyntheticEvent) => {
		if (this.props.onRequestClose) {
			this.props.onRequestClose(event, {});
		}
	};

	handleRequestFocusDate = (
		event: SyntheticEvent | undefined,
		data: { date: Date; ref?: HTMLElement | null; triggerCallback?: boolean }
	) => {
		// will be called three times, due to re-render
		if (data.ref && this.props.canFocusCalendar) {
			data.ref.focus();
		}

		// only call on actual DOM event and not on re-render
		if (this.props.onCalendarFocus && data.triggerCallback) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { triggerCallback, ref, ...rest } = data;
			this.props.onCalendarFocus(event ?? null, {
				...rest,
				ref: ref ?? undefined,
			});
		}
	};

	render() {
		return (
			<div // eslint-disable-line jsx-a11y/no-static-element-interactions
				className={classNames(
					{
						'slds-datepicker': this.props.isolated,
					},
					this.props.className as string
				)}
				aria-hidden="false"
				data-selection="single"
				onKeyDown={this.handleKeyDown}
			>
				<CalendarNavigation
					assistiveTextNextMonth={this.props.assistiveTextNextMonth}
					assistiveTextPreviousMonth={this.props.assistiveTextPreviousMonth}
					assistiveTextYear={this.props.assistiveTextYear}
					id={this.props.id}
					initialDateForCalendarRender={this.state.initialDateForCalendarRender}
					monthLabels={this.props.monthLabels}
					onChangeMonth={this.handleInitialDateForCalendarRenderChange}
					previousMonthRef={(component) => {
						this.previousMonthRef = component;
					}}
					onPreviousMonthKeyDown={this.handleFirstFocusableNodeKeyDown}
					relativeYearFrom={this.props.relativeYearFrom}
					relativeYearTo={this.props.relativeYearTo}
				/>
				<Calendar
					abbreviatedWeekDayLabels={this.props.abbreviatedWeekDayLabels}
					dateDisabled={
						this.props.dateDisabled as CalendarProps['dateDisabled']
					}
					id={this.props.id as string}
					initialDateForCalendarRender={this.state.initialDateForCalendarRender}
					isIsoWeekday={this.props.isIsoWeekday}
					onCalendarBlur={this.handleCalendarBlur}
					onChangeMonth={this.handleInitialDateForCalendarRenderChange}
					onRequestClose={this.handleRequestClose}
					onRequestInternalFocusDate={this.handleRequestFocusDate}
					onSelectDate={this.props.onSelectDate}
					selectedDate={this.props.selectedDate}
					selectedDateRef={this.props.selectedDateRef}
					todayLabel={this.props.todayLabel}
					todayRef={(component) => {
						this.todayRef = component;
					}}
					onLastFocusableNodeKeyDown={this.handleLastFocusableNodeKeyDown}
					weekDayLabels={this.props.weekDayLabels}
				/>
			</div>
		);
	}
}

export default DatepickerCalendarWrapper;
