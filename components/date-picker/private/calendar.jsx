/* Copyright (c) 2015-present, salesforce.com, inc. All rights reserved */
/* Licensed under BSD 3-Clause - see LICENSE.txt or git.io/sfdc-license */

import React from 'react';

import PropTypes from 'prop-types';
import Week from './week';
import DateUtil from '../../../utilities/date';

class DatepickerCalendar extends React.Component {
	static displayName = 'SLDSDatepickerCalendar';

	static propTypes = {
		/**
		 * Three letter abbreviations of the days of the week, starting on Sunday.
		 */
		abbreviatedWeekDayLabels: PropTypes.array.isRequired,
		/**
		 * dateDisabled() takes a date as input argument, returns true if given date should be disabled, otherwise returns false.
		 */
		dateDisabled: PropTypes.func,
		/**
		 * HTML id for component
		 */
		id: PropTypes.string.isRequired,
		/**
		 * Date used to create calendar that is displayed. This is typically the initial day focused when using the keyboard navigation. Focus will be set to this date if available.
		 */
		initialDateForCalendarRender: PropTypes.instanceOf(Date).isRequired,
		/**
		 * Makes Monday the first day of the week
		 */
		isIsoWeekday: PropTypes.bool,
		/**
		 * Triggered when the keyboard moves focus off the calendar.
		 */
		onCalendarBlur: PropTypes.func.isRequired,
		/**
		 * Displayed calendar has changed or re-rendered
		 */
		onChangeMonth: PropTypes.func.isRequired,
		/**
		 * Internal callback that will eventually trigger when the keyboard moves focus on the calendar. `{date: [Date object], formattedDate: [string]}`.
		 */
		onRequestInternalFocusDate: PropTypes.func,
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
		selectedDate: PropTypes.instanceOf(Date),
		/**
		 * Component reference / DOM node for selected day.
		 */
		selectedDateRef: PropTypes.func,
		/**
		 * Label of shortcut to jump to today within the calendar. This is also used for assistive text on today's date.
		 */
		todayLabel: PropTypes.string.isRequired,
		/**
		 * For keyboard navigation. Listens for key presses on the last focusable DOM Node, the "Today" link, so that dialog focus can be trapped.
		 */
		onLastFocusableNodeKeyDown: PropTypes.func,
		/**
		 * Callback that passes in the DOM reference of the Today `a` DOM node within this component. Primary use is to allow `focus` to be called. You should still test if the node exists, since rendering is asynchronous. `buttonRef={(component) => { if(component) console.log(component); }}`
		 */
		todayRef: PropTypes.func,
		/**
		 * Names of the seven days of the week, starting on Sunday.
		 */
		weekDayLabels: PropTypes.array.isRequired,
	};

	state = {
		focusedDate: this.props.initialDateForCalendarRender,
		calendarHasFocus: true,
		todayFocus: false,
	};

	componentDidUpdate(prevProps) {
		this.setCalendarRenderSeedDate(prevProps);
	}

	setCalendarRenderSeedDate = (prevProps) => {
		// Set prop that sets focus in child component once it is rendered. This occurs when the month DOM has changed. This will trigger a re-render, but no DOM change will occur, just a DOM focus.
		if (
			!DateUtil.isEqual(
				this.props.initialDateForCalendarRender,
				prevProps.initialDateForCalendarRender
			)
		) {
			this.setState({ focusedDate: this.props.initialDateForCalendarRender });
			this.props.onRequestInternalFocusDate(undefined, {
				date: this.props.initialDateForCalendarRender,
				triggerCallback: true,
			});
		}
	};

	handleSelectDate = (event, { date }) => {
		if (!this.props.dateDisabled({ date })) {
			this.setState({ selected: date });
			this.props.onSelectDate(event, { date });
		}
	};

	handleRequestClose = (event) => {
		if (this.props.onRequestClose) {
			this.props.onRequestClose(event, {});
		}
	};

	handleKeyboardNavigateToPreviousDay = (event, { date }) => {
		const prevDate = DateUtil.addDays(date, -1);
		if (!DateUtil.isSameMonth(prevDate, date)) {
			this.props.onChangeMonth(event, prevDate);
		} else {
			this.setState({ focusedDate: prevDate });
			this.props.onRequestInternalFocusDate(event, {
				date: prevDate,
				triggerCallback: true,
			});
		}
	};

	handleKeyboardNavigateToNextDay = (event, { date }) => {
		const nextDate = DateUtil.addDays(date, 1);
		if (!DateUtil.isSameMonth(nextDate, date)) {
			this.props.onChangeMonth(event, nextDate);
		} else {
			this.setState({ focusedDate: nextDate });
			this.props.onRequestInternalFocusDate(event, {
				date: nextDate,
				triggerCallback: true,
			});
		}
	};

	handleKeyboardNavigateToPreviousWeek = (event, { date }) => {
		const prevDate = DateUtil.addDays(date, -7);
		if (!DateUtil.isSameMonth(prevDate, date)) {
			this.props.onChangeMonth(event, prevDate);
		} else {
			this.setState({ focusedDate: prevDate });
			this.props.onRequestInternalFocusDate(event, {
				date: prevDate,
				triggerCallback: true,
			});
		}
	};

	handleKeyboardNavigateToNextWeek = (event, { date }) => {
		const nextDate = DateUtil.addDays(date, 7);
		if (!DateUtil.isSameMonth(nextDate, date)) {
			this.props.onChangeMonth(event, nextDate);
		} else {
			this.setState({ focusedDate: nextDate });
			this.props.onRequestInternalFocusDate(event, {
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

		const weeks = [];
		let done = false;

		let monthIndex = firstDayOfWeek.getMonth();
		let count = 0;

		// eslint-disable-next-line fp/no-loops
		while (!done) {
			// eslint-disable-next-line fp/no-mutating-methods
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
		// eslint-disable-next-line fp/no-loops
		while (weeks.length < 6) {
			extraWeeks += 1;
			// eslint-disable-next-line fp/no-mutating-methods
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
							<td colSpan="7" role="gridcell">
								<a
									href="#"
									tabIndex="0"
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
