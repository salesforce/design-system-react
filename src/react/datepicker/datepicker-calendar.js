// DATEPICKER CALENDAR - REACT FACADE

// Framework specific
import React from 'react';

import DateWeek from './datepicker-week';

export const CONTROL = 'datepicker-calendar';

const Calendar = React.createClass({
	displayName: CONTROL,

	propTypes: {
		calendarData: React.PropTypes.array,
		selectDate: React.PropTypes.func
	},

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
							return <DateWeek key={i} week={week} onSelectDay={self._handleDateClicked} multiSelect={self.props.multiSelect}/>;
						}) }
					</tbody>
				</table>
		);
	},

	_handleDateClicked (day) {
		this.props.selectDate(day);
	}
});

export default Calendar;
