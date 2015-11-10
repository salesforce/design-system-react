// DATEPICKER YEAR - REACT FACADE

// Framework specific
import React from 'react';

// Children
import Picklist from '../picklist/picklist';

export const CONTROL = 'datepicker-year';

const DateMonth = React.createClass({
	displayName: CONTROL,

	propTypes: {
		getYearRange: React.PropTypes.func,
		setViewingDate: React.PropTypes.func,
		dateViewing: React.PropTypes.instanceOf(Date)
	},

	render () {
		const picklistRange = this.props.getYearRange();

		return (
			<Picklist collection={picklistRange.all} selection={picklistRange.selected} onChanged={this._handleModelChange} />
		);
	},

	_handleModelChange (info) {
		const curViewDate = this.props.dateViewing;

		this.props.setViewingDate(new Date(curViewDate.setYear(info.value)));
	}
});

export default DateMonth;
