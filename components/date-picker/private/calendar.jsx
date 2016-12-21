/*
Copyright (c) 2015, salesforce.com, inc. All rights reserved.
Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
Neither the name of salesforce.com, inc. nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

import React, { PropTypes } from 'react';
import Week from './calendar-week';
import { EventUtil, DateUtil, KEYS } from '../../../utilities';

const DatepickerCalendar = React.createClass({
	displayName: 'SLDSDatepickerCalendar',

	propTypes: {
		abbrWeekDayLabels: PropTypes.array.isRequired,
		weekDayLabels: PropTypes.array.isRequired
	},

	getDefaultProps () {
		return {
			displayedDate: new Date(),
			selectedDate: new Date()
			// onSelectDate (date) {
			// 	console.log('onSelectDate should be defined ',date);
			// },

			// onCancel () {
			// 	console.log('onCancel should be defined');
			// }

		};
	},

	getInitialState () {
		return {
			highlightedDate: DateUtil.firstDayOfMonth(this.props.displayedDate),
			hasFocus: true,
			todayFocus: false
		};
	},

	handleSelectDate (event, { date }) {
		this.setState({ selected: date });
		this.props.onSelectDate(event, { date });
	},

	handleCancel () {
		if (this.props.onCancel) {
			this.props.onCancel();
		}
	},

	handleChangeDisplayedDate (date) {
		if (this.props.onChange) {
			this.props.onChange(date);
		}
	},

	handlePrevDay (date) {
		const prevDate = DateUtil.addDays(date, -1);
		if (!DateUtil.isSameMonth(prevDate, date)) {
			this.handleChangeDisplayedDate(prevDate);
		} else {
			this.setState({ highlightedDate: prevDate });
		}
	},

	handleNextDay (date) {
		const nextDate = DateUtil.addDays(date, 1);
		if (!DateUtil.isSameMonth(nextDate, date)) {
			this.handleChangeDisplayedDate(nextDate);
		} else {
			this.setState({ highlightedDate: nextDate });
		}
	},

	handlePrevWeek (date) {
		const prevDate = DateUtil.addDays(date, -7);
		if (!DateUtil.isSameMonth(prevDate, date)) {
			this.handleChangeDisplayedDate(prevDate);
		} else {
			this.setState({ highlightedDate: prevDate });
		}
	},

	handleNextWeek (date) {
		const nextDate = DateUtil.addDays(date, 7);
		if (!DateUtil.isSameMonth(nextDate, date)) {
			this.handleChangeDisplayedDate(nextDate);
		} else {
			this.setState({ highlightedDate: nextDate });
		}
	},

	handleFocus () {
		if (!this.state.todayFocus) {
			this.setState({ hasFocus: true });
		}
	},

	handleBlur () {
		this.setState({ hasFocus: false });
	},

	handleTodayFocus () {
		this.state.todayFocus = true;
	},

	handleTodayBlur () {
		this.state.todayFocus = false;
	},

	handleKeyDown (event) {
		if (event.keyCode) {
			if (event.keyCode === KEYS.TAB) {
				if (!event.shiftKey) {
					EventUtil.trapEvent(event);
					if (this.props.onCancel) {
						this.props.onCancel();
					}
				}
			}
		}
	},

	render () {
		const sunday = (
			<th ref="Sunday">
				<abbr title={this.props.weekDayLabels[0]}>{this.props.abbrWeekDayLabels[0]}</abbr>
			</th>
		);

		return (
			<div
				className="Calendar"
				onFocus={this.handleFocus}
				onBlur={this.handleBlur}
			>
				<table className="datepicker__month" role="grid" aria-labelledby="month">
					<thead>
						<tr ref="weekdays">
						{this.props.isIsoWeekday ? null : sunday}
							<th ref="Monday" scope="col">
								<abbr title={this.props.weekDayLabels[1]}>{this.props.abbrWeekDayLabels[1]}</abbr>
							</th>
							<th ref="Tuesday" scope="col">
								<abbr title={this.props.weekDayLabels[2]}>{this.props.abbrWeekDayLabels[2]}</abbr>
							</th>
							<th ref="Wednesday" scope="col">
								<abbr title={this.props.weekDayLabels[3]}>{this.props.abbrWeekDayLabels[3]}</abbr>
							</th>
							<th ref="Thursday" scope="col">
								<abbr title={this.props.weekDayLabels[4]}>{this.props.abbrWeekDayLabels[4]}</abbr>
							</th>
							<th ref="Friday" scope="col">
								<abbr title={this.props.weekDayLabels[5]}>{this.props.abbrWeekDayLabels[5]}</abbr>
							</th>
							<th ref="Saturday" scope="col">
								<abbr title={this.props.weekDayLabels[6]}>{this.props.abbrWeekDayLabels[6]}</abbr>
							</th>
							{this.props.isIsoWeekday && sunday}
						</tr>
					</thead>
					<tbody>
						{this.renderWeeks()}
						{this.renderToday()}
					</tbody>
				</table>
			</div>
		);
	},

	renderToday () {
		return (
			<tr>
				<td
					colSpan="7"
					role="gridcell"
				>
					<a
						href="javascript:void(0)"
						// onFocus={this.handleTodayFocus}
						onBlur={this.handleTodayBlur}
						tabIndex="0"
						onKeyDown={this.handleKeyDown}
						className="slds-show--inline-block slds-p-bottom--x-small"
						onClick={(event) => { this.handleSelectDate(event, { date: new Date() }); }}
					>
						{this.props.todayLabel}
					</a>
				</td>
			</tr>
		);
	},

	renderWeeks () {
		const firstDayOfWeekOffset = this.props.isIsoWeekday ? 1 : 0;

		const firstDayOfMonth = DateUtil.firstDayOfMonth(this.props.displayedDate);

		let firstDayOfWeek;
		if (firstDayOfMonth.getDay() > firstDayOfWeekOffset) {
			const prevWeek = DateUtil.addWeeks(firstDayOfMonth, -1);
			firstDayOfWeek = DateUtil.nearestWeekDay(prevWeek, firstDayOfWeekOffset);
		} else {
			firstDayOfWeek = firstDayOfMonth;
		}

		const weeks = [];
		let done = false;

		let monthIndex = firstDayOfWeek.getMonth();
		let count = 0;

		while (!done) {
			weeks.push(<Week
				key={firstDayOfWeek.toString()}
				date={firstDayOfWeek}
				month={this.props.month}
				onSelectDate={this.handleSelectDate}
				selectedDate={this.props.selectedDate}
				displayedDate={this.props.displayedDate}
				highlightedDate={this.state.highlightedDate}
				onPrevDay={this.handlePrevDay}
				onNextDay={this.handleNextDay}
				onPrevWeek={this.handlePrevWeek}
				onNextWeek={this.handleNextWeek}
				calendarHasFocus={this.state.hasFocus}
				onCancel={this.handleCancel}
			/>);

			// create new weeks
			firstDayOfWeek = DateUtil.addWeeks(firstDayOfWeek, 1);
			done = count++ > 2 && monthIndex !== firstDayOfWeek.getMonth();
			monthIndex = firstDayOfWeek.getMonth();
		}
		let extra = 0;
		while (weeks.length < 6) {
			extra = extra + 1;
			weeks.push(<tr key={`extra_${extra}`} className="week"><td><span className="slds-day">&nbsp;</span></td></tr>);
		}

		return weeks;
	},

	componentDidUpdate (prevProps) {
		if (!DateUtil.isEqual(this.props.displayedDate, prevProps.displayedDate)) {
			this.setState({ highlightedDate: this.props.displayedDate });
		}
	}

});

module.exports = DatepickerCalendar;
