/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';
import PropTypes from 'prop-types';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

import Calendar from './calendar';
import CalendarNavigation from './navigation';

import EventUtil from '../../../utilities/event';
import KEYS from '../../../utilities/key-code';

class DatepickerCalendarWrapper extends React.Component {
	static displayName = 'DatepickerCalendarWrapper';

	static propTypes = {
		/**
		 * Label for button to go to the next month
		 */
		assistiveTextNextMonth: PropTypes.string.isRequired,
		/**
		 * Label for button to go to the previous month
		 */
		assistiveTextPreviousMonth: PropTypes.string.isRequired,
		/**
		 * Label for year picklist/combobox
		 */
		assistiveTextYear: PropTypes.string.isRequired,
		/**
		 * One letter abbreviations of the days of the week, starting on Sunday.
		 */ abbreviatedWeekDayLabels: PropTypes.array.isRequired,
		/**
		 * Whether or not the `CalendarWrapper` can steal focus from the main `Input`
		 */
		canFocusCalendar: PropTypes.bool.isRequired,
		/**
		 * CSS classes to be added to tag with `slds-datepicker`.
		 */
		className: PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
			PropTypes.string,
		]),
		/**
		 * dateDisabled() takes a date as input argument, returns true if given date should be disabled, otherwise returns false.
		 */
		dateDisabled: PropTypes.func,
		/**
		 * HTML id for component
		 */
		id: PropTypes.string,
		/**
		 * Makes Monday the first day of the week
		 */
		isIsoWeekday: PropTypes.bool,
		/**
		 * For use of datepicker outside of dropdown.
		 */
		isolated: PropTypes.bool,
		/**
		 * Names of the months
		 */
		monthLabels: PropTypes.array.isRequired,
		/**
		 * Triggered when the keyboard moves focus on the calendar. {date: [Date object], formattedDate: [string]}  _Tested with Mocha framework._
		 */
		onCalendarFocus: PropTypes.func,
		/**
		 * Triggered when the calendar is supposed to close.
		 */
		onRequestClose: PropTypes.func.isRequired,
		/**
		 * Triggered when a date on the calendar is clicked.
		 */
		onSelectDate: PropTypes.func.isRequired,
		/**
		 * The earliest year that can be selected in the year selection dropdown.
		 */
		relativeYearFrom: PropTypes.number.isRequired,
		/**
		 * The maximum year that can be selected in the year selection dropdown.
		 */
		relativeYearTo: PropTypes.number.isRequired,
		/**
		 * Currently selected date
		 */
		selectedDate: PropTypes.instanceOf(Date),
		/**
		 * Component reference / DOM node for selected day.
		 */
		selectedDateRef: PropTypes.func,
		/**
		 * Label of shortcut to jump to today within the calendar. Also used for assistive text for the current day.
		 */
		todayLabel: PropTypes.string.isRequired,
		/**
		 * Names of the seven days of the week, starting on Sunday.
		 */
		weekDayLabels: PropTypes.array.isRequired,
	};

	static defaultProps = {
		selectedDate: new Date(),
		value: new Date(),
	};

	state = {
		initialDateForCalendarRender: this.props.selectedDate,
	};

	handleCalendarBlur = (event, { direction }) => {
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

	handleFirstFocusableNodeKeyDown = (event) => {
		if (event.shiftKey && event.keyCode === KEYS.TAB) {
			EventUtil.trapEvent(event);
		}
	};

	handleInitialDateForCalendarRenderChange = (
		event,
		initialDateForCalendarRender
	) => {
		this.setState({ initialDateForCalendarRender });
	};

	handleKeyDown = (event) => {
		if (event.keyCode === KEYS.ESCAPE) {
			EventUtil.trapEvent(event);
			this.props.onRequestClose(event, {});
		}
	};

	handleLastFocusableNodeKeyDown = (event) => {
		if (!event.shiftKey && event.keyCode === KEYS.TAB) {
			EventUtil.trapEvent(event);
		}
	};

	handleRequestClose = (event) => {
		if (this.props.onRequestClose) {
			this.props.onRequestClose(event, {});
		}
	};

	handleRequestFocusDate = (event, data) => {
		// will be called three times, due to re-render
		if (data.ref && this.props.canFocusCalendar) {
			data.ref.focus();
		}

		// only call on actual DOM event and not on re-render
		if (this.props.onCalendarFocus && data.triggerCallback) {
			const { triggerCallback, ...modifiedData } = data; // eslint-disable-line no-unused-vars
			this.props.onCalendarFocus(event, modifiedData);
		}
	};

	render() {
		return (
			<div // eslint-disable-line jsx-a11y/no-static-element-interactions
				className={classNames(
					{
						'slds-datepicker': this.props.isolated,
					},
					this.props.className
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
					dateDisabled={this.props.dateDisabled}
					id={this.props.id}
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
