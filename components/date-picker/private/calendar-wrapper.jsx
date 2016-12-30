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

import { EventUtil, KEYS } from '../../../utilities';

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
		 * Label for today's date
		 */
		assistiveTextToday: PropTypes.string,
		/**
		 * One letter abbreviations of the days of the week, starting on Sunday.
		 */
		abbrWeekDayLabels: PropTypes.array.isRequired,
		/**
		 * CSS classes to be added to tag with `slds-datepicker`.
		 */
		className: PropTypes.oneOfType([PropTypes.array, PropTypes.object, PropTypes.string]),
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
		 * Triggered when the calendar is closed.
		 */
		onClose: PropTypes.func.isRequired,
		/**
		 * Triggered when calendar changes the date.
		 */
		onDisplayedDateChange: PropTypes.func,
		/**
		 * Triggered when a date on the calendar is clicked.
		 */
		onSelectDate: PropTypes.func,
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
		 * Label of shortcut to jump to today within the calendar
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
			displayedDate: this.props.selectedDate,
			isFocused: false
		};
	},

	handleKeyDown (event) {
		if (event.keyCode) {
			if (event.keyCode === KEYS.ESCAPE
				|| event.keyCode === KEYS.SPACE
				|| event.keyCode === KEYS.ENTER
				|| event.keyCode === KEYS.TAB) {
				// do nothing
			} else {
				EventUtil.trapEvent(event);
			}
		}
	},

	handleDisplayedDateChange (displayedDate) {
		if (this.props.onDisplayedDateChange) {
			this.props.onDisplayedDateChange(displayedDate);
		}
		this.setState({ displayedDate });
	},

	handleCancel () {
		if (this.props.onClose) {
			this.props.onClose();
		}
	},

	handleFocus () {
		this.setState({ isFocused: true });
	},

	handleBlur () {
		this.setState({ isFocused: false });
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
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}
				onClick={this.handleBGClick}
			>
				<CalendarNavigation
					assistiveTextNextMonth={this.props.assistiveTextNextMonth}
					assistiveTextPreviousMonth={this.props.assistiveTextPreviousMonth}
					onChange={this.handleDisplayedDateChange}
					displayedDate={this.state.displayedDate}
					monthLabels={this.props.monthLabels}
					relativeYearFrom={this.props.relativeYearFrom}
					relativeYearTo={this.props.relativeYearTo}
				/>
				<Calendar
					assistiveTextToday={this.props.assistiveTextToday}
					isIsoWeekday={this.props.isIsoWeekday}
					selectedDate={this.props.selectedDate}
					onChange={this.handleDisplayedDateChange}
					displayedDate={this.state.displayedDate}
					onSelectDate={this.props.onSelectDate}
					abbrWeekDayLabels={this.props.abbrWeekDayLabels}
					weekDayLabels={this.props.weekDayLabels}
					todayLabel={this.props.todayLabel}
					onCancel={this.handleCancel}
				/>
				<span id="bn_prev-label" className="slds-assistive-text">{this.props.assistiveTextNextMonth}</span>
				<span id="bn_next-label" className="slds-assistive-text">{this.props.assistiveTextPreviousMonth}</span>
			</div>
		);
	}
});

module.exports = DatepickerCalendarWrapper;
