// DATEPICKER CALENDAR - REACT FACADE

// Framework specific
import React from 'react';

// Third party
import classNames from 'classnames';

const DateInput = React.createClass({

	render () {
		const self = this;
		const day = this.props.day;

		return (
			<td onClick={this._handleDateClicked.bind(self, this.props.day)} className={classNames({'slds-is-today': day.today, 'slds-disabled-text': day.outside, 'slds-is-selected': day.selected})} role="gridcell" aria-disabled="true">
				<span className="slds-day">{day.day}</span>
			</td>
		);
	},

	_handleDateClicked (day) {
		this.props.onSelectDay(day);
	}
});

export default DateInput;
