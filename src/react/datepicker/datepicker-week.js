// DATEPICKER CALENDAR - REACT FACADE

// Framework specific
import React from 'react';

import DateDay from './datepicker-day';

export const CONTROL = 'datepicker-week';

const DateInput = React.createClass({
	displayName: CONTROL,

	propTypes: {
		week: React.PropTypes.array
	},

	render () {
		const self = this;

		return (
			<tr>
				{ this.props.week.map(function (day, i) {
					return <DateDay key={i} onSelectDay={self.props.onSelectDay} day={day} multiSelect={self.props.multiSelect}/>;
				}) }
			</tr>
		);
	}
});

export default DateInput;
