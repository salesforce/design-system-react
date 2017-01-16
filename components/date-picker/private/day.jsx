/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React, { PropTypes } from 'react';

import { KEYS, EventUtil, DateUtil } from '../../../utilities';

// ### classNames
// [github.com/JedWatson/classnames](https://github.com/JedWatson/classnames)
// This project uses `classnames`, "a simple javascript utility for conditionally
// joining classNames together."
import classNames from 'classnames';

const DatepickerCalendarDay = React.createClass({
	displayName: 'SLDSDatepickerCalendarDay',

	propTypes: {
		/**
		 * If elements within the calendar have focus. This is helpful for keyboard event trapping.
		 */
		calendarHasFocus: PropTypes.bool.isRequired,
		/**
		 * Date of day
		 */
		date: PropTypes.instanceOf(Date),
		/**
     * Date used to create calendar that is displayed. This is typically the initial day focused when using the keyboard navigation. Focus will be set to this date if available.
     */
		initialDateForCalendarRender: PropTypes.instanceOf(Date).isRequired,
		/**
		 * Triggered when the keyboard moves focus off the calendar.
		 */
		onCalendarBlur: PropTypes.func,
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
		selectedDate: PropTypes.instanceOf(Date),
		/**
		 * Component reference / DOM node for selected day.
		 */
		selectedDateRef: PropTypes.func,
		/**
		 * Label of shortcut to jump to today within the calendar. Also used for assistive text for the current day.
		 */
		todayLabel: PropTypes.string.isRequired
	},

	handleClick (event) {
		this.props.onSelectDate(event, { date: this.props.date });
	},

	handleKeyDown (event) {
		const fromDate = this.props.date;
		const keyDownCallbacks = {
			[KEYS.SPACE]: () => { this.props.onSelectDate(event, { date: fromDate }); },
			[KEYS.ENTER]: () => { this.props.onSelectDate(event, { date: fromDate }); },
			[KEYS.ESCAPE]: () => { this.props.onRequestClose(); },
			[KEYS.TAB]: () => { this.props.onCalendarBlur(event, { direction: 'next' }); },
			[KEYS.LEFT]: () => { this.props.onKeyboardNavigateToPreviousDay(event, fromDate); },
			[KEYS.RIGHT]: () => { this.props.onKeyboardNavigateToNextDay(event, fromDate); },
			[KEYS.UP]: () => { this.props.onKeyboardNavigateToPreviousWeek(event, fromDate); },
			[KEYS.DOWN]: () => { this.props.onKeyboardNavigateToNextWeek(event, fromDate); }
		};

		const shiftKeyDownCallbacks = {
			[KEYS.TAB]: () => { this.props.onCalendarBlur(event, { direction: 'previous' }); }
		};

		if (event.keyCode) {
			EventUtil.trapEvent(event);
			if (event.shiftKey && keyDownCallbacks[event.keyCode]) {
				shiftKeyDownCallbacks[event.keyCode]();
			} else if (keyDownCallbacks[event.keyCode]) {
				keyDownCallbacks[event.keyCode]();
			}
		}
	},

	render () {
		const isCurrentMonth = DateUtil.isSameMonth(this.props.date, this.props.initialDateForCalendarRender);
		const isToday = DateUtil.isToday(this.props.date);
		const isSelectedDay = DateUtil.isSameDay(this.props.date, this.props.selectedDate);
		const isFirstDayOfMonth = DateUtil.isFirstDayOfMonth(this.props.date);

		return (
			<td
				aria-disabled={!isCurrentMonth}
				aria-selected={isSelectedDay}
				className={classNames({
					'slds-is-today': isToday,
					'slds-disabled-text': !isCurrentMonth,
					'slds-is-selected': isSelectedDay
				})}
				onClick={this.handleClick}
				onKeyDown={this.handleKeyDown}
				ref={(component) => {
					if (isSelectedDay) {
						this.props.selectedDateRef(component);
					}

					if (this.props.calendarHasFocus && DateUtil.isSameDay(this.props.focusedDate, this.props.date) && isCurrentMonth) {
						this.props.onRequestFocusDate(undefined, { date: this.props.date, ref: component });
					}
				}}
				role="gridcell"
				tabIndex={!this.props.calendarHasFocus && isFirstDayOfMonth && isCurrentMonth ? 0 : -1}
			>
				<span className="slds-day">
					{isToday
						? <span className="slds-assistive-text">{this.props.todayLabel}: </span>
						: null}
					{this.props.date.getDate()}
				</span>
			</td>
		);
	}

});

module.exports = DatepickerCalendarDay;
