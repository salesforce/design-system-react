/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React, { PropTypes } from 'react';

import Calendar from './calendar';
import CalendarNavigation from './navigation';

import EventUtil from '../../../utilities/EventUtil';
import KEYS from '../../../utilities/KEYS';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

const DatepickerCalendarWrapper = React.createClass({
	displayName: 'DatepickerCalendarWrapper',

	propTypes: {
		/**
		 * Label for button to go to the next month
		 */
		assistiveTextNextMonth: PropTypes.string.isRequired,
		/**
		 * Label for button to go to the previous month
		 */
		assistiveTextPreviousMonth: PropTypes.string.isRequired,
		/**
		 * One letter abbreviations of the days of the week, starting on Sunday.
		 */
		abbreviatedWeekDayLabels: PropTypes.array.isRequired,
		/**
		 * CSS classes to be added to tag with `slds-datepicker`.
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
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
		selectedDate: React.PropTypes.instanceOf(Date),
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
		weekDayLabels: PropTypes.array.isRequired
	},

	getDefaultProps () {
		return {
			selectedDate: new Date(),
			value: new Date()
		};
	},

	getInitialState () {
		return {
			initialDateForCalendarRender: this.props.selectedDate,
			isCalendarFocused: true
		};
	},

	handleInitialDateForCalendarRenderChange (event, initialDateForCalendarRender) {
		this.setState({ initialDateForCalendarRender });
	},

	handleCalendarBlur (event, { direction }) {
		if (direction === 'next' && this.previousMonthRef) {
			this.setState({ isCalendarFocused: false });
			if (this.props.onCalendarFocus) {
				this.props.onCalendarFocus(event, { direction, isCalendarFocused: false, ref: this.previousMonthRef });
			}
			this.previousMonthRef.focus();
		} else if (direction === 'previous' && this.todayRef) {
			this.setState({ isCalendarFocused: false });
			if (this.props.onCalendarFocus) {
				this.props.onCalendarFocus(event, { direction, isCalendarFocused: false, ref: this.todayRef });
			}
			this.todayRef.focus();
		}
	},

	handleRequestClose () {
		if (this.props.onRequestClose) {
			this.props.onRequestClose();
		}
	},

	handleLastFocusableNodeKeyDown (event) {
		if (!event.shiftKey && event.keyCode === KEYS.TAB) {
			EventUtil.trapEvent(event);
			this.setState({ isCalendarFocused: true });
		}
	},

	handleFirstFocusableNodeKeyDown (event) {
		if (event.shiftKey && event.keyCode === KEYS.TAB) {
			EventUtil.trapEvent(event);
			this.setState({ isCalendarFocused: true });
		}
	},

	handleRequestFocusDate (event, data) {
		// will be called three times, due to re-render
		if (data.ref && this.state.isCalendarFocused) {
			data.ref.focus();
		}

		// only call on actual DOM event and not on re-render
		if (this.props.onCalendarFocus && data.triggerCallback) {
			const { triggerCallback, ...modifiedData } = data;	// eslint-disable-line no-unused-vars
			this.props.onCalendarFocus(event, modifiedData);
		}
	},

	handleKeyDown (event) {
		if (event.keyCode === KEYS.ESCAPE) {
			EventUtil.trapEvent(event);
			this.props.onRequestClose(event);
		}
	},

	render () {
		return (
			<div
				className={classNames({
					'slds-datepicker': this.props.isolated
				},
					this.props.className)}
				aria-hidden="false"
				data-selection="single"
				onKeyDown={this.handleKeyDown}
			>
				<CalendarNavigation
					assistiveTextNextMonth={this.props.assistiveTextNextMonth}
					assistiveTextPreviousMonth={this.props.assistiveTextPreviousMonth}
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
				<span id="bn_prev-label" className="slds-assistive-text">{this.props.assistiveTextNextMonth}</span>
				<span id="bn_next-label" className="slds-assistive-text">{this.props.assistiveTextPreviousMonth}</span>
			</div>
		);
	}
});

module.exports = DatepickerCalendarWrapper;
