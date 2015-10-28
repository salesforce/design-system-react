// DATEPICKER CALENDAR - REACT FACADE

// Framework specific
import React from 'react';

// Third party
import classNames from 'classnames';

const Calendar = React.createClass({

	render () {
		const self = this;

		return (
				<table className="datepicker__month" role="grid" aria-labelledby="month">
					<thead>
					<tr id="weekdays">
						<th id="Sunday">
							<abbr title="Sunday">S</abbr>
						</th>
						<th id="Monday">
							<abbr title="Monday">M</abbr>
						</th>
						<th id="Tuesday">
							<abbr title="Tuesday">T</abbr>
						</th>
						<th id="Wednesday">
							<abbr title="Wednesday">W</abbr>
						</th>
						<th id="Thursday">
							<abbr title="Thursday">T</abbr>
						</th>
						<th id="Friday">
							<abbr title="Friday">F</abbr>
						</th>
						<th id="Saturday">
							<abbr title="Saturday">S</abbr>
						</th>
					</tr>
					</thead>
					<tbody>
						{ this.props.calendarData.map(function (week, i) {
							return self.generateWeekMarkup(week, i);
						}) }
					</tbody>
				</table>
		);
	},

	generateWeekMarkup (week, key) {
		const self = this;

		return (
			<tr key={key}>
				{ week.map(function (day, i) {
					return self.generateDayMarkup(day, i);
				}) }
			</tr>
		);
	},

	generateDayMarkup (day, key) {
		return (
			<td key={key} onClick={this._handleDateClicked.bind(this, day)} className={classNames({'slds-is-today': day.today, 'slds-disabled-text': day.outside, 'slds-is-selected': day.selected})} role="gridcell" aria-disabled="true">
				<span className="slds-day">{day.day}</span>
			</td>
		);
	},

	_handleDateClicked (day) {
		this.props.selectDate(day);
	}
});

export default Calendar;
