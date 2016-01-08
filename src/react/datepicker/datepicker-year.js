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
		setYear: React.PropTypes.func
	},

	render () {
		const picklistRange = this.props.getYearRange();

		return (
			<Picklist collection={picklistRange.collection} selection={picklistRange.selection} onChange={this._handleModelChange} />
		);
	},

	_handleModelChange (info) {
		this.props.setYear(info.value);
	}
});

export default DateMonth;
