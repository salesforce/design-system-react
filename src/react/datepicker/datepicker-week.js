// DATEPICKER CALENDAR - REACT FACADE

// Framework specific
import React from 'react';

import DateDay from './datepicker-day';

const DateInput = React.createClass({

	render () {
		var self = this;

		return (
			<tr>
				{ this.props.week.map(function (day, i) {
					return <DateDay key={i} onSelectDay={self.props.onSelectDay} day={day} multiSelect={self.props.multiSelect}/>
				}) }
			</tr>
		);
	}
});

export default DateInput;
